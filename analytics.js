(function () {
  "use strict";

  const STORAGE_KEY = "refhealth_attribution_v1";
  const UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
  ];
  const MAX_LENGTH = 120;

  function clean(value) {
    return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
  }

  function readStored() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function writeStored(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (_error) {
      // Storage may be unavailable. Analytics still works for this page.
    }
  }

  function referrerHost() {
    if (!document.referrer) return "";

    try {
      const host = new URL(document.referrer).hostname;
      return host && host !== window.location.hostname ? clean(host) : "";
    } catch (_error) {
      return "";
    }
  }

  function currentTouch() {
    const params = new URLSearchParams(window.location.search);
    const touch = {
      landing_page: clean(window.location.pathname || "/"),
      referrer_host: referrerHost(),
      captured_at: new Date().toISOString()
    };

    UTM_KEYS.forEach((key) => {
      const value = clean(params.get(key) || "");
      if (value) touch[key] = value;
    });

    return touch;
  }

  function hasCampaign(touch) {
    return UTM_KEYS.some((key) => touch && touch[key]);
  }

  function captureAttribution() {
    const touch = currentTouch();
    const stored = readStored();
    const hasExternalAttribution = hasCampaign(touch) || touch.referrer_host;
    const next = {
      first_touch: stored.first_touch || touch,
      last_touch: touch,
      last_campaign: hasExternalAttribution
        ? touch
        : stored.last_campaign || stored.last_touch || touch
    };

    writeStored(next);
    return next;
  }

  function eventParams(attribution) {
    const first = attribution.first_touch || {};
    const last = attribution.last_campaign || attribution.last_touch || {};

    return {
      first_source: clean(first.utm_source || (first.referrer_host ? "referral" : "direct")),
      first_medium: clean(first.utm_medium || (first.referrer_host ? "referral" : "none")),
      first_campaign: clean(first.utm_campaign),
      last_source: clean(last.utm_source || (last.referrer_host ? "referral" : "direct")),
      last_medium: clean(last.utm_medium || (last.referrer_host ? "referral" : "none")),
      last_campaign: clean(last.utm_campaign)
    };
  }

  function formAttribution() {
    const attribution = window.refHealthAnalytics.attribution || {};
    const current = currentTouch();
    const selected = hasCampaign(current) || current.referrer_host
      ? current
      : attribution.last_campaign || attribution.first_touch || current;
    const first = attribution.first_touch || selected;
    const fields = {
      landing_page: clean(first.landing_page || selected.landing_page || "/")
    };

    UTM_KEYS.forEach((key) => {
      const value = clean(selected[key]);
      if (value) fields[key] = value;
    });

    const host = clean(selected.referrer_host || first.referrer_host);
    if (host) fields.referrer_host = host;
    return fields;
  }

  function track(name, params) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", name, {
      page_path: clean(window.location.pathname || "/"),
      ...params,
      ...eventParams(window.refHealthAnalytics.attribution || {})
    });
  }

  function ctaLocation(link) {
    const explicit = link.dataset.analyticsLocation ||
      link.closest("[data-analytics-location]")?.dataset.analyticsLocation;
    if (explicit) return clean(explicit);
    if (link.closest("nav")) return "navigation";
    return clean(link.closest("section[id]")?.id || "page");
  }

  function isDiagnosticLink(link) {
    try {
      return new URL(link.href, window.location.href).pathname.endsWith("/intake.html");
    } catch (_error) {
      return false;
    }
  }

  function decorateTallyEmbed() {
    const iframe = document.querySelector("iframe[data-tally-src]");
    if (!iframe) return;

    try {
      const tallyUrl = new URL(iframe.dataset.tallySrc);
      Object.entries(formAttribution()).forEach(([key, value]) => {
        tallyUrl.searchParams.set(key, value);
      });
      iframe.dataset.tallySrc = tallyUrl.toString();
    } catch (_error) {
      // A malformed embed URL should not stop the rest of the page from working.
    }
  }

  function boot() {
    document.querySelectorAll("a[href]").forEach((link) => {
      if (isDiagnosticLink(link)) {
        link.addEventListener("click", () => {
          track("diagnostic_cta_click", {
            cta_location: ctaLocation(link),
            link_type: "diagnostic"
          });
        });
      } else if (link.href.startsWith("mailto:")) {
        link.addEventListener("click", () => {
          track("contact_email_click", {
            cta_location: ctaLocation(link)
          });
        });
      }
    });

    const form = document.querySelector(".intake-form--hosted");
    if (!form) return;

    let started = false;
    const markStart = () => {
      if (started) return;
      started = true;
      track("diagnostic_form_start", {
        form_name: "healthcare_ai_diagnostic",
        page_type: "intake",
        method: "tally"
      });
    };

    ["focusin", "pointerdown", "click"].forEach((type) => {
      form.addEventListener(type, markStart);
    });
  }

  window.refHealthAnalytics = {
    attribution: captureAttribution(),
    captureAttribution,
    decorateTallyEmbed,
    eventParams,
    formAttribution,
    track
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

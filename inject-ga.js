// inject-ga.js
const fs = require('fs');
const path = require('path');

const GA_ID = process.env.GA_ID || 'G-05XLCL9N8S'; // override in workflow if needed

const GA_SNIPPET = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
`;

const ANALYTICS_SNIPPET = '<script src="analytics.js"></script>';

function injectInFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (!html.includes('gtag(') && !html.includes('googletagmanager.com/gtag/js')) {
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${GA_SNIPPET}\n</head>`);
    } else {
      html = `${GA_SNIPPET}\n${html}`;
    }
    changed = true;
  }

  if (!html.includes('src="analytics.js"')) {
    if (!html.includes('</head>')) {
      html = `${ANALYTICS_SNIPPET}\n${html}`;
    } else {
      html = html.replace('</head>', `${ANALYTICS_SNIPPET}\n</head>`);
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Injected analytics into ${filePath}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.github') continue;
      walk(full);
    } else if (entry.isFile() && full.endsWith('.html')) {
      injectInFile(full);
    }
  }
}

walk('.');

// inject-ga.js
const fs = require('fs');
const path = require('path');

const GA_ID = process.env.GA_ID || 'G-20C3G81DBE'; // override in workflow if needed

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

function injectInFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Don’t double-inject
  if (
    html.includes('gtag(') ||
    html.includes('googletagmanager.com/gtag/js')
  ) {
    return;
  }

  if (html.includes('</head>')) {
    // Insert before </head>
    html = html.replace('</head>', `${GA_SNIPPET}\n</head>`);
  } else {
    // Fallback: put at the top if there’s no <head>
    html = `${GA_SNIPPET}\n${html}`;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Injected GA into ${filePath}`);
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

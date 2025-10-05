const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 3050;

// 1) Enable Helmet default protections (X-Frame-Options, X-Content-Type-Options, etc.)
app.use(helmet());

// 2) Add a strict Content Security Policy (CSP)
// NOTE: CSP is NOT included by default — you must configure it.
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      // allow your frontend’s needs; keep tight for security:
      "script-src": ["'self'"],         // add CDNs if you actually use them
      "style-src": ["'self'", "'unsafe-inline'"], // remove 'unsafe-inline' if you don’t inline styles
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'", "ws:", "wss:"],   // for WebSocket telemetry in IoT UIs
    },
  })
);

// 3) (Optional) HSTS - only meaningful over HTTPS and in production
if (process.env.NODE_ENV === 'production') {
  app.use(
    helmet.hsts({
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    })
  );
}

// Demo route
app.get('/', (req, res) => {
  res.send('hello world (Helmet secured)');
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

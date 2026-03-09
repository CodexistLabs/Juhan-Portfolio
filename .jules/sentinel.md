## 2026-01-21 - Supply Chain Security for Legacy JS
**Vulnerability:** External dependencies in `cv/index.html` were loaded from CDNs without version pinning or Subresource Integrity (SRI) hashes, and no Content Security Policy (CSP) was present.
**Learning:** Even simple static pages can be vectors for supply chain attacks if they blindly trust external scripts (e.g., via `@latest` redirectors or compromised CDNs). `html-docx-js` was being loaded from `unpkg.com` without a version, defaulting to latest.
**Prevention:** Always pin versions (e.g., `html-docx-js@0.3.1`) and use SRI hashes (`integrity="..."`) for all external scripts and styles. Implement a strict CSP to block unauthorized resource loading.
## 2026-01-28 - Resolving Redirects for SRI
**Vulnerability:** When adding Subresource Integrity (SRI) to dependencies loaded from CDNs like `unpkg.com` or `jsDelivr`, using a short URL (e.g., `unpkg.com/package@version`) often redirects to a specific file. SRI checks fail if the integrity hash is generated from the redirect target but applied to the redirecting URL, or if the browser blocks the redirect for opaque responses with integrity.
**Learning:** `unpkg.com/lucide@0.562.0` redirected to `/lucide@0.562.0/dist/umd/lucide.min.js`. The SRI hash must match the *content* of the final file, and the `src` attribute should point directly to that final file to avoid redirect issues and ensure consistent behavior.
**Prevention:** Always resolve CDN URLs to their final path (usually including `dist/.../file.min.js`) before generating SRI hashes and adding them to the codebase.

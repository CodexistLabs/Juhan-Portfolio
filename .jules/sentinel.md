## 2024-05-23 - Introduced HTML Sanitization for Dynamic Content
**Vulnerability:** Usage of `innerHTML` with `PROJECT_DATA` creates a potential XSS sink if data becomes tainted or externalized. While currently hardcoded, this pattern was insecure for future scalability.
**Learning:** Even static sites can benefit from defense-in-depth. `innerHTML` is often used for convenience (preserving bold tags etc), but requires strict sanitization.
**Prevention:** Implemented a client-side `sanitizeHTML` utility that uses `DOMParser` to parse and reconstruct the HTML using an allowlist of tags (`BR`, `STRONG`, `P`, etc.) and stripping all attributes. This ensures that even if malicious scripts are injected into the data source, they will not execute.

## 2026-01-07 - Added Content Security Policy (CSP) and Pinned Dependencies
**Vulnerability:** Missing `Content-Security-Policy` header on the public portfolio page, and usage of `lucide@latest` which poses a supply chain risk.
**Learning:** Even simple static sites can be vulnerable to XSS and supply chain attacks if headers are not configured and versions are not pinned.
**Prevention:** Added a strict CSP meta tag to `portfolio/index.html` allowing only specific CDN domains. Pinned `lucide` to version `0.562.0` to ensure stability and security.

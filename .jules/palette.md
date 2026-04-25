## 2024-05-23 - Interactive Elements Must Be Interactive
**Learning:** I discovered `div` elements with `role="img"` in a navigation submenu that were intended to be links to other portfolios. This pattern (likely a copy-paste error or unfinished placeholder) is dangerous because it visually mimics navigation but fails completely for keyboard users and screen readers, and even mouse users if no click handler is attached.
**Action:** Always verify that elements looking like buttons or links are actually implemented as `<button>` or `<a>` tags. If `div`s are used for layout, ensure they don't masquerade as interactive elements without proper `tabindex` and event handlers, but prefer semantic HTML.

## 2024-05-23 - [Dismiss on Escape]
**Learning:** Users expect the `Escape` key to close popups, modals, and expanded menus. Crucially, focus must be programmatically returned to the trigger element (e.g., the menu button) to preserve the user's navigational context. This is a critical "micro-interaction" for accessibility.
**Action:** Always add a global `keydown` listener for `Escape` when building custom interactive components like menus or modals, and ensure it manages focus state.

## 2024-05-24 - [Phantom Interactivity]
**Learning:** Elements with `cursor: pointer` or hover transforms that perform no action (like static list items in a menu) create "Phantom Interactivity," confusing users who expect a click to do something.
**Action:** Always ensure static elements explicitly use `cursor: default` and do not have hover lift/scale effects unless they are actionable. For purely informational lists inside menus, rely on tooltips or static layouts without interaction cues.
## 2024-05-25 - [Skip to Main Content]
**Learning:** For heavy interactive applications like 3D portfolios, keyboard users often get stuck tabbing through intro elements or navigation menus before reaching the core experience. A "Skip to Main Content" link is critical for bypassing these barriers.
**Action:** Always include a `.skip-link` as the first focusable element in the body that anchors directly to the main canvas or interaction container.
## 2026-03-04 - Accessible Mobile Menu Buttons in Portfolios
**Learning:** Across the `portfolio/*` templates, the mobile menu buttons (`#mobile-menu-btn`) were implemented without accessible ARIA labels or keyboard focus indicators. Since they rely solely on SVG icons for visual meaning, they were completely invisible to screen readers and difficult to interact with for keyboard users.
**Action:** Always add `aria-label`, `aria-expanded`, and `aria-controls` to icon-only toggle buttons. Ensure that inline JavaScript managing the menu state dynamically updates the `aria-expanded` attribute. Finally, provide visible focus indicators (e.g., using Tailwind `focus-visible` classes) to support keyboard navigation.

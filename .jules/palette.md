## 2024-05-23 - [Keyboard Access for OrbitControls]
**Learning:** `OrbitControls` listens to keys on `window` by default, which can hijack page scrolling. Using `controls.listenToKeyEvents(renderer.domElement)` combined with `tabIndex="0"` on the canvas provides a more robust and accessible experience, allowing users to explicitly "enter" the 3D context.
**Action:** When implementing 3D controls alongside scrollable HTML content, always bind key events to the specific DOM element and ensure it is focusable.

## 2024-05-23 - [Dismiss on Escape]
**Learning:** Users expect the `Escape` key to close popups, modals, and expanded menus. Crucially, focus must be programmatically returned to the trigger element (e.g., the menu button) to preserve the user's navigational context.
**Action:** Always add a global `keydown` listener for `Escape` when building custom interactive components like menus or modals, and ensure it manages focus state.

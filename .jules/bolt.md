## 2024-12-17 - [Vector3 Pooling in Render Loop]
**Learning:** Frequent allocation of short-lived objects (like `new THREE.Vector3()`) inside the `animate` loop creates significant Garbage Collection pressure, which can cause frame stuttering in 3D applications.
**Action:** Always pre-allocate reusable Three.js objects (`Vector3`, `Quaternion`, `Matrix4`) outside the render loop and reuse them using methods like `copy()`, `set()`, or passing them as target arguments (e.g., `getWorldPosition(target)`).

## 2024-12-17 - [Cache Raycasting Targets]
**Learning:** Reconstructing arrays or traversing scene graphs (like `moonsGroup.traverse`) inside the `animate` loop for raycasting causes unnecessary CPU overhead and allocation.
**Action:** Cache static or semi-static lists of raycast targets (meshes) and labels when the view changes, rather than rebuilding them every frame.

## 2024-12-17 - [Conditional Updates in Animate Loop]
**Learning:** Unconditional updates of uniforms and animations for invisible objects (like `skillsPlanets` or hidden mixers) consume CPU cycles in the `animate` loop.
**Action:** Wrap update logic for distinct groups of objects in visibility checks (e.g., `if (group.visible)`) to skip processing for hidden elements.

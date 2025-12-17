## 2024-12-17 - [Vector3 Pooling in Render Loop]
**Learning:** Frequent allocation of short-lived objects (like `new THREE.Vector3()`) inside the `animate` loop creates significant Garbage Collection pressure, which can cause frame stuttering in 3D applications.
**Action:** Always pre-allocate reusable Three.js objects (`Vector3`, `Quaternion`, `Matrix4`) outside the render loop and reuse them using methods like `copy()`, `set()`, or passing them as target arguments (e.g., `getWorldPosition(target)`).

import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                // Function form required for Vite 8 / Rolldown
                manualChunks(id) {
                    if (id.includes('node_modules/three')) return 'three';
                    if (id.includes('node_modules/gsap')) return 'gsap';
                },
            },
        },
        chunkSizeWarningLimit: 800,
    },
    server: {
        port: 3000,
        open: true,
    },
    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.bin', '**/*.hdr', '**/*.wav', '**/*.mp3'],
});

import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: 'index.html',
                cv: 'cv/index.html',
                portfolio: 'portfolio/index.html',
                'portfolio/seo-portfolio': 'portfolio/seo-portfolio/index.html',
                'portfolio/paid-marketing-portfolio': 'portfolio/paid-marketing-portfolio/index.html',
                'portfolio/graphic-design-portfolio': 'portfolio/graphic-design-portfolio/index.html'
            },
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

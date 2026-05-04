import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import gltfPipeline from 'gltf-pipeline';

const { processGlb, gltfToGlb } = gltfPipeline;
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const models = [
    { input: 'assets/3dmodels/moon.glb',             output: 'assets/3dmodels/moon.glb' },
    { input: 'assets/3dmodels/sun.glb',              output: 'assets/3dmodels/sun.glb' },
    { input: 'assets/3dmodels/tlr.glb',              output: 'assets/3dmodels/tlr.glb' },
    { input: 'assets/3dmodels/eof.glb',              output: 'assets/3dmodels/eof.glb' },
    { input: 'assets/3dmodels/mm.glb',               output: 'assets/3dmodels/mm.glb' },
    { input: 'assets/3dmodels/zj.glb',               output: 'assets/3dmodels/zj.glb' },
    { input: 'assets/3dmodels/space_background.glb', output: 'assets/3dmodels/space_background.glb' },
];

const gltfModels = [
    { input: 'assets/3dmodels/about/scene.gltf',    output: 'assets/3dmodels/about/scene.glb' },
    { input: 'assets/3dmodels/projects/scene.gltf', output: 'assets/3dmodels/projects/scene.glb' },
    { input: 'assets/3dmodels/skills/scene.gltf',   output: 'assets/3dmodels/skills/scene.glb' },
    { input: 'assets/3dmodels/aj/aj.gltf',          output: 'assets/3dmodels/aj/aj.glb' },
];

const dracoOptions = {
    dracoOptions: {
        compressionLevel: 10,
        quantizePositionBits: 14,
        quantizeNormalBits: 10,
        quantizeTexcoordBits: 12,
    }
};

function formatMB(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

/**
 * Check if a GLB buffer is already Draco-compressed by reading its JSON chunk
 * and looking for the KHR_draco_mesh_compression extension.
 */
function isAlreadyDracoCompressed(glbBuffer) {
    try {
        // GLB format: 12 byte header, then chunks
        // Chunk 0 is always JSON: [length:4][type:4][data]
        const chunkLength = glbBuffer.readUInt32LE(12);
        const jsonStr = glbBuffer.toString('utf8', 20, 20 + chunkLength);
        return jsonStr.includes('KHR_draco_mesh_compression');
    } catch {
        return false;
    }
}

async function compressGlb(model) {
    const inputPath = join(root, model.input);
    const outputPath = join(root, model.output);

    if (!existsSync(inputPath)) {
        console.log(`⚠  Skipping (not found): ${model.input}`);
        return;
    }

    const inputData = readFileSync(inputPath);
    const before = inputData.length;

    // Skip if already Draco-compressed — re-encoding would fail
    if (isAlreadyDracoCompressed(inputData)) {
        console.log(`⏭  Already Draco-compressed, skipping: ${model.input} (${formatMB(before)})`);
        return;
    }

    console.log(`📦 Compressing ${model.input} (${formatMB(before)})...`);
    try {
        const result = await processGlb(inputData, dracoOptions);
        writeFileSync(outputPath, result.glb);
        const after = result.glb.length;
        const saved = (((before - after) / before) * 100).toFixed(1);
        console.log(`   ✅ ${formatMB(before)} → ${formatMB(after)}  (saved ${saved}%)`);
    } catch (err) {
        console.error(`   ❌ Failed: ${err.message}`);
    }
}

async function compressGltf(model) {
    const inputPath = join(root, model.input);
    const outputPath = join(root, model.output);
    const resourceDir = dirname(inputPath);

    if (!existsSync(inputPath)) {
        console.log(`⚠  Skipping (not found): ${model.input}`);
        return;
    }

    // If the output GLB already exists and is Draco-compressed, skip
    if (existsSync(outputPath)) {
        const existing = readFileSync(outputPath);
        if (isAlreadyDracoCompressed(existing)) {
            console.log(`⏭  Already processed, skipping: ${model.input} → ${model.output} (${formatMB(existing.length)})`);
            return;
        }
    }

    const gltfData = JSON.parse(readFileSync(inputPath, 'utf-8'));
    console.log(`📦 Packing + compressing ${model.input}...`);
    try {
        const packedResult = await gltfToGlb(gltfData, { resourceDirectory: resourceDir });
        const compressed = await processGlb(packedResult.glb, dracoOptions);
        writeFileSync(outputPath, compressed.glb);
        const after = compressed.glb.length;
        console.log(`   ✅ Packed + compressed → ${model.output} (${formatMB(after)})`);
    } catch (err) {
        console.error(`   ❌ Failed ${model.input}: ${err.message}`);
    }
}

async function run() {
    console.log('\n🚀 Starting model compression...\n');
    for (const model of models) await compressGlb(model);
    for (const model of gltfModels) await compressGltf(model);
    console.log('\n✅ All done!\n');
}

run();

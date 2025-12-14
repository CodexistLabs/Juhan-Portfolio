import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

document.addEventListener('DOMContentLoaded', () => {

    const PROJECT_DATA = [
        {
            title: "The Lions Raw",
            challenge: "The Lions Raw needed a digital platform that mirrored their exclusive, high-end market positioning. The objective was to translate the concept of luxury into a web experience that instilled immediate customer trust and justified premium pricing.",
            solution: "I crafted a masterful dark-themed UI enriched with elegant gold accents and sophisticated typography. The design prioritizes visual hierarchy and a \"less is more\" approach to create an atmosphere of exclusivity, ensuring the website feels as premium as the products it represents.",
            outcome: "The site established a commanding brand identity that resonates with affluent consumers. This elevated aesthetic successfully built the necessary customer confidence, directly contributing to a measurable increase in conversion rates and sales.",
            imageUrl: "assets/thelionsraw.png",
            liveUrl: 'https://thelionsraw.com',
            modelUrl: 'assets/3dmodels/tlr.glb'
        },
        {
            title: "Modified Monkey",
            challenge: "Modified Monkey required a website that balanced the raw, rebellious energy of body modification with the professional trust required for clinical procedures. The site needed to be visually striking and \"urban\" without compromising usability or confusing the user journey.",
            solution: "I implemented a high-contrast design featuring gritty textures and vibrant yellow accents to capture an industrial, edgy vibe. Despite the bold aesthetic, the UI was engineered to be clean and professional, guiding users intuitively toward the appointment booking funnel.",
            outcome: "The new design perfectly encapsulates the studio’s unique culture. This strong, on-brand online presence not only solidified their market identity but led to a significant surge in direct online bookings and reduced administrative overhead.",
            imageUrl: "assets/modifiedmonkey.png",
            liveUrl: 'https://modifiedmonkey.co.za',
            modelUrl: 'assets/3dmodels/mm.glb'
        },
        {
            title: "Entertainment on Fire",
            challenge: "As a content-rich entertainment brand, the client needed a way to showcase extensive media galleries and event data without creating visual clutter. The challenge was to deliver a \"magical\" and energetic user experience while maintaining fast load times and easy content management.",
            solution: "I built an immersive, dark-mode environment using fiery gold and purple accents to match the brand's dynamic energy. On the backend, I developed Custom Post Types (CPTs) to streamline the management of complex event schedules and image galleries, making updates easy for the client.",
            outcome: "The site garnered high praise for successfully capturing the brand's energetic spirit. The intuitive navigation structure and optimized media handling significantly improved user engagement metrics, keeping visitors on the site longer.",
            imageUrl: "assets/entertainmentonfire.png",
            liveUrl: 'https://entertainmentonfire.com',
            modelUrl: 'assets/3dmodels/eof.glb'
        },
        {
            title: "Adora Jewels",
            challenge: "Adora Jewels needed a brand-new e-commerce platform built from the ground up to serve two distinct markets: general public shoppers and wholesale retailers. Beyond standard sales, the business required a seamless way to bridge the gap between product sales and their service-based sister company, Modified Monkey. They also needed a simplified way for staff to manage inventory and track performance without navigating the technical complexities of the WordPress backend.",
            solution: "I developed a custom WordPress site using Bricks Builder to ensure high performance. The core innovation lies in the custom-coded solutions:<br><br><strong>Frontend Stock Management:</strong> I built a secure dashboard allowing Shop Managers to add, edit, and delete products entirely from the frontend. It includes real-time analytics on site visits, product performance, and sales data.<br><br><strong>Unified Booking Engine:</strong> I engineered a custom booking system that syncs a single database between Adora Jewels and Modified Monkey. This manages real-time slot availability and syncs directly to the user's personal calendar.<br><br><strong>Smart Cross-Promotion:</strong> I implemented logic where spending a specific threshold on Adora unlocks discounted bookings at the piercing studio, while paid bookings on Modified Monkey trigger exclusive jewellery discounts on Adora.",
            outcome: "The result is a powerful, interconnected digital ecosystem. The custom frontend tools reduced administrative training time and streamlined daily operations. The cross-site integration successfully drives revenue for both businesses, creating an automated sales loop that converts jewellery buyers into piercing clients and vice versa. Adora Jewels now operates efficiently for both B2B and B2C markets on a single, fast platform.",
            imageUrl: "assets/zetara.png", // Keeping placeholder image path as none was provided, but logic updated
            liveUrl: 'https://adorajewels.co.za',
            modelUrl: 'assets/3dmodels/aj.gltf'
        }
    ];

    const SKILLS_DATA = {
        "Web Design": {
            skills: [ { name: "Responsive Design", level: 1.0 }, { name: "UI / UX Design", level: 0.90 }, { name: "HTML / CSS Proficiency", level: 0.98 }, { name: "JavaScript Frameworks", level: 0.85 }, { name: "Content Management Systems (CMS)", level: 0.90 } ],
            tools: ["Figma", "XD", "Photoshop", "Illustrator", "Bricks", "Codepen", "CSS", "HTML", "JS", "SASS", "WordPress"],
            copy: "Leveraging a deep understanding of user-centric principles to create intuitive, beautiful, and highly functional websites. My focus is on crafting seamless experiences that are both accessible and engaging across all devices, from initial wireframe to final pixel-perfect implementation."
        },
        "Web Development": {
            skills: [ { name: "JavaScript & Frameworks", level: 1.0 }, { name: "Responsive Design", level: 1.0 }, { name: "Backend Development", level: 0.80 }, { name: "Database Management", level: 0.85 }, { name: "Version Control (Git/GitHub)", level: 0.95 } ],
            tools: ["Bricks", "Codeigniter", "CPanel", "C++", "C#", "Gemini", "Laravel", "MySQL", "PHP", "Python", "Rails", "Ruby", "Softaculous", "Visual Studio", "WordPress"],
            copy: "Building robust and scalable web solutions from the ground up. I specialize in both front-end and back-end development, utilizing modern frameworks and best practices to deliver high-performance applications. My expertise includes server management, database architecture, and version control."
        },
        "3D + Motion": {
            skills: [ { name: "Video Production", level: 0.80 }, { name: "Special Effects", level: 0.85 }, { name: "Video Editing", level: 0.90 }, { name: "3D Modeling", level: 0.70 }, { name: "3D Logo Designs", level: 1.0 } ],
            tools: ["After Effects", "Audition", "Blender", "Draco", "Illustrator", "Media Encoder", "Premiere Pro", "Rush"],
            copy: "Bringing digital concepts to life through captivating 3D modeling and motion graphics. From animated logos to complex visual effects, I utilize industry-standard software to create dynamic content that enhances brand storytelling and engages audiences in a multi-dimensional format."
        },
        "SEO / AIO": {
            skills: [ { name: "Technical SEO", level: 0.98 }, { name: "Keyword Research", level: 0.90 }, { name: "Performance Tracking", level: 0.90 } ],
            tools: ["Gemini", "Google SEO", "Looker Studio", "RankMath", "Yoast"],
            copy: "Driving organic growth by optimizing websites for maximum visibility on search engines. My approach is data-driven, focusing on comprehensive keyword research, technical on-page optimization, and meticulous performance analysis to achieve and maintain top search rankings."
        },
        "Digital Marketing": {
            skills: [ { name: "Data Analysis & Interpretation", level: 1.0 }, { name: "Content Marketing Strategy", level: 0.88 }, { name: "Social Media Management", level: 0.80 }, { name: "SEO & SEM", level: 1.0 }, { name: "AI & Marketing Automation", level: 0.85 } ],
            tools: ["Gemini", "Google Ads", "Google Analytics", "Google My Business", "Google Search Console", "Google Tag Manager", "SEMRush", "WooCommerce"],
            copy: "Developing and executing holistic digital marketing strategies that build brand awareness and drive conversions. I am experienced in leveraging a full suite of tools for paid advertising (SEM), search engine optimization (SEO), social media management, and in-depth analytics."
        },
        "Graphic Design": {
            skills: [ { name: "Creativity & Ideation", level: 0.95 }, { name: "Typography Expertise", level: 1.0 }, { name: "Branding & Identity Design", level: 0.92 }, { name: "UI/UX Design Principles", level: 0.88 } ],
            tools: ["Acrobat", "Adobe", "Bridge", "Fonts", "Gemini", "Illustrator", "InCopy", "InDesign", "Lightroom", "Lightroom Classic", "Photoshop"],
            copy: "Crafting compelling visual identities that resonate with audiences. With a strong foundation in design theory and extensive experience with the Adobe Creative Suite, I produce everything from logos and branding packages to marketing collateral and digital assets that are both beautiful and effective."
        }
    };

    const TOOLKIT_DATA = [
        { name: "Acrobat", iconUrl: "assets/graphicdesign/acrobat.png" }, { name: "Adobe", iconUrl: "assets/graphicdesign/adobe.png" }, { name: "After Effects", iconUrl: "assets/3d+motion/aftereffects.png" }, { name: "Angular", iconUrl: "assets/webdesign/angular.webp" }, { name: "Audition", iconUrl: "assets/3d+motion/audition.png" }, { name: "Babel", iconUrl: "assets/webdesign/babel.webp" }, { name: "Blender", iconUrl: "assets/3d+motion/blender.png" }, { name: "Bootstrap", iconUrl: "assets/webdesign/bootstrap.png" }, { name: "Bricks", iconUrl: "assets/webdesign/bricks.webp" }, { name: "Bridge", iconUrl: "assets/graphicdesign/bridge.png" }, { name: "Codeigniter", iconUrl: "assets/webdevelopment/codeigniter.webp" }, { name: "Codepen", iconUrl: "assets/webdesign/codepen.webp" }, { name: "CPanel", iconUrl: "assets/webdevelopment/cpanel.webp" }, { name: "C++", iconUrl: "assets/webdevelopment/cplusplus.webp" }, { name: "Crocoblock", iconUrl: "assets/webdesign/crocoblockjetplugins.webp" }, { name: "C#", iconUrl: "assets/webdevelopment/csharp.webp" }, { name: "CSS", iconUrl: "assets/webdesign/css.webp" }, { name: "Draco", iconUrl: "assets/3d+motion/draco.png" }, { name: "Dreamweaver", iconUrl: "assets/webdesign/dreamweaver.png" }, { name: "Figma", iconUrl: "assets/webdesign/figma.webp" }, { name: "Fonts", iconUrl: "assets/graphicdesign/fonts.png" }, { name: "Gemini", iconUrl: "assets/webdesign/gemini.webp" }, { name: "Google Ads", iconUrl: "assets/digitalmarketing/googleads.webp" }, { name: "Google Analytics", iconUrl: "assets/digitalmarketing/googleanalytics.webp" }, { name: "Google My Business", iconUrl: "assets/digitalmarketing/googlemybusiness.webp" }, { name: "Google Search Console", iconUrl: "assets/digitalmarketing/googlesearchconsole.webp" }, { name: "Google SEO", iconUrl: "assets/seo/googleseo.webp" }, { name: "Google Tag Manager", iconUrl: "assets/digitalmarketing/googletagmanager.webp" }, { name: "HTML", iconUrl: "assets/webdesign/html.webp" }, { name: "Illustrator", iconUrl: "assets/graphicdesign/illustrator.png" }, { name: "InCopy", iconUrl: "assets/graphicdesign/incopy.png" }, { name: "InDesign", iconUrl: "assets/graphicdesign/indesign.png" }, { name: "Java", iconUrl: "assets/webdesign/java.webp" }, { name: "jQuery Mobile", iconUrl: "assets/webdesign/jquerymobile.webp" }, { name: "JS", iconUrl: "assets/webdesign/js.webp" }, { name: "Laravel", iconUrl: "assets/webdevelopment/laravel.webp" }, { name: "LESS", iconUrl: "assets/webdesign/less.webp" }, { name: "Lightroom", iconUrl: "assets/graphicdesign/lightroom.png" }, { name: "Lightroom Classic", iconUrl: "assets/graphicdesign/lightroomclassic.png" }, { name: "Looker Studio", iconUrl: "assets/seo/lookerstudio.png" }, { name: "Media Encoder", iconUrl: "assets/3d+motion/mediaencoder.png" }, { name: "MySQL", iconUrl: "assets/webdevelopment/mysql.webp" }, { name: "Nodejs", iconUrl: "assets/webdesign/nodejs.webp" }, { name: "Photoshop", iconUrl: "assets/graphicdesign/photoshop.png" }, { name: "PHP", iconUrl: "assets/webdevelopment/php.webp" }, { name: "Premiere Pro", iconUrl: "assets/d+motion/premierepro.png" }, { name: "Python", iconUrl: "assets/webdevelopment/python.webp" }, { name: "Rails", iconUrl: "assets/webdevelopment/rails.webp" }, { name: "RankMath", iconUrl: "assets/seo/rankmath.webp" }, { name: "React", iconUrl: "assets/webdesign/react.webp" }, { name: "Ruby", iconUrl: "assets/webdevelopment/ruby.webp" }, { name: "Rush", iconUrl: "assets/3d+motion/rush.png" }, { name: "SASS", iconUrl: "assets/webdesign/sass.webp" }, { name: "SEMRush", iconUrl: "assets/digitalmarketing/semrush.webp" }, { name: "SNN", iconUrl: "assets/webdesign/snn.webp" }, { name: "Softaculous", iconUrl: "assets/webdevelopment/softaculous.webp" }, { name: "TypeScript", iconUrl: "assets/webdesign/typescript.webp" }, { name: "Visual Studio", iconUrl: "assets/webdevelopment/visualstudio.webp" }, { name: "Vuejs", iconUrl: "assets/webdesign/vuejs.webp" }, { name: "WooCommerce", iconUrl: "assets/digitalmarketing/woocommerce.webp" }, { name: "WordPress", iconUrl: "assets/webdesign/wordpress.webp" }, { name: "XD", iconUrl: "assets/webdesign/xd.png" }, { name: "Yoast", iconUrl: "assets/seo/yoast.webp" }
    ];

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const initialCameraPosition = new THREE.Vector3(0, 0, 15);
    camera.position.copy(initialCameraPosition);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.minDistance = 5; controls.maxDistance = 30;
    const clock = new THREE.Clock();
    let composer, bloomPass;
    const DEFAULT_BLOOM_STRENGTH = 0.35;
    let particles = null;
    
    const labelsContainer = document.getElementById('labels-container');
    const aboutPanel = document.getElementById('about-panel');
    const projectsPanel = document.getElementById('projects-panel');
    const projectChallengeContainer = document.getElementById('project-challenge-container');
    const projectSolutionContainer = document.getElementById('project-solution-container');
    const skillDetailView = document.getElementById('skill-detail-view');
    const loaderOverlay = document.getElementById('loader-overlay');
    const introOverlay = document.getElementById('star-wars-intro');
    const introCrawl = document.querySelector('.star-wars-overlay .crawl');
    const backButton = document.getElementById('back-button');

    // Button Event Listeners for Project Flow
    document.getElementById('view-solution-btn').addEventListener('click', () => {
        gsap.to(projectChallengeContainer, { 
            duration: 0.5, 
            opacity: 0, 
            scale: 1.1, 
            filter: 'blur(10px)', 
            ease: 'power2.in',
            onComplete: () => {
                projectChallengeContainer.style.display = 'none';
                projectSolutionContainer.style.display = 'block';
                gsap.fromTo(projectSolutionContainer, 
                    { opacity: 0, y: 20 }, 
                    { duration: 0.8, opacity: 1, y: 0, ease: 'power3.out' }
                );
            }
        });
    });

    document.getElementById('back-to-project-btn').addEventListener('click', () => {
        gsap.to(projectSolutionContainer, {
            duration: 0.3,
            opacity: 0,
            y: 20,
            ease: 'power2.in',
            onComplete: () => {
                projectSolutionContainer.style.display = 'none';
                projectChallengeContainer.style.display = 'block';
                // Reset challenge container state
                gsap.set(projectChallengeContainer, { opacity: 1, scale: 1, filter: 'blur(0px)' });
            }
        });
    });

    // Loading Manager setup
    const loadingManager = new THREE.LoadingManager();
    const gltfLoader = new GLTFLoader(loadingManager);
    const rgbeLoader = new RGBELoader(loadingManager);
    
    loadingManager.onLoad = () => {
        if (loaderOverlay) {
            loaderOverlay.classList.add('collapsing');
            loaderOverlay.addEventListener('transitionend', () => {
                loaderOverlay.style.display = 'none';
                renderer.domElement.classList.add('visible');
                if (introOverlay) {
                    introOverlay.classList.add('visible');
                    if (introCrawl) introCrawl.classList.add('crawl-active');
                    introOverlay.addEventListener('animationend', finishIntro);
                    introOverlay.addEventListener('click', finishIntro);
                }
                window.addEventListener('keydown', (e) => {
                    if (['Escape', ' ', 'Enter'].includes(e.key)) finishIntro();
                });
            }, { once: true });
        }
    };
    
    function initPostprocessing() {
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), DEFAULT_BLOOM_STRENGTH, 0.4, 0.85);
        bloomPass.threshold = 0.15;
        bloomPass.strength = DEFAULT_BLOOM_STRENGTH;
        bloomPass.radius = 0.5;
        composer.addPass(renderPass);
        composer.addPass(bloomPass);
    }

    const HOVER_GLOW_COLOR = new THREE.Color(0xefc75e);
    const HOVER_BLOOM_STRENGTH = 1.2;

    function collectMaterials(root) {
        const mats = [];
        root.traverse(child => {
            if (child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(m => mats.push(m));
            }
        });
        return [...new Set(mats)];
    }

    function setGlow(target, enabled) {
        if (!target) return;
        // Check if the target is one of the original wireframe geometries
        if (target.geometry && (target.geometry.type === 'TorusKnotGeometry' || target.geometry.type === 'IcosahedronGeometry')) {
             const materials = collectMaterials(target);
             materials.forEach(m => {
                 if (m.color) { 
                     if (!m.userData.originalColor) m.userData.originalColor = m.color.clone();
                     m.color.copy(enabled ? HOVER_GLOW_COLOR : m.userData.originalColor);
                 }
             });
        }
    }
    
    function dimNonHovered(targetMesh) {
        nodeObjects.forEach(item => {
            if (item.mesh === targetMesh) return;
            if (item.visual) { 
                const materials = collectMaterials(item.visual);
                materials.forEach(mat => {
                    if (mat.color && !mat.userData.originalColor) {
                         mat.userData.originalColor = mat.color.clone();
                    }
                    if (mat.color) mat.color.multiplyScalar(0.3);
                });
            }
        });
    }

    function restoreNonHovered() {
        nodeObjects.forEach(item => {
             if (item.visual) {
                const materials = collectMaterials(item.visual);
                materials.forEach(mat => {
                    if (mat.color && mat.userData.originalColor) {
                        mat.color.copy(mat.userData.originalColor);
                    }
                });
             }
        });
    }
    
    const nodes = [ { name: 'About', position: new THREE.Vector3(0, 4, 0) }, { name: 'Projects', position: new THREE.Vector3(-5, -3, 0) }, { name: 'Skills', position: new THREE.Vector3(5, -3, 0) } ];
    const nodeObjects = [];
    let appReady = false;
    const sceneCenter = new THREE.Vector3(0, 0, 0);

    let skillsSystemGroup, skillsPlanets = [], projectLogos = [], projectsSystemGroup;
    let baseSkillPlanetUniforms;
    let moonModel = null;
    
    let currentView = 'main';
    let activePlanet = null;
    let activeProject = null;
    let shouldRotateProject = false; 
    const mixers = []; // Store animation mixers

    function initialize() {
        createWorld();
    }
    
    function createProjectsSystem() {
        const system = new THREE.Group();
        const planetRadius = 7;
        const angleStep = (Math.PI * 2) / PROJECT_DATA.length;
        
        gltfLoader.load('assets/3dmodels/sun.glb', (gltf) => {
            const sunModel = gltf.scene;
            sunModel.scale.set(0.2, 0.2, 0.2); 
            sunModel.position.set(0, 0, 0); 
            
            sunModel.traverse((child) => {
                if (child.isMesh && child.material) {
                    const oldMaterial = child.material;
                    child.material = new THREE.MeshBasicMaterial({
                        map: oldMaterial.map,
                    });
                }
            });

            system.add(sunModel);
        },
        undefined, 
        (error) => { console.error('An error happened loading the sun:', error); }
        );

        PROJECT_DATA.forEach((project, i) => {
            const angle = angleStep * i;
            const x = planetRadius * Math.cos(angle);
            const z = planetRadius * Math.sin(angle);
            
            gltfLoader.load(project.modelUrl, (gltf) => {
                const model = gltf.scene;
                
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2.0 / maxDim;
                model.scale.set(scale, scale, scale);
                model.userData.originalScale = new THREE.Vector3(scale, scale, scale); 
                new THREE.Box3().setFromObject(model).getCenter(model.position).multiplyScalar(-1);
                model.position.add(new THREE.Vector3(x, 0, z));

                const label = document.createElement('div');
                label.textContent = project.title;
                label.className = 'label hidden';
                labelsContainer.appendChild(label);

                const projectObj = { mesh: model, label, projectIndex: i };
                model.userData.parentObj = projectObj;
                projectLogos.push(projectObj);
                system.add(model);
            },
            undefined, 
            (error) => { console.error(`An error happened loading ${project.modelUrl}:`, error); }
            );
        });
        system.visible = false;
        scene.add(system);
        return system;
    }

    function createSkillsSystem() {
        const system = new THREE.Group();
        const categories = Object.keys(SKILLS_DATA);
        
        gltfLoader.load('assets/3dmodels/sun.glb', (gltf) => {
            const sunModel = gltf.scene;
            sunModel.scale.set(0.2, 0.2, 0.2); 
            sunModel.position.set(0, 0, 0); 
            
            sunModel.traverse((child) => {
                if (child.isMesh && child.material) {
                    const oldMaterial = child.material;
                    child.material = new THREE.MeshBasicMaterial({
                        map: oldMaterial.map, 
                    });
                }
            });
            system.add(sunModel);
        },
        undefined,
        (error) => { console.error('An error happened loading the sun for skills:', error); }
        );

        baseSkillPlanetUniforms = {
            u_time: { type: "f", value: 1.0 },
        };
        const planetGeometry = new THREE.SphereGeometry(0.8, 200, 100);

        const planetColors = [
            new THREE.Color("#FF5733"), // Web Design
            new THREE.Color("#33FF57"), // Web Development
            new THREE.Color("#3357FF"), // 3D + Motion
            new THREE.Color("#FF33A1"), // SEO / AIO
            new THREE.Color("#33FFF6"), // Digital Marketing
            new THREE.Color("#F6FF33")  // Graphic Design
        ];

        const orbitRingMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            side: THREE.DoubleSide, 
            transparent: true, 
            opacity: 0.3 
        });

        categories.forEach((category, i) => {
            const planetUniforms = THREE.UniformsUtils.clone(baseSkillPlanetUniforms);
            planetUniforms.u_color = { type: "v3", value: planetColors[i % planetColors.length] }; 
            
            const skillMaterial = new THREE.ShaderMaterial({
                uniforms: planetUniforms,
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
            });
            
            const orbitGroup = new THREE.Group();
            orbitGroup.rotation.y = Math.random() * Math.PI * 2; 
            const planetOrbitRadius = 6 + i * 3.5; 
            const orbitSpeed = 0.0005 + Math.random() * 0.001; 

            const orbitRingGeometry = new THREE.TorusGeometry(planetOrbitRadius, 0.01, 8, 100);
            const orbitRingMesh = new THREE.Mesh(orbitRingGeometry, orbitRingMaterial);
            orbitRingMesh.rotation.x = Math.PI / 2; 
            orbitRingMesh.visible = false; 
            system.add(orbitRingMesh); 

            const planet = new THREE.Mesh( planetGeometry, skillMaterial );
            planet.position.set(planetOrbitRadius, 0, 0); 
            planet.name = category;
            
            orbitGroup.add(planet); 
            system.add(orbitGroup); 

            const label = document.createElement('div');
            label.textContent = category;
            label.className = 'label hidden';
            labelsContainer.appendChild(label);
            
            const planetObj = { 
                mesh: planet, 
                label, 
                orbitGroup: orbitGroup, 
                orbitSpeed: orbitSpeed, 
                material: skillMaterial, 
                orbitRing: orbitRingMesh 
            };
            planet.userData.parentObj = planetObj; 
            skillsPlanets.push(planetObj);
        });

        system.visible = false;
        scene.add(system);
        return system;
    }

    function createWorld() {
        initPostprocessing();

        rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
        });

        gltfLoader.load(
            'assets/3dmodels/moon.glb', 
            (gltf) => { 
                moonModel = gltf.scene; 
            }, 
            undefined, 
            (err) => console.error('Error loading moon.glb', err)
        );

        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 7000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) { positions[i] = (Math.random() - 0.5) * 40; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: '#6fdd7a', size: 0.05, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.8 }));
        scene.add(particles);
        
        projectsSystemGroup = createProjectsSystem();
        skillsSystemGroup = createSkillsSystem();

        nodes.forEach((nodeInfo, index) => {
            const label = document.createElement('div');
            label.textContent = nodeInfo.name;
            label.className = 'label hidden'; 
            labelsContainer.appendChild(label);

            let hitbox;
             if (nodeInfo.name === 'About') {
                hitbox = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
            } else if (nodeInfo.name === 'Projects') {
                 hitbox = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
             } else { 
                 hitbox = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 0), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
             }
             hitbox.visible = false;
             hitbox.position.copy(nodeInfo.position);
             hitbox.name = nodeInfo.name;
             scene.add(hitbox);

            const nodeObj = { mesh: hitbox, label, visual: null }; 
            nodeObjects.push(nodeObj);

            let modelPath;
            let scaleFactor = 1.0; 

            if (nodeInfo.name === 'About') {
                modelPath = 'assets/3dmodels/about/scene.gltf'; 
                scaleFactor = 1.0; 
            } else if (nodeInfo.name === 'Projects') {
                modelPath = 'assets/3dmodels/projects/scene.gltf'; 
                scaleFactor = 1.0; 
            } else { 
                modelPath = 'assets/3dmodels/skills/scene.gltf'; 
                scaleFactor = 1.0; 
            }

            gltfLoader.load(modelPath, (gltf) => {
                const modelVisual = gltf.scene;
                
                const box = new THREE.Box3().setFromObject(modelVisual);
                const center = box.getCenter(new THREE.Vector3());
                modelVisual.position.sub(center); 
                modelVisual.scale.set(scaleFactor, scaleFactor, scaleFactor);
                
                modelVisual.position.copy(nodeInfo.position); 
                modelVisual.visible = false; 
                scene.add(modelVisual);

                if (gltf.animations && gltf.animations.length > 0) {
                    const mixer = new THREE.AnimationMixer(modelVisual);
                    const action = mixer.clipAction(gltf.animations[0]);
                    if (nodeInfo.name === 'About') {
                        action.timeScale = 0.1;
                    }
                    action.play();
                    mixers.push(mixer);
                }

                nodeObj.visual = modelVisual; 
                hitbox.userData.visuals = modelVisual; 

            }, undefined, (error) => {
                console.error(`Error loading model for ${nodeInfo.name}:`, error);
            });
        });

        animate();
    }

    function finishIntro() {
        if (appReady) return;
        gsap.to(introOverlay, { duration: 1.5, opacity: 0, onComplete: () => { if (introOverlay.parentNode) introOverlay.parentNode.removeChild(introOverlay); } });
        
        nodeObjects.forEach((item, i) => {
             if (item.visual) {
                 const visual = item.visual;
                 const mesh = item.mesh;
                 const delay = 0.5 + (i * 0.2);
                 visual.visible = true;
                 const finalPos = mesh.position.clone();
                 visual.position.z += 15; 
                 visual.position.x += (Math.random() - 0.5) * 10; 
                 visual.scale.set(0, 0, 0); 

                 let initialScale = 1.0;
                 if (mesh.name === 'About') initialScale = 1.0;
                 else if (mesh.name === 'Projects') initialScale = 1.0;
                 else if (mesh.name === 'Skills') initialScale = 1.0;
                 
                 gsap.to(visual.scale, { duration: 1.5, x: initialScale, y: initialScale, z: initialScale, ease: 'back.out(1.7)', delay });
                 gsap.to(visual.position, {
                     duration: 2.5, x: finalPos.x, y: finalPos.y, z: finalPos.z, ease: 'power3.out', delay,
                     onComplete: () => {
                         mesh.visible = true; 
                     }
                 });
            } else {
                 console.warn(`Visual for node ${item.mesh.name} not loaded yet.`);
                 item.mesh.visible = true;
             }
        });
        appReady = true;
    }

    let hoveredParentObj = null; 
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    window.addEventListener('mousemove', e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    });

    function showProjectDetail(projectObj) {
        currentView = 'project';
        activeProject = projectObj;
        shouldRotateProject = true; 

        projectLogos.forEach(p => {
            if(p !== projectObj) gsap.to(p.mesh.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: 'power3.in' });
            p.label.classList.add('hidden'); 
        });
        
        const targetPos = new THREE.Vector3();
        activeProject.mesh.getWorldPosition(targetPos);
        gsap.to(camera.position, { 
            duration: 1.5, 
            x: targetPos.x, 
            y: targetPos.y + 1, 
            z: targetPos.z + 4, 
            ease: 'power3.inOut' 
        });
        gsap.to(controls.target, { duration: 1.5, x: targetPos.x, y: targetPos.y, z: targetPos.z, ease: 'power3.inOut' });


        projectsPanel.classList.add('visible');
        const project = PROJECT_DATA[activeProject.projectIndex];
        document.getElementById('project-title').textContent = project.title;
        
        // Populate content
        document.getElementById('project-challenge').innerHTML = project.challenge;
        document.getElementById('project-solution').innerHTML = project.solution;
        document.getElementById('project-outcome').innerHTML = project.outcome;
        document.getElementById('project-link').href = project.liveUrl;

        // Reset View State
        projectSolutionContainer.style.display = 'none';
        projectSolutionContainer.style.opacity = 0;
        projectChallengeContainer.style.display = 'block';
        projectChallengeContainer.style.opacity = 1;
        projectChallengeContainer.style.transform = 'scale(1)';
        projectChallengeContainer.style.filter = 'blur(0px)';
    }

    function showSkillsDetail(planetObj) {
        currentView = 'planet';
        activePlanet = planetObj;

        skillsPlanets.forEach(p => {
            if (p !== planetObj) gsap.to(p.mesh.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: 'power3.in' });
        });

        if (!activePlanet.moonsGroup) {
            if (!moonModel) {
                console.error("Moon model is not loaded yet!");
                return; 
            }

            const moonsGroup = new THREE.Group();
            const skills = SKILLS_DATA[activePlanet.mesh.name].skills;
            const moonOrbitRadius = 2.5;
            const angleStep = (Math.PI * 2) / skills.length;

            skills.forEach((skill, i) => {
                const angle = angleStep * i;

                const moon = moonModel.clone();
                moon.scale.set(1, 1, 1); 
                moon.position.set(moonOrbitRadius * Math.cos(angle), 0, moonOrbitRadius * Math.sin(angle));

                const ring = new THREE.Mesh( new THREE.TorusGeometry(0.5, 0.02, 8, 48, Math.PI * 2 * skill.level), new THREE.MeshBasicMaterial({ color: HOVER_GLOW_COLOR, side: THREE.DoubleSide }) );
                ring.position.set(0, 0, 0); 
                ring.rotation.x = Math.PI / 2; 
                moon.add(ring); 

                const label = document.createElement('div');
                label.textContent = skill.name;
                label.className = 'label hidden'; 
                label.style.fontSize = '12px';
                labelsContainer.appendChild(label);
                
                const moonParentObj = { mesh: moon, label: label, ring: ring }; 
                moon.userData.parentObj = moonParentObj;

                moonsGroup.add(moon); 
                 label.classList.remove('hidden');
            });
            activePlanet.moonsGroup = moonsGroup;
            activePlanet.mesh.add(moonsGroup);
        }
        
        gsap.to(activePlanet.moonsGroup.scale, { duration: 0.5, x: 1, y: 1, z: 1, ease: 'power3.out', delay: 0.5 });
        
        const targetPos = new THREE.Vector3();
        activePlanet.mesh.getWorldPosition(targetPos);

        gsap.to(camera.position, {
            duration: 1.5,
            x: targetPos.x,
            y: targetPos.y + 2, 
            z: targetPos.z + 5, 
            ease: 'power3.inOut'
        });
        gsap.to(controls.target, {
            duration: 1.5,
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            ease: 'power3.inOut'
        });

        const skillData = SKILLS_DATA[activePlanet.mesh.name];
        document.getElementById('skill-detail-title').textContent = activePlanet.mesh.name;
        document.getElementById('skill-detail-text').textContent = skillData.copy;
        
        const sidebarEl = document.getElementById('skill-detail-sidebar');
        sidebarEl.innerHTML = '';
        skillData.tools.forEach(toolName => {
            const tool = TOOLKIT_DATA.find(t => t.name === toolName);
            if (tool) {
                const toolItem = document.createElement('div');
                toolItem.className = 'tool-item';
                const img = document.createElement('img');
                img.src = tool.iconUrl;
                img.title = tool.name;
                const label = document.createElement('span');
                label.className = 'tool-label';
                label.textContent = tool.name;
                toolItem.appendChild(img);
                toolItem.appendChild(label);
                sidebarEl.appendChild(toolItem);
            }
        });

        skillDetailView.classList.add('visible');
    } 

    window.addEventListener('click', () => {
        if (!appReady || gsap.isTweening(camera.position)) return;

        if (hoveredParentObj) { 
            if (currentView === 'main') {
                
                nodeObjects.forEach(item => { if(item.mesh !== hoveredParentObj.mesh) item.visual.visible = false; }); 
                
                if (hoveredParentObj.label) {
                    hoveredParentObj.label.classList.add('hidden');
                }
                
                if (hoveredParentObj.mesh.name === 'About') { 
                    currentView = 'about';
                    hoveredParentObj.visual.visible = false; 
                    gsap.to(camera.position, { duration: 1.6, x: hoveredParentObj.mesh.position.x, y: hoveredParentObj.mesh.position.y, z: hoveredParentObj.mesh.position.z + 5, ease: 'power3.inOut'});
                    gsap.to(controls.target, { duration: 1.6, x: hoveredParentObj.mesh.position.x, y: hoveredParentObj.mesh.position.y, z: hoveredParentObj.mesh.position.z, ease: 'power3.inOut', onComplete: () => {
                        aboutPanel.classList.add('visible');
                        backButton.classList.add('visible');
                    }});
                } else if (hoveredParentObj.mesh.name === 'Skills' || hoveredParentObj.mesh.name === 'Projects') { 
                    const isSkills = hoveredParentObj.mesh.name === 'Skills';
                    currentView = isSkills ? 'skills' : 'projects';
                    const systemNode = hoveredParentObj.visual; 
                    systemNode.visible = false;
                    
                    gsap.to(controls.target, { duration: 1.6, x: 0, y: 0, z: 0, ease: 'power3.inOut' });

                    if (isSkills) {
                        gsap.to(camera.position, { duration: 1.6, x: 0, y: 10, z: 18, ease: 'power3.inOut' }); 
                    } else {
                        gsap.to(camera.position, { duration: 1.6, x: 0, y: 8, z: 9, ease: 'power3.inOut' }); 
                    }

                    gsap.to(systemNode.position, { duration: 1.6, x: 0, y: 0, z: 0, ease: 'power3.inOut', onComplete: () => {
                         backButton.classList.add('visible');
                         if (isSkills) {
                            skillsSystemGroup.visible = true;
                         } else {
                            projectsSystemGroup.visible = true;
                         }
                    }});
                }
            } else if (currentView === 'skills') {
                if (hoveredParentObj) showSkillsDetail(hoveredParentObj); 
            } else if (currentView === 'projects') {
                if (hoveredParentObj) showProjectDetail(hoveredParentObj); 
            }
        }
    });

    backButton.addEventListener('click', () => {
        const targetView = currentView;
        
        aboutPanel.classList.remove('visible');
        projectsPanel.classList.remove('visible');
        skillDetailView.classList.remove('visible');

        if (targetView === 'planet') {
            const groupToDestroy = activePlanet.moonsGroup;
            const planetToReset = activePlanet;
            
            currentView = 'skills';
            activePlanet = null;

            if (groupToDestroy) {
                 groupToDestroy.children.forEach(moon => {
                    if (moon.userData.parentObj && moon.userData.parentObj.label) {
                        moon.userData.parentObj.label.classList.add('hidden');
                    }
                });
                gsap.to(groupToDestroy.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: 'power3.in', onComplete: () => {
                    groupToDestroy.children.forEach(moon => { 
                        if (moon.userData.parentObj) {
                            // Dispose of the ring
                            if (moon.userData.parentObj.ring) {
                                moon.userData.parentObj.ring.geometry.dispose();
                                moon.userData.parentObj.ring.material.dispose();
                            }
                            // Remove label
                            if (moon.userData.parentObj.label) {
                                moon.userData.parentObj.label.remove(); 
                            }
                        }
                    });
                    planetToReset.mesh.remove(groupToDestroy);
                    planetToReset.moonsGroup = null; 
                }});
            }
            
            gsap.to(controls.target, { duration: 1.6, x: 0, y: 0, z: 0, ease: 'power3.inOut' });
            gsap.to(camera.position, { duration: 1.6, x: 0, y: 10, z: 18, ease: 'power3.inOut' });
            skillsPlanets.forEach(p => {
                gsap.to(p.mesh.scale, { duration: 0.5, x: 1, y: 1, z: 1, ease: 'power3.out', delay: 0.5 });
            });
            
        } else if (targetView === 'project') {
            shouldRotateProject = false; 
            activeProject = null; 

            projectLogos.forEach(p => {
                gsap.to(p.mesh.scale, { duration: 0.5, x: 1, y: 1, z: 1, ease: 'power3.out', delay: 0.5 });
            });
            gsap.to(controls.target, { duration: 1.6, x: 0, y: 0, z: 0, ease: 'power3.inOut' });
            gsap.to(camera.position, { duration: 1.6, x: 0, y: 8, z: 9, ease: 'power3.inOut' });
            currentView = 'projects';
            
        } else if (['skills', 'projects', 'about'].includes(targetView)) {
             backButton.classList.remove('visible');
             skillsSystemGroup.visible = false;
             projectsSystemGroup.visible = false;
             
             if (particles) {
                gsap.to(particles.material, { 
                    duration: 1.5, 
                    opacity: 0.8, 
                    ease: 'power3.out', 
                    delay: 1.0 
                });
             }

             const activeNode = nodeObjects.find(n => n.mesh.name.toLowerCase() === targetView || (n.mesh.name.toLowerCase() + 's') === targetView);
             if (activeNode) {
                 if (activeNode.visual) {
                    gsap.to(activeNode.visual.position, { duration: 1.6, x: activeNode.mesh.position.x, y: activeNode.mesh.position.y, z: activeNode.mesh.position.z, ease: 'power3.inOut' });
                 }
             }

             nodeObjects.forEach(n => {
                 if (n.visual) {
                     n.visual.visible = true;
                     let initialScale = 1.0;
                     if (n.mesh.name === 'About') initialScale = 1.0;
                     else if (n.mesh.name === 'Projects') initialScale = 1.0;
                     else if (n.mesh.name === 'Skills') initialScale = 1.0;
                     gsap.to(n.visual.scale, { duration: 1, x: initialScale, y: initialScale, z: initialScale, ease: 'power3.out', delay: 0.5 });
                 }
             });

            gsap.to(controls.target, { duration: 1.6, x: sceneCenter.x, y: sceneCenter.y, z: sceneCenter.z, ease: "power3.inOut" });
            gsap.to(camera.position, { duration: 1.6, x: initialCameraPosition.x, y: initialCameraPosition.y, z: initialCameraPosition.z, ease: "power3.inOut"});
            currentView = 'main';
        }
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (composer) {
            composer.setSize(window.innerWidth, window.innerHeight);
            if (bloomPass && bloomPass.resolution) bloomPass.resolution.set(window.innerWidth, window.innerHeight);
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();
        const isMainView = currentView === 'main';

        if (mixers.length > 0) {
            mixers.forEach(mixer => mixer.update(delta));
        }

        if(particles) particles.rotation.y = elapsedTime * 0.05;

        const shaderTime = elapsedTime * 1000.0;
        skillsPlanets.forEach(p => {
            p.material.uniforms.u_time.value = shaderTime;
            p.mesh.rotation.y += 0.001;
        });

        if (currentView === 'main') {
             nodeObjects.forEach(item => {
                 if (item.visual && item.visual.visible) {
                     if (item.mesh.name === 'About') {
                         item.visual.rotation.y += 0.002;
                         item.visual.rotation.x += 0.001;
                     } else if (item.mesh.name === 'Projects') {
                         item.visual.rotation.y -= 0.0015;
                         item.visual.rotation.z += 0.001;
                     } else { 
                         item.visual.rotation.x += 0.001;
                         item.visual.rotation.z -= 0.002;
                     }
                 }
             });
        }

        if (skillsSystemGroup && skillsSystemGroup.visible) {
            if (activePlanet && activePlanet.moonsGroup) {
                activePlanet.moonsGroup.rotation.y += 0.005;
            } else {
                skillsPlanets.forEach(p => {
                    p.orbitGroup.rotation.y += p.orbitSpeed;
                });
            }
        }

        if (projectsSystemGroup && projectsSystemGroup.visible) {
            projectsSystemGroup.rotation.y += 0.001;
            projectLogos.forEach(p => p.mesh.rotation.y += 0.005);
        }

        if (currentView === 'project' && activeProject && shouldRotateProject) {
            activeProject.mesh.rotation.y += 0.005; 
            const targetPos = new THREE.Vector3();
            activeProject.mesh.getWorldPosition(targetPos);
            camera.position.set(targetPos.x, targetPos.y + 1, targetPos.z + 4); 
            controls.target.copy(targetPos); 
        }

        controls.update();

        if (appReady) {
            const getActiveLabels = () => {
                switch(currentView) {
                    case 'main': return nodeObjects;
                    case 'skills': return skillsPlanets;
                    case 'projects': return projectLogos;
                    case 'planet':
                         const labels = [activePlanet]; 
                         if (activePlanet && activePlanet.moonsGroup) {
                            activePlanet.moonsGroup.children.forEach(moon => {
                                if (moon.userData.parentObj && moon.userData.parentObj.label) {
                                    labels.push(moon.userData.parentObj);
                                }
                            });
                         }
                        return labels;
                    default: return [];
                }
            };
            getActiveLabels().forEach(item => {
                const mesh = isMainView ? item.mesh : (item.mesh || item); 
                const label = item.label;
                 const isHovered = item === hoveredParentObj;
                 const isStaticLabel = (currentView === 'planet' && (item === activePlanet || (item.mesh && item.mesh.parent === activePlanet.moonsGroup)));
                 const shouldBeVisible = isStaticLabel || isHovered;


                 if (!mesh || !mesh.visible || mesh.scale.x === 0 || !label) { 
                    if (label) label.classList.add('hidden'); 
                    return;
                 }

                 if (shouldBeVisible && label.classList.contains('hidden')) {
                     label.classList.remove('hidden');
                 } else if (!shouldBeVisible && !label.classList.contains('hidden')) {
                     label.classList.add('hidden');
                 }

                 if (shouldBeVisible) {
                    const screenPosition = mesh.getWorldPosition(new THREE.Vector3()).project(camera);
                    const x = (screenPosition.x + 1) * window.innerWidth / 2;
                    const y = (-screenPosition.y + 1) * window.innerHeight / 2;
                    label.style.transform = `translate(-50%, 150%) translate(${x}px, ${y}px)`;
                 }
            });

            raycaster.setFromCamera(mouse, camera);

            let objectsToTest = [];
            if (isMainView) {
                objectsToTest = nodeObjects.map(i => i.mesh);
            } else if (currentView === 'skills') {
                objectsToTest = skillsPlanets.map(p => p.mesh);
            } else if (currentView === 'projects') {
                objectsToTest = projectLogos.map(p => p.mesh);
            } else if (currentView === 'planet') {
                objectsToTest = [activePlanet.mesh];
                if (activePlanet.moonsGroup) {
                    activePlanet.moonsGroup.children.forEach(moonGroup => {
                         if (moonGroup.isObject3D && moonGroup.children.length > 0) {
                             moonGroup.traverse((child) => {
                                 if (child.isMesh) {
                                     objectsToTest.push(child);
                                 }
                             });
                         }
                    });
                }
            }

            const intersects = raycaster.intersectObjects(objectsToTest, true);
            let newHoveredParentObj = null; 

            if (intersects.length > 0) {
                let intersectRoot = intersects[0].object;
                 while (intersectRoot.parent && !intersectRoot.userData.parentObj && intersectRoot.parent.type !== 'Scene' && !nodeObjects.some(o => o.mesh === intersectRoot)) {
                    intersectRoot = intersectRoot.parent;
                 }
                newHoveredParentObj = intersectRoot.userData.parentObj || nodeObjects.find(o => o.mesh === intersectRoot);

            }

            if (hoveredParentObj !== newHoveredParentObj) { 
                if (hoveredParentObj) {
                    const visual = isMainView ? hoveredParentObj.visual : hoveredParentObj.mesh; 
                    const originalScale = (visual && visual.userData.originalScale) || new THREE.Vector3(1, 1, 1);
                     if ( visual && 
                         !(currentView === 'skills' && hoveredParentObj.material instanceof THREE.ShaderMaterial) &&
                         !(currentView === 'planet' && hoveredParentObj.mesh.parent === activePlanet.moonsGroup) 
                        ) {
                     }
                    if (visual) setGlow(visual, false); 
                    if (isMainView) restoreNonHovered();


                    if (hoveredParentObj.orbitRing) { 
                        hoveredParentObj.orbitRing.visible = false;
                    }
                }

                hoveredParentObj = newHoveredParentObj; 

                if (hoveredParentObj) {
                    const visual = isMainView ? hoveredParentObj.visual : hoveredParentObj.mesh; 
                    const baseScale = (visual && visual.userData.originalScale) || new THREE.Vector3(1, 1, 1);
                     if ( visual && 
                         !(currentView === 'skills' && hoveredParentObj.material instanceof THREE.ShaderMaterial) &&
                         !(currentView === 'planet' && hoveredParentObj.mesh.parent === activePlanet.moonsGroup) 
                        ) {
                         gsap.to(visual.scale, { duration: 0.3, x: baseScale.x * 1.2, y: baseScale.y * 1.2, z: baseScale.z * 1.2 });
                     }
                    if (visual) setGlow(visual, true); 
                    if (isMainView) dimNonHovered(hoveredParentObj.mesh); 

                    if (hoveredParentObj.orbitRing) { 
                        hoveredParentObj.orbitRing.visible = true;
                    }
                }

                 if (hoveredParentObj && isMainView && hoveredParentObj.visual) {
                     if (bloomPass) gsap.to(bloomPass, { duration: 0.25, strength: HOVER_BLOOM_STRENGTH });
                 } else {
                     if (bloomPass) gsap.to(bloomPass, { duration: 0.25, strength: DEFAULT_BLOOM_STRENGTH });
                 }
            }
        }

        composer.render();
    }

    initialize();

});

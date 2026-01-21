// HeinrichOS Boot Sequence
const bootMessages = [
    { text: "INITIALIZING HEINRICHOS v1.0...", type: "info", delay: 100 },
    { text: "Loading system modules...", type: "success", delay: 300 },
    { text: "Checking coffee levels...", type: "info", delay: 200 },
    { text: "Coffee levels: OPTIMAL ☕", type: "success", delay: 400 },
    { text: "Initializing Three.js renderer...", type: "info", delay: 200 },
    { text: "Three.js renderer ready", type: "success", delay: 300 },
    { text: "Loading ghost trail system...", type: "info", delay: 200 },
    { text: "Ghost trail active 👾", type: "success", delay: 300 },
    { text: "Compiling stylesheets...", type: "info", delay: 200 },
    { text: "Stylesheets compiled", type: "success", delay: 250 },
    { text: "Running diagnostics...", type: "warn", delay: 300 },
    { text: "All systems operational", type: "success", delay: 400 },
    { text: "Welcome to HeinrichOS!", type: "success", delay: 500 }
];

function runBootSequence() {
    const bootMessagesContainer = document.getElementById('boot-messages');
    const progressBar = document.getElementById('boot-progress-bar');
    const loader = document.getElementById('site-loader');
    
    if (!bootMessagesContainer || !progressBar || !loader) return;
    
    let currentMessage = 0;
    let totalProgress = 0;
    const progressIncrement = 100 / bootMessages.length;
    
    function displayNextMessage() {
        if (currentMessage >= bootMessages.length) {
            // Boot complete, fade out loader
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 400);
            }, 500);
            return;
        }
        
        const message = bootMessages[currentMessage];
        const messageEl = document.createElement('div');
        messageEl.className = `boot-message ${message.type}`;
        messageEl.textContent = message.text;
        bootMessagesContainer.appendChild(messageEl);
        
        // Update progress bar
        totalProgress += progressIncrement;
        progressBar.style.width = Math.min(totalProgress, 100) + '%';
        
        // Scroll to bottom of messages
        bootMessagesContainer.scrollTop = bootMessagesContainer.scrollHeight;
        
        currentMessage++;
        setTimeout(displayNextMessage, message.delay);
    }
    
    // Start boot sequence after a short delay
    setTimeout(displayNextMessage, 300);
}

// Run boot sequence on page load
window.addEventListener('load', runBootSequence);

// Creative Three.js Scene Setup
let scene, camera, renderer, mouseX = 0, mouseY = 0;
let codeBlocks = [], neuralNodes = [], floatingShapes = [];
let retroComputer = null, screenTexture = null, screenCanvas = null;
let time = 0;
let scrollProgress = 0; // Track scroll position for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionFactor = prefersReducedMotion ? 0.3 : 1;
const isMobileView = () => window.innerWidth <= 768;

// Roy's tech stack and interests
const techStack = ['Python', 'JavaScript', 'React', 'Flask', 'MySQL', 'AI/ML', 'Three.js', 'Node.js'];
const aiConcepts = ['Neural Networks', 'Machine Learning', 'NLP', 'Deep Learning', 'Computer Vision'];

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-canvas"),
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create the retro computer (desktop only)
  if (!isMobileView()) {
    createRetroComputer();
    // Hide the HTML hero content on desktop to prevent duplication
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.pointerEvents = 'none';
    }
  }
  
  // Create floating code blocks
  createCodeBlocks();
  
  // Create neural network nodes
  createNeuralNetwork();
  
  // Create floating geometric shapes
  createFloatingShapes();
  
  // Add ambient lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0x667eea, 1.2);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);
  
  // Add point light for computer screen glow
  const screenLight = new THREE.PointLight(0x667eea, 1.5, 30);
  screenLight.position.set(0, 0, 5);
  scene.add(screenLight);

  camera.position.z = 50;
  animate();
}

function createCodeBlocks() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 64;

  techStack.forEach((tech, index) => {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 16px SF Pro Display, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tech, canvas.width / 2, canvas.height / 2 + 6);
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8
    });
    
    const geometry = new THREE.PlaneGeometry(30, 8);  // MUCH bigger
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position randomly in 3D space - spread across entire screen, GUARANTEED far back
    mesh.position.set(
      (Math.random() - 0.5) * 300,  // Spread very wide
      (Math.random() - 0.5) * 300,  // Spread very tall
      -60 - Math.random() * 60  // ALWAYS behind computer (-60 to -120)
    );
    
    mesh.userData = {
      originalY: mesh.position.y,
      speed: 0.01 + Math.random() * 0.02,
      amplitude: 5 + Math.random() * 10
    };
    
    mesh.renderOrder = 0; // Render behind everything
    
    codeBlocks.push(mesh);
    scene.add(mesh);
  });
}

function createNeuralNetwork() {
  const nodeCount = 15;
  const connections = [];
  
  // Create nodes - positioned behind the computer
  for (let i = 0; i < nodeCount; i++) {
    const geometry = new THREE.SphereGeometry(3, 16, 16);  // HUGE nodes
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(i / nodeCount, 0.7, 0.6),
      transparent: true,
      opacity: 0.8
    });
    
    const node = new THREE.Mesh(geometry, material);
    node.position.set(
      (Math.random() - 0.5) * 300,  // Spread very wide
      (Math.random() - 0.5) * 300,  // Spread very tall
      -60 - Math.random() * 60  // ALWAYS behind computer (-60 to -120)
    );
    
    node.userData = {
      originalPosition: node.position.clone(),
      speed: 0.005 + Math.random() * 0.01,
      connections: []
    };
    
    node.renderOrder = 0; // Render behind everything
    
    neuralNodes.push(node);
    scene.add(node);
  }
  
  // Create connections between nodes
  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      if (Math.random() < 0.3) { // 30% chance of connection
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array([
          neuralNodes[i].position.x, neuralNodes[i].position.y, neuralNodes[i].position.z,
          neuralNodes[j].position.x, neuralNodes[j].position.y, neuralNodes[j].position.z
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.LineBasicMaterial({
          color: '#667eea',
          transparent: true,
          opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        line.renderOrder = 0; // Render behind everything
        connections.push(line);
        scene.add(line);
        
        neuralNodes[i].userData.connections.push(j);
        neuralNodes[j].userData.connections.push(i);
      }
    }
  }
}

function createFloatingShapes() {
  const shapes = ['box', 'octahedron', 'tetrahedron', 'dodecahedron'];
  
  shapes.forEach((shapeType, index) => {
    let geometry;
    switch (shapeType) {
      case 'box':
        geometry = new THREE.BoxGeometry(10, 10, 10);  // HUGE
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(8);  // HUGE
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(8);  // HUGE
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(8);  // HUGE
        break;
    }
    
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL((index * 0.2) % 1, 0.8, 0.5),
    transparent: true,
    opacity: 0.6,
      wireframe: true
    });
    
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(
      (Math.random() - 0.5) * 300,  // Spread very wide
      (Math.random() - 0.5) * 300,  // Spread very tall
      -60 - Math.random() * 60  // ALWAYS behind computer (-60 to -120)
    );
    
    shape.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      originalPosition: shape.position.clone(),
      floatSpeed: 0.01 + Math.random() * 0.02,
      floatAmplitude: 3 + Math.random() * 5
    };
    
    shape.renderOrder = 0; // Render behind everything
    
    floatingShapes.push(shape);
    scene.add(shape);
  });
}

function createRetroComputer() {
  // Create computer group
  retroComputer = new THREE.Group();
  
  // Create screen canvas for hero content
  screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1024;
  screenCanvas.height = 550;
  
  // Create screen - Sized to fit in monitor
  const screenGeometry = new THREE.PlaneGeometry(46, 36);
  screenTexture = new THREE.CanvasTexture(screenCanvas);
  const screenMaterial = new THREE.MeshBasicMaterial({
    map: screenTexture,
    transparent: false,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide,
    alphaTest: 0
    // No emissive to prevent blue glow
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 8, 3.1); // Positioned in front of monitor
  screen.name = 'screen';
  screen.renderOrder = 9999; // HIGHEST render order - ALWAYS on top
  screen.material.needsUpdate = true;
  screen.frustumCulled = false; // Never cull - always render
  
  // LOCK the material properties - make them read-only
  Object.defineProperty(screen.material, 'transparent', {
    value: false,
    writable: false
  });
  Object.defineProperty(screen.material, 'opacity', {
    value: 1,
    writable: false
  });
  
  retroComputer.add(screen);
  
  // Add screen bezel/border for better visibility in light mode
  const bezelGeometry = new THREE.PlaneGeometry(48, 38);
  const bezelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    shininess: 50,
    transparent: false,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide
  });
  const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
  bezel.position.set(0, 8, 3.05); // Slightly behind screen
  bezel.name = 'bezel';
  bezel.renderOrder = 9998; // Render before screen but after everything else
  bezel.material.needsUpdate = true;
  bezel.frustumCulled = false; // Never cull - always render
  
  // LOCK the material properties - make them read-only
  Object.defineProperty(bezel.material, 'transparent', {
    value: false,
    writable: false
  });
  Object.defineProperty(bezel.material, 'opacity', {
    value: 1,
    writable: false
  });
  
  retroComputer.add(bezel);
  
  // No glow effect to prevent any blue tint
  
  // Create monitor body - ALWAYS VISIBLE
  const monitorGeometry = new THREE.BoxGeometry(50, 40, 6);
  const monitorMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a2a2a,
    shininess: 30
  });
  const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
  monitor.position.set(0, 8, -3);
  monitor.name = 'monitor';
  monitor.renderOrder = 500; // In front of background
  retroComputer.add(monitor);
  
  // Create keyboard base - ALWAYS VISIBLE (positioned below monitor)
  const keyboardGeometry = new THREE.BoxGeometry(45, 2, 18);
  const keyboardMaterial = new THREE.MeshPhongMaterial({
    color: 0x3a3a3a,
    shininess: 20
  });
  const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
  keyboard.position.set(0, -14, 7);
  keyboard.rotation.x = -0.1;
  keyboard.name = 'keyboard';
  keyboard.renderOrder = 500; // In front of background
  retroComputer.add(keyboard);
  
  // Add keyboard keys - 2 DISTINCT SETS with clear separation
  const keyboardKeys = new THREE.Group();
  keyboardKeys.name = 'keys';
  
  // Top set of keys (3 rows) - Function keys area
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 15; j++) {
      const keyGeometry = new THREE.BoxGeometry(2, 0.8, 2);
      const keyMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        shininess: 50
      });
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set(
        -17 + j * 2.5,           // X: spread across width
        -13,                      // Y: same level
        13 - i * 2.2             // Z: top section with spacing
      );
      key.rotation.x = -0.1;
      key.renderOrder = 500; // In front of background
      keyboardKeys.add(key);
    }
  }
  
  // Bottom set of keys (3 rows) - Main keys area
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 15; j++) {
      const keyGeometry = new THREE.BoxGeometry(2, 0.8, 2);
      const keyMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a2a2a,  // Slightly lighter color for contrast
        shininess: 50
      });
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set(
        -17 + j * 2.5,           // X: spread across width
        -13,                      // Y: same level
        5 - i * 2.2              // Z: bottom section with gap
      );
      key.rotation.x = -0.1;
      key.renderOrder = 500; // In front of background
      keyboardKeys.add(key);
    }
  }
  
  retroComputer.add(keyboardKeys);
  
  // Add base stand - ALWAYS VISIBLE
  const standGeometry = new THREE.CylinderGeometry(4, 5, 4, 32);
  const standMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a2a2a,
    shininess: 30
  });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  stand.position.set(0, -13, 0);
  stand.name = 'stand';
  stand.renderOrder = 500; // In front of background
  retroComputer.add(stand);
  
  // Position the computer in the scene - Lower in viewport
  retroComputer.position.set(0, -2, -15);
  retroComputer.scale.set(1.3, 1.3, 1.3);
  scene.add(retroComputer);
  
  // Start rendering hero content to screen
  updateScreenContent();
  setInterval(updateScreenContent, 100); // Update screen 10 times per second
  
  // Update colors based on initial theme
  updateComputerColors();
}

// Update computer colors based on theme
function updateComputerColors() {
  if (!retroComputer) return;
  
  const isDark = !document.body.classList.contains('theme-light');
  
  retroComputer.children.forEach(child => {
    if (child.name === 'bezel') {
      child.material.color.setHex(isDark ? 0xffffff : 0x1a1a1a);
    } else if (child.name === 'keyboard') {
      child.material.color.setHex(isDark ? 0xffffff : 0x3a3a3a);
    } else if (child.name === 'keys') {
      // Update all individual keys
      child.children.forEach((key, index) => {
        // First 45 keys are top set (darker), last 45 are bottom set (lighter)
        if (isDark) {
          key.material.color.setHex(0x3E3E42);  // Dark gray keycaps in dark mode
        } else {
          key.material.color.setHex(index < 45 ? 0x1a1a1a : 0x2a2a2a);  // Original colors
        }
      });
    }
  });
}

// Scroll-based animation for the computer
function updateComputerScroll() {
  if (!retroComputer) return;
  
  // Calculate scroll progress (0 at top, 1 at hero section end)
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const heroHeight = heroSection.offsetHeight;
  const scrollY = window.scrollY || window.pageYOffset;
  
  // Progress from 0 (top) to 1 (end of hero section) to 2+ (further down)
  scrollProgress = scrollY / (heroHeight * 0.8);
  
  // Simple scroll animation - entire computer moves and scales together
  // Phase 1: 0-0.7 = Computer moves back and shrinks
  // Phase 2: 0.7+ = Computer fades out
  
  if (scrollProgress < 0.7) {
    // Computer moves back and shrinks smoothly
    const progress = scrollProgress / 0.7; // 0 to 1
    const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    
    // Move from close (-15) to far (20)
    retroComputer.position.z = -15 + (easeOut * 35);
    retroComputer.position.y = -2; // Positioned lower in viewport
    
    // Scale from large (1.3) to small (0.5)
    const scale = 1.3 - (easeOut * 0.8);
    retroComputer.scale.set(scale, scale, scale);
    
    // Add slight rotation as it moves away
    retroComputer.rotation.y = easeOut * 0.15;
    retroComputer.rotation.x = easeOut * 0.08;
    
  } else {
    // Computer fades out when very far
    const fadeProgress = Math.min((scrollProgress - 0.7) / 0.3, 1); // 0 to 1
    
    retroComputer.position.z = 20 + (fadeProgress * 30); // 20 to 50
    retroComputer.position.y = -2; // Positioned lower in viewport
    const scale = 0.5 - (fadeProgress * 0.5); // 0.5 to 0
    retroComputer.scale.set(Math.max(scale, 0.01), Math.max(scale, 0.01), Math.max(scale, 0.01));
    
    // Fade computer parts, but screen and bezel stay fully opaque
    const opacity = 1 - fadeProgress;
    retroComputer.children.forEach(child => {
      // Screen and bezel never fade - always fully visible
      if (child.name === 'screen' || child.name === 'bezel') {
        // Do nothing - never touch screen or bezel opacity
        return;
      }
      
      // Fade other parts
      if (child.material) {
        child.material.transparent = true;
        child.material.opacity = opacity;
      }
    });
  }
}

// Add scroll listener
window.addEventListener('scroll', () => {
  if (!isMobileView()) {
    updateComputerScroll();
  }
}, { passive: true });

function updateScreenContent() {
  if (!screenCanvas) return;
  
  const ctx = screenCanvas.getContext('2d');
  const isDark = !document.body.classList.contains('theme-light');
  
  // Clear canvas
  ctx.fillStyle = isDark ? '#3E3E42' : '#ffffff';
  ctx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
  
  // Add scanline effect
  for (let i = 0; i < screenCanvas.height; i += 4) {
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, i, screenCanvas.width, 2);
  }
  
  // Draw title with typewriter effect - less top padding
  const titleText = document.getElementById('typewriter-text');
  if (titleText) {
    ctx.fillStyle = isDark ? '#ffffff' : '#0a0a0a';
    ctx.font = 'bold 48px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    
    // Draw without glow to prevent blue tint
    ctx.fillText(titleText.textContent, screenCanvas.width / 2, 140);
    
    // Draw blinking cursor - always show it with blink animation
    const blinkSpeed = 530; // Blink every 530ms
    const showCursor = Math.floor(Date.now() / blinkSpeed) % 2 === 0;
    
    if (showCursor) {
      ctx.fillStyle = '#667eea';
      const titleWidth = ctx.measureText(titleText.textContent).width;
      // Position cursor right after text, aligned with text baseline
      const cursorX = screenCanvas.width / 2 + titleWidth / 2 + 10;
      const cursorY = 140 - 40; // Align with text (text is at Y=140, cursor height is 48)
      ctx.fillRect(cursorX, cursorY, 8, 48);
    }
  }
  
  // Draw subtitle - closer to title with proper margins
  ctx.font = '28px "Press Start 2P", monospace';
  ctx.fillStyle = isDark ? '#a78bfa' : '#764ba2';
  ctx.fillText('Novice Developer & AI Enthusiast', screenCanvas.width / 2, 240);
  
  // Draw description - tighter spacing
  ctx.font = '28px sans-serif';
  ctx.fillStyle = isDark ? '#e5e5e5' : '#555';
  const desc = 'Fourth-year Information Technology student at Aklan State University,';
  const desc2 = 'passionate about building intelligent systems';
  const desc3 = 'and crafting exceptional user experiences.';
  ctx.fillText(desc, screenCanvas.width / 2, 320);
  ctx.fillText(desc2, screenCanvas.width / 2, 365);
  ctx.fillText(desc3, screenCanvas.width / 2, 410);
  
  // Draw tech stack scrolling - at bottom with minimal padding
  ctx.font = '24px "Press Start 2P", monospace';
  ctx.fillStyle = isDark ? '#818cf8' : '#667eea';
  const stackText = techStack.join('  •  ');
  const textWidth = ctx.measureText(stackText).width;
  const scrollOffset = (Date.now() / 50) % (textWidth + 200); // Add padding between loops
  ctx.fillText(stackText, screenCanvas.width - scrollOffset, 480);
  ctx.fillText(stackText, screenCanvas.width - scrollOffset + textWidth + 200, 480);
  
  // Update texture
  if (screenTexture) {
    screenTexture.needsUpdate = true;
  }
}

function animate() {
  requestAnimationFrame(animate);
  time += 0.01 * motionFactor;
  
  // Animate code blocks
  codeBlocks.forEach((block, index) => {
    block.position.y = block.userData.originalY + Math.sin(time * block.userData.speed + index) * (block.userData.amplitude * motionFactor);
    block.rotation.y += 0.005 * motionFactor;
    
    // Mouse interaction
    const mouseInfluence = 0.0001 * motionFactor;
    block.position.x += (mouseX * mouseInfluence - block.position.x) * 0.01;
    block.position.z += (mouseY * mouseInfluence - block.position.z) * 0.01;
    
    // CLAMP Z to always stay behind computer
    block.position.z = Math.min(block.position.z, -20);
  });
  
  // Animate neural network nodes
  neuralNodes.forEach((node, index) => {
    node.position.x = node.userData.originalPosition.x + Math.sin(time * node.userData.speed + index) * (3 * motionFactor);
    node.position.z = node.userData.originalPosition.z + Math.cos(time * node.userData.speed + index) * (3 * motionFactor);
    
    // Pulsing effect
    const scale = 1 + Math.sin(time * 2 + index) * (0.2 * motionFactor);
    node.scale.setScalar(scale);
    
    // Mouse interaction
    const mouseInfluence = 0.0002 * motionFactor;
    node.position.x += (mouseX * mouseInfluence - node.position.x) * 0.005;
    node.position.z += (mouseY * mouseInfluence - node.position.z) * 0.005;
    
    // CLAMP Z to always stay behind computer
    node.position.z = Math.min(node.position.z, -20);
  });
  
  // Animate floating shapes
  floatingShapes.forEach((shape, index) => {
    shape.rotation.x += shape.userData.rotationSpeed.x * motionFactor;
    shape.rotation.y += shape.userData.rotationSpeed.y * motionFactor;
    shape.rotation.z += shape.userData.rotationSpeed.z * motionFactor;
    
    // Floating motion
    shape.position.y = shape.userData.originalPosition.y + Math.sin(time * shape.userData.floatSpeed + index) * (shape.userData.floatAmplitude * motionFactor);
    
    // Mouse interaction
    const mouseInfluence = 0.0003 * motionFactor;
    shape.position.x += (mouseX * mouseInfluence - shape.position.x) * 0.008;
    shape.position.z += (mouseY * mouseInfluence - shape.position.z) * 0.008;
    
    // CLAMP Z to always stay behind computer
    shape.position.z = Math.min(shape.position.z, -20);
  });
  
  // Animate retro computer with mouse interaction
  if (retroComputer && scrollProgress < 1.0) {
    // Only apply mouse rotation when computer is visible (not too far away)
    const mouseInfluenceStrength = Math.max(0, 1 - scrollProgress);
    
    // Subtle mouse-based rotation
    const targetRotationY = (mouseX / window.innerWidth - 0.5) * 0.1 * mouseInfluenceStrength;
    const targetRotationX = -(mouseY / window.innerHeight - 0.5) * 0.05 * mouseInfluenceStrength;
    
    retroComputer.rotation.y += (targetRotationY - retroComputer.rotation.y) * 0.03;
    retroComputer.rotation.x += (targetRotationX - retroComputer.rotation.x) * 0.03;
    
    // Gentle floating animation
    const floatAmount = (1 - scrollProgress) * 0.5 * motionFactor;
    retroComputer.position.y = Math.sin(time * 0.5) * floatAmount;
  }
  
  // Camera movement
  camera.position.x = Math.sin(time * 0.1) * (5 * motionFactor);
  camera.position.y = Math.cos(time * 0.1) * (5 * motionFactor);
  camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;
});

// Add click interaction for code blocks
document.addEventListener("click", (event) => {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  
  // Check intersections with code blocks
  const intersects = raycaster.intersectObjects(codeBlocks);
  if (intersects.length > 0) {
    const clickedBlock = intersects[0].object;
    // Create explosion effect
    createExplosionEffect(clickedBlock.position);
    // Temporarily hide the clicked block
    clickedBlock.visible = false;
    setTimeout(() => {
      clickedBlock.visible = true;
    }, 2000);
  }
});

function createExplosionEffect(position) {
  const particleCount = 50;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = position.x;
    positions[i3 + 1] = position.y;
    positions[i3 + 2] = position.z;
    
    colors[i3] = Math.random();
    colors[i3 + 1] = Math.random();
    colors[i3 + 2] = Math.random();
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 1
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  // Animate explosion
  let explosionTime = 0;
  const explosionSpeed = 0.1;
  
  function animateExplosion() {
    explosionTime += explosionSpeed;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] += (Math.random() - 0.5) * 2;
      positions[i3 + 1] += (Math.random() - 0.5) * 2;
      positions[i3 + 2] += (Math.random() - 0.5) * 2;
    }
    
    geometry.attributes.position.needsUpdate = true;
    material.opacity = 1 - explosionTime;
    
    if (explosionTime < 1) {
      requestAnimationFrame(animateExplosion);
    } else {
      scene.remove(particles);
    }
  }
  
  animateExplosion();
}

// Theme toggle
const THEME_STORAGE_KEY = 'site-theme';
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const rootEl = document.documentElement;

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  if (theme === 'light') {
    rootEl.classList.add('theme-light');
    if (themeToggle) themeToggle.checked = true;
  } else {
    rootEl.classList.remove('theme-light');
    if (themeToggle) themeToggle.checked = false;
  }
}

applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggle && themeToggle.addEventListener('change', () => {
  const isLight = themeToggle.checked;
  if (isLight) {
    rootEl.classList.add('theme-light');
  } else {
    rootEl.classList.remove('theme-light');
  }
  localStorage.setItem(THEME_STORAGE_KEY, isLight ? 'light' : 'dark');
  
  // Update 3D computer colors
  updateComputerColors();
  
  // Close mobile menu if open
  if (window.innerWidth <= 768) {
    const navLinksEl = document.getElementById('nav-links');
    const hamburgerEl = document.getElementById('hamburger');
    if (navLinksEl && navLinksEl.classList.contains('active')) {
      navLinksEl.classList.remove('active');
      hamburgerEl && hamburgerEl.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Handle responsive computer visibility
  const heroContent = document.querySelector('.hero-content');
  if (isMobileView()) {
    // Mobile: remove computer, show regular hero content
    if (retroComputer) {
      scene.remove(retroComputer);
      retroComputer = null;
    }
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.pointerEvents = 'auto';
    }
  } else {
    // Desktop: create computer if it doesn't exist, hide hero content
    if (!retroComputer && scene) {
      createRetroComputer();
    }
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.pointerEvents = 'none';
    }
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
      
      // Smooth scroll to target
      target.scrollIntoView({ 
        behavior: "smooth", 
        block: "start",
        inline: "nearest"
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  
  // Navbar scrolled state
  if (currentScrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollIndicator.style.width = scrollPercent + "%";

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    if (currentScrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  // Scrollspy
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('#nav-links a');
  let currentSectionId = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentSectionId = section.id;
    }
  });
  if (currentSectionId) {
    navLinks.forEach(link => {
      const target = link.getAttribute('href').replace('#','');
      link.classList.toggle('active', target === currentSectionId);
    });
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});

// Typewriter effect for the title
function initTypewriterEffect() {
  const typewriterText = document.getElementById('typewriter-text');
  const typewriterCursor = document.getElementById('typewriter-cursor');
  
  if (!typewriterText || !typewriterCursor) return;
  
  const text1 = "Roy Heinrich Delgado";
  const text2 = "heinz.is-a.dev";
  
  // Start the typewriter effect after a delay
  setTimeout(() => {
    typewriterLoop(typewriterText, typewriterCursor, text1, text2);
  }, 2000); // 2 second delay before starting
}

function typewriterLoop(textElement, cursorElement, text1, text2) {
  let currentText = text1;
  let isDeleting = true;
  let textIndex = text1.length;
  let currentTarget = text1;
  let nextTarget = text2;
  
  function type() {
    if (isDeleting) {
      // Delete characters one by one
      if (textIndex > 0) {
        currentText = currentTarget.substring(0, textIndex - 1);
        textIndex--;
      } else {
        // Start typing the new text
        isDeleting = false;
        textIndex = 0;
        currentText = "";
        // Switch targets for next cycle
        const temp = currentTarget;
        currentTarget = nextTarget;
        nextTarget = temp;
      }
    } else {
      // Type new characters one by one
      if (textIndex < currentTarget.length) {
        currentText = currentTarget.substring(0, textIndex + 1);
        textIndex++;
      } else {
        // Text complete, wait a bit then start deleting
        setTimeout(() => {
          isDeleting = true;
          textIndex = currentText.length;
          type();
        }, 2000); // 2 second pause before starting to delete
        return;
      }
    }
    
    textElement.textContent = currentText;
    
    // Variable typing speed
    const baseSpeed = isDeleting ? 100 : 150;
    const randomDelay = Math.random() * 100;
    setTimeout(type, baseSpeed + randomDelay);
  }
  
  type();
}

initThree();

// Set initial hero content visibility based on screen size
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  if (isMobileView()) {
    heroContent.style.opacity = '1';
    heroContent.style.pointerEvents = 'auto';
  } else {
    heroContent.style.opacity = '0';
    heroContent.style.pointerEvents = 'none';
  }
}

// Initialize computer position based on current scroll
setTimeout(() => {
  if (!isMobileView()) {
    updateComputerScroll();
  }
}, 100);

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  initTypewriterEffect();
});

// Simplified navbar functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navOverflowContainer = document.getElementById('nav-overflow-container');
const navOverflow = document.getElementById('nav-overflow');

// Handle navbar overflow - move items to second row instead of clipping
function handleNavbarOverflow() {
  // Only handle overflow on desktop (not mobile hamburger menu)
  if (window.innerWidth <= 770) {
    // On mobile, restore all items to main nav and hide overflow
    const overflowItems = Array.from(navOverflow.children);
    overflowItems.forEach(item => {
      navLinks.appendChild(item);
    });
    navOverflowContainer.classList.remove('has-overflow');
    return;
  }

  // Get the nav container width
  const navContainer = document.querySelector('.nav-container');
  const navBrand = document.querySelector('.nav-brand');
  const navControls = document.querySelector('.nav-controls');
  
  if (!navContainer || !navBrand || !navControls) return;
  
  const containerWidth = navContainer.offsetWidth;
  const brandWidth = navBrand.offsetWidth;
  const controlsWidth = navControls.offsetWidth;
  const availableWidth = containerWidth - brandWidth - controlsWidth - 80; // 80px buffer
  
  // Get all nav items (excluding those in overflow)
  const navItems = Array.from(navLinks.children);
  
  // First, move all items back to main nav
  const overflowItems = Array.from(navOverflow.children);
  overflowItems.forEach(item => {
    navLinks.appendChild(item);
  });
  
  // Calculate widths and determine which items overflow
  let totalWidth = 0;
  const itemsToMove = [];
  
  Array.from(navLinks.children).forEach((item, index) => {
    const itemWidth = item.offsetWidth;
    totalWidth += itemWidth;
    
    if (totalWidth > availableWidth) {
      itemsToMove.push(item);
    }
  });
  
  // Move overflowing items to overflow container
  if (itemsToMove.length > 0) {
    itemsToMove.forEach(item => {
      navOverflow.appendChild(item);
    });
    navOverflowContainer.classList.add('has-overflow');
  } else {
    navOverflowContainer.classList.remove('has-overflow');
  }
}

// Run on load and resize
window.addEventListener('load', handleNavbarOverflow);
window.addEventListener('resize', handleNavbarOverflow);

// Also run after a short delay to ensure layout is settled
setTimeout(handleNavbarOverflow, 100);

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  const isActive = navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
  
  // Prevent body scroll when menu is open
  if (isActive) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Removed confusing dismiss functionality - simplified navbar

// Back to top
const backToTopBtn = document.getElementById('back-to-top');
backToTopBtn && backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lightbox for project cards
const projectCards = document.querySelectorAll('.project-card');
const lightbox = document.getElementById('lightbox');
const lightboxTitle = lightbox ? lightbox.querySelector('.lightbox-title') : null;
const lightboxDesc = lightbox ? lightbox.querySelector('.lightbox-desc') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
let lastFocusedEl = null;

function openLightbox(title, desc) {
  if (!lightbox) return;
  lightboxTitle.textContent = title || '';
  lightboxDesc.textContent = desc || '';
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
  lastFocusedEl = document.activeElement;
  lightboxClose.focus();
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  lastFocusedEl && lastFocusedEl.focus();
}
projectCards.forEach(card => {
  const title = card.querySelector('.project-title').textContent.trim();
  const desc = card.querySelector('.project-description').textContent.trim();
  card.addEventListener('click', () => openLightbox(title, desc));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(title, desc);
    }
  });
});
lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
lightbox && lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// Project filters and search
const filterButtons = document.querySelectorAll('.filter-btn');
const projectSearch = document.getElementById('project-search');
function applyFilters() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  const term = (projectSearch?.value || '').toLowerCase();
  document.querySelectorAll('.project-card').forEach(card => {
    const cat = card.getAttribute('data-category');
    const text = card.textContent.toLowerCase();
    const catMatch = category === 'all' || cat === category;
    const textMatch = term === '' || text.includes(term);
    card.style.display = (catMatch && textMatch) ? '' : 'none';
  });
}
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});
projectSearch && projectSearch.addEventListener('input', applyFilters);

// Carousel
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : [];
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let slideIndex = 0;
function updateCarousel() {
  if (!track) return;
  const offset = -slideIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}
function goTo(delta) {
  if (!slides.length) return;
  slideIndex = (slideIndex + delta + slides.length) % slides.length;
  updateCarousel();
}
prevBtn && prevBtn.addEventListener('click', () => goTo(-1));
nextBtn && nextBtn.addEventListener('click', () => goTo(1));
let autoPlayId = null;
function startAuto() { if (prefersReducedMotion) return; autoPlayId = setInterval(() => goTo(1), 5000); }
function stopAuto() { if (autoPlayId) clearInterval(autoPlayId); }
const carousel = document.querySelector('.carousel');
carousel && carousel.addEventListener('mouseenter', stopAuto);
carousel && carousel.addEventListener('mouseleave', startAuto);
startAuto();

// Contact form validation and Formspree submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm && contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  
  // Honeypot check
  if (formData.get('_gotcha')) {
    formStatus.textContent = 'Submission blocked.';
    formStatus.style.color = 'var(--muted)';
    return;
  }
  
  // Client-side validation
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  
  if (!name || !email || !message) {
    formStatus.textContent = 'Please complete all fields.';
    formStatus.style.color = '#ef4444';
    return;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.style.color = '#ef4444';
    return;
  }
  
  // Show sending status
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formStatus.textContent = 'Sending your message...';
  formStatus.style.color = 'var(--brand-1)';
  
  try {
    // Submit to Formspree
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      formStatus.style.color = '#10b981';
      contactForm.reset();
    } else {
      const data = await response.json();
      if (data.errors) {
        formStatus.textContent = data.errors.map(error => error.message).join(', ');
      } else {
        formStatus.textContent = 'Oops! There was a problem sending your message.';
      }
      formStatus.style.color = '#ef4444';
    }
  } catch (error) {
    formStatus.textContent = 'Oops! There was a problem sending your message.';
    formStatus.style.color = '#ef4444';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    
    // Clear status message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);
  }
});

// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    let sel = btn.getAttribute('data-copy');
    let el = null;
    // Only use # for id selectors, otherwise treat as class or element
    if (sel && sel.startsWith('#')) {
      if (sel.length > 1) {
        el = document.getElementById(sel.slice(1));
      } // else: skip, invalid selector '#'
    } else if (sel && sel !== '#') {
      try {
        el = document.querySelector(sel);
      } catch (e) {
        el = null;
      }
    }
    if (!el) return;
    const text = el?.tagName === 'A' ? (el.getAttribute('href') || el.textContent) : el?.textContent;
    if (!text) return;
    try { await navigator.clipboard.writeText(text.replace('mailto:','')); btn.textContent = 'Copied'; setTimeout(()=> btn.textContent = 'Copy', 1500); }
    catch { btn.textContent = 'Error'; setTimeout(()=> btn.textContent = 'Copy', 1500); }
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Only trigger shortcuts when NOT typing in input/textarea
  const isTyping = document.activeElement.tagName === 'INPUT' || 
                   document.activeElement.tagName === 'TEXTAREA' ||
                   document.activeElement.isContentEditable;
  
  // "/" - Focus project search (works even when typing)
  if (e.key === '/') {
    const input = document.getElementById('project-search');
    if (input && document.activeElement !== input) { e.preventDefault(); input.focus(); }
  }
  
  // "T" - Toggle theme (only when NOT typing)
  if (e.key.toLowerCase() === 't' && !isTyping) {
    themeToggle?.click();
  }
});

// Analytics hooks (console only, privacy-friendly)
document.querySelectorAll('[data-analytics]').forEach(el => {
  el.addEventListener('click', () => {
    const type = el.getAttribute('data-analytics');
    console.log('analytics:event', { type, ts: Date.now() });
  });
});

// Scroll Guide - Show/Hide based on scroll position
const scrollGuide = document.getElementById('scroll-guide');
let lastScrollTop = 0;

function updateScrollGuide() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Hide when scrolled more than 100px
  if (scrollTop > 100) {
    scrollGuide.classList.add('hidden');
  } else {
    scrollGuide.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop;
}

// Update on scroll
window.addEventListener('scroll', updateScrollGuide, { passive: true });

// Initial check
updateScrollGuide();

// Terminal Command Handler
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
let commandHistory = [];
let historyIndex = -1;

const ghostAscii = `
    .-""""-.
   /        \\
  /_        _\\
 // \\      / \\\\
 |\\__\\    /__/|
  \\    ||    /
   \\        /
    \\  __  /
     '.__.'
      .  .
     ( || )
      '  '
`;

const commands = {
  help: () => {
    return `
<span class="terminal-success">Available Commands:</span>

  <span class="terminal-highlight">help</span>        - Show this help message
  <span class="terminal-highlight">hello</span>       - Get a friendly greeting
  <span class="terminal-highlight">hire</span>        - See hiring/contact info with ASCII art
  <span class="terminal-highlight">email</span>       - Display email address
  <span class="terminal-highlight">linkedin</span>    - Display LinkedIn profile
  <span class="terminal-highlight">github</span>      - Display GitHub profile
  <span class="terminal-highlight">about</span>       - Learn more about me
  <span class="terminal-highlight">projects</span>    - List my projects
  <span class="terminal-highlight">skills</span>      - Show my tech stack
  <span class="terminal-highlight">clear</span>       - Clear the terminal
  <span class="terminal-highlight">contact</span>     - Send me a message
  <span class="terminal-highlight">whoami</span>      - Who are you talking to?
  <span class="terminal-highlight">ghost</span>       - Meet the HeinrichOS mascot
  <span class="terminal-highlight">coffee</span>      - Check coffee levels
  <span class="terminal-highlight">matrix</span>      - Enter the matrix...
`;
  },
  
  hello: () => {
    const greetings = [
      "Hey! 👋 You found the terminal. Type 'help' to see what you can do.",
      "Hello! Welcome to HeinrichOS. It's like a real OS but with less crashing.",
      "Hi! Type 'help' for commands, or just explore. I won't judge.",
      "Yo! You're curious. I like that. Try 'ghost' or 'coffee' for fun.",
      "Greetings! This terminal actually works, unlike my sleep schedule."
    ];
    return `<span class="terminal-success">${greetings[Math.floor(Math.random() * greetings.length)]}</span>`;
  },
  
  hire: () => {
    return `
<span class="terminal-success">╔══════════════════════════════════════════════════╗</span>
<span class="terminal-success">║            WANT TO WORK TOGETHER?               ║</span>
<span class="terminal-success">╚══════════════════════════════════════════════════╝</span>
${ghostAscii}
<span class="terminal-highlight">What I can do:</span>
  • Full-stack dev (Flask, React, Node.js)
  • AI/ML stuff (NLP, chatbots, making computers smarter)
  • Web apps that actually work
  • Figuring out why your code broke at 3 AM

<span class="terminal-highlight">How to reach me:</span>
  📧 <a href="mailto:royheinrich.delgado0@gmail.com" class="terminal-link">royheinrich.delgado0@gmail.com</a>
  💼 <a href="https://www.linkedin.com/in/roy-heinrich-delgado-b621ba222/" target="_blank" class="terminal-link">LinkedIn</a>
  🐙 <a href="https://github.com/roy-heinrich" target="_blank" class="terminal-link">@roy-heinrich</a>

I respond to emails. Promise.
`;
  },
  
  email: () => {
    navigator.clipboard.writeText('royheinrich.delgado0@gmail.com');
    return `<span class="terminal-success">📧 royheinrich.delgado0@gmail.com</span>\n(Copied to clipboard!)`;
  },
  
  linkedin: () => {
    return `<span class="terminal-success">💼 LinkedIn:</span> <a href="https://www.linkedin.com/in/roy-heinrich-delgado-b621ba222/" target="_blank" class="terminal-link">Roy Heinrich Delgado</a>`;
  },
  
  github: () => {
    return `<span class="terminal-success">🐙 GitHub:</span> <a href="https://github.com/roy-heinrich" target="_blank" class="terminal-link">@roy-heinrich</a>`;
  },
  
  about: () => {
    return `
<span class="terminal-highlight">About Me:</span>

Fourth-year IT student at Aklan State University. I learned more from
Stack Overflow at 2 AM than from any textbook.

I build stuff that actually works: multilingual chatbots, Linux compatibility
checkers, and this entire website (no templates, just me and VS Code).

Fun facts:
• I care whether your app loads in 2 seconds or 3
• I read documentation for fun (yes, really)
• Coffee is my primary fuel source
• I write code that doesn't make future-me cry

Type <span class="terminal-highlight">skills</span> for tech stack or <span class="terminal-highlight">projects</span> to see what I've built!
`;
  },
  
  projects: () => {
    return `
<span class="terminal-highlight">Projects I've Built:</span>

1. <span class="terminal-success">TomasChatBot</span>
   Built a chatbot that speaks 3 languages (Tagalog, English, Hiligaynon).
   It remembers context and doesn't leak your data.
   Tech: Python, FastText, ChromaDB, Ollama, FastAPI
   Translation: I threw the entire NLP kitchen sink at it until it worked.
   
2. <span class="terminal-success">Linux Leap Advisor</span>
   Ever wonder if your Windows apps will run on Linux?
   This checks compatibility so you don't have to guess.
   Tech: JavaScript, ProtonDB/WineHQ APIs, UX Design

See more: <span class="terminal-link">github.com/roy-heinrich</span>
`;
  },
  
  skills: () => {
    return `
<span class="terminal-highlight">Tech Stack:</span>

<span class="terminal-success">Languages:</span>  Python, JavaScript, SQL
<span class="terminal-success">Frontend:</span>   HTML, CSS, React, Three.js
<span class="terminal-success">Backend:</span>    Flask, Node.js, FastAPI
<span class="terminal-success">AI/ML:</span>      FastText, Ollama, ChromaDB, NLP
<span class="terminal-success">Database:</span>   MySQL, SQLite
<span class="terminal-success">Tools:</span>      Git, Docker, Linux
<span class="terminal-success">Cloud:</span>      Render, InfinityFree

Currently learning: More AI/ML, advanced React patterns
`;
  },
  
  clear: () => {
    terminalOutput.innerHTML = `
      <div class="terminal-line">
        <span class="terminal-prompt">root@heinrichos:~$</span> clear
      </div>
      <div class="terminal-line">Terminal cleared. Type <span class="terminal-highlight">help</span> for commands.</div>
      <div class="terminal-line terminal-blank"></div>
    `;
    return null;
  },
  
  contact: () => {
    return `
<span class="terminal-success">Let's Talk:</span>

Got a project? Want to collaborate? Just want to argue about tabs vs spaces?
(It's spaces, by the way.)

Hit me up:
  📧 Email: <a href="mailto:royheinrich.delgado0@gmail.com" class="terminal-link">royheinrich.delgado0@gmail.com</a>
  💼 LinkedIn: <a href="https://www.linkedin.com/in/roy-heinrich-delgado-b621ba222/" target="_blank" class="terminal-link">Roy Heinrich Delgado</a>
  🐙 GitHub: <a href="https://github.com/roy-heinrich" target="_blank" class="terminal-link">@roy-heinrich</a>

I actually respond to emails, unlike normal people.
`;
  },
  
  whoami: () => {
    return `<span class="terminal-success">root</span> (Roy Heinrich Delgado)\n\nFourth-year IT student. I turn coffee into code.\nCurrently debugging life, one commit at a time.`;
  },
  
  ghost: () => {
    return `<span class="terminal-success">Meet the HeinrichOS Ghost!</span>${ghostAscii}\n<span class="terminal-highlight">"I follow your cursor around because Roy thought it would be cool.\nSpoiler: It is cool. 👾"</span>`;
  },
  
  coffee: () => {
    const level = Math.floor(Math.random() * 100);
    const bar = '█'.repeat(Math.floor(level / 10)) + '░'.repeat(10 - Math.floor(level / 10));
    return `
<span class="terminal-highlight">Coffee Level Check:</span>

☕ [${bar}] ${level}%

${level > 70 ? '<span class="terminal-success">Fully caffeinated and ready to code!</span>' : 
  level > 30 ? '<span class="terminal-highlight">Running low... might need a refill soon.</span>' :
  '<span class="terminal-error">CRITICAL: Emergency coffee break needed!</span>'}
`;
  },
  
  matrix: () => {
    return `
<span class="terminal-success" style="animation: matrixRain 2s linear;">Wake up, Neo...</span>
<span class="terminal-highlight">The Matrix has you...</span>

Just kidding! But seriously, check out the 3D background animation.
It's powered by Three.js—basically my version of the Matrix.

Type <span class="terminal-highlight">help</span> to return to reality.
`;
  }
};

function addToTerminal(command, output) {
  const commandLine = document.createElement('div');
  commandLine.classList.add('terminal-line');
  commandLine.innerHTML = `<span class="terminal-prompt">root@heinrichos:~$</span> ${command}`;
  terminalOutput.appendChild(commandLine);
  
  if (output) {
    const outputLine = document.createElement('div');
    outputLine.classList.add('terminal-line');
    outputLine.innerHTML = output;
    terminalOutput.appendChild(outputLine);
  }
  
  const blank = document.createElement('div');
  blank.classList.add('terminal-line', 'terminal-blank');
  terminalOutput.appendChild(blank);
  
  // Scroll to bottom
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleCommand(input) {
  const cmd = input.trim().toLowerCase();
  
  if (cmd === '') return;
  
  // Add to history
  commandHistory.unshift(input);
  if (commandHistory.length > 50) commandHistory.pop();
  historyIndex = -1;
  
  // Check if command exists
  if (commands[cmd]) {
    const output = commands[cmd]();
    if (output !== null) {
      addToTerminal(input, output);
    }
  } else {
    addToTerminal(input, `<span class="terminal-error">Command not found: ${input}</span>\nType <span class="terminal-highlight">help</span> for available commands.`);
  }
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = terminalInput.value;
      handleCommand(input);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        terminalInput.value = '';
      }
    }
  });
  
  // Auto-focus terminal on click
  document.querySelector('.terminal-container')?.addEventListener('click', () => {
    terminalInput.focus();
  });
}

// Ghost Cursor Trail
const ghostTrails = [];
const maxGhosts = 10;
let ghostMouseX = 0;
let ghostMouseY = 0;
let lastGhostTime = 0;

// Create ghost trail elements
for (let i = 0; i < maxGhosts; i++) {
  const ghost = document.createElement('div');
  ghost.classList.add('ghost-trail');
  ghost.textContent = '👾';
  document.body.appendChild(ghost);
  ghostTrails.push({
    element: ghost,
    x: 0,
    y: 0,
    delay: i * 50
  });
}

// Track mouse position for ghost trail
document.addEventListener('mousemove', (e) => {
  ghostMouseX = e.clientX;
  ghostMouseY = e.clientY;
});

// Animate ghost trail
function animateGhostTrail() {
  const currentTime = Date.now();
  
  ghostTrails.forEach((ghost, index) => {
    // Calculate target position with delay
    const targetX = ghostMouseX;
    const targetY = ghostMouseY;
    
    // Smoothly interpolate position
    ghost.x += (targetX - ghost.x) * (0.1 - index * 0.008);
    ghost.y += (targetY - ghost.y) * (0.1 - index * 0.008);
    
    // Update ghost position
    ghost.element.style.left = ghost.x + 'px';
    ghost.element.style.top = ghost.y + 'px';
    
    // Fade out ghosts that are far from cursor
    const distance = Math.sqrt(Math.pow(targetX - ghost.x, 2) + Math.pow(targetY - ghost.y, 2));
    if (distance < 100) {
      ghost.element.classList.add('active');
    } else {
      ghost.element.classList.remove('active');
    }
  });
  
  requestAnimationFrame(animateGhostTrail);
}

// Only enable ghost trail on desktop
if (window.innerWidth > 768 && !prefersReducedMotion) {
  animateGhostTrail();
}

// CRT Section Transitions
const crtOverlay = document.querySelector('.crt-overlay');

function triggerCRTFlicker() {
  if (!crtOverlay || prefersReducedMotion) return;
  
  crtOverlay.style.animation = 'none';
  setTimeout(() => {
    crtOverlay.style.animation = 'crtSectionFlicker 0.3s ease-in-out';
  }, 10);
}

// Section transition observer
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class for fade-in animations
      entry.target.classList.add('visible');
      
      // Trigger CRT flicker effect
      if (!prefersReducedMotion) {
        triggerCRTFlicker();
      }
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

// Observe all sections and fade-in elements
document.querySelectorAll('.section, .fade-in').forEach(el => {
  sectionObserver.observe(el);
});

// Add CRT flicker on nav link clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (!prefersReducedMotion) {
      triggerCRTFlicker();
    }
  });
});

// About HeinrichOS Easter Egg
const aboutOSLink = document.getElementById('about-os-link');

if (aboutOSLink && lightbox && lightboxTitle && lightboxDesc) {
  aboutOSLink.addEventListener('click', () => {
    lightboxTitle.textContent = 'About HeinrichOS v1.0';
    lightboxDesc.innerHTML = `
      <p style="font-family: 'Courier New', monospace; line-height: 1.8;">
        <strong>HeinrichOS</strong> is a retro-futuristic operating system designed for showcasing projects, skills, and personality in a way that doesn't make your eyes glaze over.
      </p>
      <p style="font-family: 'Courier New', monospace; line-height: 1.8;">
        <strong>System Requirements:</strong><br>
        • A sense of humor<br>
        • Appreciation for 90s nostalgia<br>
        • Coffee (optional but recommended)<br>
        • Basic terminal skills (type <code>help</code> in Terminal section)
      </p>
      <p style="font-family: 'Courier New', monospace; line-height: 1.8;">
        <strong>Features:</strong><br>
        • CRT screen effects for that authentic retro feel<br>
        • Ghost mascot cursor trail (desktop only)<br>
        • Interactive terminal with hidden commands<br>
        • Boot sequence that's faster than Windows 95<br>
        • 100% caffeine-powered development
      </p>
      <p style="font-family: 'Courier New', monospace; line-height: 1.8;">
        <strong>Version History:</strong><br>
        v1.0 (2025) - Initial release. Built from scratch with HTML, CSS, JavaScript, and way too much attention to detail.
      </p>
      <p style="font-family: 'Courier New', monospace; line-height: 1.8; color: var(--brand-1);">
        👾 Fun fact: This entire site was built without templates. Every line of code was written by a sleep-deprived IT student fueled by coffee and determination.
      </p>
    `;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
}

// Computer Monitor Frame Scroll Effect
const computerMonitor = document.getElementById('computer-monitor');
const heroSection = document.querySelector('.hero-immersive');

function updateMonitorVisibility() {
  if (!computerMonitor || !heroSection) return;
  
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Trigger when 30% down viewport
  
  if (scrollPosition > heroBottom * 0.7) {
    // Show monitor frame when scrolling past hero
    computerMonitor.classList.add('visible');
  } else {
    // Hide monitor frame when at hero
    computerMonitor.classList.remove('visible');
  }
}

// Update on scroll
window.addEventListener('scroll', updateMonitorVisibility, { passive: true });

// Initial check
updateMonitorVisibility();

// Ensure page starts at top on load
window.addEventListener('load', () => {
  // Force scroll to top on page load
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

// Also reset on page refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// HeinrichOS Status Bar
function updateStatusBar() {
  const timeElement = document.getElementById('current-time');
  const coffeeLevelElement = document.getElementById('coffee-level');
  
  // Update time
  if (timeElement) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
  }
  
  // Update coffee level based on time (it decreases as day goes on)
  if (coffeeLevelElement) {
    const hour = new Date().getHours();
    let coffeeStatus = 'High';
    
    if (hour >= 6 && hour < 10) {
      coffeeStatus = 'Maximum';
    } else if (hour >= 10 && hour < 14) {
      coffeeStatus = 'High';
    } else if (hour >= 14 && hour < 18) {
      coffeeStatus = 'Medium';
    } else if (hour >= 18 && hour < 22) {
      coffeeStatus = 'Low';
    } else {
      coffeeStatus = 'Critical!';
    }
    
    coffeeLevelElement.textContent = coffeeStatus;
  }
}

// Update status bar immediately and every minute
updateStatusBar();
setInterval(updateStatusBar, 60000);

// PWA registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  });
}

// HeinrichOS Easter Eggs and Enhanced Interactions

// Console welcome message
console.log('%c👾 HeinrichOS v1.0', 'font-size: 20px; color: #667eea; font-weight: bold; font-family: "Press Start 2P", monospace;');
console.log('%cWelcome to the developer console!', 'font-size: 14px; color: #888;');
console.log('%cTip: Try typing "help()" for available commands', 'font-size: 12px; color: #aaa;');
console.log('%c', 'font-size: 2px;'); // spacing

// Console commands
window.help = function() {
    console.log('%cAvailable Commands:', 'font-size: 16px; color: #667eea; font-weight: bold;');
    console.log('%c  about()      - Learn about this site', 'color: #00ff00;');
    console.log('%c  coffee()     - Check coffee levels', 'color: #00ff00;');
    console.log('%c  konami()     - Activate konami code', 'color: #00ff00;');
    console.log('%c  ghost()      - Ghost info', 'color: #00ff00;');
    console.log('%c  quote()      - Get a random dev quote', 'color: #00ff00;');
};

window.about = function() {
    console.log('%cHeinrichOS - My retro OS themed portfolio', 'color: #667eea; font-size: 14px;');
    console.log('Built from scratch. No templates. No frameworks.');
    console.log('Just me, VS Code, and way too much coffee.');
    console.log('Created by Roy Heinrich Delgado - IT student who codes more than sleeps');
};

window.coffee = function() {
    const level = Math.floor(Math.random() * 100);
    const bar = '█'.repeat(Math.floor(level / 10)) + '░'.repeat(10 - Math.floor(level / 10));
    console.log(`%c☕ Coffee Level: [${bar}] ${level}%`, 'font-size: 14px; color: #ff9800;');
    return level > 50 ? 'Fully caffeinated! 🚀' : 'Time for a refill... ☕';
};

window.ghost = function() {
    console.log('%c   👾', 'font-size: 50px;');
    console.log('%cThe HeinrichOS ghost follows your cursor!', 'color: #667eea;');
    console.log('I made it because I thought it would be cool. And it is.');
};

window.quote = function() {
    const quotes = [
        '"It works on my machine." - Every developer ever',
        '"Code never lies, comments sometimes do." - Ron Jeffries',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Debugging is like being a detective in a crime movie where you are also the murderer."',
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Programming isn\'t about what you know; it\'s about what you can figure out."'
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`%c${quote}`, 'font-style: italic; color: #888; font-size: 13px;');
    return quote;
};

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.konami = function() {
    activateKonamiCode();
};

function activateKonamiCode() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'font-size: 20px; color: #ff00ff; font-weight: bold;');
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        console.log('%cRainbow mode deactivated', 'color: #888;');
    }, 5000);
}

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKonamiCode();
        konamiCode = [];
    }
});

// Click logo easter egg - shows random coding fact
const logo = document.querySelector('.logo');
const logoQuotes = [
    'First Git commit: "Initial commit - here we go 🚀"',
    'This site took 3 cups of coffee and 2 all-nighters ☕',
    'Built from scratch. Every. Single. Line. ✨',
    'The ghost cursor? Yeah, that was my idea 👾',
    'I debugged this more times than I slept this month 🐛',
    'Easter egg found! You actually click on stuff. Nice. 🎉',
    'No templates were used in the making of this site 💪',
    'I care about load times. This site is FAST ⚡'
];

let logoClickCount = 0;
if (logo) {
    logo.addEventListener('click', (e) => {
        if (e.target.closest('.logo')) {
            logoClickCount++;
            const quote = logoQuotes[Math.floor(Math.random() * logoQuotes.length)];
            
            // Create floating message
            const message = document.createElement('div');
            message.textContent = quote;
            message.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--card);
                border: 2px solid var(--brand-1);
                padding: 1rem 2rem;
                border-radius: 12px;
                z-index: 10001;
                font-family: 'Press Start 2P', monospace;
                font-size: 0.7rem;
                text-align: center;
                max-width: 80%;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                animation: fadeInDown 0.5s ease;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.animation = 'fadeOutUp 0.5s ease';
                setTimeout(() => message.remove(), 500);
            }, 3000);
            
            if (logoClickCount === 5) {
                console.log('%c🎊 Achievement Unlocked: Logo Clicker! 🎊', 'font-size: 16px; color: #ffa500; font-weight: bold;');
            }
        }
    });
}

// Add animation keyframes for logo easter egg
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(easterEggStyle);

// Enhanced keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + H = Show HeinrichOS secret console
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        console.clear();
        console.log('%c👾 HEINRICHOS SECRET CONSOLE ACTIVATED 👾', 'font-size: 24px; color: #667eea; font-weight: bold;');
        console.log('%cType help() for available commands', 'font-size: 14px; color: #888;');
        help();
        
        // Visual feedback
        const message = document.createElement('div');
        message.textContent = '🎉 Secret console activated! Check your browser console.';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card);
            border: 2px solid var(--brand-1);
            padding: 1rem 2rem;
            border-radius: 12px;
            z-index: 10001;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.7rem;
            text-align: center;
            max-width: 80%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: fadeInDown 0.5s ease;
        `;
        document.body.appendChild(message);
        setTimeout(() => {
            message.style.animation = 'fadeOutUp 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }
    
    // Ctrl/Cmd + Shift + G = Toggle ghost trail
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        const trails = document.querySelectorAll('.ghost-trail');
        trails.forEach(trail => {
            trail.style.display = trail.style.display === 'none' ? 'block' : 'none';
        });
        console.log('%c👾 Ghost trail toggled!', 'color: #667eea;');
    }
});

// Footer ghost emoji easter egg
const footerGhost = document.querySelector('.easter-egg-hint');
if (footerGhost) {
    footerGhost.addEventListener('click', () => {
        console.clear();
        console.log('%c👾 EASTER EGG FOUND! 👾', 'font-size: 24px; color: #667eea; font-weight: bold;');
        console.log('%cYou found the secret ghost! Type help() for console commands.', 'font-size: 14px; color: #888;');
        help();
        
        // Show fun message
        const message = document.createElement('div');
        message.textContent = '👾 Boo! You found the secret ghost! Check your console.';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card);
            border: 2px solid var(--brand-1);
            padding: 1rem 2rem;
            border-radius: 12px;
            z-index: 10001;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.7rem;
            text-align: center;
            max-width: 80%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: fadeInDown 0.5s ease;
        `;
        document.body.appendChild(message);
        setTimeout(() => {
            message.style.animation = 'fadeOutUp 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    });
}
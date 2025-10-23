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
    
    const geometry = new THREE.PlaneGeometry(8, 2);
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position randomly in 3D space
    mesh.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    
    mesh.userData = {
      originalY: mesh.position.y,
      speed: 0.01 + Math.random() * 0.02,
      amplitude: 5 + Math.random() * 10
    };
    
    codeBlocks.push(mesh);
    scene.add(mesh);
  });
}

function createNeuralNetwork() {
  const nodeCount = 15;
  const connections = [];
  
  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(i / nodeCount, 0.7, 0.6),
      transparent: true,
      opacity: 0.8
    });
    
    const node = new THREE.Mesh(geometry, material);
    node.position.set(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80
    );
    
    node.userData = {
      originalPosition: node.position.clone(),
      speed: 0.005 + Math.random() * 0.01,
      connections: []
    };
    
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
        geometry = new THREE.BoxGeometry(2, 2, 2);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1.5);
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(1.5);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1.5);
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
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 120
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
    map: screenTexture
    // No emissive to prevent blue glow
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 8, 3.1); // Positioned in front of monitor
  screen.name = 'screen';
  retroComputer.add(screen);
  
  // Add screen bezel/border for better visibility in light mode
  const bezelGeometry = new THREE.PlaneGeometry(48, 38);
  const bezelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    shininess: 50
  });
  const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
  bezel.position.set(0, 8, 3.05); // Slightly behind screen
  bezel.name = 'bezel';
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
  retroComputer.add(stand);
  
  // Position the computer in the scene - Above the background
  retroComputer.position.set(0, 3, -15);
  retroComputer.scale.set(1.6, 1.6, 1.6);
  scene.add(retroComputer);
  
  // Start rendering hero content to screen
  updateScreenContent();
  setInterval(updateScreenContent, 100); // Update screen 10 times per second
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
    retroComputer.position.y = 3; // Positioned above background
    
    // Scale from large (1.6) to small (0.5)
    const scale = 1.6 - (easeOut * 1.1);
    retroComputer.scale.set(scale, scale, scale);
    
    // Add slight rotation as it moves away
    retroComputer.rotation.y = easeOut * 0.15;
    retroComputer.rotation.x = easeOut * 0.08;
    
  } else {
    // Computer fades out when very far
    const fadeProgress = Math.min((scrollProgress - 0.7) / 0.3, 1); // 0 to 1
    
    retroComputer.position.z = 20 + (fadeProgress * 30); // 20 to 50
    retroComputer.position.y = 3; // Positioned above background
    const scale = 0.5 - (fadeProgress * 0.5); // 0.5 to 0
    retroComputer.scale.set(Math.max(scale, 0.01), Math.max(scale, 0.01), Math.max(scale, 0.01));
    
    // Fade entire computer together, but keep screen bright
    const opacity = 1 - fadeProgress;
    retroComputer.children.forEach(child => {
      if (child.material) {
        child.material.transparent = true;
        // Keep screen at full brightness, fade other parts
        if (child.name === 'screen') {
          child.material.opacity = 1; // Screen stays bright
        } else {
          child.material.opacity = opacity;
        }
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
  const isDark = document.body.classList.contains('dark-theme');
  
  // Clear canvas
  ctx.fillStyle = isDark ? '#0a0a0a' : '#ffffff';
  ctx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
  
  // Add scanline effect
  for (let i = 0; i < screenCanvas.height; i += 4) {
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, i, screenCanvas.width, 2);
  }
  
  // Draw title with typewriter effect - less top padding
  const titleText = document.getElementById('typewriter-text');
  if (titleText) {
    ctx.fillStyle = isDark ? '#fff' : '#0a0a0a';
    ctx.font = 'bold 48px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    
    // Draw without glow to prevent blue tint
    ctx.fillText(titleText.textContent, screenCanvas.width / 2, 140);
  }
  
  // Draw cursor if visible
  const cursor = document.getElementById('typewriter-cursor');
  if (cursor && cursor.style.opacity !== '0') {
    ctx.fillStyle = '#667eea';
    const titleWidth = ctx.measureText(titleText ? titleText.textContent : '').width;
    ctx.fillRect(screenCanvas.width / 2 + titleWidth / 2 + 20, 112, 8, 42);
  }
  
  // Draw subtitle - closer to title
  ctx.font = '32px "Press Start 2P", monospace';
  ctx.fillStyle = '#764ba2';
  ctx.fillText('Novice Developer & AI Enthusiast', screenCanvas.width / 2, 240);
  
  // Draw description - tighter spacing
  ctx.font = '28px sans-serif';
  ctx.fillStyle = isDark ? '#ccc' : '#555';
  const desc = 'Fourth-year Information Technology student at Aklan State University,';
  const desc2 = 'passionate about building intelligent systems';
  const desc3 = 'and crafting exceptional user experiences.';
  ctx.fillText(desc, screenCanvas.width / 2, 320);
  ctx.fillText(desc2, screenCanvas.width / 2, 365);
  ctx.fillText(desc3, screenCanvas.width / 2, 410);
  
  // Draw tech stack scrolling - at bottom with minimal padding
  ctx.font = '24px "Press Start 2P", monospace';
  ctx.fillStyle = '#667eea';
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
  if (e.key === '/') {
    const input = document.getElementById('project-search');
    if (input && document.activeElement !== input) { e.preventDefault(); input.focus(); }
  }
  if (e.key.toLowerCase() === 't') {
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

// PWA registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  });
}
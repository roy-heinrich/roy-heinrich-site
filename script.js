// Creative Three.js Scene Setup
let scene, camera, renderer, mouseX = 0, mouseY = 0;
let codeBlocks = [], neuralNodes = [], floatingShapes = [];
let time = 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionFactor = prefersReducedMotion ? 0.3 : 1;

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

  // Create floating code blocks
  createCodeBlocks();
  
  // Create neural network nodes
  createNeuralNetwork();
  
  // Create floating geometric shapes
  createFloatingShapes();
  
  // Add ambient lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0x667eea, 0.8);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);

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


const themeToggleBtn = document.getElementById('theme-toggle');
const themeIconSvg = document.getElementById('theme-icon-svg');
const sunPath = themeIconSvg?.querySelector('#theme-icon-sun');
const moonPath = themeIconSvg?.querySelector('#theme-icon-moon');

function applyTheme(theme) {
  if (theme === 'light') {
    rootEl.classList.add('theme-light');
    if (sunPath && moonPath) {
      sunPath.style.opacity = '1';
      moonPath.style.opacity = '0';
    }
  } else {
    rootEl.classList.remove('theme-light');
    if (sunPath && moonPath) {
      sunPath.style.opacity = '0';
      moonPath.style.opacity = '1';
    }
  }
}

applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggleBtn && themeToggleBtn.addEventListener('click', () => {
  const isLight = rootEl.classList.toggle('theme-light');
  localStorage.setItem(THEME_STORAGE_KEY, isLight ? 'light' : 'dark');
  if (sunPath && moonPath) {
    sunPath.style.opacity = isLight ? '1' : '0';
    moonPath.style.opacity = isLight ? '0' : '1';
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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

initThree();

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Simplified navbar functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

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

// Dropdown: keyboard + mobile accordion behavior
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdown && dropdownToggle && dropdownMenu) {
  // Keyboard support
  dropdownToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dropdown.classList.toggle('open');
      const isOpen = dropdown.classList.contains('open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    }
  });

  // Click to toggle on mobile
  dropdownToggle.addEventListener('click', (e) => {
    // Only treat as accordion when mobile menu is active
    const isMobileMenu = navLinks.classList.contains('active');
    if (isMobileMenu) {
      e.preventDefault();
      dropdown.classList.toggle('open');
      const isOpen = dropdown.classList.contains('open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    }
  });

  // Close dropdown when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !dropdown.contains(e.target) && 
        !dropdownToggle.contains(e.target)) {
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

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

// Contact form validation (client-side only demo)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  if (formData.get('company')) { // honeypot filled
    formStatus.textContent = 'Submission blocked.';
    return;
  }
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = 'Please complete all fields with a valid email.';
    return;
  }
  formStatus.textContent = 'Thanks! Your message was validated (demo).';
  contactForm.reset();
});

// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const sel = btn.getAttribute('data-copy');
    const el = sel ? document.querySelector(sel) : null;
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
    themeToggleBtn?.click();
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
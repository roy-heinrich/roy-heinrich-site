# HeinrichOS - Personal Portfolio

A retro-themed personal portfolio website showcasing my projects, skills, and GitHub stats. Built from scratch with HTML5, CSS3, JavaScript, and Three.js for that perfect nostalgic hacker aesthetic.

## Features

- **HeinrichOS Boot Sequence:** Custom loading screen with retro aesthetic
- **Hero Section:** Typewriter effect and call-to-action
- **About Me:** Detailed background on my approach to development
- **Projects Grid:** Filterable projects with categories (AI/ML, Web Apps, Data)
- **GitHub Integration:** Live GitHub stats including contributions, activity graph, and language breakdown
- **Terminal Interface:** Interactive terminal emulator with custom commands
- **Contact Form:** Formspree integration for easy messaging
- **Interactive Canvas:** Three.js 3D graphics with animated background
- **Dark/Light Theme Toggle:** Switch between themes
- **Responsive Design:** Fully mobile-friendly with hamburger navigation
- **Accessibility:** ARIA labels and semantic HTML throughout

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **3D Graphics:** Three.js
- **Icons & Fonts:** Press Start 2P (retro gaming font)
- **GitHub Stats:** github-readme-stats (via Vercel)
- **Form Handling:** Formspree
- **Service Worker:** PWA support for offline functionality

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/roy-heinrich/roy-heinrich-site.git
   cd roy-heinrich-site
   ```

2. **Open in browser**
   - Simple approach: Just open `index.html` in your browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

3. **Customize for your own portfolio**
   - Update personal info in `index.html`
   - Modify `src/styles.css` for your theme
   - Update `src/script.js` for custom functionality
   - Change GitHub username in the stats section
   - Update contact form action in the contact section

### Deployment

This site is hosted on **GitHub Pages**. To deploy your own fork:

1. Update the CNAME file or remove it if deploying to `username.github.io`
2. Push to `main` branch
3. GitHub Pages will automatically build and deploy

## Project Structure

```
roy-heinrich-site/
├── index.html          # Main entry point
├── src/
│   ├── styles.css      # All styling
│   ├── script.js       # Main application logic
│   └── service-worker.js # PWA offline support
├── public/
│   ├── favicon.ico
│   └── manifest.json   # PWA manifest
├── docs/
│   ├── readme.md       # This file
│   └── WARP.md         # WARP protocol notes
├── config/
│   ├── gulpfile.js     # Build tasks
│   └── CNAME           # GitHub Pages domain config
└── .git/               # Version control
```

## Key Components

### GitHub Stats Section
- Real-time stats fetching from GitHub
- Fallback URLs for reliability
- Cache optimization to reduce API calls

### Terminal Emulator
- Custom command handler in `src/script.js`
- Type `help` to see available commands
- Extensible command system for custom functionality

### Three.js Canvas
- Animated 3D background
- CRT monitor overlay effect
- Particle system for visual interest

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading for images
- Optimized CSS animations
- Service Worker for offline support
- Responsive images with proper scaling

## Credits

- **Three.js:** 3D graphics library
- **github-readme-stats:** GitHub statistics visualization
- **Formspree:** Form submission handling
- **Press Start 2P:** Retro gaming font by CodeMan38

## License

Personal portfolio. Feel free to use as inspiration for your own project!

## Contact

- **Email:** royheinrich.delgado0@gmail.com
- **GitHub:** [@roy-heinrich](https://github.com/roy-heinrich)
- **LinkedIn:** [Roy Heinrich Delgado](https://www.linkedin.com/in/roy-heinrich-delgado-b621ba222/)

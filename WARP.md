# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal portfolio website for Roy Heinrich Delgado, showcasing projects, skills, and contact information. Built with vanilla JavaScript, HTML5, CSS3, and Three.js for interactive 3D graphics.

## Development Commands

### Local Development
```bash
# Serve the site locally
npm run serve
# Default port: 8080
# Access at: http://localhost:8080
```

### Code Quality
```bash
# Run ESLint (Airbnb style guide)
npm run lint

# Run tests with coverage (100% coverage required)
npm test

# Generate and upload coverage report
npm run coverage
```

### Build Process
```bash
# Build SCSS and JS (if using app/ directory structure)
gulp

# Watch for changes
gulp watch
```

## Architecture

### Structure
This is a **single-page application** with all content in `index.html` and associated files at the root level. The package.json references an `app/` directory structure (for scripts and SCSS), but the actual working files are currently at the root.

**Root-level files:**
- `index.html` - Main portfolio page with sections: hero, about, projects, github, contact
- `script.js` - Three.js scene management and interactive animations
- `styles.css` - All styling including retro game theme, responsive design, light/dark modes
- `game.html` / `game.js` - Tic Tac Toe game
- `sudoku.html` / `sudoku.js` - Sudoku game
- `service-worker.js` - PWA support with cache-first strategy for static assets

### Key Features

**Three.js Canvas (`script.js`):**
- Creates floating code blocks with tech stack terms
- Neural network nodes with dynamic connections
- Floating geometric shapes (box, octahedron, tetrahedron, dodecahedron)
- Mouse-responsive camera movement
- Performance optimization with `prefers-reduced-motion` support

**Theming System:**
- Dark theme (default) and light theme toggle
- CSS custom properties in `:root` and `.theme-light`
- Theme state persisted in localStorage
- Variables: `--bg`, `--text`, `--muted`, `--card`, `--brand-1`, `--brand-2`, `--glass`, `--nav-bg`

**Navigation:**
- Fixed navbar with glass morphism effect
- Hamburger menu for mobile responsiveness
- Dropdown submenu for games section
- Smooth scroll to sections

**Loading Experience:**
- Pac-Man ghost pixel art loader (CSS grid animation)
- Press Start 2P retro font for titles and headings

### Testing & Quality Standards

- **100% code coverage required** (lines, functions, branches)
- ESLint with Airbnb base configuration
- Pre-commit hook runs linting
- Pre-push hook runs tests

### Deployment

The site appears to be deployed via GitHub Pages (CNAME file present). The service worker implements:
- Cache name: `rhd-portfolio-v3`
- Network-first for HTML navigation
- Cache-first for static assets

## Code Style

- **JavaScript:** Follow Airbnb ESLint rules
- **Naming:** Use camelCase for variables, descriptive names
- **Three.js objects:** Store animation metadata in `mesh.userData`
- **CSS:** Use CSS custom properties for themeable values
- **Fonts:** Press Start 2P for retro headings, SF Pro Display for body text

## Important Notes

- The `app/` directory structure referenced in package.json and gulpfile.js doesn't match current flat file structure - gulpfile may need updating if used
- Test directory (`app/tests`) doesn't exist yet
- Three.js version: r128 (loaded from CDN)
- The codebase uses vanilla JavaScript - no framework dependencies for main functionality

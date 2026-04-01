# ShontyCares — Premium Botanical Skincare & UX Contrast Study

ShontyCares is a high-fidelity, content-rich e-commerce platform designed to demonstrate the stark contrast between premium "Good UX" and an intentionally flawed "Bad UX." Built for a modern skincare brand, this project showcases meticulous visual hierarchy, fluid animations, and a study in purposeful friction.

---

## ⚡ Core Features

### 💎 The "Good UX" Experience
- **Minimalist Design System:** A sophisticated aesthetic powered by `Cormorant Garamond` and `Montserrat` typography.
- **Scroll-Reveal Animations:** Elements transition seamlessly into view using a custom `IntersectionObserver` implementation.
- **Infinite Marquee Carousel:** A smooth, auto-scrolling product marquee that provides a premium, catalog-style browsing feel.
- **Micro-interactions:** Subtle hover effects, cart bounces, and toast notifications to guide the user.

### ⚠️ The "Bad UX" Contrast
- **Intentional Friction:** A "dated" corporate grey and navy aesthetic (`#E0E0E0` and `#000080`) that feels like a step back into the early 2000s.
- **Frustrating-but-Functional Logic:**
  - Mandatory newsletter popup with persistent `localStorage` memory.
  - "Moving-target" close buttons that slightly vibrate on hover.
  - Simulated "Bad Loader" states that purposely delay user actions.
- **Layout Instability:** A shift from high-end grids to list-based structures with inconsistent spacing.

### 🛒 E-commerce Engine
- **Persistent Cart System:** Fully functional cart with quantity management, persisting across pages via `localStorage`.
- **Product Database:** 15+ curated high-performance botanical products with unique metadata.
- **Responsive Architecture:** Meticulously balanced layouts that ensure core content visibility across mobile and desktop.

---

## 📂 Page Architecture
- **Home:** High-impact hero, infinite carousel, and brand philosophy.
- **Shop:** Full 15-product collection grid with quick-access detail links.
- **Product Details:** Dedicated landing page for ingredient transparency and ritual steps.
- **Cart:** Streamlined checkout bag with real-time total calculation.
- **Policy Pages:** Professionally formatted Shipping & Returns and Terms & Conditions.

---

## 🛠️ Technology Stack
- **Core:** HTML5, Modern JavaScript (ES6+).
- **Styling:** Vanilla CSS3 with custom CSS Variables and a modular layout system.
- **State:** `localStorage`-based persistence for UX modes and cart state.
- **Performance:** Optimized `IntersectionObserver` for zero layout shift during reveal animations.

---

## 🚀 Installation & Local Environment
1. Clone the repository to your local machine.
2. Open `index.html` in any modern browser.
3. No build tools or dependencies are required (Zero-Dependency Architecture).

---

## 🧪 UX Research Application
This project is intended as a tool for Frontend Architects and UX Researchers to analyze how subtle changes in color, typography, and interaction timing can drastically alter perceived brand value and user satisfaction.

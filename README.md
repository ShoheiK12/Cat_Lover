# 🐾 Cat Lover E-Commerce Platform

A feature-rich, responsive React e-commerce platform designed for cat lovers. This project demonstrates modern front-end application architecture, state management using React Context, dynamic UI component rendering, and persistent local storage integration.

---

## Links

- [Live Demo (Vercel)](https://cat-lover-smoky.vercel.app/)

---

## Motivation & Purpose

The objective of this project was to build a seamless, user-centric online shopping experience from scratch. The core focus areas include:

- **State Persistence & Management:** Implementing robust global state mechanisms for cart actions, wishlist management, authentication, and user reviews without relying on external heavy state libraries.
- **Consistent Visual Identity:** Crafting an engaging, accessible UI featuring custom rating systems, active feedback toasts, interactive component states, and modern button animations.
- **Client-Side Routing & Performance:** Providing fluid single-page application navigation with React Router while preventing unhandled dynamic routing issues.

---

## Tech Stack & Architecture

### Tech Stack
- **Front-End Framework:** React 18+ (Vite)
- **Routing:** React Router v6
- **Styling:** Custom CSS3 with Flexbox, CSS Grid, and dynamic CSS Variables
- **State Management:** React Context API (`CartContext`, `WishlistContext`, `ReviewContext`, `AuthContext`, `ToastContext`)
- **Persistence:** Browser `localStorage` API
- **Icons & Visuals:** Custom SVG/Unicode components with standardised fallback styling

### Application Architecture

<img width="1045" height="407" alt="Image" src="https://github.com/user-attachments/assets/0ef78a7e-57e1-4ab8-a0a0-85347ab19d86" />


---

## Challenges & Key Learnings

### 1. Synchronised Local Storage State & Dynamic Recalculation
- **Challenge:** Managing real-time cart item updates, dynamic quantity increments/decrements, and global header badge counts while ensuring zero data loss on page refresh.
- **Solution:** Structured custom `CartContext` and `WishlistContext` providers initialised lazily via `localStorage.getItem()`. Integrated pure state reduction functions to compute total items and prices on every modification.

### 2. Cross-Browser Emoji & Glyph Rendering Differences
- **Challenge:** The star rating system initially rendered as standard black unicode glyphs on certain operating systems instead of gold rating indicators.
- **Solution:** Refactored star rendering into a standalone `StarRating` component utilising explicit class bindings (`.star-rating-icon.filled`, `.star-rating-icon.empty`) combined with strict font-family declarations and CSS specificity overlays (`!important`) to ensure standard gold (`#f59e0b`) output across all environments.

### 3. Route Synchronization & Component Sizing Alignment
- **Challenge:** Button elements across product detail and action sections exhibited structural height and margin mismatches.
- **Solution:** Standardised shared action container rules (`.action-buttons`) using CSS Flexbox `gap` properties alongside uniform padding and typography specifications for `.btn-primary` and `.btn-wishlist`.

---

### Visual & Interactive Features
- **Responsive Review Cards:** Multi-column CSS Grid layouts displaying user feedback with customizable star rating indicators and colorful gradient accents.
- **Interactive Action Buttons:** Primary cart actions paired with dual-state wishlist buttons featuring subtle micro-interactions (`translateY` hover lifts and active scale presses).
- **Global Toast Notifications:** Non-intrusive feedback overlays for authentication state changes and item additions.

---

## Local Development Setup

Follow these instructions to run the application locally on your machine.

### Prerequisites
- **Node.js:** `v18.0.0` or higher
- **npm:** `v9.0.0` or higher

### Installation & Execution

## Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository

git clone [https://github.com/ShoheiK12/Cat_Lover.git](https://github.com/ShoheiK12/Cat_Lover.git)  

```bash
cd cat-lover
```

### 2. Install Dependencies
Install all the required packages listed in the package.json file:

```bash
npm install
```

### 3. Launch Development Server
Start the local development server with Hot Module Replacement (HMR) enabled:

```bash
npm run dev
```

Once started, open your browser and navigate to http://localhost:5173 to interact with the application.

### 4. Production Build & Preview
To test how the application performs after production compilation and optimisation:

```bash
npm run build  
npm run preview
```

Production Deployment 
This project is fully optimised for hosting on Vercel. It includes a vercel.json configuration file to handle SPA routing correctly, preventing 404 Not Found errors when refreshing subroutes like /settings or /review.

Handling SPA Routing on Vercel:  
The routing behaviour is managed by the following rule in the root directory:

---

## Author

Shohei Kotera

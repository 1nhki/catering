# FitBento Frontend (Vue 3 + Vite + Tailwind CSS)

This is the frontend client for **FitBento**, an automated meal-prep and macro-tracking platform.

## Tech Stack
- **Framework:** Vue 3 (Composition API `<script setup>`)
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **State Management:** Pinia
- **Routing:** Vue Router
- **Icons:** Lucide Vue Next

## Project Structure
```text
frontend/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── assets/
    │   └── main.css          # Tailwind CSS directives
    ├── components/
    │   ├── CalorieRing.vue   # SVG Circular Calorie Progress
    │   ├── DeliveryStepper.vue # 3-stage delivery FSM stepper & photo proof
    │   └── MenuCard.vue      # Weekly menu card with macro badges
    ├── router/
    │   └── index.ts          # Route definitions
    ├── stores/
    │   └── tracker.ts        # Pinia store for calories & delivery state
    ├── types/
    │   └── index.ts          # TypeScript interfaces & types
    ├── views/
    │   ├── HomeView.vue      # Dashboard (Calorie Ring, Stepper, Bento Plan, Quick Add)
    │   └── OnboardingView.vue # 3-Step TDEE Mifflin-St Jeor onboarding
    ├── App.vue
    └── main.ts
```

## Getting Started

1. **Install dependencies:**
```bash
cd frontend
npm install
# or: pnpm install / bun install / yarn
```

2. **Run local development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

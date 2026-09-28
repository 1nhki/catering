/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#F5EFE6", /* Bento Surface */
        "surface-dim": "#dfd9d1",
        "surface-bright": "#fff9ef",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f9f3ea",
        "surface-container": "#EFE6D8", /* Inset Well */
        "surface-container-high": "#ede7de",
        "surface-container-highest": "#E2D7C3", /* Ceramic Border */
        "on-surface": "#242622", /* Sumi Text */
        "on-surface-variant": "#6E7268", /* Stone Text */
        "inverse-surface": "#32302a",
        "inverse-on-surface": "#f6f0e7",
        "outline": "#72796e",
        "outline-variant": "#c2c9bb",
        "primary": "#2D5A27", /* Deep Matcha */
        "on-primary": "#ffffff",
        "primary-container": "#4E8746", /* Steeped Leaf */
        "on-primary-container": "#ffffff",
        "inverse-primary": "#a1d494",
        "secondary": "#87A96B", /* Young Sprout */
        "on-secondary": "#ffffff",
        "secondary-container": "#E8F0E4", /* Matcha Mist */
        "on-secondary-container": "#2D5A27",
        "tertiary": "#C26D48", /* Roasted Persimmon */
        "on-tertiary": "#ffffff",
        "tertiary-container": "#D4A359", /* Golden Sesame */
        "on-tertiary-container": "#ffffff",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "background": "#FBF8F2", /* Base Canvas */
        "on-background": "#242622",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"]
      }
    }
  },
  plugins: [],
}

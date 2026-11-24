// PostCSS config for Tailwind CSS 4 production builds.
// Turbopack dev mode uses @tailwindcss/turbopack directly (no PostCSS needed).
// next build uses PostCSS for CSS processing.

/** @type {import('postcss').Plugins} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

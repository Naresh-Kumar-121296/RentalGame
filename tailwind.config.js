/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // DESIGN TOKENS: placeholders. Replace with values inspected from sharepal.in (DevTools).
      colors: {
        // Estimated from screenshots. Verify exact hex values with DevTools.
        header: "#5B1A8B",
        theme: "#8A3FD4",
        brand: { DEFAULT: "#1A47E8", dark: "#1236B8", soft: "#E8EEFF" },
        accent: { DEFAULT: "#E8571F", soft: "#FFEDE5" },
        lime: "#A6F000",
        navy: "#0B1F4B",
        night: "#020A33",
        ink: { DEFAULT: "#111827", soft: "#6B7280", line: "#E5E7EB" },
        surface: "#F4F5F7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Ubuntu", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "20px" },
      boxShadow: { card: "0 2px 12px rgba(27,27,36,0.06)", lift: "0 10px 28px rgba(27,27,36,0.12)" },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Archivo Black", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(0 0% 0% / 0.1)",
        input: "hsl(0 0% 0% / 0.1)",
        ring: "hsl(0 0% 0%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(0 0% 0%)",
        primary: {
          DEFAULT: "hsl(0 0% 0%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 0%)",
        },
        destructive: {
          DEFAULT: "hsl(0 0% 0%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 40%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 0%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(0 0% 0%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(0 0% 0%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

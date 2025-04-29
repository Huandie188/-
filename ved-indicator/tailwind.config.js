const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
        sans: ["Inter", ...fontFamily.sans],
        display: ["Inter", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#c0ddfd",
          300: "#92c5fb",
          400: "#5ea3f8",
          500: "#3182f6",
          600: "#1a65ed",
          700: "#1652dc",
          800: "#1746b3",
          900: "#193e8c",
          950: "#132758",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 5px 20px -8px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "spin-slow": "spin 8s linear infinite",
        "spin-slow-reverse": "spin-reverse 8s linear infinite",
        "pulse-subtle": "pulse 3s infinite",
        "wave": "wave 8s ease-in-out infinite",
        "wave-reverse": "wave-reverse 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 2s linear infinite",
        "scan": "scan 3s linear infinite",
        "sweep": "sweep 3s ease-in-out infinite",
        "blink": "blink 4s ease-in-out infinite",
        "rotate-360": "rotate-360 30s linear infinite",
        "data-flow": "data-flow 10s linear infinite",
        "bounce-subtle": "bounce-subtle 5s ease-in-out infinite",
        "radar-scan": "radar-scan 3s linear infinite",
        "glitch": "glitch 4s step-end infinite",
        "matrix-fall": "matrix-fall 15s linear infinite",
        "ripple": "ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite",
        "dash": "dash 1.5s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-x': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '0.3' },
          '100%': { transform: 'scale(0.8)', opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "wave": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "wave-reverse": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(15px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        "sweep": {
          "0%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
          "50.01%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(-100%)" }
        },
        "blink": {
          "0%, 25%, 75%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 }
        },
        "rotate-360": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "data-flow": {
          "0%": { strokeDashoffset: 1000 },
          "100%": { strokeDashoffset: 0 }
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-5px) scale(1.02)" }
        },
        "radar-scan": {
          "0%": { transform: "rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { transform: "rotate(360deg)", opacity: 0 }
        },
        "glitch": {
          "0%, 5%, 10%, 15%, 50%, 55%, 60%, 65%, 90%, 95%, 100%": { transform: "translate(0)" },
          "2.5%, 7.5%, 12.5%, 52.5%, 57.5%, 62.5%, 92.5%, 97.5%": { transform: "translate(-4px, 0)" },
          "52.5%, 57.5%, 62.5%, 92.5%, 97.5%": { transform: "translate(4px, 0)" }
        },
        "matrix-fall": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(4)", opacity: 0 }
        },
        "dash": {
          "0%": { strokeDashoffset: 1000 },
          "100%": { strokeDashoffset: 0 }
        }
      },
      backgroundImage: {
        'gradient-dots': 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0)',
        'gradient-grid': 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dots-sm': '20px 20px',
        'dots-md': '30px 30px',
        'grid-sm': '20px 20px',
        'grid-md': '40px 40px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

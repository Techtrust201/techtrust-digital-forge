
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    // Background colors
    "bg-custom-purple", 
    "bg-custom-blue", 
    "bg-custom-green",
    "bg-custom-pink",
    "bg-custom-slate",
    // Text colors
    "text-custom-purple", 
    "text-custom-blue", 
    "text-custom-green",
    "text-custom-pink",
    "text-custom-slate",
    // Gradient from colors
    "from-custom-purple",
    "from-custom-blue", 
    "from-custom-green",
    "from-custom-pink",
    "from-custom-slate",
    // Gradient to colors
    "to-custom-purple",
    "to-custom-blue", 
    "to-custom-green",
    "to-custom-pink",
    "to-custom-slate",
    // Border colors
    "border-custom-purple",
    "border-custom-blue", 
    "border-custom-green",
    "border-custom-pink",
    "border-custom-slate",
    // Hover variants
    "hover:bg-custom-purple",
    "hover:bg-custom-blue", 
    "hover:bg-custom-green",
    "hover:bg-custom-pink",
    "hover:bg-custom-slate",
    // Background opacity variants
    "bg-custom-purple/10",
    "bg-custom-blue/10", 
    "bg-custom-green/10",
    "bg-custom-pink/10",
    "bg-custom-slate/10",
    "bg-custom-purple/90",
    "bg-custom-blue/90", 
    "bg-custom-green/90",
    "bg-custom-pink/90",
    "bg-custom-slate/90"
  ],
  prefix: "",
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
        poppins: ["Poppins", "sans-serif"],
      },
      maxWidth: {
        "2xl": "1400px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        "custom-blue": "#45C7FF",
        "custom-purple": "#A482B7",
        "custom-pink": "#FF9FA6",
        "custom-green": "#00CCC3",
        "custom-slate": "#E4EDF5",
        "052736": "#052736",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        myAnim: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-scale": "fade-scale 3s ease 0s infinite normal forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

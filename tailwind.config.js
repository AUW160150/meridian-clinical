/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Libre Baskerville', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'hsl(38, 18%, 97%)',
        foreground: 'hsl(220, 28%, 11%)',
        primary: {
          DEFAULT: 'hsl(220, 48%, 20%)',
          foreground: 'hsl(38, 28%, 92%)',
        },
        accent: {
          DEFAULT: 'hsl(28, 62%, 46%)',
          foreground: 'hsl(38, 28%, 96%)',
        },
        success: 'hsl(155, 48%, 34%)',
        warning: 'hsl(36, 82%, 44%)',
        destructive: 'hsl(4, 70%, 44%)',
        border: 'hsl(38, 20%, 85%)',
        muted: {
          DEFAULT: 'hsl(38, 12%, 92%)',
          foreground: 'hsl(220, 12%, 46%)',
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(220, 28%, 11%)',
        },
        sidebar: {
          DEFAULT: 'hsl(220, 40%, 14%)',
          foreground: 'hsl(38, 28%, 86%)',
          accent: 'hsl(36, 62%, 56%)',
          border: 'hsl(220, 35%, 20%)',
        },
        status: {
          action: 'hsl(4, 70%, 44%)',
          caution: 'hsl(36, 82%, 44%)',
          proceed: 'hsl(155, 48%, 34%)',
          monitor: 'hsl(220, 20%, 52%)',
        },
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.375rem',
      },
      boxShadow: {
        card: '0 1px 0 0 hsl(38 30% 80%), 0 2px 8px -2px hsl(220 25% 12% / 0.06)',
        'card-hover': '0 1px 0 0 hsl(38 30% 80%), 0 4px 12px -2px hsl(220 25% 12% / 0.10)',
      },
    },
  },
  plugins: [],
}

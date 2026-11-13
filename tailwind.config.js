/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        term: {
          bg: "#0B0F14",
          surface: "#10161F",
          border: "#1C2533",
          hover: "#182230",
          prompt: "#10B981", // vibrant emerald green
          cyan: "#06B6D4",
          blue: "#3B82F6",
          purple: "#A855F7",
          amber: "#F59E0B",
          text: "#E2E8F0",
          dim: "#64748B",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'blink': 'blink 1s step-start infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}


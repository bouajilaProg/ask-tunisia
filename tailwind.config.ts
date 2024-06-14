import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "black",
      },
    },
  },
  plugins: [require('daisyui'),
  function ({ addUtilities }: { addUtilities: (utilities: any) => void }) {
    addUtilities({
      '.hide-scrollbar': {
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '.bgc': {
        backgroundImage: 'linear-gradient(to top, var(--tw-gradient-stops))',
        '--tw-gradient-from': 'var(--tw-color-base-200)',
        '--tw-gradient-to': 'var(--tw-color-base-300)',
        height: '100%',
      },
    }
    );
  },
  ],
};
export default config;

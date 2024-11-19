import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        title: "#000000",
        paragraph: "#525252",
        label: "#1C1C1C",
        input: "#F0EDFF",
        icon: "#1C1C1C",
        bg: "#FFFFFF",
        primaryBg: "#5038ED",
        secondaryBg: "#9181F4",
        dark: {
          title: "#FFFFFF",
          paragraph: "#B3B3B3",
          label: "#E5E5E5",
          input: "#2A275C",
          icon: "#E5E5E5",
          bg: "#1A1A1A",
          primaryBg: "#3A36E0",
          secondaryBg: "#7A69F5",
        },
      },
    },
    fontFamily: { sans: ["Poppins", "sans-serif"] },
  },
};

export default config;

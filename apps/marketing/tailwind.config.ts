import { type Config } from "tailwindcss";
import sharedConfig from "@usesend/tailwind-config/tailwind.config";
import path from "path";

export default {
  ...sharedConfig,
  content: [
    "./src/**/*.tsx",
    `${path.join(require.resolve("@usesend/ui"), "..")}/**/*.{ts,tsx}`,
    `${path.join(require.resolve("@usesend/email-editor"), "..")}/**/*.{ts,tsx}`,
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme?.extend,
      fontFamily: {
        ...sharedConfig.theme?.fontFamily,
        serif: [
          "var(--font-serif)",
          "Instrument Serif",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
    },
  },
} satisfies Config;

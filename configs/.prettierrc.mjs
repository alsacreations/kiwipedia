/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  singleAttributePerLine: true,
  printWidth: 80,
  jsxSingleQuote: true,
  overrides: [
    {
      files: ["*.css", "*.scss"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: "*.stories.{ts,js,tsx,jsx}",
      options: {
        htmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
};

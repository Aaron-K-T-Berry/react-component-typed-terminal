module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...(options.presets || []),
      "@babel/preset-typescript"
    ],
  }),
}

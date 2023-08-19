import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // @see https://github.com/storybookjs/storybook/issues/3916#issuecomment-871283551
  // ************* Add this **********
  webpackFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [
      ...(config?.resolve?.modules ?? []),
      path.resolve(__dirname, "../src"),
    ];

    return config;
  },
  staticDirs: ['../public'],
};
export default config;

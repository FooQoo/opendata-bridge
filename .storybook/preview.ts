import type { Preview } from '@storybook/react';
import Image from 'next/image';
import "app/globals.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

Image.defaultProps = {
  unoptimized: true,
};

export default preview;

import type { Meta, StoryObj } from '@storybook/react';
import Article from 'components/molecules/Article/Article';

const meta: Meta<typeof Article> = {
  component: Article,
};

export default meta;

type Story = StoryObj<typeof Article>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => <Article {...args} />,
};

Primary.args = {
  link: 'https://nextjs.org/docs',
  title: 'Documentation',
  description: 'Find in-depth information about Next.js features and API.',
};

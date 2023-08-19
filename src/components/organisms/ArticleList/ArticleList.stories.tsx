import type { Meta, StoryObj } from '@storybook/react';
import ArticleList from 'components/organisms/ArticleList/ArticleList';

const meta: Meta<typeof ArticleList> = {
  component: ArticleList,
};

export default meta;

type Story = StoryObj<typeof ArticleList>;

export const Primary: Story = {
  render: (args) => <ArticleList {...args} />,
};

Primary.args = {
  articles: [
    {
      link: 'https://nextjs.org/docs',
      title: 'Documentation',
      description: 'Find in-depth information about Next.js features and API.',
    },
    {
      link: 'https://nextjs.org/docs',
      title: 'Documentation',
      description: 'Find in-depth information about Next.js features and API.',
    },
    {
      link: 'https://nextjs.org/docs',
      title: 'Documentation',
      description: 'Find in-depth information about Next.js features and API.',
    },
    {
      link: 'https://nextjs.org/docs',
      title: 'Documentation',
      description: 'Find in-depth information about Next.js features and API.',
    },
  ],
};

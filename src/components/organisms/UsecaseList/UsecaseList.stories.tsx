import type { Meta, StoryObj } from '@storybook/react';
import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';

const meta: Meta<typeof UsercaseList> = {
  component: UsercaseList,
};

export default meta;

type Story = StoryObj<typeof UsercaseList>;

export const Primary: Story = {
  render: (args) => <UsercaseList {...args} />,
};

Primary.args = {
  usecases: [
    {
      id: '',
      title: 'Weather Information',
      description:
        'This template is used to fetch and display weather information.',
      base: {
        title: 'Weather Information',
        content: '',
      },
      option: [
        {
          title: 'Weather Information',
          content: '',
        },
      ],
    },
  ],
};

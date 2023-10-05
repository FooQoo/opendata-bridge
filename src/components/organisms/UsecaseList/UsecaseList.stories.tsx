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
      ogps: [],
      tableau: undefined,
      base: {
        id: '',
        title: 'Weather Information',
        content: '',
      },
      option: [
        {
          id: '',
          title: 'Weather Information',
          content: '',
        },
      ],
      updatedAt: '2021-08-01T00:00:00.000Z',
      goodCount: 0,
    },
  ],
};

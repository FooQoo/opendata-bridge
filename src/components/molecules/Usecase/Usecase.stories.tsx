import type { Meta, StoryObj } from '@storybook/react';
import Usecase from 'components/molecules/Usecase/Usecase';

const meta: Meta<typeof Usecase> = {
  component: Usecase,
};

export default meta;

type Story = StoryObj<typeof Usecase>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => <Usecase {...args} />,
};

Primary.args = {
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
};

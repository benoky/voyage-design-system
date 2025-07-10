import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';
import React from 'react';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

const SwitchDemo = (args: any) => {
  const [checked, setChecked] = useState(args.checked ?? true);
  return <Switch {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: args => <SwitchDemo {...args} />,
  args: {
    checked: true,
    disabled: false,
  },
};

export const Off: Story = {
  render: args => <SwitchDemo {...args} />,
  args: {
    checked: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: args => <Switch {...args} />,
  args: {
    checked: true,
    disabled: true,
  },
};

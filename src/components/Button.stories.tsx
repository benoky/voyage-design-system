import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'disabled'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'medium', 'large', 'iconSmall', 'iconMedium'],
      description: '버튼의 크기',
    },
    onClick: {
      action: 'clicked',
    },
    className: {
      control: 'text',
      description: '버튼의 추가 클래스 이름',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '기본 버튼',
    variant: 'primary',
    size: 'small',
  },
};

export const Secondary: Story = {
  args: {
    children: '보조 버튼',
    variant: 'secondary',
    size: 'small',
  },
};

export const Ghost: Story = {
  args: {
    children: '투명 버튼',
    variant: 'ghost',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    variant: 'disabled',
    size: 'small',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    className: 'w-[500px]',
  },
  render: args => (
    <Button {...args}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 12h14' />
        <path d='M12 5v14' />
      </svg>
      아이콘 버튼
    </Button>
  ),
};

export const Icon: Story = {
  args: {
    variant: 'secondary',
    size: 'iconSmall',
  },
  render: args => (
    <Button {...args}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 12h14' />
        <path d='M12 5v14' />
      </svg>
    </Button>
  ),
};

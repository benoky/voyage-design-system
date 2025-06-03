import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelLocation: { control: 'select', options: ['top', 'left'] },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: '입력 필드의 스타일 변형',
    },
    inputSize: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'auto'],
      description: '입력 필드의 크기',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Input
export const Default: Story = {
  args: {
    placeholder: 'Email',
    variant: 'default',
    inputSize: 'default',
  },
};

// 라벨이 있는 Input (상단 라벨)
export const WithLabelTop: Story = {
  args: {
    label: 'Email',
    labelLocation: 'top',
    placeholder: 'Email',
    variant: 'default',
    inputSize: 'default',
  },
};

// 라벨이 있는 Input (좌측 라벨)
export const WithLabelLeft: Story = {
  args: {
    label: 'Email',
    labelLocation: 'left',
    placeholder: 'Email',
    variant: 'default',
    inputSize: 'default',
  },
};

// 도움말 텍스트가 있는 Input (상단 라벨)
export const WithHelperTextTop: Story = {
  args: {
    label: 'Email',
    labelLocation: 'top',
    placeholder: 'Email',
    helperText: 'Enter your email address',
    variant: 'default',
    inputSize: 'default',
  },
};

// 도움말 텍스트가 있는 Input (좌측 라벨)
export const WithHelperTextLeft: Story = {
  args: {
    label: 'Email',
    labelLocation: 'left',
    placeholder: 'Email',
    helperText: 'Enter your email address',
    variant: 'default',
    inputSize: 'default',
  },
};

// 작은 크기의 Input
export const Small: Story = {
  args: {
    label: 'Email',
    placeholder: 'Email',
    inputSize: 'sm',
  },
};

// 큰 크기의 Input
export const Large: Story = {
  args: {
    label: 'Email',
    placeholder: 'Email',
    inputSize: 'lg',
  },
};

// 에러 상태의 Input (상단 라벨)
export const ErrorTop: Story = {
  args: {
    label: 'Email',
    labelLocation: 'top',
    placeholder: 'Email',
    helperText: 'Invalid email address',
    variant: 'error',
  },
};

// 에러 상태의 Input (좌측 라벨)
export const ErrorLeft: Story = {
  args: {
    label: 'Email',
    labelLocation: 'left',
    placeholder: 'Email',
    helperText: 'Invalid email address',
    variant: 'error',
  },
};

// 비활성화된 Input
export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Email',
    disabled: true,
  },
};

// 패스워드 Input (토글 없음)
export const Password: Story = {
  args: {
    label: 'Password',
    labelLocation: 'top',
    placeholder: 'Enter password',
    type: 'password',
  },
};

// 에러 상태의 패스워드 Input
export const PasswordError: Story = {
  args: {
    label: 'Password',
    labelLocation: 'top',
    placeholder: 'Enter password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
    variant: 'error',
  },
};

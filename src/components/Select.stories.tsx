import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '선택 옵션을 제공하는 드롭다운 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
      description: '선택 필드 스타일 변형',
    },
    selectSize: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'auto'],
      description: '선택 필드 크기',
    },
    labelLocation: {
      control: { type: 'select' },
      options: ['top', 'left'],
      description: '라벨 위치',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션 데이터
const basicOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

const serviceOptions = [
  { value: 'all', label: '전체' },
  { value: 'auth-service', label: '인증 서비스' },
  { value: 'project-service', label: '프로젝트 서비스' },
  { value: 'file-service', label: '파일 서비스' },
];

const levelOptions = [
  { value: 'all', label: '전체' },
  { value: 'INFO', label: 'INFO' },
  { value: 'WARN', label: 'WARN' },
  { value: 'ERROR', label: 'ERROR' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: '옵션을 선택하세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '카테고리',
    options: basicOptions,
    placeholder: '카테고리를 선택하세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '서비스',
    options: serviceOptions,
    helperText: '로그를 조회할 서비스를 선택하세요',
    defaultValue: 'all',
  },
};

export const Error: Story = {
  args: {
    label: '레벨',
    variant: 'error',
    options: levelOptions,
    helperText: '로그 레벨을 선택해주세요',
  },
};

export const Small: Story = {
  args: {
    label: '크기 작음',
    selectSize: 'sm',
    options: basicOptions,
    defaultValue: 'option1',
  },
};

export const Large: Story = {
  args: {
    label: '크기 큼',
    selectSize: 'lg',
    options: basicOptions,
    defaultValue: 'option2',
  },
};

export const Auto: Story = {
  args: {
    label: '자동 크기',
    selectSize: 'auto',
    options: serviceOptions,
    defaultValue: 'auth-service',
  },
};

export const LeftLabel: Story = {
  args: {
    label: '서비스',
    labelLocation: 'left',
    options: serviceOptions,
    defaultValue: 'project-service',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화됨',
    options: basicOptions,
    disabled: true,
    defaultValue: 'option1',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: '일부 옵션 비활성화',
    options: [
      { value: 'option1', label: '사용 가능한 옵션 1' },
      { value: 'option2', label: '비활성화된 옵션', disabled: true },
      { value: 'option3', label: '사용 가능한 옵션 2' },
      { value: 'option4', label: '비활성화된 옵션 2', disabled: true },
    ],
    helperText: '일부 옵션은 현재 사용할 수 없습니다',
  },
};

// 로그 검색에서 사용되는 실제 예시
export const LogServiceSelect: Story = {
  name: '로그 서비스 선택',
  args: {
    label: '서비스',
    options: serviceOptions,
    selectSize: 'auto',
    defaultValue: 'all',
  },
};

export const LogLevelSelect: Story = {
  name: '로그 레벨 선택',
  args: {
    label: '레벨',
    options: levelOptions,
    selectSize: 'auto',
    defaultValue: 'all',
  },
};

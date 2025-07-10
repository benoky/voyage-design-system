import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableColumn } from './DataTable';
import React from 'react';

const meta = {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '다양한 정렬 옵션과 커스터마이징이 가능한 테이블 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered'],
      description: '테이블 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact', 'large'],
      description: '테이블 크기',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    showHeader: {
      control: { type: 'boolean' },
      description: '헤더 표시 여부',
    },
    striped: {
      control: { type: 'boolean' },
      description: '줄무늬 스타일',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: '호버 효과',
    },
    emptyText: {
      control: { type: 'text' },
      description: '빈 데이터 텍스트',
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 데이터
interface BasicData {
  id: number;
  name: string;
  age: number;
  email: string;
  status: string;
}

const basicData: BasicData[] = [
  { id: 1, name: '홍길동', age: 25, email: 'hong@example.com', status: '활성' },
  { id: 2, name: '김영희', age: 30, email: 'kim@example.com', status: '비활성' },
  { id: 3, name: '이철수', age: 28, email: 'lee@example.com', status: '활성' },
  { id: 4, name: '박민수', age: 35, email: 'park@example.com', status: '대기' },
];

const basicColumns: DataTableColumn<BasicData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id' },
  { key: 'name', title: '이름', dataIndex: 'name' },
  { key: 'age', title: '나이', dataIndex: 'age' },
  { key: 'email', title: '이메일', dataIndex: 'email' },
  { key: 'status', title: '상태', dataIndex: 'status' },
];

// 로그 데이터 (실제 사용 예시)
interface LogData {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  details: string;
}

const logData: LogData[] = [
  { id: '1', timestamp: '2024-01-15 10:30:45', event: 'USER_LOGIN', user: 'hong@example.com', details: '로그인 성공' },
  {
    id: '2',
    timestamp: '2024-01-15 10:31:12',
    event: 'PROJECT_CREATE',
    user: 'kim@example.com',
    details: '새 프로젝트 생성',
  },
  {
    id: '3',
    timestamp: '2024-01-15 10:32:05',
    event: 'FILE_UPLOAD',
    user: 'lee@example.com',
    details: '파일 업로드 완료',
  },
];

const logColumns: DataTableColumn<LogData>[] = [
  { key: 'timestamp', title: '시간', dataIndex: 'timestamp', align: 'center' },
  { key: 'event', title: '이벤트', dataIndex: 'event', align: 'center' },
  { key: 'user', title: '사용자', dataIndex: 'user', align: 'left' },
  { key: 'details', title: '상세', dataIndex: 'details', align: 'left' },
];

// 요청 로그 데이터
interface RequestLogData {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  status: number;
  duration: string;
}

const requestLogData: RequestLogData[] = [
  { id: '1', timestamp: '2024-01-15 10:30:45', method: 'POST', url: '/api/auth/login', status: 200, duration: '125ms' },
  { id: '2', timestamp: '2024-01-15 10:31:12', method: 'GET', url: '/api/projects', status: 200, duration: '89ms' },
  {
    id: '3',
    timestamp: '2024-01-15 10:32:05',
    method: 'POST',
    url: '/api/files/upload',
    status: 201,
    duration: '2.3s',
  },
];

const requestLogColumns: DataTableColumn<RequestLogData>[] = [
  { key: 'timestamp', title: '시간', dataIndex: 'timestamp', align: 'center' },
  {
    key: 'method',
    title: '메소드',
    dataIndex: 'method',
    align: 'center',
    render: (method: string) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          method === 'GET'
            ? 'bg-green-100 text-green-800'
            : method === 'POST'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
        }`}
      >
        {method}
      </span>
    ),
  },
  { key: 'url', title: 'URL', dataIndex: 'url', align: 'left' },
  {
    key: 'status',
    title: '상태',
    dataIndex: 'status',
    align: 'center',
    render: (status: number) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          status === 200 || status === 201 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    ),
  },
  { key: 'duration', title: '응답시간', dataIndex: 'duration', align: 'right' },
];

export const Default: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
  },
};

export const WithBorder: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
    variant: 'bordered',
  },
};

export const Compact: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
    size: 'compact',
    variant: 'bordered',
  },
};

export const Large: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
    size: 'large',
    variant: 'bordered',
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
    striped: true,
    variant: 'bordered',
  },
};

export const NoHover: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
    hoverable: false,
    variant: 'bordered',
  },
};

export const WithMaxHeight: Story = {
  args: {
    columns: basicColumns as any,
    data: [...basicData, ...basicData, ...basicData], // 더 많은 데이터
    maxHeight: 200,
    variant: 'bordered',
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns as any,
    data: [],
    loading: true,
    variant: 'bordered',
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns as any,
    data: [],
    emptyText: '검색 결과가 없습니다',
    variant: 'bordered',
  },
};

export const NoHeader: Story = {
  args: {
    columns: basicColumns as any,
    data: basicData,
    showHeader: false,
    variant: 'bordered',
  },
};

// 정렬 옵션 데모
export const AlignmentDemo: Story = {
  name: '정렬 옵션 데모',
  args: {
    columns: [
      { key: 'id', title: 'ID (기본)', dataIndex: 'id' }, // 숫자라서 자동으로 right
      { key: 'name', title: '이름 (왼쪽)', dataIndex: 'name', align: 'left', headerAlign: 'left' },
      { key: 'age', title: '나이 (가운데)', dataIndex: 'age', align: 'center', headerAlign: 'center' },
      { key: 'email', title: '이메일 (왼쪽)', dataIndex: 'email', align: 'left', headerAlign: 'left' },
      { key: 'status', title: '상태 (오른쪽)', dataIndex: 'status', align: 'right', headerAlign: 'right' },
    ],
    data: basicData,
    variant: 'bordered',
  },
};

// 로그 테이블 예시 (실제 사용 케이스)
export const EventLogTable: Story = {
  name: '이벤트 로그 테이블',
  args: {
    columns: logColumns as any,
    data: logData,
    variant: 'bordered',
    maxHeight: 200,
    striped: true,
  },
};

export const RequestLogTable: Story = {
  name: '요청 로그 테이블',
  args: {
    columns: requestLogColumns as any,
    data: requestLogData,
    variant: 'bordered',
    maxHeight: 200,
    hoverable: true,
  },
};

// 커스텀 렌더링 예시
export const CustomRendering: Story = {
  name: '커스텀 렌더링',
  args: {
    columns: [
      { key: 'id', title: 'ID', dataIndex: 'id', align: 'center' },
      { key: 'name', title: '이름', dataIndex: 'name', align: 'left' },
      {
        key: 'age',
        title: '나이',
        dataIndex: 'age',
        align: 'center',
        render: (age: number) => `${age}세`,
      },
      {
        key: 'status',
        title: '상태',
        dataIndex: 'status',
        align: 'center',
        render: (status: string) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              status === '활성'
                ? 'bg-green-100 text-green-800'
                : status === '비활성'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status}
          </span>
        ),
      },
    ],
    data: basicData,
    variant: 'bordered',
    striped: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabItem } from './Tabs';
import React from 'react';
import { Home, Settings, User, Mail, Bell, FileText, BarChart3, Search } from 'lucide-react';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '다양한 스타일과 설정이 가능한 탭 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered'],
      description: '탭 컨테이너 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact', 'large'],
      description: '탭 크기',
    },
    tabListVariant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'cards'],
      description: '탭 리스트 변형',
    },
    tabListJustify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between'],
      description: '탭 리스트 정렬',
    },
    tabTriggerVariant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'cards'],
      description: '탭 버튼 변형',
    },
    tabTriggerSize: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: '탭 버튼 크기',
    },
    destroyInactiveTabPane: {
      control: { type: 'boolean' },
      description: '비활성 탭 콘텐츠 제거 여부',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 탭 아이템
const basicItems: TabItem[] = [
  {
    key: 'home',
    label: '홈',
    icon: <Home className='w-4 h-4' />,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>홈 페이지</h3>
        <p className='text-[#64748b]'>여기는 홈 페이지 콘텐츠입니다.</p>
      </div>
    ),
  },
  {
    key: 'profile',
    label: '프로필',
    icon: <User className='w-4 h-4' />,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>사용자 프로필</h3>
        <p className='text-[#64748b]'>프로필 설정과 개인정보를 관리할 수 있습니다.</p>
      </div>
    ),
  },
  {
    key: 'settings',
    label: '설정',
    icon: <Settings className='w-4 h-4' />,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>설정</h3>
        <p className='text-[#64748b]'>시스템 설정을 변경할 수 있습니다.</p>
      </div>
    ),
  },
];

// 로그 뷰어 탭 아이템 (실제 사용 예시)
const logViewerItems: TabItem[] = [
  {
    key: 'query',
    label: '로그 조회',
    icon: <FileText className='w-4 h-4' />,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>로그 조회</h3>
        <p className='text-[#64748b]'>이벤트별, 요청별, 사용자별 로그를 조회할 수 있습니다.</p>
      </div>
    ),
  },
  {
    key: 'search',
    label: '검색',
    icon: <Search className='w-4 h-4' />,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>로그 검색</h3>
        <p className='text-[#64748b]'>키워드로 로그를 검색하고 필터링할 수 있습니다.</p>
      </div>
    ),
  },
  {
    key: 'statistics',
    label: '통계',
    icon: <BarChart3 className='w-4 h-4' />,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>통계 차트</h3>
        <p className='text-[#64748b]'>로그 데이터의 통계와 차트를 확인할 수 있습니다.</p>
      </div>
    ),
  },
  {
    key: 'errors',
    label: '오류 분석',
    icon: <Bell className='w-4 h-4' />,
    badge: 5,
    content: (
      <div className='p-4 bg-white border border-[#e2e8f0] rounded-[6px]'>
        <h3 className='text-lg font-medium mb-2'>오류 분석</h3>
        <p className='text-[#64748b]'>시스템 오류를 분석하고 모니터링할 수 있습니다.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
  },
};

export const Pills: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    tabListVariant: 'pills',
    tabTriggerVariant: 'pills',
  },
};

export const Cards: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    tabListVariant: 'cards',
    tabTriggerVariant: 'cards',
  },
};

export const Bordered: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    variant: 'bordered',
  },
};

export const Center: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    tabListJustify: 'center',
  },
};

export const Small: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    tabTriggerSize: 'sm',
  },
};

export const Large: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    tabTriggerSize: 'lg',
  },
};

export const WithBadges: Story = {
  name: '배지가 있는 탭',
  args: {
    items: [
      {
        key: 'messages',
        label: '메시지',
        icon: <Mail className='w-4 h-4' />,
        badge: 12,
        content: <div className='p-4'>새 메시지가 12개 있습니다.</div>,
      },
      {
        key: 'notifications',
        label: '알림',
        icon: <Bell className='w-4 h-4' />,
        badge: 3,
        content: <div className='p-4'>새 알림이 3개 있습니다.</div>,
      },
      {
        key: 'settings',
        label: '설정',
        icon: <Settings className='w-4 h-4' />,
        content: <div className='p-4'>설정 페이지입니다.</div>,
      },
    ],
    defaultActiveKey: 'messages',
  },
};

export const WithDisabled: Story = {
  name: '비활성 탭',
  args: {
    items: [
      ...basicItems,
      {
        key: 'disabled',
        label: '비활성',
        icon: <Mail className='w-4 h-4' />,
        disabled: true,
        content: <div className='p-4'>이 탭은 비활성화되어 있습니다.</div>,
      },
    ],
    defaultActiveKey: 'home',
  },
};

export const LogViewerExample: Story = {
  name: '로그 뷰어 예시',
  args: {
    items: logViewerItems,
    defaultActiveKey: 'query',
    contentClassName: 'max-h-[400px] overflow-y-auto',
  },
};

export const PillsWithBadges: Story = {
  name: 'Pills 스타일 + 배지',
  args: {
    items: logViewerItems,
    defaultActiveKey: 'query',
    tabListVariant: 'pills',
    tabTriggerVariant: 'pills',
    tabListJustify: 'center',
  },
};

export const CardsStyle: Story = {
  name: 'Cards 스타일',
  args: {
    items: logViewerItems,
    defaultActiveKey: 'query',
    tabListVariant: 'cards',
    tabTriggerVariant: 'cards',
  },
};

export const DestroyInactive: Story = {
  name: '비활성 탭 제거',
  args: {
    items: basicItems,
    defaultActiveKey: 'home',
    destroyInactiveTabPane: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성 탭의 콘텐츠를 DOM에서 완전히 제거합니다. 성능 최적화에 유용합니다.',
      },
    },
  },
};

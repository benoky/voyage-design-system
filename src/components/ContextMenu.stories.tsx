import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ContextMenu, { MenuItem } from './ContextMenu';
import Button from './Button';
import { User, LogOut, Settings, FileText, Trash, ExternalLink, Lock } from 'lucide-react';

const meta: Meta<typeof ContextMenu> = {
  title: 'UI/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'compact', 'wide'],
      description: '메뉴 크기 변형',
    },
    position: {
      control: 'radio',
      options: ['absolute', 'fixed', 'inline'],
      description: '메뉴 위치 지정 방식',
    },
    open: {
      control: 'boolean',
      description: '메뉴 열림 여부',
    },
    title: {
      control: 'text',
      description: '메뉴 제목 (선택적)',
    },
    items: {
      control: 'object',
      description: '메뉴 아이템 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

// 기본 메뉴
export const Default: Story = {
  args: {
    variant: 'default',
    position: 'inline',
    open: true,
    items: [
      {
        label: 'Profile',
        icon: User,
        onClick: () => console.log('Profile clicked'),
      },
      {
        label: 'Settings',
        icon: Settings,
        onClick: () => console.log('Settings clicked'),
      },
      {
        label: 'Log out',
        icon: LogOut,
        onClick: () => console.log('Log out clicked'),
      },
    ],
  },
};

// 제목이 있는 메뉴
export const WithTitle: Story = {
  args: {
    variant: 'default',
    position: 'inline',
    open: true,
    title: 'User Name',
    items: [
      {
        label: 'Profile',
        icon: User,
        onClick: () => console.log('Profile clicked'),
      },
      {
        label: 'Log out',
        icon: LogOut,
        onClick: () => console.log('Log out clicked'),
      },
    ],
  },
};

// 섹션이 있는 메뉴
export const WithSections: Story = {
  args: {
    variant: 'default',
    position: 'inline',
    open: true,
    items: [
      [
        {
          label: 'View',
          icon: FileText,
          onClick: () => console.log('View clicked'),
        },
        {
          label: 'Edit',
          icon: Settings,
          onClick: () => console.log('Edit clicked'),
        },
      ],
      [
        {
          label: 'Share',
          icon: ExternalLink,
          onClick: () => console.log('Share clicked'),
        },
        {
          label: 'Delete',
          icon: Trash,
          onClick: () => console.log('Delete clicked'),
        },
      ],
    ],
  },
};

// 비활성화된 항목이 있는 메뉴
export const WithDisabledItems: Story = {
  args: {
    variant: 'default',
    position: 'inline',
    open: true,
    items: [
      {
        label: 'Edit',
        icon: Settings,
        onClick: () => console.log('Edit clicked'),
      },
      {
        label: 'Delete',
        icon: Trash,
        disabled: true,
        onClick: () => console.log('Delete clicked'),
      },
      {
        label: 'Make Private',
        icon: Lock,
        disabled: true,
        onClick: () => console.log('Make Private clicked'),
      },
    ],
  },
};

// User Dropdown Menu 스타일의 메뉴
export const UserMenu: Story = {
  args: {
    variant: 'default',
    position: 'inline',
    open: true,
    title: 'User Name',
    items: [
      [
        {
          label: 'Profile',
          icon: User,
          onClick: () => console.log('Profile clicked'),
        },
      ],
      [
        {
          label: 'Log out',
          icon: LogOut,
          onClick: () => console.log('Log out clicked'),
        },
      ],
    ],
  },
};

// 다양한 크기의 메뉴
export const MenuSizes: Story = {
  render: function Render() {
    return (
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-bold'>기본 크기 (224px)</h3>
          <ContextMenu
            variant='default'
            position='inline'
            open={true}
            title='Default Menu'
            items={[
              { label: 'Item 1', onClick: () => {} },
              { label: 'Item 2', onClick: () => {} },
            ]}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-bold'>작은 크기 (180px)</h3>
          <ContextMenu
            variant='compact'
            position='inline'
            open={true}
            title='Compact Menu'
            items={[
              { label: 'Item 1', onClick: () => {} },
              { label: 'Item 2', onClick: () => {} },
            ]}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-bold'>큰 크기 (260px)</h3>
          <ContextMenu
            variant='wide'
            position='inline'
            open={true}
            title='Wide Menu'
            items={[
              { label: 'Item 1', onClick: () => {} },
              { label: 'Item 2', onClick: () => {} },
            ]}
          />
        </div>
      </div>
    );
  },
};

// 트리거와 함께 사용하는 예제
export const WithTrigger: Story = {
  render: function Render() {
    const [openMenu, setOpenMenu] = useState(false);
    const [message, setMessage] = useState('');

    // User 메뉴 항목 정의
    const userMenuItems: MenuItem[][] = [
      [
        {
          label: 'Profile',
          icon: User,
          onClick: () => {
            setMessage('Profile clicked');
            setOpenMenu(false);
          },
        },
      ],
      [
        {
          label: 'Log out',
          icon: LogOut,
          onClick: () => {
            setMessage('Logged out');
            setOpenMenu(false);
          },
        },
      ],
    ];

    return (
      <div className='flex flex-col items-start gap-6'>
        <div className='relative'>
          <Button onClick={() => setOpenMenu(!openMenu)}>User Menu</Button>

          {openMenu && (
            <ContextMenu
              variant='default'
              position='absolute'
              open={openMenu}
              title='User Name'
              items={userMenuItems}
              className='absolute top-full right-0 mt-1'
            />
          )}
        </div>

        {message && <div className='py-2 px-4 bg-green-50 text-green-800 rounded-md text-sm'>{message}</div>}
      </div>
    );
  },
};

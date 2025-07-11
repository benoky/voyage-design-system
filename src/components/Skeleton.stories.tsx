import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import React from 'react';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 50,
    height: 50,
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: 300,
    height: 100,
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className='w-[320px] h-[200px] border border-gray-200 rounded-lg p-4'>
      <Skeleton width='70%' height={24} className='mb-4' />
      <Skeleton width='100%' height={16} className='mb-2' />
      <Skeleton width='90%' height={16} className='mb-2' />
      <Skeleton width='85%' height={16} className='mb-4' />
      <div className='flex justify-between mt-6'>
        <Skeleton width={80} height={32} />
        <Skeleton width={80} height={32} />
      </div>
    </div>
  ),
};

export const TableRowSkeleton: Story = {
  render: () => (
    <div className='w-[600px]'>
      <div className='flex items-center gap-4 mb-4'>
        <Skeleton variant='circle' width={40} height={40} />
        <div className='flex-1'>
          <Skeleton width='40%' height={20} className='mb-2' />
          <Skeleton width='60%' height={16} />
        </div>
      </div>
      <div className='flex items-center gap-4 mb-4'>
        <Skeleton variant='circle' width={40} height={40} />
        <div className='flex-1'>
          <Skeleton width='40%' height={20} className='mb-2' />
          <Skeleton width='60%' height={16} />
        </div>
      </div>
      <div className='flex items-center gap-4 mb-4'>
        <Skeleton variant='circle' width={40} height={40} />
        <div className='flex-1'>
          <Skeleton width='40%' height={20} className='mb-2' />
          <Skeleton width='60%' height={16} />
        </div>
      </div>
    </div>
  ),
};

export const StoragePopupSkeleton: Story = {
  render: () => (
    <div className='w-[632px] p-4 bg-white rounded-lg'>
      {/* 버튼 영역 스켈레톤 */}
      <div className='flex justify-end space-x-2 mb-4'>
        <Skeleton width={100} height={35} />
        <Skeleton width={80} height={35} />
        <Skeleton width={80} height={35} />
        <Skeleton width={100} height={35} />
      </div>

      {/* 구분선 */}
      <Skeleton width='100%' height={1} className='mb-4' />

      {/* 컨텐츠 영역 */}
      <div className='flex h-[400px]'>
        {/* 폴더 영역 (좌측) */}
        <div className='w-1/2 bg-[#f2f2f2] rounded-l-md p-2 flex flex-col space-y-2'>
          <Skeleton width='60%' height={24} className='mb-1' />
          <Skeleton width='70%' height={24} className='mb-1 ml-4' />
          <Skeleton width='70%' height={24} className='mb-1 ml-4' />
          <Skeleton width='70%' height={24} className='mb-1 ml-4' />
          <Skeleton width='60%' height={24} className='mb-1' />
          <Skeleton width='70%' height={24} className='mb-1 ml-4' />
        </div>

        {/* 구분선 */}
        <div className='w-[2px] bg-gray-300 self-stretch flex-shrink-0'></div>

        {/* 파일 영역 (우측) */}
        <div className='w-1/2 bg-white rounded-r-md p-2 flex flex-col space-y-2'>
          <Skeleton width='100%' height={24} className='mb-1' />
          <Skeleton width='100%' height={24} className='mb-1' />
          <Skeleton width='100%' height={24} className='mb-1' />
          <Skeleton width='100%' height={24} className='mb-1' />
          <Skeleton width='100%' height={24} className='mb-1' />
        </div>
      </div>
    </div>
  ),
};

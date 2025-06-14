import { Meta, StoryObj } from '@storybook/react';
import {Popup} from './Popup';
import {Button} from './Button';
import React from 'react';

const meta: Meta<typeof Popup> = {
  title: 'UI/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'radio',
      options: ['absolute', 'fixed', 'inline'],
      description: '팝업 위치 지정 방식',
    },
    open: {
      control: 'boolean',
      description: '팝업 열림 여부',
    },
    title: {
      control: 'text',
      description: '팝업 제목',
    },
    resizable: {
      control: 'boolean',
      description: '리사이즈 가능 여부',
    },
    initialWidth: {
      control: 'number',
      description: '초기 너비 (px)',
    },
    initialHeight: {
      control: 'number',
      description: '초기 높이 (px)',
    },
    onResize: {
      action: 'onResize',
      description: '크기 변경 시 실행될 함수',
    },
    draggable: {
      control: 'boolean',
      description: '드래그 가능 여부',
    },
    initialX: {
      control: 'number',
      description: '초기 X 위치 (px)',
    },
    initialY: {
      control: 'number',
      description: '초기 Y 위치 (px)',
    },
    onMove: {
      action: 'onMove',
      description: '위치 변경 시 실행될 함수',
    },
    onClose: {
      action: 'onClose',
      description: '닫기 버튼 클릭 핸들러',
    },
    children: {
      control: { type: undefined },
      description: '팝업 내부 콘텐츠',
    },
    footer: {
      control: { type: undefined },
      description: '팝업 하단 버튼 영역',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popup>;

// 기본 팝업
export const BasicPopup: Story = {
  args: {
    position: 'inline',
    open: true,
    title: 'Basic Popup',
    onClose: () => console.log('Close clicked'),
  },
  render: args => (
    <div className='inline-block'>
      <Popup 
        {...args}
        footer={
          <div className='flex justify-end'>
            <Button>확인</Button>
          </div>
        }
      >
        <p className='text-gray-600'>이 팝업은 기본적인 내용만 표시합니다.</p>
      </Popup>
    </div>
  ),
};

// 드래그 가능한 팝업
export const DraggablePopup: Story = {
  args: {
    position: 'absolute',
    open: true,
    title: 'Draggable Popup',
    draggable: true,
    initialX: 100,
    initialY: 100,
    onClose: () => console.log('Close clicked'),
    onMove: (x, y) => console.log(`Moved to: ${x},${y}`),
  },
  render: args => (
    <div className='relative w-[800px] h-[600px] border border-dashed border-gray-300 bg-gray-50'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <p className='text-gray-500'>팝업 헤더를 드래그하여 이동해보세요</p>
      </div>
      <Popup 
        {...args}
        footer={
          <div className='flex justify-end'>
            <Button>확인</Button>
          </div>
        }
      >
        <div className='space-y-4'>
          <p className='text-gray-600'>이 팝업은 헤더 부분을 드래그하여 이동할 수 있습니다.</p>
          <p className='text-gray-600'>팝업 상단의 제목 영역을 클릭한 상태로 드래그해보세요.</p>
          <div className='bg-gray-100 p-4 rounded'>
            <p className='text-sm'>드래그 기능 설명</p>
            <p className='text-sm mt-2'>팝업의 헤더 영역을 마우스로 클릭하고 드래그하면 팝업이 이동합니다.</p>
          </div>
        </div>
      </Popup>
    </div>
  ),
};

// 드래그 및 리사이즈 가능한 팝업
export const DraggableResizablePopup: Story = {
  args: {
    position: 'absolute',
    open: true,
    title: 'Draggable & Resizable Popup',
    draggable: true,
    resizable: true,
    initialX: 50,
    initialY: 50,
    initialWidth: 450,
    onClose: () => console.log('Close clicked'),
    onMove: (x, y) => console.log(`Moved to: ${x},${y}`),
    onResize: (width, height) => console.log(`Resized to: ${width}x${height}`),
  },
  render: args => (
    <div className='relative w-[800px] h-[600px] border border-dashed border-gray-300 bg-gray-50'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <p className='text-gray-500'>
          팝업 헤더를 드래그하여 이동하고, 우측 하단 모서리를 드래그하여 크기를 조절해보세요
        </p>
      </div>
      <Popup 
        {...args}
        footer={
          <div className='flex justify-end gap-2'>
            <Button variant='secondary'>취소</Button>
            <Button>확인</Button>
          </div>
        }
      >
        <div className='space-y-4'>
          <p className='text-gray-600'>
            이 팝업은 헤더 부분을 드래그하여 이동할 수 있고, 우측 하단을 드래그하여 크기를 조절할 수 있습니다.
          </p>
          <div className='bg-gray-100 p-4 rounded'>
            <p className='text-sm'>기능 설명</p>
            <ul className='text-sm mt-2 list-disc pl-5 space-y-1'>
              <li>팝업의 헤더 영역을 마우스로 클릭하고 드래그하면 팝업이 이동합니다.</li>
              <li>팝업의 우측 하단 모서리를 드래그하면 크기를 조절할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </Popup>
    </div>
  ),
};

// 리사이즈 가능한 팝업
export const ResizablePopup: Story = {
  args: {
    position: 'inline',
    open: true,
    title: 'Resizable Popup',
    resizable: true,
    initialWidth: 424,
    onClose: () => console.log('Close clicked'),
    onResize: (width, height) => console.log(`Resized to: ${width}x${height}`),
  },
  render: args => (
    <div className='inline-block'>
      <Popup 
        {...args}
        footer={
          <div className='flex justify-end gap-2'>
            <Button variant='secondary'>취소</Button>
            <Button>확인</Button>
          </div>
        }
      >
        <div className='space-y-4'>
          <p className='text-gray-600'>이 팝업은 우측 하단 모서리를 드래그하여 크기를 조절할 수 있습니다.</p>
          <p className='text-gray-600'>내용이 많을 경우 자동으로 스크롤됩니다.</p>
          <div className='bg-gray-100 p-4 rounded'>
            <p className='text-sm'>추가 콘텐츠 영역</p>
            <p className='text-sm mt-2'>더 많은 내용을 넣어서 팝업의 크기를 늘려보세요.</p>
          </div>
        </div>
      </Popup>
    </div>
  ),
};

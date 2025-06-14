import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import React from 'react';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '태그에 표시될 텍스트',
    },
    backgroundColor: {
      control: 'color',
      description: '태그 배경색',
    },
    textColor: {
      control: 'color',
      description: '태그 텍스트 색상',
    },
    autoWidth: {
      control: 'boolean',
      description: '태그의 너비를 자동으로 조정할지 여부',
    },
    minWidth: {
      control: 'text',
      description: '태그의 최소 너비 (autoWidth가 true일 때 유효)',
    },
    width: {
      control: 'text',
      description: '태그의 고정 너비 (autoWidth가 false일 때 유효)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Waiting',
    backgroundColor: '#e8e8e8',
    textColor: '#64748b',
    autoWidth: false,
    width: '52px',
  },
};

export const AutoWidth: Story = {
  args: {
    children: 'Building Segmentation',
    backgroundColor: '#e8e8e8',
    textColor: '#64748b',
    autoWidth: true,
    minWidth: '52px',
  },
};

export const CustomColor: Story = {
  args: {
    children: 'Processing',
    backgroundColor: '#EDE9FE',
    textColor: '#7C3AED',
    autoWidth: false,
    width: '80px',
  },
};

export const StatusTags: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <Tag backgroundColor='#e8e8e8' textColor='#64748b'>
        Waiting
      </Tag>
      <Tag backgroundColor='#FEE2E2' textColor='#EF4444' width='80px'>
        Failed
      </Tag>
      <Tag backgroundColor='#DCFCE7' textColor='#22C55E' width='90px'>
        Completed
      </Tag>
      <Tag backgroundColor='#EDE9FE' textColor='#7C3AED' width='90px'>
        Processing
      </Tag>
    </div>
  ),
};

export const TagGroups: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <Tag autoWidth>Building</Tag>
        <Tag autoWidth>Road</Tag>
        <Tag autoWidth>Segmentation</Tag>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Tag backgroundColor='#EDE9FE' textColor='#7C3AED' autoWidth>
          AI
        </Tag>
        <Tag backgroundColor='#FEE2E2' textColor='#EF4444' autoWidth>
          ML
        </Tag>
        <Tag backgroundColor='#DCFCE7' textColor='#22C55E' autoWidth>
          GIS
        </Tag>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Tag } from './Tag';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '카드 제목',
    },
    description: {
      control: 'text',
      description: '카드 설명',
    },
    footer: {
      control: { type: undefined },
      description: '카드 하단에 표시될 콘텐츠 (태그, 버튼 등)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'description',
  },
  render: args => (
    <Card 
      {...args}
      footer={
        <div className="flex flex-wrap gap-2">
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            +1
          </Tag>
        </div>
      }
    />
  ),
};

export const WithoutDescription: Story = {
  args: {
    title: 'Title',
  },
  render: args => (
    <Card 
      {...args}
      footer={
        <div className="flex flex-wrap gap-2">
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
        </div>
      }
    />
  ),
};

export const WithoutTags: Story = {
  args: {
    title: 'Title',
    description: 'description',
  },
};

export const WithCustomColorTags: Story = {
  args: {
    title: 'Title',
    description: 'description',
  },
  render: args => (
    <Card 
      {...args}
      footer={
        <div className="flex flex-wrap gap-2">
          <Tag backgroundColor="#EDE9FE" textColor="#7C3AED" autoWidth={true}>
            React
          </Tag>
          <Tag backgroundColor="#DCFCE7" textColor="#22C55E" autoWidth={true}>
            Next.js
          </Tag>
          <Tag backgroundColor="#FEE2E2" textColor="#EF4444" autoWidth={true}>
            TypeScript
          </Tag>
        </div>
      }
    />
  ),
};

export const WithLongDescription: Story = {
  args: {
    title: 'Title',
    description: 'This is a very long description that will be truncated with ellipsis when it exceeds the available space. It will show only the first two lines and then add ellipsis at the end to indicate there is more content.',
  },
  render: args => (
    <Card 
      {...args}
      footer={
        <div className="flex flex-wrap gap-2">
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Chip
          </Tag>
        </div>
      }
    />
  ),
};

export const WithManyTags: Story = {
  args: {
    title: 'Title',
    description: 'Card with many tags to demonstrate the tag limit feature',
  },
  render: args => (
    <Card 
      {...args}
      footer={
        <div className="flex flex-wrap gap-2">
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            React
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Next.js
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            TypeScript
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            +4
          </Tag>
        </div>
      }
    />
  ),
};

export const WithCustomMaxTags: Story = {
  args: {
    title: 'Title',
    description: 'Card with custom maxTags value set to 2',
  },
  render: args => (
    <Card 
      {...args}
      footer={
        <div className="flex flex-wrap gap-2">
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            React
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            Next.js
          </Tag>
          <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
            +3
          </Tag>
        </div>
      }
    />
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card 
        title="Title" 
        description="description"
        footer={
          <div className="flex flex-wrap gap-2">
            <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
              Chip
            </Tag>
            <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
              Chip
            </Tag>
          </div>
        }
      />
      <Card 
        title="Title" 
        description="A longer description text that will demonstrate how multiple lines of text appear in the card component."
        footer={
          <div className="flex flex-wrap gap-2">
            <Tag backgroundColor="#EDE9FE" textColor="#7C3AED" autoWidth={true}>
              React
            </Tag>
            <Tag backgroundColor="#DCFCE7" textColor="#22C55E" autoWidth={true}>
              Next.js
            </Tag>
          </div>
        }
      />
      <Card 
        title="Many Tags Example" 
        description="This card has many tags that won't all fit"
        footer={
          <div className="flex flex-wrap gap-2">
            <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
              Tag 1
            </Tag>
            <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
              Tag 2
            </Tag>
            <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
              Tag 3
            </Tag>
            <Tag backgroundColor="rgba(0,0,0,0.08)" textColor="rgba(0,0,0,0.87)" autoWidth={true}>
              +3
            </Tag>
          </div>
        }
      />
    </div>
  ),
}; 
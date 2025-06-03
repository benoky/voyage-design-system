import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

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
    tags: {
      control: 'object',
      description: '카드 하단에 표시될 태그 목록',
    },
    maxTags: {
      control: { type: 'number', min: 1, max: 10 },
      description: '최대로 표시할 태그 개수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'description',
    tags: [
      { text: 'Chip' },
      { text: 'Chip' },
      { text: 'Chip' },
      { text: 'Chip' },
    ],
    maxTags: 3,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Title',
    tags: [
      { text: 'Chip' },
      { text: 'Chip' },
    ],
  },
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
    tags: [
      { text: 'React', backgroundColor: '#EDE9FE', textColor: '#7C3AED' },
      { text: 'Next.js', backgroundColor: '#DCFCE7', textColor: '#22C55E' },
      { text: 'TypeScript', backgroundColor: '#FEE2E2', textColor: '#EF4444' },
    ],
  },
};

export const WithLongDescription: Story = {
  args: {
    title: 'Title',
    description: 'This is a very long description that will be truncated with ellipsis when it exceeds the available space. It will show only the first two lines and then add ellipsis at the end to indicate there is more content.',
    tags: [
      { text: 'Chip' },
      { text: 'Chip' },
    ],
  },
};

export const WithManyTags: Story = {
  args: {
    title: 'Title',
    description: 'Card with many tags to demonstrate the tag limit feature',
    tags: [
      { text: 'React' },
      { text: 'Next.js' },
      { text: 'TypeScript' },
      { text: 'JavaScript' },
      { text: 'HTML' },
      { text: 'CSS' },
      { text: 'Tailwind' },
    ],
    maxTags: 3,
  },
};

export const WithCustomMaxTags: Story = {
  args: {
    title: 'Title',
    description: 'Card with custom maxTags value set to 2',
    tags: [
      { text: 'React' },
      { text: 'Next.js' },
      { text: 'TypeScript' },
      { text: 'JavaScript' },
      { text: 'HTML' },
    ],
    maxTags: 2,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card 
        title="Title" 
        description="description"
        tags={[{ text: 'Chip' }, { text: 'Chip' }]}
      />
      <Card 
        title="Title" 
        description="A longer description text that will demonstrate how multiple lines of text appear in the card component."
        tags={[
          { text: 'React', backgroundColor: '#EDE9FE', textColor: '#7C3AED' },
          { text: 'Next.js', backgroundColor: '#DCFCE7', textColor: '#22C55E' },
        ]}
      />
      <Card 
        title="Many Tags Example" 
        description="This card has many tags that won't all fit"
        tags={[
          { text: 'Tag 1' }, 
          { text: 'Tag 2' }, 
          { text: 'Tag 3' }, 
          { text: 'Tag 4' },
          { text: 'Tag 5' },
          { text: 'Tag 6' }
        ]}
      />
    </div>
  ),
}; 
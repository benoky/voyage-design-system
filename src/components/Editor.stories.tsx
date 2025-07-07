import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from './Editor';

const meta = {
  title: 'UI/Editor',
  component: Editor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: 'text',
      description: '에디터 초기값',
    },
    onChange: {
      action: 'changed',
      description: '내용 변경 시 호출되는 콜백 함수',
    },
    height: {
      control: 'text',
      description: '에디터 높이',
    },
    width: {
      control: 'text',
      description: '에디터 넓이',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    initialEditType: {
      control: 'select',
      options: ['markdown', 'wysiwyg'],
      description: '초기 편집 타입',
    },
    hideModeSwitch: {
      control: 'boolean',
      description: '모드 스위치 숨김 여부',
    },
    usageStatistics: {
      control: 'boolean',
      description: '사용 통계 수집 여부',
    },
    previewStyle: {
      control: 'select',
      options: ['tab', 'vertical'],
      description: '미리보기 스타일',
    },
    language: {
      control: 'text',
      description: '언어 설정',
    },
  },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요...',
    initialEditType: 'markdown',
    height: '400px',
    width: '100%',
    hideModeSwitch: false,
    usageStatistics: false,
    previewStyle: 'vertical',
    language: 'ko-KR',
  },
};

export const Markdown: Story = {
  args: {
    placeholder: '마크다운으로 작성해보세요...',
    initialEditType: 'markdown',
    height: '400px',
    width: '100%',
    hideModeSwitch: false,
    initialValue: '# 제목\n\n**굵은 글씨**와 *기울임*을 사용할 수 있습니다.\n\n- 목록 아이템 1\n- 목록 아이템 2\n\n```javascript\nconsole.log("Hello World");\n```',
  },
};

export const WYSIWYG: Story = {
  args: {
    placeholder: 'WYSIWYG 모드로 작성해보세요...',
    initialEditType: 'wysiwyg',
    height: '400px',
    width: '100%',
    hideModeSwitch: false,
  },
};

export const WithoutModeSwitch: Story = {
  args: {
    placeholder: '모드 스위치 없는 에디터',
    initialEditType: 'markdown',
    height: '400px',
    width: '100%',
    hideModeSwitch: true,
  },
};

export const CustomHeight: Story = {
  args: {
    placeholder: '높이 600px 에디터',
    initialEditType: 'markdown',
    height: '600px',
    width: '100%',
    hideModeSwitch: false,
  },
};

export const SmallHeight: Story = {
  args: {
    placeholder: '높이 200px 에디터',
    initialEditType: 'markdown',
    height: '200px',
    width: '100%',
    hideModeSwitch: false,
  },
};

export const CustomWidth: Story = {
  args: {
    placeholder: '넓이 600px 에디터',
    initialEditType: 'markdown',
    height: '400px',
    width: '600px',
    hideModeSwitch: false,
  },
};

export const SmallSize: Story = {
  args: {
    placeholder: '작은 크기 에디터',
    initialEditType: 'markdown',
    height: '300px',
    width: '500px',
    hideModeSwitch: false,
  },
};

export const LargeSize: Story = {
  args: {
    placeholder: '큰 크기 에디터',
    initialEditType: 'markdown',
    height: '500px',
    width: '800px',
    hideModeSwitch: false,
  },
};

export const ResponsiveWidth: Story = {
  args: {
    placeholder: '반응형 넓이 에디터',
    initialEditType: 'markdown',
    height: '400px',
    width: '80vw',
    hideModeSwitch: false,
  },
};

export const FixedSize: Story = {
  args: {
    placeholder: '고정 크기 에디터',
    initialEditType: 'markdown',
    height: '350px',
    width: '700px',
    hideModeSwitch: false,
  },
};

export const TabPreview: Story = {
  args: {
    placeholder: '탭 스타일 미리보기',
    initialEditType: 'markdown',
    height: '400px',
    width: '100%',
    previewStyle: 'tab',
    hideModeSwitch: false,
  },
};

export const CustomToolbar: Story = {
  args: {
    placeholder: '커스텀 툴바 에디터',
    initialEditType: 'markdown',
    height: '400px',
    width: '100%',
    hideModeSwitch: false,
    toolbarItems: [
      ['heading', 'bold', 'italic'],
      ['ul', 'ol'],
      ['link', 'image'],
      ['code', 'codeblock']
    ],
  },
};

export const MinimalToolbar: Story = {
  args: {
    placeholder: '최소 툴바 에디터',
    initialEditType: 'markdown',
    height: '400px',
    width: '100%',
    hideModeSwitch: false,
    toolbarItems: [
      ['bold', 'italic'],
      ['ul', 'ol']
    ],
  },
}; 
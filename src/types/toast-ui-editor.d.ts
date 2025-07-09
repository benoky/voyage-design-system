declare module '@toast-ui/editor' {
  export interface EditorOptions {
    el: HTMLElement;
    height?: string;
    initialValue?: string;
    initialEditType?: 'markdown' | 'wysiwyg';
    previewStyle?: 'tab' | 'vertical';
    usageStatistics?: boolean;
    placeholder?: string;
    hideModeSwitch?: boolean;
    language?: string;
    toolbarItems?: string[][];
    events?: {
      change?: () => void;
      [key: string]: (() => void) | undefined;
    };
  }

  export class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    setMarkdown(markdown: string): void;
    getHTML(): string;
    setHTML(html: string): void;
    insertText(text: string): void;
    destroy(): void;
    focus(): void;
    blur(): void;
    exec(command: string): void;
  }
}

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { Editor as ToastUIEditor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { cn } from '@/utils/styleUtils';

export interface EditorProps {
  /**
   * Initial editor content
   */
  initialValue?: string;
  /**
   * Callback function called when content changes
   */
  onChange?: (value: string) => void;
  /**
   * Editor height
   */
  height?: string;
  /**
   * Editor width
   */
  width?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Initial edit type
   */
  initialEditType?: 'markdown' | 'wysiwyg';
  /**
   * Whether to hide mode switch
   */
  hideModeSwitch?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether to collect usage statistics
   */
  usageStatistics?: boolean;
  /**
   * Preview style
   */
  previewStyle?: 'tab' | 'vertical';
  /**
   * Language setting
   */
  language?: string;
  /**
   * Toolbar items
   */
  toolbarItems?: string[][];
}

export interface EditorRef {
  /**
   * Get markdown text
   */
  getMarkdown: () => string;
  /**
   * Set markdown text
   */
  setMarkdown: (markdown: string) => void;
  /**
   * Get HTML
   */
  getHTML: () => string;
  /**
   * Set HTML
   */
  setHTML: (html: string) => void;
  /**
   * Insert text
   */
  insertText: (text: string) => void;
  /**
   * Focus editor
   */
  focus: () => void;
  /**
   * Blur editor
   */
  blur: () => void;
  /**
   * Get editor instance
   */
  getInstance: () => ToastUIEditor | null;
}

/**
 * Editor component
 * A rich text editor based on Toast UI Editor.
 *
 * @param initialValue - Initial editor content
 * @param onChange - Callback function called when content changes
 * @param height - Editor height (default: 400px)
 * @param width - Editor width (default: 100%)
 * @param placeholder - Placeholder text
 * @param initialEditType - Initial edit type (default: markdown)
 * @param hideModeSwitch - Whether to hide mode switch (default: false)
 * @param className - Additional CSS class name
 * @param usageStatistics - Whether to collect usage statistics (default: false)
 * @param previewStyle - Preview style (default: vertical)
 * @param language - Language setting (default: ko-KR)
 * @param toolbarItems - Toolbar items
 * @returns React editor component
 */
const Editor = forwardRef<EditorRef, EditorProps>(
  (
    {
      initialValue = '',
      onChange,
      height = '400px',
      width = '100%',
      placeholder = 'Enter content...',
      initialEditType = 'markdown',
      hideModeSwitch = false,
      className,
      usageStatistics = false,
      previewStyle = 'vertical',
      language = 'ko-KR',
      toolbarItems,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<ToastUIEditor | null>(null);

    useImperativeHandle(ref, () => ({
      getMarkdown: () => editorRef.current?.getMarkdown() || '',
      setMarkdown: (markdown: string) => editorRef.current?.setMarkdown(markdown),
      getHTML: () => editorRef.current?.getHTML() || '',
      setHTML: (html: string) => editorRef.current?.setHTML(html),
      insertText: (text: string) => editorRef.current?.insertText(text),
      focus: () => editorRef.current?.focus(),
      blur: () => editorRef.current?.blur(),
      getInstance: () => editorRef.current,
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      const editorConfig: any = {
        el: containerRef.current,
        height,
        initialValue,
        initialEditType,
        previewStyle,
        usageStatistics,
        placeholder,
        hideModeSwitch,
        language,
        events: {
          change: () => {
            if (onChange && editorRef.current) {
              onChange(editorRef.current.getMarkdown());
            }
          },
        },
      };

      // Add toolbarItems only when defined
      if (toolbarItems) {
        editorConfig.toolbarItems = toolbarItems;
      }

      const editor = new ToastUIEditor(editorConfig);

      editorRef.current = editor;

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }, [
      height,
      initialValue,
      initialEditType,
      previewStyle,
      usageStatistics,
      placeholder,
      hideModeSwitch,
      language,
      toolbarItems,
      onChange,
    ]);

    // Detect initialValue changes
    useEffect(() => {
      if (editorRef.current && initialValue !== undefined) {
        const currentValue = editorRef.current.getMarkdown();
        if (currentValue !== initialValue) {
          editorRef.current.setMarkdown(initialValue);
        }
      }
    }, [initialValue]);

    return (
      <div className={cn('border border-gray-300 rounded-lg overflow-hidden', className)} style={{ width }} {...props}>
        <div ref={containerRef} />
      </div>
    );
  }
);

Editor.displayName = 'Editor';

export { Editor };

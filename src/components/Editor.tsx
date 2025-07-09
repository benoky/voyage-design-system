import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { Editor as ToastUIEditor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { cn } from '@/utils/styleUtils';

export interface EditorProps {
  /** 에디터 초기값 */
  initialValue?: string;
  /** 내용 변경 시 호출되는 콜백 함수 */
  onChange?: (value: string) => void;
  /** 에디터 높이 */
  height?: string;
  /** 에디터 넓이 */
  width?: string;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 초기 편집 타입 */
  initialEditType?: 'markdown' | 'wysiwyg';
  /** 모드 스위치 숨김 여부 */
  hideModeSwitch?: boolean;
  /** 추가 클래스명 */
  className?: string;
  /** 사용 통계 수집 여부 */
  usageStatistics?: boolean;
  /** 미리보기 스타일 */
  previewStyle?: 'tab' | 'vertical';
  /** 언어 설정 */
  language?: string;
  /** 툴바 아이템 */
  toolbarItems?: string[][];
}

export interface EditorRef {
  /** 마크다운 텍스트 가져오기 */
  getMarkdown: () => string;
  /** 마크다운 텍스트 설정하기 */
  setMarkdown: (markdown: string) => void;
  /** HTML 가져오기 */
  getHTML: () => string;
  /** HTML 설정하기 */
  setHTML: (html: string) => void;
  /** 텍스트 삽입 */
  insertText: (text: string) => void;
  /** 에디터 포커스 */
  focus: () => void;
  /** 에디터 블러 */
  blur: () => void;
  /** 에디터 인스턴스 가져오기 */
  getInstance: () => ToastUIEditor | null;
}

/**
 * Toast UI Editor를 기반으로 한 에디터 컴포넌트
 * @param props - 에디터 컴포넌트 속성
 * @param props.initialValue - 에디터 초기값
 * @param props.onChange - 내용 변경 시 호출되는 콜백 함수
 * @param props.height - 에디터 높이 (기본값: 400px)
 * @param props.width - 에디터 넓이 (기본값: 100%)
 * @param props.placeholder - 플레이스홀더 텍스트
 * @param props.initialEditType - 초기 편집 타입 (기본값: markdown)
 * @param props.hideModeSwitch - 모드 스위치 숨김 여부 (기본값: false)
 * @param props.className - 추가 클래스명
 * @param props.usageStatistics - 사용 통계 수집 여부 (기본값: false)
 * @param props.previewStyle - 미리보기 스타일 (기본값: vertical)
 * @param props.language - 언어 설정 (기본값: ko-KR)
 * @param props.toolbarItems - 툴바 아이템
 * @returns React 에디터 컴포넌트
 */
const Editor = forwardRef<EditorRef, EditorProps>(
  (
    {
      initialValue = '',
      onChange,
      height = '400px',
      width = '100%',
      placeholder = '내용을 입력하세요...',
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

      const editor = new ToastUIEditor({
        el: containerRef.current,
        height,
        initialValue,
        initialEditType,
        previewStyle,
        usageStatistics,
        placeholder,
        hideModeSwitch,
        language,
        toolbarItems,
        events: {
          change: () => {
            if (onChange && editorRef.current) {
              onChange(editorRef.current.getMarkdown());
            }
          },
        },
      });

      editorRef.current = editor;

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }, []);

    // initialValue 변경 감지
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

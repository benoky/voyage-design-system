import { forwardRef } from 'react';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { cn } from '@/utils/styleUtils';

export interface EditorProps {
  /** 에디터 초기값 */
  initialValue?: string;
  /** 내용 변경 시 호출되는 콜백 함수 */
  onChange?: () => void;
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
const Editor = forwardRef<HTMLDivElement, EditorProps>(
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
    return (
      <div
        ref={ref}
        className={cn(
          'border border-gray-300 rounded-lg overflow-hidden',
          className
        )}
        style={{ width }}
        {...props}
      >
        <ToastUIEditor
          initialValue={initialValue}
          initialEditType={initialEditType}
          height={height}
          onChange={onChange}
          placeholder={placeholder}
          hideModeSwitch={hideModeSwitch}
          usageStatistics={usageStatistics}
          previewStyle={previewStyle}
          language={language}
          toolbarItems={toolbarItems}
        />
      </div>
    );
  }
);

Editor.displayName = 'Editor';

export { Editor }; 
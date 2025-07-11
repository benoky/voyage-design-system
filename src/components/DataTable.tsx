import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const tableVariants = cva('w-full text-sm', {
  variants: {
    variant: {
      default: 'border-collapse',
      bordered: 'border-collapse border border-[#e2e8f0]',
    },
    size: {
      default: '',
      compact: 'text-xs',
      large: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type DataTableVariantsType = VariantProps<typeof tableVariants>;
type AlignType = 'left' | 'center' | 'right';

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  headerAlign?: AlignType;
  align?: AlignType;
  width?: string | number;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T = any> extends DataTableVariantsType {
  columns: DataTableColumn<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((record: T, index: number) => string);
  maxHeight?: string | number;
  loading?: boolean;
  emptyText?: string;
  showHeader?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

// 정렬 클래스 매핑
const getAlignClass = (align: AlignType = 'left'): string => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    case 'left':
    default:
      return 'text-left';
  }
};

// 기본 정렬 결정 로직
const getDefaultAlign = (dataType: any): AlignType => {
  if (typeof dataType === 'number') return 'right';
  if (typeof dataType === 'boolean') return 'center';
  return 'left';
};

/**
 * 테이블 컴포넌트 <br>
 * @param {TableColumn[]} columns 테이블 컬럼 설정 <br>
 * @param {any[]} data 테이블 데이터 <br>
 * @param {string} variant 테이블 스타일 변형 <br>
 * @param {string} size 테이블 크기 <br>
 * @param {string} className 추가 클래스 이름 <br>
 * @param {string} maxHeight 최대 높이 (스크롤) <br>
 * @param {boolean} loading 로딩 상태 <br>
 * @param {string} emptyText 빈 데이터 텍스트 <br>
 * @param {boolean} showHeader 헤더 표시 여부 <br>
 * @param {boolean} striped 줄무늬 스타일 <br>
 * @param {boolean} hoverable 호버 효과 <br>
 * @returns 테이블 컴포넌트 <br>
 */
const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  variant,
  size,
  className,
  headerClassName,
  bodyClassName,
  rowClassName,
  maxHeight,
  loading = false,
  emptyText = '데이터가 없습니다',
  showHeader = true,
  striped = false,
  hoverable = true,
  ...props
}: DataTableProps<T>) => {
  // 컬럼별 기본 정렬 계산
  const processedColumns = React.useMemo(() => {
    return columns.map(column => {
      const sampleData = data.length > 0 && column.dataIndex ? data[0][column.dataIndex] : null;
      const defaultAlign = getDefaultAlign(sampleData);

      return {
        ...column,
        headerAlign: column.headerAlign || 'left', // 헤더는 기본적으로 왼쪽 정렬
        align: column.align || defaultAlign, // 데이터는 타입에 따라 자동 결정
      };
    });
  }, [columns, data]);

  const getRowClassName = (record: T, index: number): string => {
    const baseClass = 'border-b border-[#f1f5f9]';
    const stripedClass = striped && index % 2 === 1 ? 'bg-[#f8fafc]' : '';
    const hoverClass = hoverable ? 'hover:bg-[#f1f5f9] transition-colors' : '';
    const customClass = typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName || '';

    return cn(baseClass, stripedClass, hoverClass, customClass);
  };

  const renderCell = (column: DataTableColumn<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(column.dataIndex ? record[column.dataIndex] : record, record, index);
    }
    return column.dataIndex ? record[column.dataIndex] : '';
  };

  const tableContent = (
    <table className={cn(tableVariants({ variant, size }), className)} {...props}>
      {showHeader && (
        <thead>
          <tr className='border-b border-[#e2e8f0]'>
            {processedColumns.map(column => (
              <th
                key={column.key}
                className={cn(
                  'p-2 text-[#64748b] font-medium',
                  getAlignClass(column.headerAlign),
                  column.headerClassName,
                  headerClassName
                )}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={bodyClassName}>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className='p-8 text-center text-[#64748b]'>
              로딩 중...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className='p-8 text-center text-[#64748b]'>
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((record, index) => (
            <tr key={index} className={getRowClassName(record, index)}>
              {processedColumns.map(column => (
                <td
                  key={column.key}
                  className={cn('p-2 text-[#0f172a]', getAlignClass(column.align), column.className)}
                  style={{ width: column.width }}
                >
                  {renderCell(column, record, index)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  if (maxHeight) {
    return (
      <div
        className='overflow-auto border border-[#e2e8f0] rounded-[6px]'
        style={{ maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }}
      >
        {tableContent}
      </div>
    );
  }

  return tableContent;
};

export { DataTable };

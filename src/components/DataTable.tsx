import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

// Helper function to determine default alignment based on data type
const getDefaultAlign = (value: any): 'left' | 'center' | 'right' => {
  if (typeof value === 'number') return 'right';
  if (typeof value === 'boolean') return 'center';
  return 'left';
};

const tableVariants = cva('w-full border-collapse text-sm', {
  variants: {
    variant: {
      default: 'border border-[#f1f5f9]',
      bordered: 'border-2 border-[#e2e8f0]',
      borderless: '',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T = any>
  extends VariantProps<typeof tableVariants>,
    Omit<React.TableHTMLAttributes<HTMLTableElement>, 'size'> {
  /**
   * Table column configuration
   */
  columns: DataTableColumn<T>[];
  /**
   * Table data
   */
  data: T[];
  /**
   * Header CSS class name
   */
  headerClassName?: string;
  /**
   * Body CSS class name
   */
  bodyClassName?: string;
  /**
   * Row CSS class name or function
   */
  rowClassName?: string | ((record: T, index: number) => string);
  /**
   * Maximum height with scroll
   */
  maxHeight?: string;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty data text
   */
  emptyText?: string;
  /**
   * Whether to show header
   */
  showHeader?: boolean;
  /**
   * Striped style
   */
  striped?: boolean;
  /**
   * Hover effect
   */
  hoverable?: boolean;
}

/**
 * DataTable component
 * A table component for displaying structured data.
 *
 * @param columns - Table column configuration
 * @param data - Table data
 * @param variant - Table style variant
 * @param size - Table size
 * @param className - Additional CSS classes
 * @param maxHeight - Maximum height with scroll
 * @param loading - Loading state
 * @param emptyText - Empty data text
 * @param showHeader - Whether to show header
 * @param striped - Striped style
 * @param hoverable - Hover effect
 * @returns DataTable component
 */
const DataTable = React.forwardRef<HTMLTableElement, DataTableProps<any>>(
  <T extends Record<string, any>>(
    {
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
      emptyText = 'No data available',
      showHeader = true,
      striped = false,
      hoverable = true,
      ...props
    }: DataTableProps<T>,
    ref: React.Ref<HTMLTableElement>
  ) => {
    // Calculate default alignment for each column
    const processedColumns = React.useMemo(() => {
      return columns.map(column => {
        const sampleData = data.length > 0 && column.dataIndex ? data[0][column.dataIndex] : null;
        const defaultAlign = getDefaultAlign(sampleData);

        return {
          ...column,
          headerAlign: column.headerAlign || 'left', // Header defaults to left alignment
          align: column.align || defaultAlign, // Data alignment determined by type
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
      <table ref={ref} className={cn(tableVariants({ variant, size }), className)} {...props}>
        {showHeader && (
          <thead className={cn('bg-[#f8fafc] border-b-2 border-[#e2e8f0]', headerClassName)}>
            <tr>
              {processedColumns.map(column => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left font-semibold text-[#0f172a]',
                    column.headerAlign === 'center' && 'text-center',
                    column.headerAlign === 'right' && 'text-right',
                    column.headerClassName
                  )}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className={cn(bodyClassName)}>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className='px-4 py-8 text-center text-[#64748b]'>
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='px-4 py-8 text-center text-[#64748b]'>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <tr key={index} className={getRowClassName(record, index)}>
                {processedColumns.map(column => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-[#0f172a]',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      column.className
                    )}
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
        <div className='overflow-auto border border-[#f1f5f9] rounded-lg' style={{ maxHeight }}>
          {tableContent}
        </div>
      );
    }

    return tableContent;
  }
);

DataTable.displayName = 'DataTable';

export { DataTable };

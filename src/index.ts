/**
 * Voyage Design System
 * A modern React component library built with TypeScript and Tailwind CSS
 */

// Core Components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { ContextMenu } from './components/ContextMenu';
export type { ContextMenuProps, MenuItem } from './components/ContextMenu';

export { Input } from './components/Input';
export type { InputProps, InputVariants } from './components/Input';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Popup } from './components/Popup';
export type { PopupProps } from './components/Popup';

export { Portal } from './components/Portal';
export type { PortalProps } from './components/Portal';

export { Editor } from './components/Editor';
export type { EditorProps, EditorRef } from './components/Editor';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Tabs } from './components/Tabs';
export type { TabsProps, TabItem } from './components/Tabs';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps } from './components/Skeleton';

export { DataTable } from './components/DataTable';
export type { DataTableProps, DataTableColumn } from './components/DataTable';

export { Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { Radio } from './components/Radio';
export type { RadioProps, RadioOption } from './components/Radio';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Progress } from './components/Progress';
export type { ProgressProps } from './components/Progress';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';

// Utility Functions
export { popupVariants, DEFAULT_WIDTH, HEADER_HEIGHT, MIN_HEIGHT, adjustPopupPosition } from './utils/popupUtils';

export { cn, useIsomorphicLayoutEffect, useWindow } from './utils/styleUtils';

// Styles (CSS side effect)
import './index.css';

import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['alert', 'confirm'],
      description: '모달 타입',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    description: {
      control: 'text',
      description: '모달 설명',
    },
    open: {
      control: 'boolean',
      description: '모달 열림 여부',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트 (confirm 타입만)',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    onCancel: {
      action: 'onCancel',
      description: '취소 버튼 클릭 핸들러 (confirm 타입만)',
    },
    onConfirm: {
      action: 'onConfirm',
      description: '확인 버튼 클릭 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 기본 Alert 모달
export const AlertModal: Story = {
  args: {
    variant: 'alert',
    title: 'Alert Modal',
    description: 'This is an alert modal. It has only one button to confirm the action.',
    open: true,
    confirmText: 'OK',
    onConfirm: () => console.log('Confirmed'),
  },
};

// 기본 Confirm 모달
export const ConfirmModal: Story = {
  args: {
    variant: 'confirm',
    title: 'Are you sure absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    open: true,
    cancelText: 'Cancel',
    confirmText: 'Continue',
    onCancel: () => console.log('Cancelled'),
    onConfirm: () => console.log('Confirmed'),
  },
};

// 이 스토리는 모달 상태를 제어하여 열고 닫을 수 있는 예제를 보여줍니다
export const ModalWithTrigger: Story = {
  render: function Render() {
    const [openAlert, setOpenAlert] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    return (
      <div className='flex flex-col gap-4'>
        <Button onClick={() => setOpenAlert(true)}>Open Alert Modal</Button>
        <Button onClick={() => setOpenConfirm(true)}>Open Confirm Modal</Button>

        <Modal
          variant='alert'
          title='Information'
          description='This is an information alert modal.'
          open={openAlert}
          confirmText='OK'
          onConfirm={() => setOpenAlert(false)}
        />

        <Modal
          variant='confirm'
          title='Are you sure absolutely sure?'
          description='This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
          open={openConfirm}
          cancelText='Cancel'
          confirmText='Delete Account'
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => {
            console.log('Confirmed deletion');
            setOpenConfirm(false);
          }}
        />
      </div>
    );
  },
};

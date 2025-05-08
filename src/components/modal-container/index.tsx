'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/store/modal.store';
import { X } from 'lucide-react';

export default function ModalContainer() {
  const { modal, closeModal } = useModalStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeModal]);

  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-90 bg-black/50" onClick={closeModal}>
      <div
        className="relative top-1/2 left-1/2 max-h-[90dvh] w-fit -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-primary-gray-500 absolute top-4 right-4 z-[99] cursor-pointer rounded-full p-0.5"
          onClick={closeModal}
        >
          <X size={20} />
        </button>

        {modal}
      </div>
    </div>
  );
}

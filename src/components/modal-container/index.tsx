'use client';

import { useModalStore } from '@/store/modal.store';

export default function ModalContainer() {
  const { modal } = useModalStore();

  if (!modal) return null;

  return (
    <div className="absolute z-99 h-full w-full bg-black/50">
      <div className="relative top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white">
        {modal}
      </div>
    </div>
  );
}

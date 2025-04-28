import { ReactNode } from 'react';

import { create } from 'zustand';

interface Type {
  modal?: ReactNode;
}

interface Action {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

const initialState: Type = {
  modal: undefined,
};

export const useModalStore = create<Type & Action>((set) => ({
  ...initialState,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: undefined }),
}));

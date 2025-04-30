import { create } from 'zustand';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  role: 'USER' | 'ADMIN';
  group: string;
  schoolNumber: string;
  email: string;
  phoneNumber: string;
}

interface Type {
  user?: User;
}

interface Action {
  setUser: (user?: User) => void;
}

const initialState: Type = {
  user: {
    id: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: '손대현',
    role: 'USER',
    group: '소프트웨어융합대학',
    schoolNumber: '20240001',
    email: 'sondaehyeon@kookmin.ac.kr',
    phoneNumber: '010-1234-5678',
  },
};

export const useUserStore = create<Type & Action>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
}));

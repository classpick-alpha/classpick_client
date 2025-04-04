import { create } from 'zustand';

interface Type {
  building?: string;
  people?: number;
  date?: Date;
  room?: number;
}

interface Action {
  setBuilding: (building: string) => void;
  setPeople: (people: number) => void;
  setDate: (date: Date) => void;
  setRoom: (room: number) => void;
}

const initialState: Type = {
  building: undefined,
  people: undefined,
  date: undefined,
  room: undefined,
};

export const useRoomFilterStore = create<Type & Action>((set) => ({
  ...initialState,
  setBuilding: (building: string) => set({ building }),
  setPeople: (people: number) => set({ people }),
  setDate: (date: Date) => set({ date }),
  setRoom: (room: number) => set({ room }),
}));

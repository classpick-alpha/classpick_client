import { create } from 'zustand';

interface Type {
  building?: string;
  people?: number;
  date?: Date;
  room?: number;
}

interface Action {
  setBuilding: (building: string | undefined) => void;
  setPeople: (people: number | undefined) => void;
  setDate: (date: Date | undefined) => void;
  setRoom: (room: number | undefined) => void;
}

const initialState: Type = {
  building: undefined,
  people: undefined,
  date: undefined,
  room: undefined,
};

export const useRoomFilterStore = create<Type & Action>((set) => ({
  ...initialState,
  setBuilding: (building: string | undefined) => set({ building }),
  setPeople: (people: number | undefined) => set({ people }),
  setDate: (date: Date | undefined) => set({ date }),
  setRoom: (room: number | undefined) => set({ room }),
}));

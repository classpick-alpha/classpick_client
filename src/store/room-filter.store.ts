import { create } from 'zustand';

interface Type {
  building?: string;
  people?: number;
  startDate?: Date;
  endDate?: Date;
  room?: number;
}

interface Action {
  setBuilding: (building: string | undefined) => void;
  setPeople: (people: number | undefined) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  setRoom: (room: number | undefined) => void;
}

const initialState: Type = {
  building: undefined,
  people: undefined,
  startDate: undefined,
  endDate: undefined,
  room: undefined,
};

export const useRoomFilterStore = create<Type & Action>((set) => ({
  ...initialState,
  setBuilding: (building: string | undefined) => set({ building }),
  setPeople: (people: number | undefined) => set({ people }),
  setStartDate: (startDate: Date | undefined) => set({ startDate }),
  setEndDate: (endDate: Date | undefined) => set({ endDate }),
  setRoom: (room: number | undefined) => set({ room }),
}));

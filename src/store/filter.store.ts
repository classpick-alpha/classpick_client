import { FilterItem } from '@/components/side-bar/filter';

import { create } from 'zustand';

interface Type {
  building?: string;
  people: number;
  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;
}

interface Action {
  setBuilding: (building: string | undefined) => void;
  setPeople: (people: number) => void;
  setStartDate: (startDate: Date | undefined) => void;
  setEndDate: (endDate: Date | undefined) => void;
  setStartTime: (startTime: Date | undefined) => void;
  setEndTime: (endTime: Date | undefined) => void;
  isActive: (key: FilterItem) => boolean;
}

const initialState: Type = {
  building: undefined,
  people: 0,
  startDate: undefined,
  endDate: undefined,
  startTime: undefined,
  endTime: undefined,
};

export const useFilterStore = create<Type & Action>((set, get) => ({
  ...initialState,
  setBuilding: (building: string | undefined) => set({ building }),
  setPeople: (people: number) => set({ people }),
  setStartDate: (startDate: Date | undefined) => set({ startDate }),
  setEndDate: (endDate: Date | undefined) => set({ endDate }),
  setStartTime: (startTime: Date | undefined) => set({ startTime }),
  setEndTime: (endTime: Date | undefined) => set({ endTime }),
  isActive: (key: FilterItem) => {
    if (key === 'building') return get().building !== undefined;
    if (key === 'people') return get().people !== 0;
    if (key === 'date') return get().startDate !== undefined && get().endDate !== undefined;
    if (key === 'time') return get().startTime !== undefined && get().endTime !== undefined;

    return false;
  },
}));

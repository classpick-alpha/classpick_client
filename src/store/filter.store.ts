import { FilterItem } from '@/components/side-bar/filter';

import { create } from 'zustand';

interface Type {
  placeName?: string;
  capacity: number;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
}

interface Action {
  setPlaceName: (placeName: string | undefined) => void;
  setCapacity: (capacity: number) => void;
  setDate: (date: Date | undefined) => void;
  setStartTime: (startTime: Date | undefined) => void;
  setEndTime: (endTime: Date | undefined) => void;
  isActive: (key: FilterItem) => boolean;
}

const initialState: Type = {
  placeName: undefined,
  capacity: 0,
  date: undefined,
  startTime: undefined,
  endTime: undefined,
};

export const useFilterStore = create<Type & Action>((set, get) => ({
  ...initialState,
  setPlaceName: (placeName: string | undefined) => set({ placeName }),
  setCapacity: (capacity: number) => set({ capacity }),
  setDate: (date: Date | undefined) => set({ date }),
  setStartTime: (startTime: Date | undefined) => set({ startTime }),
  setEndTime: (endTime: Date | undefined) => set({ endTime }),
  isActive: (key: FilterItem) => {
    if (key === 'building') return get().placeName !== undefined;
    if (key === 'people') return get().capacity !== 0;
    if (key === 'date') return get().date !== undefined;
    if (key === 'time') return get().startTime !== undefined && get().endTime !== undefined;

    return false;
  },
}));

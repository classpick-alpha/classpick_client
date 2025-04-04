'use client';

import { Dispatch, SetStateAction, createContext, useCallback, useEffect, useState } from 'react';

import SideBarFilterBuildingItem from '@/components/side-bar/filter/item/building';
import SideBarFilterDateItem from '@/components/side-bar/filter/item/date';
import SideBarFilterPeopleItem from '@/components/side-bar/filter/item/people';
import SideBarFilterRoomItem from '@/components/side-bar/filter/item/room';

export type FilterItem = 'building' | 'people' | 'date' | 'room';

interface SideBarFilterContext {
  open: FilterItem | undefined;
  setOpen: (value: FilterItem | undefined) => void;
  active: FilterItem[];
  setActive: Dispatch<SetStateAction<FilterItem[]>>;
}

export const sideBarFilterContext = createContext<SideBarFilterContext>({} as SideBarFilterContext);

export default function SideBarFilter() {
  const [open, setOpen] = useState<FilterItem>();
  const [active, setActive] = useState<FilterItem[]>([]);

  useEffect(() => {
    setActive(['building']);
    setOpen('building');
  }, []);

  const _setOpen = useCallback(
    (value: FilterItem | undefined) => {
      if (open) {
        setOpen(undefined);
        if (!value) return;
        setTimeout(() => setOpen(value), 400);
      } else {
        setOpen(value);
      }
    },
    [open],
  );

  return (
    <section className="flex flex-col gap-3 px-4 py-6">
      <sideBarFilterContext.Provider value={{ open, setOpen: _setOpen, active, setActive }}>
        <SideBarFilterBuildingItem />
        <SideBarFilterDateItem />
        <SideBarFilterPeopleItem />
        <SideBarFilterRoomItem />
      </sideBarFilterContext.Provider>
    </section>
  );
}

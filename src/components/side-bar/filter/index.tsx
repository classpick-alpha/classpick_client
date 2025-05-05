import { createContext, useCallback, useState } from 'react';

import SideBarFilterBuildingItem from '@/components/side-bar/filter/item/building';
import SideBarFilterDateItem from '@/components/side-bar/filter/item/date';
import SideBarFilterPeopleItem from '@/components/side-bar/filter/item/people';
import SideBarFilterTimeItem from '@/components/side-bar/filter/item/time';

export type FilterItem = 'building' | 'people' | 'date' | 'time';

interface SideBarFilterContext {
  open: FilterItem | undefined;
  setOpen: (value: FilterItem | undefined) => void;
}

export const sideBarFilterContext = createContext<SideBarFilterContext>({} as SideBarFilterContext);

export default function SideBarFilter() {
  const [open, setOpen] = useState<FilterItem>();

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
    <section className="flex flex-col items-center gap-3 py-6">
      <sideBarFilterContext.Provider value={{ open, setOpen: _setOpen }}>
        <SideBarFilterBuildingItem />
        <SideBarFilterPeopleItem />
        <SideBarFilterDateItem />
        <SideBarFilterTimeItem />
      </sideBarFilterContext.Provider>
    </section>
  );
}

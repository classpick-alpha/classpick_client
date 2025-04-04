import { useContext } from 'react';

import { sideBarFilterContext } from '@/components/side-bar/filter';
import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { buildings } from '@/constant/building';
import { useRoomFilterStore } from '@/store/room-filter.store';

export default function SideBarFilterBuildingItem() {
  const { setOpen, setActive } = useContext(sideBarFilterContext);

  const { building, setBuilding, setRoom } = useRoomFilterStore();

  return (
    <SideBarFilterItem
      name="building"
      title="건물"
      value={building}
      placeholder="예약할 강의실의 건물을 선택해주세요"
    >
      <div className="scrollbar-thumb-sidebar-filter-description flex max-h-[140px] flex-col overflow-y-auto pl-3">
        {buildings.map((building) => (
          <p
            key={building}
            className="cursor-pointer py-2 text-sm text-zinc-600 hover:text-zinc-900"
            onClick={() => {
              setBuilding(building);
              setRoom(undefined);
              setActive((prev) => [...prev, 'date']);
              setOpen('date');
            }}
          >
            {building}
          </p>
        ))}
      </div>
    </SideBarFilterItem>
  );
}

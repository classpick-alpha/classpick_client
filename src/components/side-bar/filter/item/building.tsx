import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { buildings } from '@/constant/building';
import { useFilterStore } from '@/store/filter.store';
import { twMerge } from 'tailwind-merge';

export default function SideBarFilterBuildingItem() {
  const { building, setBuilding, isActive } = useFilterStore();

  return (
    <SideBarFilterItem
      name="building"
      title="건물"
      value={building}
      placeholder="예약할 강의실의 건물을 선택해주세요"
    >
      <div
        className={twMerge(
          'flex max-h-[140px] flex-col overflow-y-auto pl-3',
          isActive('building') && 'scrollbar-thumb-classpick-500',
        )}
      >
        {buildings.map((loopedBuilding) => (
          <p
            key={loopedBuilding}
            className={twMerge(
              'cursor-pointer py-2 text-sm',
              building === loopedBuilding ? 'text-classpick-500' : 'text-zinc-600',
            )}
            onClick={() => setBuilding(loopedBuilding)}
          >
            {loopedBuilding}
          </p>
        ))}
      </div>
    </SideBarFilterItem>
  );
}

import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { useFilterStore } from '@/store/filter.store';
import { Add, Minus } from 'iconsax-react';
import colors from 'tailwindcss/colors';

export default function SideBarFilterPeopleItem() {
  const { people, setPeople } = useFilterStore();

  return (
    <SideBarFilterItem
      name="people"
      title="참석인원"
      value={people}
      labelFormatter={(value) => `${value}명`}
      placeholder="강의실을 이용할 총 인원을 선택해주세요"
    >
      <div className="my-5 flex items-center justify-center gap-3">
        <button className="cursor-pointer rounded-full border border-zinc-100 p-2">
          <Minus
            size={16}
            color={colors.zinc['700']}
            onClick={() => setPeople(Math.max(1, people! - 1))}
          />
        </button>
        <div className="flex items-center text-2xl font-extrabold text-zinc-600">
          <input
            type="number"
            className="w-auto text-center focus:outline-none"
            value={people}
            onChange={(e) => setPeople(e.target.valueAsNumber)}
            style={{ width: `${String(people).length + 0.5}ch` }}
          />
        </div>
        <button className="cursor-pointer rounded-full border border-zinc-100 p-2">
          <Add size={16} color={colors.zinc['700']} onClick={() => setPeople(people! + 1)} />
        </button>
      </div>
    </SideBarFilterItem>
  );
}

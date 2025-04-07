'use client';

import { usePathname } from 'next/navigation';

import SideBarFilter from '@/components/side-bar/filter';
import SideBarMenu from '@/components/side-bar/menu';

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="h-[calc(100dvh-80px-32px)] min-w-[300px] rounded-2xl bg-white">
      <SideBarMenu />

      {pathname === '/' && (
        <>
          <hr className="border-1 border-gray-100" />

          <div className="my-2 max-h-[calc(100dvh-80px-32px-156px-16px)] overflow-y-auto">
            <SideBarFilter />
          </div>
        </>
      )}
    </div>
  );
}

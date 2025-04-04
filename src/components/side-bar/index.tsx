import SideBarFilter from '@/components/side-bar/filter';
import SideBarMenu from '@/components/side-bar/menu';

export default function SideBar() {
  return (
    <div className="h-[calc(100dvh-80px-32px)] min-w-[280px] rounded-2xl bg-white">
      <SideBarMenu />

      <hr className="border-1 border-gray-100" />

      <div className="max-h-[580px] overflow-y-auto">
        <SideBarFilter />
      </div>
    </div>
  );
}

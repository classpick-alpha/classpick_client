import Link from 'next/link';

import { SideBarMenu } from '@/constant/side-bar-menu';

interface SideBarMenuItemProps {
  menu: SideBarMenu;
}

export default function SideBarMenuItem({ menu }: SideBarMenuItemProps) {
  return (
    <div className="flex items-center gap-3.5 px-8 py-2">
      <menu.icon size={24} color="var(--color-sidebar-primary)" />
      <Link href={menu.link} className="text-sidebar-primary font-bold">
        {menu.content}
      </Link>
    </div>
  );
}

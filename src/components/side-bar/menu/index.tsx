import SideBarMenuItem from '@/components/side-bar/menu/item';

import { Role } from '@/api/dto/user';
import { adminSideBarMenu, sideBarMenu } from '@/constant/side-bar-menu';
import { useUserStore } from '@/store/user.store';

export default function SideBarMenu({ close }: { close?: () => void }) {
  const { user } = useUserStore();

  return (
    <section className="py-4.5">
      {(user?.role === Role.MANAGER ? adminSideBarMenu : sideBarMenu).map((menu) => (
        <SideBarMenuItem key={menu.link} menu={menu} close={close} />
      ))}
    </section>
  );
}

import SideBarMenuItem from '@/components/side-bar/menu/item';

import { sideBarMenu } from '@/constant/side-bar-menu';

export default function SideBarMenu({ close }: { close?: () => void }) {
  return (
    <section className="py-4.5">
      {sideBarMenu.map((menu) => (
        <SideBarMenuItem key={menu.link} menu={menu} close={close} />
      ))}
    </section>
  );
}

import { useState } from 'react';

import Link from 'next/link';

import { SideBarMenu } from '@/constant/side-bar-menu';

interface SideBarMenuItemProps {
  menu: SideBarMenu;
  close?: () => void;
}

export default function SideBarMenuItem({ menu, close }: SideBarMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={menu.link}
      className="text-sidebar-primary hover:text-sidebar-primary-hover flex items-center gap-3.5 px-8 py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={close}
    >
      <menu.icon
        size={24}
        color={isHovered ? 'var(--color-sidebar-primary-hover)' : 'var(--color-sidebar-primary)'}
      />
      <p className="font-bold">{menu.content}</p>
    </Link>
  );
}

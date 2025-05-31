import { Category, Icon, LocationTick, TaskSquare } from 'iconsax-react';

export interface SideBarMenu {
  icon: Icon;
  content: string;
  link: string;
}

export const sideBarMenu: SideBarMenu[] = [
  {
    icon: Category,
    content: '홈',
    link: '/',
  },
  {
    icon: TaskSquare,
    content: '마이페이지',
    link: '/my-page',
  },
];

export const adminSideBarMenu: SideBarMenu[] = [
  ...sideBarMenu,
  {
    icon: LocationTick,
    content: '예약 현황',
    link: '/admin/reservation',
  },
];

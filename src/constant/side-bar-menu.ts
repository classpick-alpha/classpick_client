import { Category, Icon, Setting2, TaskSquare } from 'iconsax-react';

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
    content: '예약내역',
    link: '/my-reservation',
  },
  {
    icon: Setting2,
    content: '설정',
    link: '/setting',
  },
];

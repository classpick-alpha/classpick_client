import { Category, Icon, TaskSquare } from 'iconsax-react';

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
  // {
  //   icon: Setting2,
  //   content: '설정',
  //   link: '/setting',
  // },
];

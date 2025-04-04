import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Header from '@/components/header';
import SideBar from '@/components/side-bar';

import '@/style/global.css';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Classpick',
  description: 'Classpick',
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body className="flex flex-col">
        <Header />
        <main className="flex gap-3.5 p-4">
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}

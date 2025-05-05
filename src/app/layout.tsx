import { ReactNode } from 'react';

import type { Metadata } from 'next';

import ClientLayout from '@/app/client-layout';

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

'use client';

import { ReactNode, useEffect } from 'react';

import { redirect, usePathname } from 'next/navigation';

import Header from '@/components/header';
import ModalContainer from '@/components/modal-container';
import SideBar from '@/components/side-bar';

import Api from '@/api';
import { UserResponse } from '@/api/dto/user';
import { useInitStore } from '@/store/init.store';
import { useUserStore } from '@/store/user.store';
import { Toaster } from 'sonner';

export const ADDITIONAL_INFO: (keyof UserResponse)[] = [
  'name',
  'userGroup',
  'schoolNumber',
  'phoneNumber',
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const { isInit, setInit } = useInitStore();
  const { user } = useUserStore();

  useEffect(() => {
    setInit(false);

    (async () => {
      const token = localStorage.getItem('token');

      if (token) {
        await Api.Request.setToken(token);
      }

      setInit(true);
    })();
  }, []);

  useEffect(() => {
    if (!isInit || user) return;
    if (
      pathname === '/auth/login' ||
      pathname === '/auth/callback/success' ||
      pathname === '/auth/callback/failure'
    )
      return;
    redirect('/auth/login');
  }, [isInit]);

  useEffect(() => {
    if (!isInit || !user) return;
    if (ADDITIONAL_INFO.every((key) => user[key])) return;
    if (pathname === '/auth/additional-info') return;
    redirect('/auth/additional-info');
  }, [isInit, user, pathname]);

  if (!isInit) return null;

  return (
    <>
      {pathname.startsWith('/auth') ? (
        children
      ) : (
        <>
          <Header />
          <main className="flex gap-3.5 p-4">
            <SideBar />
            {children}
          </main>
        </>
      )}
      <ModalContainer />
      <Toaster />
    </>
  );
}

'use client';

import { useEffect } from 'react';

import { redirect, useSearchParams } from 'next/navigation';

import Api from '@/api';

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;
    Api.Request.setToken(token).then(() => {
      redirect('/');
    });
  }, [searchParams.get('token')]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="title2-pretendard">로그인중...</h1>
    </div>
  );
}

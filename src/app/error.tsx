'use client';

import Link from 'next/link';

import { Home, Play } from 'iconsax-react';
import colors from 'tailwindcss/colors';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Page({ reset }: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4">
      <h1 className="text-8xl font-bold">500</h1>
      <h2 className="text-2xl font-bold">오류가 발생했습니다</h2>
      <p className="text-neutral-500">페이지를 불러오던 중 오류가 발생했습니다.</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/">
          <button className="flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 outline outline-black">
            <Home size={16} color={colors.black} />
            <span className="text-sm">메인으로 돌아가기</span>
          </button>
        </Link>
        <button
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-6 py-3"
          onClick={reset}
        >
          <Play size={16} color={colors.white} />
          <span className="text-sm text-white">다시 시도하기</span>
        </button>
      </div>
    </div>
  );
}

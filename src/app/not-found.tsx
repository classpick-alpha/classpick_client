import Link from 'next/link';

import { Home } from 'iconsax-react';
import colors from 'tailwindcss/colors';

export default function Page() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-white p-4">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
      <p className="text-neutral-500">요청하신 페이지가 존재하지 않습니다.</p>
      <Link href="/">
        <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-6 py-3">
          <Home size={16} color={colors.white} />
          <span className="text-sm text-white">메인으로 돌아가기</span>
        </button>
      </Link>
    </div>
  );
}

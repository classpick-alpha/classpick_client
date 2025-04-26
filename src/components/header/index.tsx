import Link from 'next/link';

import { HambergerMenu, MessageQuestion, Notification, SearchNormal1 } from 'iconsax-react';
import colors from 'tailwindcss/colors';

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-300 bg-white px-10 md:px-20">
      <section>
        <Link href="/" className="flex items-center gap-2">
          {/* TODO: 로고 이미지 교체 */}
          <div className="size-6.5 rounded-full bg-zinc-300" />
          <p className="text-classpick-500 text-2xl font-extrabold tracking-[-1.8px]">ClassPick</p>
        </Link>
      </section>

      <section className="hidden w-[500px] xl:block">
        <div className="flex w-full gap-4 rounded-lg border border-neutral-400 bg-gray-100 px-4 py-3">
          <SearchNormal1 size={24} color={colors.neutral['400']} />
          <input
            className="w-full text-sm focus:outline-0"
            placeholder="뭐든 궁금한게 있으면 물어보세요"
          />
        </div>
      </section>

      <div className="hidden items-center gap-10 md:flex xl:gap-20">
        <section className="flex gap-6">
          <button className="cursor-pointer p-2">
            <MessageQuestion size={24} color="var(--color-sidebar-primary)" />
          </button>
          <button className="cursor-pointer p-2">
            <Notification size={24} color="var(--color-sidebar-primary)" />
          </button>
        </section>

        <div className="flex flex-col items-end">
          <p className="leading-5 text-neutral-700">Seo Myung Kyun</p>
          <p className="text-sm text-zinc-500">Industrial Design</p>
        </div>
      </div>

      <div className="block md:hidden">
        <button className="cursor-pointer p-2">
          <HambergerMenu size={24} color={colors.zinc['700']} />
        </button>
      </div>
    </header>
  );
}

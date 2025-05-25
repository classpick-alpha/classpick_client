'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetContent, SheetTrigger } from '@/components/sheet';
import SideBarFilter from '@/components/side-bar/filter';
import SideBarMenu from '@/components/side-bar/menu';

import { useUserStore } from '@/store/user.store';
import { HambergerMenu } from 'iconsax-react';
import colors from 'tailwindcss/colors';

export default function Header() {
  const pathname = usePathname();

  const { user } = useUserStore();

  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-300 bg-white px-10 md:h-20 md:px-20">
      <section>
        <Link
          href="/"
          className="font-work-sans text-classpick-500 text-2xl font-black tracking-[-1.5px]"
        >
          ClassPick
        </Link>
      </section>

      {/*<section className="hidden w-[500px] xl:block">*/}
      {/*  <div className="flex w-full gap-4 rounded-lg border border-neutral-400 bg-gray-100 px-4 py-3">*/}
      {/*    <SearchNormal1 size={24} color={colors.neutral['400']} />*/}
      {/*    <input*/}
      {/*      className="w-full text-sm focus:outline-0"*/}
      {/*      placeholder="뭐든 궁금한게 있으면 물어보세요"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</section>*/}

      <div className="hidden items-center gap-10 md:flex xl:gap-20">
        {/*<section className="flex gap-6">*/}
        {/*  <button className="cursor-pointer p-2">*/}
        {/*    <MessageQuestion size={24} color="var(--color-sidebar-primary)" />*/}
        {/*  </button>*/}
        {/*  <button className="cursor-pointer p-2">*/}
        {/*    <Notification size={24} color="var(--color-sidebar-primary)" />*/}
        {/*  </button>*/}
        {/*</section>*/}

        <div className="flex flex-col items-end">
          <p className="leading-5 text-neutral-700">{user.name}</p>
          <p className="text-sm text-zinc-500">{user.userGroup}</p>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="block md:hidden">
          <button className="cursor-pointer p-2">
            <HambergerMenu size={24} color={colors.zinc['700']} />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SideBarMenu close={() => setOpen(false)} />
          <hr className="border-1 border-gray-100" />
          {pathname === '/' && <SideBarFilter />}
        </SheetContent>
      </Sheet>
    </header>
  );
}

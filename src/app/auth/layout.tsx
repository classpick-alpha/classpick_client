'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { BottomCloud, TopCloud } from '@/app/auth/_component/cloud';
import { IconDescription } from '@/app/auth/_component/icon-description';
import OnboardImage from '@/app/auth/_component/onboard-image';

import { KeySquare, Pointer } from 'iconsax-react';
import { Magnet, Undo2 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <TopCloud className="absolute top-0 left-0 w-[700px]" />
      <BottomCloud className="absolute -right-4 bottom-0 w-[700px]" />

      <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-2 rounded-2xl bg-white/70">
          <section
            className="m-2 flex flex-col gap-18 rounded-2xl px-6 py-9"
            style={{
              background:
                'linear-gradient(155deg, #4E51FF 4.98%, #7070F9 21.56%, #9C97F1 42.63%, rgba(61, 162, 255, 0.20) 86.1%, rgba(61, 162, 255, 0.11) 98.2%)',
            }}
          >
            <div
              className="subtitle2-pretendard flex cursor-pointer items-center gap-2 text-white"
              onClick={router.back}
            >
              <Undo2 />
              <p>뒤로 돌아가기</p>
            </div>

            <div className="flex flex-col gap-10 px-10">
              <h1 className="font-nanum text-3xl leading-12 font-extrabold text-white">
                카페 도서관 눈치게임은 그만,
                <br />
                언제 어디서나 강의실을 내 공간으로!
              </h1>

              <div className="flex flex-col gap-5">
                <IconDescription
                  icon={KeySquare}
                  description="조용하고 쾌적한 학교 빈 강의실을 자습실처럼 활용!"
                />

                <IconDescription
                  icon={Pointer}
                  description="복잡한 서류, 방문, 기다림 없이 온라인 클릭 몇번으로 예약"
                />

                <IconDescription
                  icon={Magnet}
                  description="실시간 빈 강의실 확인하고 나에게 맞는 강의실 손쉽게 선택"
                />
              </div>
            </div>

            <OnboardImage className="w-[370px] self-center" />
          </section>

          <section className="flex flex-col gap-10 px-28 py-12">
            <p className="font-work-sans text-classpick-500 text-2xl font-black tracking-[-1.5px]">
              ClassPick
            </p>
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';

import Button from '@/components/button';

import ConfettiImage from '@/public/modal/confetti.png';

import { useModalStore } from '@/store/modal.store';
import { motion } from 'framer-motion';
import { TickCircle } from 'iconsax-react';
import colors from 'tailwindcss/colors';

export default function ReserveSuccessSummaryModal() {
  const { closeModal } = useModalStore();

  return (
    <div className="relative h-full w-[350px] overflow-hidden bg-gray-50 sm:w-[450px]">
      <div className="absolute inset-0 z-0">
        <div
          className="tob-[-20%] pointer-events-none absolute left-1/2 h-[100%] w-[200%] -translate-x-1/2 opacity-50"
          style={{
            background: 'radial-gradient(ellipse at bottom center, #595cff 20%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute z-10 h-full w-full"
      >
        <Image src={ConfettiImage} alt="confetti" fill priority />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 pt-9 pb-4">
        <div className="w-fit rounded-full border border-neutral-200 bg-gradient-to-b from-neutral-100 to-transparent p-6 backdrop-blur-md">
          <div className="rounded-full border border-gray-200 bg-white p-4">
            <TickCircle size={32} color={colors.slate['600']} variant="Bold" />
          </div>
        </div>

        <section className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <h2 className="subtitle1-nanum text-primary-gray-800">강의실 예약을 성공하였습니다!</h2>
            <h3 className="caption1-nanum text-white">예약 내역에서 확인할 수 있어요</h3>
          </div>
        </section>

        <section className="flex w-full justify-center gap-2 px-7">
          <Button onClick={closeModal}>
            <TickCircle size={18} color="white" variant="Bold" />
            확인했어요
          </Button>
        </section>
      </div>
    </div>
  );
}

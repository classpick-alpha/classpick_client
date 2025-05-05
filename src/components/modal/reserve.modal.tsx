import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import { TextAreaInput } from '@/components/form/text-area-input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { ChecklistIcon } from '@primer/octicons-react';
import { Message, TickCircle } from 'iconsax-react';
import { Forward } from 'lucide-react';

export default function ReserveModal() {
  const { closeModal } = useModalStore();

  const { user } = useUserStore();

  if (!user) return null;

  return (
    <GridIconModal
      width={550}
      icon={Message}
      title="예약 신청한 강의실을 확인해보세요!"
      description="잘못 신청하더라도 언제든지 취소할 수 있어요."
      buttons={
        <>
          <Button onClick={closeModal}>
            <TickCircle size={18} color="white" variant="Bold" />
            확인했어요
          </Button>
          <Button variant="white" onClick={closeModal} className="w-auto min-w-fit">
            <Forward size={18} color="var(--color-classpick-500)" />
            공유하기
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <section className="flex items-center gap-2">
          <div className="bg-classpick-300 flex items-center justify-center rounded-full p-1.5">
            <ChecklistIcon size={14} className="text-white" />
          </div>
          <h2 className="subtitle1-pretendard">강의실 예약 정보</h2>
        </section>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="신청자명">
            <Input value={user.schoolNumber} readOnly />
            <Input value={user.name} readOnly />
          </FormField>

          <FormField label="이메일">
            <Input value={user.email} readOnly />
          </FormField>

          <FormField label="연락처">
            <Input value={user.phoneNumber} readOnly />
          </FormField>

          <FormField label="참석인원">
            <Input defaultValue={1} type="number" suffix="명" />
          </FormField>

          <FormField label="날짜">
            <Input value="2025.04.10 목" readOnly />
          </FormField>

          <FormField label="시간">
            <Input value="14:00" readOnly />
            <span className="subtitle2-pretendard text-neutral-400">부터</span>
            <Input value="16:00" readOnly />
            <span className="subtitle2-pretendard text-neutral-400">까지</span>
          </FormField>

          <FormField label="장소">
            <Input value="미래관 1층 2호실" readOnly />
          </FormField>

          <hr className="col-span-2 -mx-7 w-[494px] text-indigo-50" />

          <FormField label="사용목적" className="col-span-2" required>
            <TextAreaInput placeholder="강의실 사용 목적을 적어주세요" />
          </FormField>

          <FormField label="요구사항" className="col-span-2">
            <TextAreaInput placeholder="예약시 요구사항이 있다면 적어주세요" />
          </FormField>
        </div>
      </div>
    </GridIconModal>
  );
}

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import { ReservationResponse } from '@/api/dto/reservation';
import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TickCircle, Warning2 } from 'iconsax-react';

interface ReserveRejectedDetailModalProps {
  reservation: ReservationResponse;
}

export default function ReserveRejectedDetailModal({
  reservation,
}: ReserveRejectedDetailModalProps) {
  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  if (!user) return null;

  return (
    <GridIconModal
      width={550}
      color="var(--color-system-alarm)"
      icon={Warning2}
      iconColor="var(--color-system-alarm)"
      title="예약 신청한 강의실이 반려됐어요"
      buttons={
        <>
          <Button variant="secondary" onClick={closeModal}>
            <TickCircle size={18} color="white" variant="Bold" />
            확인했어요
          </Button>
          {/* TODO: 공유하기를 누르면 어떤 일이 일어나나요 */}
          {/*<Button variant="white" className="w-auto min-w-fit">*/}
          {/*  <Forward size={18} />*/}
          {/*  공유하기*/}
          {/*</Button>*/}
        </>
      }
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <FormField label="신청자명">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={user.schoolNumber}
            disabled
          />
          <Input variant="modal" className="text-primary-gray-600" value={user.name} disabled />
        </FormField>

        <FormField label="이메일">
          <Input variant="modal" className="text-primary-gray-600" value={user.email} disabled />
        </FormField>

        <FormField label="연락처">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={user.phoneNumber}
            disabled
          />
        </FormField>

        <FormField label="참석인원">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.people + ' 명'}
            disabled
          />
        </FormField>

        <FormField label="날짜">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={format(parse(reservation.date, 'yyyy-MM-dd', new Date()), 'yyyy.MM.dd E', {
              locale: ko,
            })}
            disabled
          />
        </FormField>

        <FormField label="시간">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.startTime}
            disabled
          />
          <span className="subtitle2-pretendard text-neutral-400">부터</span>
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.endTime}
            disabled
          />
          <span className="subtitle2-pretendard text-neutral-400">까지</span>
        </FormField>

        <FormField label="장소">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={`${reservation.room.placeName} ${reservation.room.unitNumber}호`}
            disabled
          />
        </FormField>
      </div>
    </GridIconModal>
  );
}

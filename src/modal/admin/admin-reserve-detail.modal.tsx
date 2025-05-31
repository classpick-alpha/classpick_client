import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import { TextAreaInput } from '@/components/form/text-area-input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import { UserReservationResponse } from '@/api/dto/reservation';
import { useModalStore } from '@/store/modal.store';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArchiveBox, TickCircle } from 'iconsax-react';

interface AdminReserveDetailModalProps {
  reservation: UserReservationResponse;
}

export default function AdminReserveDetailModal({ reservation }: AdminReserveDetailModalProps) {
  const { closeModal } = useModalStore();

  return (
    <GridIconModal
      width={550}
      color="var(--color-primary-gray-500)"
      icon={ArchiveBox}
      iconColor="var(--color-primary-gray-500)"
      title="예약 상세 정보"
      buttons={
        <>
          <Button variant="secondary" onClick={closeModal}>
            <TickCircle size={18} color="white" variant="Bold" />
            확인했어요
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <FormField label="신청자명">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.user.schoolNumber}
            disabled
          />
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.user.name}
            disabled
          />
        </FormField>

        <FormField label="이메일">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.user.email}
            disabled
          />
        </FormField>

        <FormField label="연락처">
          <Input
            variant="modal"
            className="text-primary-gray-600"
            value={reservation.user.phoneNumber}
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

        <FormField label="사용목적" className="col-span-2">
          <TextAreaInput value={reservation.purpose} readOnly />
        </FormField>
      </div>
    </GridIconModal>
  );
}

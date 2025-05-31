import { Dispatch, SetStateAction, useCallback } from 'react';

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import { TextAreaInput } from '@/components/form/text-area-input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import Api from '@/api';
import { UserReservationResponse } from '@/api/dto/reservation';
import { useApiWithToast } from '@/hook/use-api';
import { useModalStore } from '@/store/modal.store';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CloseCircle, ShieldTick, TickCircle } from 'iconsax-react';

interface AdminReserveApproveModalProps {
  reservation: UserReservationResponse;
  setReservations: Dispatch<SetStateAction<UserReservationResponse[]>>;
}

export default function AdminReserveApproveModal({
  reservation,
  setReservations,
}: AdminReserveApproveModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { closeModal } = useModalStore();

  const handleApprove = useCallback(() => {
    startApi(
      async () => {
        await Api.Domain.ReservationAdmin.approveReservation(reservation.reservationId);
        const { userReservations } = await Api.Domain.ReservationAdmin.getUserReservationsList();
        setReservations(userReservations);
      },
      {
        loading: '예약을 승인하는 중입니다.',
        success: '예약이 승인했습니다.',
        finally: closeModal,
      },
    );
  }, [reservation]);

  const handleReject = useCallback(() => {
    startApi(
      async () => {
        await Api.Domain.ReservationAdmin.rejectReservation(reservation.reservationId);
        const { userReservations } = await Api.Domain.ReservationAdmin.getUserReservationsList();
        setReservations(userReservations);
      },
      {
        loading: '예약을 반려하는 중입니다.',
        success: '예약이 반려했습니다.',
        finally: closeModal,
      },
    );
  }, [reservation]);

  return (
    <GridIconModal
      width={550}
      color="var(--color-classpick-500)"
      icon={ShieldTick}
      iconColor="var(--color-classpick-500)"
      title="예약 상세 정보"
      buttons={
        <>
          <Button variant="white" onClick={handleReject} disabled={isApiProcessing}>
            <CloseCircle size={18} color="black" variant="Bold" />
            반려하기
          </Button>
          <Button variant="primary" onClick={handleApprove} disabled={isApiProcessing}>
            <TickCircle size={18} color="white" variant="Bold" />
            승인하기
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

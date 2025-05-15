import { Dispatch, SetStateAction, useCallback } from 'react';

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import Api from '@/api';
import { ReservationResponse } from '@/api/dto/reservation';
import { useApiWithToast } from '@/hook/use-api';
import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TickCircle, Warning2 } from 'iconsax-react';
import { Trash2 } from 'lucide-react';
import colors from 'tailwindcss/colors';

interface ReserveRejectedDetailModalProps {
  reservation: ReservationResponse;
  setReservations: Dispatch<SetStateAction<ReservationResponse[]>>;
}

export default function ReserveDetailModal({
  reservation,
  setReservations,
}: ReserveRejectedDetailModalProps) {
  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  const [isApiProcessing, startApi] = useApiWithToast();

  const handleCancelReservation = useCallback(() => {
    if (!user) return;
    startApi(
      async () => {
        await Api.Domain.Reservation.cancelReservation(reservation.reservationId);
        setReservations((prev) =>
          prev.filter((x) => x.reservationId !== reservation.reservationId),
        );
      },
      {
        loading: '강의실 예약을 취소하고 있습니다.',
        success: '강의실 예약이 취소되었습니다.',
        finally: closeModal,
      },
    );
  }, [closeModal, user, reservation, setReservations]);

  if (!user) return null;

  return (
    <GridIconModal
      width={550}
      color={colors.gray[500]}
      icon={Warning2}
      iconColor={colors.gray[500]}
      title="예약한 강의실을 확인해주세요"
      buttons={
        <>
          <Button variant="secondary" onClick={closeModal}>
            <TickCircle size={18} color="white" variant="Bold" />
            확인했습니다.
          </Button>
          <Button
            variant="white"
            className="w-auto min-w-fit"
            disabled={isApiProcessing}
            onClick={handleCancelReservation}
          >
            <Trash2 size={18} />
            예약 취소
          </Button>
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

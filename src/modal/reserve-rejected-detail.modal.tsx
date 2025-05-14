import { useEffect, useState } from 'react';

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import { ReservationResponse } from '@/api/dto/reservation';
import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { checkLocation } from '@/util/gps-validator';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TickCircle, Warning2 } from 'iconsax-react';
import { Folder, Forward } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ReserveRejectedDetailModalProps {
  reservation: ReservationResponse;
}

export default function ReserveRejectedDetailModal({
  reservation,
}: ReserveRejectedDetailModalProps) {
  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  const [validatedLocation, setValidatedLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const validated = await checkLocation();
      setValidatedLocation(validated);
    })();
  }, []);

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
          <Button variant="white" className="w-auto min-w-fit">
            <Forward size={18} />
            공유하기
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h2 className="subtitle2-nanum text-system-alarm">서류를 다시 업로드해주세요</h2>
            <h3 className="body1-pretendard text-primary-gray-600 text-center">
              신청자 이름과 제출된 서류상의 성함과 동일하지 않습니다.
              <br />
              다시 확인해서 업로드해주세요.
            </h3>
          </div>

          <div
            className={twMerge(
              'border-system-alarm flex flex-col items-center gap-1 rounded border border-dashed py-5',
              validatedLocation && 'cursor-pointer hover:bg-gray-50',
            )}
          >
            {validatedLocation ? (
              <>
                <div className="flex items-center gap-1.5">
                  <Folder size={22} color="black" />
                  <p className="subtitle2-nanum text-primary-gray-600">파일 선택</p>
                </div>
                <p className="body2-nanum text-neutral-500">파일을 여기로 끌어 놓으세요</p>
              </>
            ) : (
              <p className="body2-pretendard text-system-alarm">
                국민대학교 내부에서만 인증할 수 있습니다.
              </p>
            )}
          </div>
        </div>

        <hr className="-mx-6 w-[394px] border-gray-200" />

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
      </div>
    </GridIconModal>
  );
}

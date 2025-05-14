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
import { Folder, Forward } from 'lucide-react';

interface ReserveRejectedDetailModalProps {
  reservation: ReservationResponse;
}

export default function ReserveSuccessDetailModal({
  reservation,
}: ReserveRejectedDetailModalProps) {
  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  if (!user) return null;

  return (
    <GridIconModal
      width={550}
      color="var(--color-system-alarm3)"
      icon={Warning2}
      iconColor="var(--color-system-alarm3)"
      title="이용한 강의실을 사진으로 인증해주세요"
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
            <h2 className="subtitle2-nanum text-system-alarm3">
              강의실 사진을 촬영하여 업로드해주세요
            </h2>
            <h3 className="body1-pretendard text-primary-gray-600 text-center">
              모든 이용자분 들을 위한 조치이니 협조 부탁드립니다.
            </h3>
          </div>

          <div className="border-system-alarm3 flex cursor-pointer flex-col items-center gap-1 rounded border border-dashed py-5 hover:bg-gray-50">
            <div className="flex items-center gap-1.5">
              <Folder size={22} color="black" />
              <p className="subtitle2-nanum text-primary-gray-600">파일 선택</p>
            </div>
            <p className="body2-nanum text-neutral-500">파일을 여기로 끌어 놓으세요</p>
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

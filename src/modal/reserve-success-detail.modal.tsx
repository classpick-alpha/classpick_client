import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';
import Uploader from '@/components/uploader';

import Api from '@/api';
import { ReservationResponse } from '@/api/dto/reservation';
import { useApiWithToast } from '@/hook/use-api';
import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { checkLocation } from '@/util/gps-validator';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TickCircle, Warning2 } from 'iconsax-react';
import { Forward } from 'lucide-react';

interface ReserveRejectedDetailModalProps {
  reservation: ReservationResponse;
  setReservations: Dispatch<SetStateAction<ReservationResponse[]>>;
}

export default function ReserveSuccessDetailModal({
  reservation,
  setReservations,
}: ReserveRejectedDetailModalProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { user } = useUserStore();
  const { closeModal } = useModalStore();

  const [validatedLocation, setValidatedLocation] = useState(false);
  const [image, setImage] = useState<File>();

  const handleProcessOcr = useCallback(() => {
    if (!user || !image) return;
    startApi(
      async () => {
        const { url } = await Api.Domain.Reservation.generateOcrImage(reservation.reservationId);

        const s3Response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': image.type,
          },
          body: image,
        });

        if (!s3Response.ok) {
          throw new Error('사진 업로드에 실패했습니다.');
        }

        const { success } = await Api.Domain.Reservation.verifyOcr(reservation.reservationId, {
          imageUrl: url.split('?')[0],
        });

        if (!success) {
          throw new Error('사진 인증에 실패했습니다.');
        }

        setReservations((prev) =>
          prev.map((x) =>
            x.reservationId === reservation.reservationId ? { ...x, ocrVerified: true } : x,
          ),
        );
      },
      {
        loading: '인증을 진행중입니다.',
        success: '인증이 완료되었습니다.',
        finally: closeModal,
      },
    );
  }, [reservation, user, image]);

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
      color="var(--color-system-alarm3)"
      icon={Warning2}
      iconColor="var(--color-system-alarm3)"
      title="이용한 강의실을 사진으로 인증해주세요"
      buttons={
        <>
          <Button
            variant="secondary"
            disabled={isApiProcessing || !image}
            onClick={handleProcessOcr}
          >
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

          {validatedLocation ? (
            <Uploader onChangeFile={setImage} />
          ) : (
            <p className="border-system-alarm3 body2-pretendard text-system-alarm3 flex flex-col items-center gap-1 rounded border border-dashed py-5">
              국민대학교 내부에서만 인증할 수 있습니다.
            </p>
          )}
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

import { Dispatch, SetStateAction, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import { TextAreaInput } from '@/components/form/text-area-input';
import GridIconModal from '@/components/modal-container/grid-icon-modal';
import ReserveSuccessModal from '@/components/modal/reserve-success.modal';

import Api from '@/api';
import { CreateReservationRequest, CreateReservationRequestSchema } from '@/api/dto/reservation';
import { DailyReservation, RoomResponse } from '@/api/dto/room';
import { useApiWithToast } from '@/hook/use-api';
import { useFilterStore } from '@/store/filter.store';
import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChecklistIcon } from '@primer/octicons-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Message, TickCircle } from 'iconsax-react';
import { Forward } from 'lucide-react';

interface ReserveModalProps {
  room: RoomResponse;
  date: Date;
  startTime: Date;
  endTime: Date;
  setTimeTable: Dispatch<SetStateAction<DailyReservation[]>>;
}

export default function ReserveModal({
  room,
  date,
  startTime,
  endTime,
  setTimeTable,
}: ReserveModalProps) {
  const { openModal } = useModalStore();
  const { user } = useUserStore();
  const { capacity } = useFilterStore();

  const [isApiProcessing, startApi] = useApiWithToast();

  const form = useForm<CreateReservationRequest>({
    resolver: zodResolver(CreateReservationRequestSchema),
    defaultValues: {
      people: capacity || 1,
      date: format(date, 'yyyy-MM-dd'),
      startTime: format(startTime, 'HH:mm'),
      endTime: format(endTime, 'HH:mm'),
      purpose: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<CreateReservationRequest> = useCallback(
    (body) => {
      startApi(
        async () => {
          const { date, startTime, endTime, status } =
            await Api.Domain.Reservation.createReservation(room.roomId, body);

          setTimeTable((prev) => {
            const find = prev.find((reservation) => reservation.date === date);

            if (find) {
              return [
                ...prev.filter((reservation) => reservation.date !== date),
                {
                  date: find.date,
                  reservations: [
                    ...find.reservations,
                    {
                      startTime,
                      endTime,
                      status,
                    },
                  ],
                },
              ];
            } else {
              return [...prev, { date, reservations: [{ startTime, endTime, status }] }];
            }
          });

          openModal(<ReserveSuccessModal />);
        },
        {
          loading: '강의실을 예약하고 있습니다.',
          success: '강의실을 예약했습니다.',
        },
      );
    },
    [room],
  );

  if (!user) return null;

  return (
    <GridIconModal
      width={550}
      icon={Message}
      title="예약 신청한 강의실을 확인해보세요!"
      description="잘못 신청하더라도 언제든지 취소할 수 있어요."
      buttons={
        <>
          <Button disabled={isApiProcessing} onClick={form.handleSubmit(onSubmit)}>
            <TickCircle size={18} color="white" variant="Bold" />
            확인했어요
          </Button>
          {/* TODO: 공유하기를 누르면 어떤 일이 일어나나요 */}
          <Button variant="white" className="w-auto min-w-fit">
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
            <Input variant="modal" value={user.schoolNumber} disabled />
            <Input variant="modal" value={user.name} disabled />
          </FormField>

          <FormField label="이메일">
            <Input variant="modal" value={user.email} disabled />
          </FormField>

          <FormField label="연락처">
            <Input variant="modal" value={user.phoneNumber} disabled />
          </FormField>

          <FormField label="참석인원" error={form.formState.errors.people?.message}>
            <Input
              variant="modal"
              type="number"
              {...form.register('people', { valueAsNumber: true })}
              suffix="명"
            />
          </FormField>

          <FormField label="날짜">
            <Input variant="modal" value={format(date, 'yyyy.MM.dd E', { locale: ko })} disabled />
          </FormField>

          <FormField label="시간">
            <Input variant="modal" value={format(startTime, 'HH:mm')} disabled />
            <span className="subtitle2-pretendard text-neutral-400">부터</span>
            <Input variant="modal" value={format(endTime, 'HH:mm')} disabled />
            <span className="subtitle2-pretendard text-neutral-400">까지</span>
          </FormField>

          <FormField label="장소">
            <Input variant="modal" value={`${room.placeName} ${room.unitNumber}`} disabled />
          </FormField>

          <hr className="col-span-2 -mx-7 w-[494px] text-indigo-50" />

          <FormField
            label="사용목적"
            className="col-span-2"
            required
            error={form.formState.errors.purpose?.message}
          >
            <TextAreaInput
              placeholder="강의실 사용 목적을 적어주세요"
              {...form.register('purpose')}
            />
          </FormField>

          <FormField
            label="요구사항"
            className="col-span-2"
            error={form.formState.errors.comment?.message}
          >
            <TextAreaInput
              placeholder="예약시 요구사항이 있다면 적어주세요"
              {...form.register('comment')}
            />
          </FormField>
        </div>
      </div>
    </GridIconModal>
  );
}

import Button from '@/components/button';
import GridIconModal from '@/components/modal-container/grid-icon-modal';

import { useModalStore } from '@/store/modal.store';
import { TickCircle, Warning2 } from 'iconsax-react';

export default function ReserveRejectedSummaryModal() {
  const { closeModal } = useModalStore();

  return (
    <GridIconModal
      icon={Warning2}
      title="예약 신청한 강의실이 반려됐어요"
      description="예약내역에서 반려 이유를 확인해보세요!"
      buttons={
        <Button variant="secondary" onClick={closeModal}>
          <TickCircle size={18} color="white" variant="Bold" />
          확인했어요
        </Button>
      }
    />
  );
}

import { endHour, splitMinute, startHour } from '@/app/[id]/_config';

export default function useTimetableCell() {
  const slots: number[] = [];

  let current = startHour * 60;
  const end = endHour * 60;

  while (current < end) {
    slots.push(current - startHour * 60);
    current += splitMinute;
  }

  return slots;
}

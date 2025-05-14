import { useEffect, useMemo, useState } from 'react';

import { endHour, pxPerMinute, startHour } from '@/app/[id]/_config';

import { now, nowExcludeTime } from '@/util';
import { getHours } from 'date-fns';

interface TableCurrentBarProps {
  date: Date;
}

export default function TableCurrentBar({ date }: TableCurrentBarProps) {
  const [current, setCurrent] = useState(now());

  const top = useMemo(
    () => Math.max(0, current.getHours() - startHour) * 60 + current.getMinutes(),
    [current],
  );

  useEffect(() => {
    const interval = setInterval(() => setCurrent(now()), 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  if (date.getTime() !== nowExcludeTime().getTime()) return null;

  if (getHours(current) < startHour || getHours(current) >= endHour) return null;

  return (
    <hr
      className="border-system-alarm pointer-events-none absolute z-10 w-full border-[1.5px]"
      style={{ top: `${top * pxPerMinute}px` }}
    />
  );
}

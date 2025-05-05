import { useEffect, useMemo, useState } from 'react';

import { pxPerMinute, startHour } from '@/app/[id]/_config';

import { now, nowExcludeTime } from '@/util';

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

  return (
    <hr
      className="pointer-events-none absolute z-30 w-full border-2 border-rose-400"
      style={{ top: `${top * pxPerMinute}px` }}
    />
  );
}

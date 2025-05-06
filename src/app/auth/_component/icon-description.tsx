import { useMemo } from 'react';

import { Icon } from 'iconsax-react';
import { LucideIcon } from 'lucide-react';

interface IconDescriptionProps {
  icon: Icon | LucideIcon;
  description: string;
}

export function IconDescription({ icon, description }: IconDescriptionProps) {
  const Icon = useMemo(() => icon, [icon]);

  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-white p-1">
        <Icon size={20} color="var(--color-classpick-500)" />
      </div>
      <p className="subtitle2-nanum text-white">{description}</p>
    </div>
  );
}

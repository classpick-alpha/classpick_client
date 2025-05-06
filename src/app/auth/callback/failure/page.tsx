'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Button from '@/components/button';

import { Key } from 'iconsax-react';

const ERROR_MAP: Record<string, string> = {
  NOT_KOOKMIN_EMAIL: '국민대학교 계정으로만 가입할 수 있습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
};

export default function Page() {
  const searchParams = useSearchParams();

  const error = searchParams.get('error') || 'UNKNOWN';

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="title2-pretendard">
        {Object.keys(ERROR_MAP).some((e) => e === error) ? ERROR_MAP[error] : ERROR_MAP['UNKNOWN']}
      </h1>
      <Link href="/auth/login">
        <Button>
          <Key size={16} color="white" />
          <span className="text-sm">로그인하기</span>
        </Button>
      </Link>
    </div>
  );
}

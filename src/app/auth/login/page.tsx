import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button';

import GoogleIcon from '@/public/auth/google.png';

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="title1-nanum text-classpick-500">Google로 시작하기</p>
        <p className="subtitle2-nanum text-classpick-300 font-medium">
          학교 구글계정으로 회원가입 및 로그인 할 수 있습니다.
        </p>
      </div>

      <hr className="text-zinc-400" />

      <Link href={process.env.NEXT_PUBLIC_API_URL + '/api/oauth2/authorization/google'}>
        <Button variant="white" className="border-classpick-300 border-2 hover:bg-neutral-50">
          <Image src={GoogleIcon} alt="google" width={24} height={24} className="size-[24px]" />
        </Button>
      </Link>

      <div className="flex flex-col items-center gap-3">
        <p className="text-primary-gray-800 caption1-pretendard">
          국민대학교 학교 계정으로만 서비스 이용 가능합니다
        </p>
        <div className="flex flex-col items-center gap-1">
          <p className="caption1-pretendard leading-0 text-zinc-400">
            By signing up to create an account I accept Company’s
          </p>
          <p className="caption1-pretendard text-slate-800">Terms of use & Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}

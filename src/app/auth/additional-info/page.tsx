'use client';

import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { redirect } from 'next/navigation';

import Button from '@/components/button';
import { FormField } from '@/components/form/form-field';
import { Input } from '@/components/form/input';
import { Select } from '@/components/form/select';

import Api from '@/api';
import { UpdateUserRequest, UpdateUserRequestSchema } from '@/api/dto/user';
import { useApiWithToast } from '@/hook/use-api';
import { useUserStore } from '@/store/user.store';
import { departments } from '@/util/departments';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Page() {
  const [isApiProcessing, startApi] = useApiWithToast();

  const { user, setUser } = useUserStore();

  const form = useForm<UpdateUserRequest>({
    resolver: zodResolver(UpdateUserRequestSchema),
    defaultValues: {
      name: user?.name,
      userGroup: user?.userGroup,
      schoolNumber: user?.schoolNumber,
      phoneNumber: user?.phoneNumber,
    },
  });

  const name = form.watch('name');
  const userGroup = form.watch('userGroup');
  const schoolNumber = form.watch('schoolNumber');
  const phoneNumber = form.watch('phoneNumber');

  const onSubmit: SubmitHandler<UpdateUserRequest> = useCallback(
    (body) => {
      if (!user) return;

      startApi(
        async () => {
          const response = await Api.Domain.User.updateUserInfo(body);
          setUser(response);
          setTimeout(() => redirect('/'));
        },
        {
          loading: '추가 정보를 입력하고 있습니다',
          success: '추가 정보를 입력했습니다.',
        },
      );
    },
    [user],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="title1-nanum text-classpick-500">Google로 시작하기</p>
        <p className="subtitle2-nanum text-classpick-300 font-medium">
          회원가입 시 추가적인 정보가 필요해요.
        </p>
      </div>

      <form className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField label="이름" error={form.formState.errors.name?.message}>
            <Input
              variant="auth"
              placeholder="이름을 입력해주세요"
              disabled={!!user?.name}
              active={!!name}
              {...form.register('name')}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="학과" error={form.formState.errors.userGroup?.message}>
              <Select
                placeholder="학과를 선택해주세요"
                disabled={!!user?.userGroup}
                active={!!userGroup}
                {...form.register('userGroup')}
              >
                {Object.entries(departments).map(([college, majors]) => (
                  <optgroup key={college} label={college}>
                    {majors.map((major) => (
                      <option key={major} value={college + ' ' + major}>
                        {major}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </FormField>

            <FormField label="학번" error={form.formState.errors.schoolNumber?.message}>
              <Input
                variant="auth"
                placeholder="학번을 입력해주세요"
                disabled={!!user?.schoolNumber}
                active={!!schoolNumber}
                {...form.register('schoolNumber')}
              />
            </FormField>
          </div>

          <FormField label="휴대폰 번호" error={form.formState.errors.phoneNumber?.message}>
            <Input
              variant="auth"
              placeholder="휴대폰 번호 입력해주세요"
              disabled={!!user?.phoneNumber}
              active={!!phoneNumber}
              {...form.register('phoneNumber', {
                onChange: (e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, '');
                  let formatted = rawValue;

                  if (rawValue.length < 4) {
                    formatted = rawValue;
                  } else if (rawValue.length < 7) {
                    formatted = rawValue.slice(0, 3) + '-' + rawValue.slice(3);
                  } else if (rawValue.length < 11) {
                    formatted =
                      rawValue.slice(0, 3) + '-' + rawValue.slice(3, 6) + '-' + rawValue.slice(6);
                  } else {
                    formatted =
                      rawValue.slice(0, 3) +
                      '-' +
                      rawValue.slice(3, 7) +
                      '-' +
                      rawValue.slice(7, 11);
                  }

                  form.setValue('phoneNumber', formatted);
                },
              })}
            />
          </FormField>
        </div>

        <Button disabled={isApiProcessing}>회원가입</Button>
      </form>

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

'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Container } from '@components/layout';
import { LoginForm } from '@components/form';
import { deleteCookie, getCookie } from '@utils/storage';

export default function LoginClient() {
  // 로그인 상태에서 로그인 페이지 접근 시 메인 페이지로 리다이렉트
  useQuery(['checkLogin'], () => axios.get('/api/user/login'), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  // 에러로 인한 리다이렉트 시 메시지 출력
  React.useEffect(() => {
    const message = getCookie('message') as string;
    if (message) {
      alert(decodeURIComponent(message));
      deleteCookie('message');
    }
  }, []);

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

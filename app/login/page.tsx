'use client';

import React from 'react';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { LoginForm } from '@components/form';
import { deleteCookie, getCookie } from '@utils/storage';

export default function Login() {
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

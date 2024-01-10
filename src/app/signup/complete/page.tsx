'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import * as Icons from '@components/icons';
import { Container } from '@components/layout';
import { Button } from '@components/button';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';

export default function SignUpComplete() {
  const router = useRouter();
  return (
    <Container
      style={{
        backgroundColor: theme.palette.common.white,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: 30,
          marginTop: 110,
        }}
      >
        <Typography variant={'h3'} color={'gray.dark'}>
          가입을 진심으로 축하해요!
        </Typography>
      </div>

      <div style={{ padding: '10px 30px' }}>
        <img src={'/images/icons/signup_complete.png'} width={'100%'} />
      </div>

      <Typography
        variant={'subtitle1'}
        color={'gray.dark'}
        style={{ marginTop: 16 }}
      >
        앞으로 감성일기에서 추억을 쌓아가세요
      </Typography>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          maxWidth: 600,
          padding: '40px 30px',
        }}
      >
        <Button
          color={'secondary'}
          style={{ width: '100%' }}
          onClick={() => router.push('/')}
        >
          <Typography variant={'label1'} color={'common.white'}>
            기록하러 가기
          </Typography>
        </Button>
      </div>
    </Container>
  );
}

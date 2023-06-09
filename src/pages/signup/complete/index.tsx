import React from 'react';
import router from 'next/router';

import * as Icons from '@components/icons';
import { Container } from '@components/layout';
import { Button } from '@components/form/style';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';

export default function SignUpComplete() {
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
        <Typography
          variant={'subtitle1'}
          color={'gray.dark'}
          style={{ marginTop: 16 }}
        >
          앞으로 감성일기에서 추억을 쌓아가세요
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '35%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '5px',
            marginBottom: '12px',
          }}
        >
          <Icons.Heart width={22} height={20} />
          <Icons.HeartWhite width={35} height={33} />
        </div>
        <Icons.Coffee width={76} height={53} />
      </div>

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

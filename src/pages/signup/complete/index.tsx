import React from 'react';
import router from 'next/router';

import * as Icons from '@components/icons';
import { Container } from '@components/layout';
import { Button } from '@components/form/style';
import { Typography } from '@components/typography';

export default function SignUpComplete() {
  return (
    <Container style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          <Icons.Heart />
          <Icons.HeartWhite />
        </div>
        <img
          src={'/images/icons/coffee.png'}
          alt={'coffee'}
          width={76}
          height={53}
        />
        <Typography.h2 style={{ color: '#FFF' }}>
          가입을 축하해요!
        </Typography.h2>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: '40px 30px',
        }}
      >
        <Button
          color={'secondary'}
          style={{ width: '100%' }}
          onClick={() => router.push('/')}
        >
          기록하러 가기
        </Button>
      </div>
    </Container>
  );
}

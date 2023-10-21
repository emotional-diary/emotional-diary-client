'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { IconButton } from '@components/button';
import * as Icons from '@components/icons';
import { theme } from 'src/theme';
import { StyledInfoBox } from '../page';

export default function Terms() {
  const router = useRouter();

  return (
    <Container
      headerProps={{
        back: true,
      }}
      bodyProps={{
        style: {
          backgroundColor: theme.palette.common.white,
          padding: '0 30px 30px 30px',
          alignItems: 'flex-start',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '14px',
        }}
      >
        <Typography variant={'h3'}>이용약관</Typography>
      </div>

      <IconButton
        onClick={() => {
          /** */
        }}
        style={{ width: '100%', marginTop: '24px' }}
      >
        <StyledInfoBox>
          <Typography variant={'subtitle2'} color={'gray.dark'}>
            서비스 이용약관
          </Typography>
          <Icons.Arrow direction={'right'} width={12} height={12} />
        </StyledInfoBox>
      </IconButton>

      <IconButton
        onClick={() => {
          /** */
        }}
        style={{ width: '100%', marginTop: '15px' }}
      >
        <StyledInfoBox>
          <Typography variant={'subtitle2'} color={'gray.dark'}>
            개인정보 처리방침
          </Typography>
          <Icons.Arrow direction={'right'} width={12} height={12} />
        </StyledInfoBox>
      </IconButton>
    </Container>
  );
}

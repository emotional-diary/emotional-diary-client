'use client';

import React from 'react';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';
import { TERMS } from 'src/constants/terms';

export default function TermsUse() {
  return (
    <Container
      headerProps={{
        back: true,
        style: {
          position: 'fixed',
          top: 0,
          zIndex: 10,
        },
      }}
      bodyProps={{
        style: {
          backgroundColor: theme.palette.common.white,
          padding: '0 30px 30px 30px',
          alignItems: 'flex-start',
          marginTop: '84px',
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
        <Typography variant={'h3'}>서비스 이용약관</Typography>
      </div>

      <Typography
        variant={'subtitle2'}
        color={'gray.dark'}
        style={{ marginTop: '24px' }}
      >
        {TERMS.USE}
      </Typography>
    </Container>
  );
}

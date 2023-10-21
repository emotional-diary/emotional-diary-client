'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { IconButton } from '@components/button';
import { theme } from 'src/theme';
import * as Icons from '@components/icons';

export const StyledInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 50px;
  background-color: ${props => props.theme.palette.gray.light};
`;

export default function Setting() {
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
        <Typography variant={'h3'}>설정</Typography>
      </div>

      <IconButton
        onClick={() => router.push('/setting/profile')}
        style={{ width: '100%', marginTop: '24px' }}
      >
        <StyledInfoBox>
          <Typography variant={'subtitle2'} color={'gray.dark'}>
            회원정보
          </Typography>
          <Icons.Arrow direction={'right'} width={12} height={12} />
        </StyledInfoBox>
      </IconButton>

      <IconButton
        onClick={() => router.push('/setting/inquiry')}
        style={{ width: '100%', marginTop: '15px' }}
      >
        <StyledInfoBox>
          <Typography variant={'subtitle2'} color={'gray.dark'}>
            문의하기
          </Typography>
          <Icons.Arrow direction={'right'} width={12} height={12} />
        </StyledInfoBox>
      </IconButton>

      <IconButton
        onClick={() => router.push('/setting/terms')}
        style={{ width: '100%', marginTop: '15px' }}
      >
        <StyledInfoBox>
          <Typography variant={'subtitle2'} color={'gray.dark'}>
            이용약관
          </Typography>
          <Icons.Arrow direction={'right'} width={12} height={12} />
        </StyledInfoBox>
      </IconButton>

      <StyledInfoBox style={{ marginTop: '15px' }}>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          버전정보
        </Typography>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          v1.0.0
        </Typography>
      </StyledInfoBox>
    </Container>
  );
}

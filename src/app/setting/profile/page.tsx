'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { Button } from '@components/button';
import { theme } from 'src/theme';
import { useUserStore } from '@store/index';
import { WithdrawalModal } from '@components/modal';
import { StyledInfoBox } from 'src/app/setting/page';

export default function Profile() {
  const router = useRouter();
  const { user } = useUserStore();
  const [info, setInfo] = React.useState<User>();

  const withdrawalModal = (() => {
    const [open, setOpen] = React.useState(false);

    return {
      open,
      setOpen,
    };
  })();

  const gender = {
    MALE: '남성',
    FEMALE: '여성',
  };

  React.useEffect(() => {
    setInfo(user);
  }, []);

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
      <WithdrawalModal
        open={withdrawalModal.open}
        onClose={() => withdrawalModal.setOpen(false)}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '14px',
        }}
      >
        <Typography variant={'h3'}>회원정보</Typography>

        <Button
          style={{ height: 34, padding: '10px', borderRadius: '10px' }}
          color={'tertiary.light'}
          onClick={() => router.push('/setting/profile/modify')}
        >
          <Typography variant={'label2'} color={'tertiary.main'}>
            회원정보 수정하기
          </Typography>
        </Button>
      </div>

      <StyledInfoBox style={{ marginTop: '24px' }}>
        <Typography variant={'body4'} color={'gray.dark'}>
          나의 이름
        </Typography>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          {info?.name}
        </Typography>
      </StyledInfoBox>

      <StyledInfoBox style={{ marginTop: '15px' }}>
        <Typography variant={'body4'} color={'gray.dark'}>
          나의 이메일
        </Typography>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          {info?.email}
        </Typography>
      </StyledInfoBox>

      <StyledInfoBox style={{ marginTop: '15px' }}>
        <Typography variant={'body4'} color={'gray.dark'}>
          나의 성별
        </Typography>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          {gender[info?.gender as 'MALE' | 'FEMALE']}
        </Typography>
      </StyledInfoBox>

      <StyledInfoBox style={{ marginTop: '15px' }}>
        <Typography variant={'body4'} color={'gray.dark'}>
          내가 태어난날
        </Typography>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          {info?.birth}
        </Typography>
      </StyledInfoBox>

      <Button
        color={'error.light'}
        style={{
          height: 34,
          padding: '10px 12px',
          margin: '30px auto 0px',
          borderRadius: '10px',
        }}
        onClick={() => withdrawalModal.setOpen(true)}
      >
        <Typography variant={'label2'} color={'error.main'}>
          탈퇴하기
        </Typography>
      </Button>
    </Container>
  );
}

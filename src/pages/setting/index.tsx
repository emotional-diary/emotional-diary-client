import React from 'react';
import router from 'next/router';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { Button } from '@components/form/style';
import { theme } from 'src/theme';
import { useUserStore } from '@store/index';
import { WithdrawalModal } from '@components/modal';

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
    male: '남성',
    female: '여성',
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
          onClick={() => router.push('/mypage/modify')}
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
          {info?.nickname}
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
          {gender[info?.gender as 'male' | 'female']}
        </Typography>
      </StyledInfoBox>

      <StyledInfoBox style={{ marginTop: '15px' }}>
        <Typography variant={'body4'} color={'gray.dark'}>
          내가 태어난날
        </Typography>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          {info?.birthday}
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

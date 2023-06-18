import React from 'react';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { Button, IconButton } from '@components/form/style';
import { Calendar } from '@components/calendar';
import Tooltip from '@components/tooltip';
import { Card } from '@components/styled';

import { theme } from 'src/theme';
import { useCalendarStore, useUserStore } from '../store';
import 'react-datepicker/dist/react-datepicker.css';
import { DiaryCard } from '@components/card';

interface Props {
  profile: {
    nickname: string;
  };
}

// top background
const StyledTopBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: ${props => props.theme.palette.primary.main};
`;

const MessageOfToday = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14px 16px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const BottomFixedLayout = styled.div`
  position: absolute;
  bottom: 60px;
  right: 30px;
`;

export default function Home({ ...props }: Props) {
  const { user, setUser } = useUserStore();
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(true);

  React.useEffect(() => {
    if (!user?.nickname) {
      setUser({
        ...user,
        nickname: props.profile?.nickname,
      });
    }
  }, [user]);

  console.log('user', user);

  return (
    <Container
      headerProps={{
        title: '감성일기',
        bgcolor: theme.palette.primary.main,
      }}
      bodyProps={{
        style: {
          backgroundColor: theme.palette.common.white,
          padding: '0 30px 30px 30px',
        },
      }}
    >
      <StyledTopBackground />

      <MessageOfToday>
        <Typography variant={'subtitle2'} color={'gray.dark'}>
          <Typography
            component={'span'}
            variant={'subtitle2'}
            color={'secondary.light'}
            style={{ marginRight: '4px' }}
          >
            {user.nickname ?? props.profile?.nickname}님
          </Typography>
          오늘은 어떤 하루였나요?
        </Typography>
      </MessageOfToday>

      <Calendar />

      <DiaryCard />

      <BottomFixedLayout>
        <Tooltip
          anchor={'left'}
          open={isTooltipOpen}
          text={'오늘도 나의 하루를 기록해보세요'}
        >
          <IconButton
            onClick={() => {
              setIsTooltipOpen(false);
              router.push('/diary/new');
            }}
          >
            <Icons.CircleMenu />
          </IconButton>
        </Tooltip>
      </BottomFixedLayout>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = req.cookies.accessToken;
  const nickname = decodeURIComponent(accessToken || '');

  if (!accessToken || !nickname) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return {
    props: {
      profile: {
        nickname,
      },
    },
  };
};

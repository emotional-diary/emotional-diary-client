'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { Button, IconButton } from '@components/form/style';
import { Calendar } from '@components/calendar';
import Tooltip from '@components/tooltip';
import { DiaryCard } from '@components/card';
import { dateToSting } from '@utils/index';

import { theme } from 'src/theme';
import {
  useCalendarStore,
  useDiaryListStore,
  useDiaryStore,
  useUserStore,
} from '../../src/store';
import 'react-datepicker/dist/react-datepicker.css';
import { HomeProps } from 'app/page';

// top background
export const StyledTopBackground = styled.div`
  position: absolute;
  left: 0;
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

export default function HomePage({ props }: { props: HomeProps }) {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { diary } = useDiaryStore();
  const { diaryList } = useDiaryListStore();
  const {
    calendar: { selectedDate },
  } = useCalendarStore();
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(true);

  const selectedDiary = React.useMemo(() => {
    if (!selectedDate) return null;
    if (!diaryList.length) return null;
    const diary = diaryList.find(
      diary =>
        dateToSting(new Date(diary.diaryAt)) === dateToSting(selectedDate)
    );
    return diary;
  }, [selectedDate, diaryList]);

  // console.log('props', props);

  React.useEffect(() => {
    if (!user?.nickname) {
      setUser({
        ...user,
        nickname: props.profile?.nickname,
      });
    }
  }, []);

  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
    //TODO: localstorage에 저장
  };

  const handleWriteDiary = () => {
    if (selectedDate > new Date()) {
      alert('이후 날짜의 일기는 미리 작성할 수 없어요.');
      return;
    }
    if (selectedDiary) {
      alert('이미 작성한 일기가 있어요.');
      return;
    }

    handleTooltipClose();
    router.push('/diary/new?step=0');
  };

  // console.log('user', user);
  // console.log('diaryList', diaryList);

  return (
    <Container
      headerProps={{
        title: '감성일기',
        bgcolor: theme.palette.primary.main,
        icon: (
          <IconButton onClick={() => router.push('/mypage')}>
            <Icons.User />
          </IconButton>
        ),
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
          {diary?.aiComment ? (
            <div dangerouslySetInnerHTML={{ __html: diary.aiComment }} />
          ) : (
            <>
              <Typography
                component={'span'}
                variant={'subtitle2'}
                color={'secondary.light'}
                style={{ marginRight: '4px' }}
              >
                {user.nickname ?? props.profile?.nickname}님
              </Typography>
              오늘은 어떤 하루였나요?
            </>
          )}
        </Typography>
      </MessageOfToday>

      <Calendar />

      <DiaryCard />

      <BottomFixedLayout>
        <Tooltip
          anchor={'left'}
          open={isTooltipOpen}
          onClose={handleTooltipClose}
          text={'오늘도 나의 하루를 기록해보세요'}
        >
          <IconButton onClick={handleWriteDiary}>
            <img
              src={'/images/icons/diary_new.png'}
              alt={'diary_new'}
              width={60}
              height={60}
            />
          </IconButton>
        </Tooltip>
      </BottomFixedLayout>
    </Container>
  );
}

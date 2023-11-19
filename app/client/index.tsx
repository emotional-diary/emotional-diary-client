'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { Button, IconButton } from '@components/button';
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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const BottomFixedLayout = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

export default function HomePage({ props }: { props: HomeProps }) {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { diary, resetDiary } = useDiaryStore();
  const { diaryList, setDiaryList } = useDiaryListStore(user?.userID)();
  const {
    calendar: { selectedDate },
  } = useCalendarStore();
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(true);

  const getDiaryList = useQuery({
    queryKey: ['diaries'],
    queryFn: async () => {
      const res = await axios.get('/api/diaries');
      return res.data;
    },
    enabled: false,
    retry: false,
  });

  const selectedDiary = React.useMemo(() => {
    if (!selectedDate) return null;
    if (!diaryList.length) return null;
    const diary = diaryList.find(
      diary =>
        dateToSting(new Date(diary.diaryAt)) === dateToSting(selectedDate)
    );
    return diary;
  }, [selectedDate, diaryList]);

  const existTodayDiary = React.useMemo(() => {
    if (!diaryList.length) return false;
    const diary = diaryList.find(
      diary => dateToSting(new Date(diary.diaryAt)) === dateToSting(new Date())
    );
    return !!diary;
  }, [diaryList]);

  React.useEffect(() => {
    if (!user?.name || user.userID !== props.profile?.userID) {
      setUser(props.profile);
    }
  }, []);

  React.useEffect(() => {
    if (isEmpty(user)) return;

    const diaryList = window.localStorage.getItem(
      `diary-list-${user.userID}`
    ) as string;
    const parsedDiaryList = JSON.parse(diaryList) as {
      state: {
        diaryList: Diary[];
      };
      version: number;
    };
    console.log('parsedDiaryList', parsedDiaryList?.state?.diaryList);
    if (!parsedDiaryList?.state?.diaryList?.length) {
      (async () => {
        const { data: result } = await getDiaryList.refetch();
        console.log('data', result);
        if (result) {
          setDiaryList(result.data.diarysDtoList);
        }
      })();
    }
  }, [user]);

  React.useEffect(() => {
    if (!selectedDiary) {
      resetDiary();
    }
  }, [selectedDiary]);

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
        style: {
          paddingTop: '20px',
          paddingBottom: '20px',
        },
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
          {selectedDiary?.comment ? (
            <div dangerouslySetInnerHTML={{ __html: selectedDiary.comment }} />
          ) : (
            <>
              <Typography
                component={'span'}
                variant={'subtitle2'}
                color={'secondary.light'}
                style={{ marginRight: '4px' }}
              >
                {user.name ?? props.profile?.name}님
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
          open={(() => {
            if (existTodayDiary) return false;
            if (isTooltipOpen) return true;
            return true;
          })()}
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

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import * as Icons from '@components/icons';
import { Button } from '@components/button';
import { Typography } from '@components/typography';
import {
  useCalendarStore,
  useDiaryListStore,
  useUserStore,
} from '@store/index';
import { dateToSting } from '@utils/index';
import { emotions } from '@components/diary/emotionList';

const Card = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const DiaryCard = () => {
  const router = useRouter();
  const {
    calendar: { selectedDate },
    setCalendar,
  } = useCalendarStore();
  const { user } = useUserStore();
  const { diaryList } = useDiaryListStore(user?.userID)();

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  if (!selectedDate) return null;

  const selectedDiary = React.useMemo(() => {
    if (!selectedDate) return null;
    if (!diaryList.length) return null;
    const diary = diaryList.find(
      diary =>
        dateToSting(new Date(diary.diaryAt)) === dateToSting(selectedDate)
    );
    return diary;
  }, [selectedDate, diaryList]);

  return (
    <Card style={{ marginTop: '15px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant={'h4'}
            color={'gray.dark'}
            style={{ marginRight: '10px' }}
          >
            {`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`}
          </Typography>
        </div>
      </div>

      <Typography
        variant={'body4'}
        color={'gray.dark'}
        style={{ marginTop: '4px' }}
      >
        {days[selectedDate.getDay()]}요일
      </Typography>

      <Typography
        variant={'body4'}
        color={'gray.dark'}
        style={{ lineHeight: '22px', marginTop: '10px' }}
      >
        <div
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          dangerouslySetInnerHTML={{
            __html: selectedDiary?.content ?? '작성된 일기가 없어요',
          }}
        />
      </Typography>

      {selectedDiary && (
        <Button
          color={'secondary'}
          style={{
            height: 'auto',
            marginTop: '10px',
            padding: '4px 10px',
            borderRadius: '15px',
          }}
          onClick={() => {
            router.push(`/diary/${selectedDiary.diaryID}`);
          }}
        >
          <Typography variant={'label3'} color={'background.paper'}>
            더보기
          </Typography>
        </Button>
      )}
    </Card>
  );
};

export const DiaryListCard = ({
  diaryID,
  date,
  content,
  emotion,
}: {
  diaryID: number;
  date: Date;
  content: string;
  emotion: Diary['emotion'];
}) => {
  const router = useRouter();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Card
      style={{ marginTop: '15px', padding: '12px 20px 20px 16px' }}
      onClick={() => router.push(`/diary/${diaryID}`)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant={'h4'}
            color={'gray.dark'}
            style={{ marginRight: '10px' }}
          >
            {`${date.getMonth() + 1}월 ${date.getDate()}일`}
          </Typography>
        </div>

        <div>
          <img
            src={`/images/icons/${
              emotions[emotion as keyof typeof emotions]
            }.png`}
            alt={emotions[emotion as keyof typeof emotions]}
            width={'auto'}
            height={'100%'}
            style={{
              maxHeight: 32,
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      <Typography
        variant={'body4'}
        color={'gray.dark'}
        style={{ marginTop: '4px' }}
      >
        {days[date.getDay()]}요일
      </Typography>

      <Typography
        className={'ql-editor'}
        variant={'body4'}
        color={'gray.dark'}
        style={{ lineHeight: '22px', marginTop: '10px' }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Typography>
    </Card>
  );
};

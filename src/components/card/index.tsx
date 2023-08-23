'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import * as Icons from '@components/icons';
import { Button } from '@components/form/style';
import { Card } from '@components/styled';
import { Typography } from '@components/typography';
import {
  useCalendarStore,
  useDiaryListStore,
  useUserStore,
} from '@store/index';
import { dateToSting } from '@utils/index';
import { emotions } from '@components/diary/emotionList';

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
          {selectedDiary && <Icons.Written width={15} height={15} />}
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
  date,
  content,
  emotion,
}: {
  date: Date;
  content: string;
  emotion: Diary['emotion'];
}) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

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
            {`${date.getMonth() + 1}월 ${date.getDate()}일`}
          </Typography>
          <Icons.Written width={15} height={15} />
        </div>

        <div>{emotions[emotion as keyof typeof emotions]}</div>
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

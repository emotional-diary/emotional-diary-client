import router from 'next/router';

import { Button } from '@components/form/style';
import { Card } from '@components/styled';
import { Typography } from '@components/typography';
import { useCalendarStore } from '@store/index';

export const DiaryCard = () => {
  const {
    calendar: { selectedDate },
    setCalendar,
  } = useCalendarStore();

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  if (!selectedDate) return null;

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
          {/* <Icons.Written width={15} height={15} /> */}
        </div>

        <Button
          color={'secondary'}
          size={'small'}
          style={{ height: 'auto', borderRadius: '15px' }}
          onClick={() => router.push('/diary/new')}
        >
          <Typography variant={'label3'} color={'background.paper'}>
            작성하기
          </Typography>
        </Button>
      </div>

      <Typography variant={'body4'} color={'gray.dark'}>
        {days[selectedDate.getDay()]}요일
      </Typography>

      <Typography
        variant={'body4'}
        color={'gray.dark'}
        style={{ lineHeight: '22px', marginTop: '10px' }}
      >
        작성된 일기가 없어요
      </Typography>
    </Card>
  );
};

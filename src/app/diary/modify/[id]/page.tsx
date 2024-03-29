'use client';

import React from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';
import { Button } from '@components/button';
import {
  useCalendarStore,
  useDiaryListStore,
  useDiaryStore,
  useUserStore,
} from '@store/index';
import { changeDateFormat } from '@utils/index';
import EmotionList from '../../new/step/emotion';
import WriteDiary from '../../new/step/write';

const steps = [
  {
    title: (
      <div>
        오늘 나의 기분을
        <br />
        선택해주세요
      </div>
    ),
    buttonName: '다음',
  },
  {
    title: (
      <div>
        오늘 하루 어떤일이
        <br />
        있었을까요?
      </div>
    ),
    buttonName: '저장할래요',
  },
];

export default function ModifyDiary() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const { diary, setDiary, resetDiary } = useDiaryStore();
  const { diaryList, updateDiaryList } = useDiaryListStore(user?.userID)();
  const { calendar } = useCalendarStore();
  const [step, setStep] = React.useState(0); // 0: select emotion, 1: write diary
  const [isLoading, setIsLoading] = React.useState(false);

  const queryStep = searchParams?.get('step')
    ? Number(searchParams?.get('step'))
    : 0;

  const updateDiaryMutation = useMutation({
    mutationFn: async (
      diary: Partial<
        {
          images: string[];
        } & Omit<Diary, 'images'>
      >
    ) => {
      const res = await axios.patch('/api/diary', diary);
      return res.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSaveDiary = async () => {
    const existContent = diary.content?.replace(/(<([^>]+)>)/gi, '').trim();
    if (isLoading) return;
    if (!existContent) return alert('내용을 추가해 주세요');

    const { data, statusCode } = await updateDiaryMutation.mutateAsync({
      content: diary.content,
      diaryAt: changeDateFormat(calendar.selectedDate as Date, true),
      emotion: diary.emotion,
      images:
        diary?.images &&
        diary.images
          .map(image => image.imageUrl)
          .filter((imageUrl): imageUrl is string => imageUrl !== undefined),
      diaryID: diary.diaryID,
    });

    if (statusCode === 200) {
      window.localStorage.removeItem('saved-diary-content');

      const diaryData = {
        ...diary,
        ...data,
      };
      setDiary({
        ...diaryData,
      });
      updateDiaryList(prev => {
        const index = prev.findIndex(
          item => item.diaryID === diaryData.diaryID
        );
        if (index === -1) return [diaryData, ...prev];
        prev[index] = diaryData;
        return [...prev];
      });

      router.replace(`/diary/${id}`);
    }
  };

  const handleNextStep = () => {
    if (!diary.emotion) return alert('기분을 선택해 주세요');
    if (step === 1) return handleSaveDiary();
    setStep(step + 1);
    router.replace(`/diary/modify/${id}?step=${step + 1}`);
  };

  React.useEffect(() => {
    setStep(queryStep);
  }, [queryStep]);

  React.useEffect(() => {
    if (!calendar) return;
    setDiary({
      ...diary,
      diaryAt: changeDateFormat(calendar.selectedDate as Date),
    });
  }, [calendar]);

  return (
    <Container
      headerProps={{
        type: 'datepicker',
        back: true,
      }}
      style={{ backgroundColor: theme.palette.common.white }}
    >
      <Typography
        variant={'h3'}
        color={'gray.dark'}
        style={{ marginTop: '10px', textAlign: 'center' }}
      >
        {steps[step]?.title}
      </Typography>

      {step === 0 && <EmotionList diary={diary} setDiary={setDiary} />}
      {step === 1 && (
        <WriteDiary
          diary={diary}
          setDiary={setDiary}
          resetDiary={resetDiary}
          isLoading={isLoading}
        />
      )}

      <div
        style={
          step === 0
            ? {
                display: 'flex',
                width: 'calc(100% - 60px)',
                margin: '30px auto auto',
              }
            : {
                width: '100%',
                marginTop: 'auto',
                paddingBottom: '30px',
                paddingLeft: '30px',
                paddingRight: '30px',
                backgroundColor: theme.palette.background.paper,
              }
        }
      >
        <Button
          color={'secondary'}
          style={{ width: '100%' }}
          onClick={handleNextStep}
        >
          <Typography variant={'subtitle1'} color={'common.white'}>
            {steps[step]?.buttonName}
          </Typography>
        </Button>
      </div>
    </Container>
  );
}

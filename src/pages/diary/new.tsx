import React from 'react';
import router from 'next/router';
import dynamic from 'next/dynamic';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';
import { Button } from '@components/form/style';
import { LoadingModal } from '@components/modal';
import { useCalendarStore, useDiaryStore } from '@store/index';
import { changeDateFormat } from '@utils/index';
import { EmotionList } from '@components/diary/emotionList';

const TextEditor = dynamic(() => import('@components/textEditor'), {
  ssr: false,
});

export default function NewDiary() {
  const { diary, setDiary, diaryList, setDiaryList } = useDiaryStore();
  const { calendar } = useCalendarStore();
  const [step, setStep] = React.useState(0); // 0: select emotion, 1: write diary
  const [isLoading, setIsLoading] = React.useState(false);

  const queryStep = (typeof window !== 'undefined' &&
    Number(router.query.step)) as number;

  // TODO: 일기 저장 후, diaryID와 aiComment를 받아오는 API 호출
  const getDiaryData = () => {
    return new Promise<Partial<Diary>>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          diaryID: Math.floor(Math.random() * 100000).toString(),
          aiComment: '오늘 하루도 수고했어요!',
        });
      }, 2000);
    });
  };

  const handleSaveDiary = async () => {
    if (isLoading) return;
    if (!diary.content?.length) return alert('내용을 추가해 주세요');
    setIsLoading(true);

    const { diaryID, aiComment } = await getDiaryData();

    // 신규 일기 데이터
    const diaryData = {
      ...diary,
      diaryID: diaryID as string,
      aiComment: aiComment as string,
      diaryAt: changeDateFormat(calendar.selectedDate as Date),
      createdAt: changeDateFormat(new Date()),
      updatedAt: changeDateFormat(new Date()),
    };
    setDiary({
      ...diaryData,
    });
    setDiaryList([diaryData, ...diaryList]);

    // TODO: 저장 API 호출 후, diaryID를 받아서 diary/:id로 이동
    router.replace(`/diary/${diaryID}`);
  };

  console.log('diary', diary);

  const handleNextStep = () => {
    if (!diary.emotion) return alert('기분을 선택해 주세요');
    if (step === 1) return handleSaveDiary();
    setStep(step + 1);
    router.replace(`/diary/new?step=${step + 1}`, undefined, { shallow: true });
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

      {step === 0 && <EmotionList />}

      {/* write diary */}
      {step === 1 && (
        <>
          <LoadingModal open={isLoading} />
          <TextEditor />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '0 30px 30px 30px',
        }}
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

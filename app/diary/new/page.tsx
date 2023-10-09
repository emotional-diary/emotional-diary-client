'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';
import { Button } from '@components/form/style';
import { LoadingModal } from '@components/modal';
import {
  useCalendarStore,
  useDiaryListStore,
  useDiaryStore,
  useUserStore,
} from '@store/index';
import { changeDateFormat } from '@utils/index';
import { EmotionList } from '@components/diary/emotionList';
import styled from 'styled-components';

const TextEditor = dynamic(() => import('@components/textEditor'), {
  ssr: false,
});

export const ImageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  width: 100%;
  background-color: ${theme.palette.background.paper};
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  overflow-x: scroll;

  img {
    margin-right: 10px;
  }
`;

export const CloseButton = ({
  onClick,
  style,
}: {
  onClick?: () => void;
  style?: React.CSSProperties;
}) => (
  <div
    onClick={onClick}
    style={{
      position: 'absolute',
      top: 5,
      right: 15,
      zIndex: 1,
      width: 15,
      height: 15,
      borderRadius: '50%',
      backgroundColor: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.common.black,
      fontWeight: 'bold',
      cursor: 'pointer',

      ...(style ?? {}),
    }}
  >
    &#215;
  </div>
);

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

export default function NewDiary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const { diary, setDiary } = useDiaryStore();
  const { diaryList, setDiaryList } = useDiaryListStore(user?.userID)();
  const { calendar } = useCalendarStore();
  const [step, setStep] = React.useState(0); // 0: select emotion, 1: write diary
  const [isLoading, setIsLoading] = React.useState(false);

  const queryStep = searchParams?.get('step')
    ? Number(searchParams?.get('step'))
    : 0;

  const images = React.useMemo(
    () =>
      (diary.images ?? [])
        .concat(['dummy', 'dummy', 'dummy'])
        .slice(0, 3) as string[],
    [diary.images]
  );

  const saveDiaryMutation = useMutation({
    mutationFn: async (diary: Partial<Diary>) => {
      const res = await axios.post('/api/diary', diary);
      return res.data;
    },
  });

  const handleSaveDiary = async () => {
    const existContent = diary.content?.replace(/(<([^>]+)>)/gi, '').trim();
    if (isLoading) return;
    if (!existContent) return alert('내용을 추가해 주세요');
    setIsLoading(true);

    const { data, statusCode, responseMessage } =
      await saveDiaryMutation.mutateAsync({
        content: diary.content,
        diaryAt: changeDateFormat(calendar.selectedDate as Date, true),
        emotion: diary.emotion,
      });

    if (statusCode >= 400) {
      alert(responseMessage);
      setIsLoading(false);
      return;
    }

    // 신규 일기 데이터
    const diaryData = {
      ...diary,
      ...data,
    };
    setDiary({
      ...diaryData,
    });
    setDiaryList([diaryData, ...diaryList]);

    router.replace(`/diary/${data?.diaryID}`);
  };

  // console.log('diary', diary);

  const handleNextStep = () => {
    if (!diary.emotion) return alert('기분을 선택해 주세요');
    if (step === 1) return handleSaveDiary();
    setStep(step + 1);
    router.replace(`/diary/new?step=${step + 1}`);
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

      {step === 0 && <EmotionList />}

      {/* write diary */}
      {step === 1 && (
        <>
          <LoadingModal open={isLoading} />
          <TextEditor />

          <ImageContainer>
            {images.map((image, index) =>
              image === 'dummy' ? (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    border: `1px solid ${theme.palette.gray.main}`,
                    borderRadius: 6,
                    backgroundColor: theme.palette.gray.light,
                    marginRight: 10,
                  }}
                />
              ) : (
                <div key={index} style={{ position: 'relative' }}>
                  <CloseButton
                    onClick={() => {
                      setDiary({
                        ...diary,
                        images: diary.images?.filter((_, i) => i !== index),
                      });
                    }}
                  />
                  <img
                    src={image}
                    alt={'diary_image'}
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                </div>
              )
            )}
          </ImageContainer>
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

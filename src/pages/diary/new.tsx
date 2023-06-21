import React from 'react';
import router from 'next/router';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';
import { Button, IconButton } from '@components/form/style';
import { LoadingModal } from '@components/modal';

const TextEditor = dynamic(() => import('@components/textEditor'), {
  ssr: false,
});

const StyledEmojiContainer = styled(IconButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  margin-top: 30px;
`;

export default function NewDiary() {
  const [step, setStep] = React.useState(0); // 0: select emotion, 1: write diary
  const [selectedEmotion, setSelectedEmotion] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelectEmotion = (emoji: string) => {
    setSelectedEmotion(emoji);
  };

  const handleSaveDiary = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      // TODO: diary detail page로 이동
      router.replace('/diary/first');
    }, 3000);
  };

  const handleNextStep = () => {
    if (selectedEmotion === '') return alert('기분을 선택해주세요');
    if (step === 1) return handleSaveDiary();
    setStep(step + 1);
    router.replace(`/diary/new?step=${step + 1}`, undefined, { shallow: true });
  };

  React.useEffect(() => {
    setStep(Number(router.query.step));
  }, [typeof window !== 'undefined' && router.query.step]);

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

      {/* emotion list */}
      {step === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: 250,
            marginTop: '15px',
          }}
        >
          {['😀', '😢', '😡', '😨', '😭', '😳'].map((emoji, index) => (
            <StyledEmojiContainer
              key={index}
              onClick={() => handleSelectEmotion(emoji)}
              style={{
                backgroundColor:
                  selectedEmotion === emoji
                    ? theme.palette.primary.main
                    : '#d9d9d9',
              }}
            >
              <Typography variant={'h1'}>{emoji}</Typography>
            </StyledEmojiContainer>
          ))}
        </div>
      )}

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

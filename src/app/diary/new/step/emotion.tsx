import React from 'react';
import styled from 'styled-components';

import { Typography } from '@components/typography';
import { emotions } from '@constants/diary';

export const StyledEmojiContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  border-radius: 50%;
`;

const StyledTitleContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 70px;
  padding: 4px 10px;
  border-radius: 5px;
`;

const backgroundByEmotion = {
  happy: '#FF6B6B',
  angry: '#000',
  sad: '#00A3FF',
  uneasy: '#2E6584',
  pain: '#842EA3',
  comfortable: '#23C0B6',
};

const textByEmotion = {
  happy: '행복해요',
  angry: '화가나요',
  sad: '슬퍼요',
  uneasy: '불안해요',
  pain: '아파요',
  comfortable: '편안해요',
};

export default function EmotionList({
  diary,
  setDiary,
}: {
  diary: Diary;
  setDiary: (diary: Diary) => void;
}) {
  const [isFirstSelect, setIsFirstSelect] = React.useState(true);

  const handleSelectEmotion = (emoji: string) => {
    setIsFirstSelect(false);
    setDiary({
      ...diary,
      emotion: emoji as Diary['emotion'],
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: 300,
      }}
    >
      {Object.keys(emotions).map((emoji, index) => (
        <StyledEmojiContainer
          key={index}
          onClick={() => handleSelectEmotion(emoji)}
          style={{
            marginTop: '20px',
            transition: 'all 0.2s ease-in-out',
            transform:
              diary?.emotion === emoji
                ? 'scale(1.2)'
                : isFirstSelect
                ? 'scale(1)'
                : 'scale(0.9)',
          }}
        >
          <img
            src={`/images/icons/${
              emotions[emoji as keyof typeof emotions]
            }.png`}
            alt={emoji}
            width={'auto'}
            height={'100%'}
            style={{
              maxHeight: 100,
              objectFit: 'contain',
              padding: '10px',
            }}
          />
          <StyledTitleContainer
            style={{
              backgroundColor:
                backgroundByEmotion[emoji as keyof typeof backgroundByEmotion],
            }}
          >
            <Typography variant={'body4'} color={'background.paper'}>
              {textByEmotion[emoji as keyof typeof textByEmotion]}
            </Typography>
          </StyledTitleContainer>
        </StyledEmojiContainer>
      ))}
    </div>
  );
}

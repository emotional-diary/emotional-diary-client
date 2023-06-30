import styled from 'styled-components';

import { Typography } from '@components/typography';
import { useDiaryStore } from '@store/index';
import { theme } from 'src/theme';

export const StyledEmojiContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
`;

export const emotions = {
  joy: '😀',
  sad: '😢',
  angry: '😡',
  nervous: '😨',
  hurt: '😭',
  panic: '😳',
};

export const EmotionList = () => {
  const { diary, setDiary } = useDiaryStore();

  const handleSelectEmotion = (emoji: string) => {
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
        maxWidth: 250,
        marginTop: '15px',
      }}
    >
      {Object.keys(emotions).map((emoji, index) => (
        <StyledEmojiContainer
          key={index}
          onClick={() => handleSelectEmotion(emoji)}
          style={{
            cursor: 'pointer',
            backgroundColor:
              diary?.emotion === emoji ? theme.palette.primary.main : '#d9d9d9',
            marginTop: '30px',
          }}
        >
          <Typography variant={'h1'}>
            {emotions[emoji as keyof typeof emotions]}
          </Typography>
        </StyledEmojiContainer>
      ))}
    </div>
  );
};

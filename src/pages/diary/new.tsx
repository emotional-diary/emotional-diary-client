import React from 'react';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';
import styled from 'styled-components';
import { Button, IconButton } from '@components/form/style';
import router from 'next/router';

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
  const [selectedEmotion, setSelectedEmotion] = React.useState('');

  const handleSelectEmotion = (emoji: string) => {
    setSelectedEmotion(emoji);
  };

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
        오늘 나의 기분을
        <br />
        선택해주세요
      </Typography>

      {/* emotion list */}
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
                selectedEmotion === emoji ? theme.palette.primary.main : '',
            }}
          >
            <Typography variant={'h1'}>{emoji}</Typography>
          </StyledEmojiContainer>
        ))}
      </div>

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
          // onClick={() => router.push(`/diary/${'test'}`)}
        >
          <Typography variant={'subtitle1'} color={'common.white'}>
            다음
          </Typography>
        </Button>
      </div>
    </Container>
  );
}

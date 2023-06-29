import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { useCalendarStore, useDiaryStore } from '@store/index';
import { dateToSting } from '@utils/index';
import { theme } from 'src/theme';
import { StyledEmojiContainer, emotions } from '@components/diary/emotionList';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const Styled3DBox = styled.div`
  position: relative;
  padding: 10px 50px;
  max-width: 280px;
  margin-top: 30px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 1px #73caab;
  white-space: nowrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  background-color: ${theme.palette.background.paper};
  border-radius: 30px 30px 0px 0px;
  margin-top: 20px;
  padding: 30px;
`;

export default function DiaryDetail() {
  const router = useRouter();
  const { id } = router.query;

  const {
    calendar: { selectedDate },
  } = useCalendarStore();
  const { diary, setDiary, diaryList } = useDiaryStore();

  const selectedDiary = React.useMemo(() => {
    if (!selectedDate) return null;
    if (!diaryList.length) return null;
    const diary = diaryList.find(diary => diary.diaryID === id);
    return diary;
  }, [selectedDate, diaryList]) as Diary;

  React.useEffect(() => {
    if (isEmpty(diary)) {
      setDiary(selectedDiary);
    }
  }, []);

  // React.useEffect(() => {
  //   const handleRouteChange = () => {
  //     // 초기화 시간을 주기 위해 setTimeout 사용
  //     setTimeout(() => {
  //       setDiary({} as Diary);
  //     }, 100);
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, []);

  // console.log('diaryAt', new Date(diary?.diaryAt));

  if (isEmpty(diary)) {
    return null;
  }

  return (
    <Container
      headerProps={{
        back: true,
        type: 'diary',
      }}
      style={{
        backgroundColor: theme.palette.common.white,
      }}
    >
      <DetailWrapper>
        <StyledEmojiContainer>
          <Typography variant={'h1'}>
            {emotions[diary?.emotion as keyof typeof emotions]}
          </Typography>
        </StyledEmojiContainer>

        <Styled3DBox>
          <Typography
            variant={'body4'}
            color={'gray.dark'}
            style={{ textAlign: 'center' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: diary?.aiComment,
              }}
            />
          </Typography>
        </Styled3DBox>

        <ContentWrapper>
          <Typography variant={'h4'}>{dateToSting(diary?.diaryAt)}</Typography>

          <Typography
            className={'ql-editor'}
            variant={'body3'}
            style={{ lineHeight: 1.5, marginTop: '16px' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: diary?.content || '내용이 없습니다.',
              }}
            />
          </Typography>
        </ContentWrapper>
      </DetailWrapper>
    </Container>
  );
}

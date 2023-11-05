'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import {
  useCalendarStore,
  useDiaryListStore,
  useDiaryStore,
  useUserStore,
} from '@store/index';
import { dateToSting } from '@utils/index';
import { theme } from 'src/theme';
import { StyledEmojiContainer, emotions } from '@components/diary/emotionList';
import { ImageModal } from '@components/modal';
import { ImageContainer } from '../new/page';

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
  margin: 10px 30px 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: #fff;
  border-radius: 10px;
  box-shadow: 4px 4px 1px #a7d2b6;
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
  const { id } = useParams() as { id: string };
  const {
    calendar: { selectedDate },
  } = useCalendarStore();
  const { user } = useUserStore();
  const { diary, setDiary } = useDiaryStore();
  const { diaryList } = useDiaryListStore(user?.userID)();

  const [modal, setModal] = React.useState<{
    open: boolean;
    imageIndex: number;
  }>({
    open: false,
    imageIndex: 0,
  });
  const [clientHeight, setClientHeight] = React.useState<number>(
    window.innerHeight
  );

  const selectedDiary = React.useMemo(() => {
    if (!selectedDate) return null;
    if (!diaryList.length) return null;
    const diary = diaryList?.find(diary => diary.diaryID === Number(id));
    return diary;
  }, [selectedDate, diaryList]) as Diary;

  const calculatedHeight = React.useMemo(() => {
    if (clientHeight > 800) return clientHeight * 0.33;
    if (clientHeight > 750) return clientHeight * 0.3;
    if (clientHeight > 700) return clientHeight * 0.27;
    return clientHeight * 0.33;
  }, [clientHeight]);

  React.useEffect(() => {
    if (isEmpty(diary) || diary?.diaryID !== Number(id)) {
      setDiary(selectedDiary);
    }
  }, [selectedDiary]);

  React.useEffect(() => {
    const handleResize = () => {
      setClientHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log('diary', diary);

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
      <ImageModal
        open={modal.open}
        onClose={() => setModal({ open: false, imageIndex: 0 })}
        imageUrl={diary.images?.[modal?.imageIndex]?.imgUrl}
      />

      <DetailWrapper>
        <StyledEmojiContainer>
          <img
            src={`/images/icons/${
              emotions[diary.emotion as keyof typeof emotions]
            }.png`}
            alt={diary.emotion as keyof typeof emotions}
            width={'auto'}
            height={'100%'}
            style={{
              maxHeight: 100,
              objectFit: 'contain',
              padding: '10px',
            }}
          />
        </StyledEmojiContainer>

        <Styled3DBox>
          <Typography
            variant={'body4'}
            color={'gray.dark'}
            style={{ textAlign: 'center' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: diary?.comment,
              }}
            />
          </Typography>
        </Styled3DBox>

        <ContentWrapper>
          <Typography variant={'h4'}>{dateToSting(diary?.diaryAt)}</Typography>

          <Typography
            variant={'body3'}
            style={{
              lineHeight: 1.5,
              minHeight: diary?.images?.length ? calculatedHeight : 'auto',
              maxHeight: diary?.images?.length ? calculatedHeight : 'none',
              marginTop: '16px',
              padding: 0,
              overflowY: 'auto',
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: diary?.content || '내용이 없습니다.',
              }}
            />
          </Typography>
        </ContentWrapper>

        <ImageContainer style={{ paddingTop: 0 }}>
          {diary.images?.map((image, index) => (
            <img
              key={image.diaryImgID}
              src={image.imgUrl}
              alt={'diary_image'}
              style={{
                width: 80,
                height: 80,
                borderRadius: 6,
                objectFit: 'cover',
              }}
              onClick={() => {
                setModal({ open: true, imageIndex: index });
              }}
            />
          ))}
        </ImageContainer>
      </DetailWrapper>
    </Container>
  );
}

'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

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
import { emotions } from '@constants/diary';
import { ImageModal } from '@components/modal';
import { Button } from '@components/button';
import LoadingComponent from '@components/loading';
import { ImageContainer } from '../new/page';
import { StyledEmojiContainer } from '../new/step/emotion';

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
  const { diaryList, updateDiaryList } = useDiaryListStore(user?.userID)();

  const [modal, setModal] = React.useState<{
    open: boolean;
    imageIndex: number;
  }>({
    open: false,
    imageIndex: 0,
  });
  const [clientHeight, setClientHeight] = React.useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 750
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const metaData = diary?.metaData ? JSON.parse(diary?.metaData) : {};

  const reAnalysisMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `/api/diary/${id}/ai`,
        {},
        { timeout: 10000 }
      );
      return res.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

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

  React.useEffect(() => {
    checkFailedLoadComment();
  }, [diary]);

  const checkFailedLoadComment = () => {
    if (diary?.metaData) {
      try {
        if (metaData.isFailedLoadComment) {
          setDiary({
            ...diary,
            metaData: JSON.stringify({
              ...(diary?.metaData && JSON.parse(diary?.metaData)),
              isFailedLoadComment: true,
            }),
          });
        } else {
          setDiary({
            ...diary,
            metaData: JSON.stringify({
              ...(diary?.metaData && JSON.parse(diary?.metaData)),
              isFailedLoadComment: false,
            }),
          });
        }
      } catch {}
    }
  };

  const reAnalysis = async () => {
    if (isLoading) return;

    const { data } = await reAnalysisMutation.mutateAsync();
    if (data) {
      setDiary({
        ...diary,
        comment: data.comment,
        metaData: JSON.stringify({
          ...(diary?.metaData && JSON.parse(diary?.metaData)),
          isFailedLoadComment: false,
        }),
      });
      updateDiaryList(prev => {
        const index = prev.findIndex(item => item.diaryID === diary.diaryID);
        prev[index] = {
          ...diary,
          comment: data.comment,
          metaData: JSON.stringify({
            ...(diary?.metaData && JSON.parse(diary?.metaData)),
            isFailedLoadComment: false,
          }),
        };
        return [...prev];
      });
    }
  };

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
      {isLoading && <LoadingComponent />}
      <ImageModal
        open={modal.open}
        onClose={() => setModal({ open: false, imageIndex: 0 })}
        imageUrl={diary.images?.[modal?.imageIndex]?.imageUrl as string}
      />

      <DetailWrapper>
        <StyledEmojiContainer>
          <Image
            src={`/images/icons/${
              emotions[diary.emotion as keyof typeof emotions]
            }.png`}
            alt={diary.emotion as keyof typeof emotions}
            width={120}
            height={100}
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: diary?.comment,
              }}
            />

            <Button
              size={'small'}
              color={'error.light'}
              style={{
                height: metaData?.isFailedLoadComment ? 'auto' : 0,
                marginTop: metaData?.isFailedLoadComment ? '10px' : 0,
                padding: metaData?.isFailedLoadComment ? '5px 10px' : 0,
                opacity: metaData?.isFailedLoadComment ? 1 : 0,
                transform: metaData?.isFailedLoadComment
                  ? 'scale(1)'
                  : 'scale(0)',
              }}
              onClick={reAnalysis}
            >
              <Typography variant={'label2'} color={'primary.main'}>
                다시 분석하기
              </Typography>
            </Button>
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
              key={image.imageID}
              src={image.imageUrl}
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

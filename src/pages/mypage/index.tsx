import React from 'react';
import router from 'next/router';
import styled from 'styled-components';

import * as Icons from '@components/icons';
import { Container } from '@components/layout';
import { Button, IconButton } from '@components/form/style';
import { Typography } from '@components/typography';
import { useDiaryListStore, useUserStore } from '@store/index';
import { DiaryListCard } from '@components/card';
import { theme } from 'src/theme';
import { StyledTopBackground } from '..';

const StyledRadiusBox = styled.div`
  padding: 6px 18px;
  background-color: ${props => props.theme.palette.background.paper};
  border-radius: 50px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DiaryListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  margin-top: 20px;
`;

export default function MyPage() {
  const { user } = useUserStore();
  const { diaryList } = useDiaryListStore();

  const [nickname, setNickname] = React.useState('');
  const [diaries, setDiaries] = React.useState<Diary[]>([]);

  React.useEffect(() => {
    setNickname(user?.nickname || '');
    setDiaries(diaryList || []);
  }, []);

  const sortedDiaries = React.useMemo(
    () =>
      diaries?.sort((a, b) => {
        return new Date(b.diaryAt).getTime() - new Date(a.diaryAt).getTime();
      }),
    [diaries]
  );

  return (
    <Container
      headerProps={{
        back: true,
        bgcolor: theme.palette.primary.main,
        icon: (
          <IconButton onClick={() => router.push('/setting')}>
            <Icons.Setting />
          </IconButton>
        ),
        style: {
          position: 'sticky',
          top: 0,
          zIndex: 10,
        },
      }}
      bodyProps={{
        style: {
          backgroundColor: theme.palette.common.white,
          padding: '0 30px 30px 30px',
          alignItems: 'flex-start',
        },
      }}
    >
      <div style={{ position: 'sticky', top: '84px', zIndex: 10 }}>
        <StyledTopBackground style={{ position: 'fixed', height: 80 }} />

        <Typography
          variant={'h3'}
          color={'background.paper'}
          style={{ position: 'sticky', marginTop: '10px' }}
        >
          {nickname}님의 마이페이지
        </Typography>

        <StyledRadiusBox style={{ position: 'sticky', marginTop: '24px' }}>
          <Typography variant={'subtitle1'} color={'secondary.light'}>
            내가 작성한 일기
          </Typography>
        </StyledRadiusBox>
      </div>

      <DiaryListWrapper>
        {diaries?.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Typography variant={'subtitle1'} color={'gray.main'}>
              작성한 일기가 없어요.
            </Typography>
          </div>
        ) : (
          sortedDiaries.map(diary => {
            return (
              <DiaryListCard
                key={diary.diaryID}
                date={new Date(diary.diaryAt)}
                content={diary.content}
                emotion={diary.emotion}
              />
            );
          })
        )}
      </DiaryListWrapper>

      {diaries?.length >= 5 && (
        <Button
          color={'secondary'}
          style={{
            height: 'auto',
            padding: '10px 26px',
            margin: '40px auto 0px',
          }}
          // onClick={}
        >
          <Typography variant={'label1'} color={'background.paper'}>
            더보기
          </Typography>
        </Button>
      )}
    </Container>
  );
}

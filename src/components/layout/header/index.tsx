import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

import * as Icons from '@components/icons';
import { Button, IconButton } from '@components/form/style';
import { Typography } from '@components/typography';
import Popper from '@components/popper';
import { useCalendarStore, useDiaryStore } from '@store/index';
import { theme } from 'src/theme';
import { CalendarModal } from '@components/calendar';

export type HeaderProps = {
  title?: string;
  back?: boolean;
  bgcolor?: string;
  type?: 'datepicker' | 'diary';
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: #f5f5f5;
`;

const DatepickerTitle = ({
  onClick,
}: {
  onClick: (() => void) | undefined;
}) => {
  const {
    calendar: { selectedDate },
  } = useCalendarStore();
  if (!selectedDate) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      onClick={onClick}
    >
      <Typography component={'span'} variant={'subtitle1'} color={'gray.dark'}>
        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
        {selectedDate.getDate()}일
      </Typography>
      {onClick && (
        <span style={{ marginLeft: '6px' }}>
          <Icons.Arrow width={10} height={10} color={theme.palette.gray.main} />
        </span>
      )}
    </div>
  );
};

const Header = ({ title, back, bgcolor, type }: HeaderProps) => {
  const { diaryList } = useDiaryStore();
  const [isPopperOpen, setIsPopperOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';

  const includeExceptionPath = React.useMemo(
    () => pathname.includes('/diary/modify'),
    [pathname]
  );

  const removeDiary = () => {
    // TODO: 일기 삭제 API 연결
    const index = diaryList.findIndex(
      diary => diary.diaryID === router.query.id
    );
    diaryList.splice(index, 1);
    router.push('/');
  };

  if (type === 'datepicker') {
    return (
      <StyledHeader
        style={{
          backgroundColor: bgcolor,
        }}
      >
        {!includeExceptionPath && (
          <CalendarModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <IconButton onClick={() => router.back()}>
          <Icons.Back />
        </IconButton>
        <DatepickerTitle
          onClick={
            !includeExceptionPath ? () => setIsModalOpen(true) : undefined
          }
        />
      </StyledHeader>
    );
  }
  if (type === 'diary') {
    const buttonStyle = {
      height: 'auto',
      borderRadius: '10px',
      padding: '8px 20px',
    };

    return (
      <StyledHeader
        style={{
          backgroundColor: bgcolor,
        }}
      >
        <IconButton onClick={() => router.back()}>
          <Icons.Back />
        </IconButton>
        <Popper
          open={isPopperOpen}
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                color={'tertiary.light'}
                onClick={() =>
                  router.push(`/diary/modify/${router.query.id}?step=0`)
                }
                style={buttonStyle}
              >
                <Typography variant={'label2'} color={'tertiary.main'}>
                  수정하기
                </Typography>
              </Button>
              <Button
                color={'error.light'}
                onClick={removeDiary}
                style={{
                  ...buttonStyle,
                  marginTop: '5px',
                }}
              >
                <Typography variant={'label2'} color={'error.main'}>
                  삭제하기
                </Typography>
              </Button>
            </div>
          }
        >
          <IconButton
            onClick={() => setIsPopperOpen(!isPopperOpen)}
            style={{ marginRight: '-5px' }}
          >
            <Icons.Kebab />
          </IconButton>
        </Popper>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader
      style={{
        backgroundColor: bgcolor,
      }}
    >
      {back && (
        <IconButton onClick={() => router.back()}>
          <Icons.Back />
        </IconButton>
      )}

      {title && (
        <Typography variant={'h3'} color={'common.white'}>
          {title}
        </Typography>
      )}
      <IconButton onClick={() => alert('준비중 입니다.')}>
        <Icons.User />
      </IconButton>
    </StyledHeader>
  );
};

export default Header;

import React from 'react';
import styled from 'styled-components';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import * as Icons from '@components/icons';
import { Button, IconButton } from '@components/form/style';
import { Typography } from '@components/typography';
import Popper from '@components/popper';
import { useCalendarStore, useDiaryListStore } from '@store/index';
import { theme } from 'src/theme';
import { CalendarModal } from '@components/calendar';

export type HeaderProps = {
  title?: string;
  back?: boolean;
  bgcolor?: string;
  type?: 'datepicker' | 'diary';
  icon?: React.ReactNode;
  style?: React.CSSProperties;
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

const Header = ({ title, back, bgcolor, type, icon, style }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { diaryList } = useDiaryListStore();
  const [isPopperOpen, setIsPopperOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const id = searchParams?.get('id');

  const includeExceptionPath = React.useMemo(
    () => pathname?.includes('/diary/modify'),
    [pathname]
  );

  const removeDiary = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    // TODO: 일기 삭제 API 연결
    const index = diaryList.findIndex(diary => diary.diaryID === id);
    diaryList.splice(index, 1);

    window.localStorage.setItem(
      'diary-list',
      JSON.stringify({
        state: {
          diaryList,
          version: 0,
        },
      })
    );
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
                onClick={() => router.push(`/diary/modify/${id}?step=0`)}
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
        ...style,
      }}
    >
      {back && (
        <IconButton onClick={() => router.back()}>
          <Icons.Back
            color={bgcolor === theme.palette.primary.main ? '#fff' : undefined}
          />
        </IconButton>
      )}

      {title && (
        <Typography variant={'h3'} color={'common.white'}>
          {title}
        </Typography>
      )}
      {icon}
    </StyledHeader>
  );
};

export default Header;

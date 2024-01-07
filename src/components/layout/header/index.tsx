import React from 'react';
import styled from 'styled-components';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import {
  useCalendarStore,
  useDiaryListStore,
  useDiaryStore,
  useUserStore,
} from '@store/index';
import * as Icons from '@components/icons';
import { Button, IconButton } from '@components/button';
import { Typography } from '@components/typography';
import Popper from '@components/popper';
import { CalendarModal } from '@components/calendar';
import { theme } from 'src/theme';

export type HeaderProps = {
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

const StyledNav = styled.nav`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 16px;
  }
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

const Header = ({ back, bgcolor, type, icon, style }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams() as { id: string };
  const { user } = useUserStore();
  const { resetDiary } = useDiaryStore();
  const { diaryList } = useDiaryListStore(user?.userID)();
  const [isPopperOpen, setIsPopperOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isMain = React.useMemo(() => pathname === '/', [pathname]);

  const removeDiaryMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete('/api/diary', {
          data: {
            diaryID: Number(id),
          },
        });
        console.log('res', res);
        return res.data;
      } catch (error: any) {
        console.log('error', error.response.data);
        return error.response.data;
      }
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries('diary-list');
    //   queryClient.invalidateQueries(['diary', id]);
    //   router.push('/');
    // },
  });

  const includeExceptionPath = React.useMemo(
    () => pathname?.includes('/diary/modify'),
    [pathname]
  );

  const removeDiary = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const { data, responseMessage, statusCode } =
      await removeDiaryMutation.mutateAsync();
    if (statusCode >= 400) {
      alert(responseMessage);
      return;
    }

    const index = diaryList.findIndex(diary => diary.diaryID === Number(id));
    diaryList.splice(index, 1);

    resetDiary();

    window.localStorage.setItem(
      `diary-list-${user?.userID}`,
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

      {isMain && (
        <img src={'/images/icons/logo.png'} alt={''} width={71} height={46} />
      )}

      {icon && <StyledNav>{icon}</StyledNav>}
    </StyledHeader>
  );
};

export default Header;

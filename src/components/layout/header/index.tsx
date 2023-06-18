import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

import * as Icons from '@components/icons';
import { IconButton } from '@components/form/style';
import { Typography } from '@components/typography';
import { useCalendarStore } from '@store/index';

export type HeaderProps = {
  title?: string;
  back?: boolean;
  bgcolor?: string;
  type?: 'datepicker';
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: #f5f5f5;
`;

const DatepickerTitle = () => {
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
    >
      <Typography component={'span'} variant={'subtitle1'} color={'gray.dark'}>
        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
        {selectedDate.getDate()}일
      </Typography>
      <span style={{ marginLeft: '6px' }}>
        <Icons.Arrow direction={'bottom'} width={5} height={9} />
      </span>
    </div>
  );
};

const Header = ({ title, back, bgcolor, type }: HeaderProps) => {
  if (type === 'datepicker') {
    return (
      <StyledHeader
        style={{
          backgroundColor: bgcolor,
        }}
      >
        <IconButton onClick={() => router.back()}>
          <Icons.Back />
        </IconButton>
        <DatepickerTitle />
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
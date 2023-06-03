import React from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

import { Container, Main, Footer, Header } from '@components/layout';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { IconButton } from '@components/form/style';
import { useUserStore } from '../store';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface Props {
  profile: {
    nickname: string;
  };
}

const MessageOfToday = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  margin-right: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 0px 10px 10px 0px;
`;

const MonthArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  margin-top: -3px;
  border: none;
  width: 32px;
  height: 32px;
  text-indent: -999em;
`;

export default function Home({ ...props }: Props) {
  const { user, setUser } = useUserStore();
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());

  if (!user?.nickname) {
    setUser({
      ...user,
      nickname: props.profile.nickname,
    });
  }

  console.log('user', user);

  return (
    <Container>
      <Header>
        <MessageOfToday>
          <Typography>
            {user.nickname ?? props.profile.nickname}님 오늘은 어떤 하루였나요?
          </Typography>
        </MessageOfToday>

        <IconButton
          style={{
            marginLeft: 'auto',
            marginRight: '20px',
          }}
        >
          <Icons.User width={30} height={30} />
        </IconButton>
      </Header>

      <div style={{ width: '100%' }}>
        <DatePicker
          inline
          selected={startDate}
          onChange={date => setStartDate(date)}
          calendarContainer={({ children }) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  backgroundColor: '#FFF',
                  margin: '20px 40px',
                }}
              >
                {children}
              </div>
            );
          }}
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MonthArrowButton
                aria-label="Previous Month"
                onClick={decreaseMonth}
              >
                <span
                  className={
                    'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                  }
                >
                  {'<'}
                </span>
              </MonthArrowButton>

              <Typography>
                {monthDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>

              <MonthArrowButton aria-label="Next Month" onClick={increaseMonth}>
                <span
                  className={
                    'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                  }
                >
                  {'>'}
                </span>
              </MonthArrowButton>
            </div>
          )}
          renderDayContents={(day, date) => {
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  padding: '8px 10px',
                }}
              >
                <Typography
                  style={{
                    color: date?.getMonth() === 8 ? 'red' : 'inherit',
                  }}
                >
                  {day}
                </Typography>
              </div>
            );
          }}
          locale={ko}
        />
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = req.cookies.accessToken;
  const nickname = decodeURIComponent(accessToken || '');

  if (!accessToken) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return {
    props: {
      profile: {
        nickname,
      },
    },
  };
};

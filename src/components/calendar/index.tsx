import React from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';

import { Typography } from '@components/typography';

registerLocale('ko', ko);

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin: 12px 0px;

  .react-datepicker__header {
    background-color: #fff;
    border-bottom: none;
    border-radius: 15px;
    padding: 20px 20px;
  }

  // 달력의 요일
  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
  }

  // 달력의 날짜
  .react-datepicker__month {
    padding: 0px 20px 10px;
    margin: 0;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-between;

    // 선택된 month와 다른 날짜들
    .react-datepicker__day--outside-month {
      opacity: 0.3;
    }
    // 선택된 날짜
    .react-datepicker__day--selected {
      background-color: ${props => props.theme.palette.primary.main};
      /* border-radius: 50%; */
    }
  }
`;

const StyledCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: 26px;
  height: 26px;
  text-indent: -999em;
`;

export const Calendar = () => {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());

  return (
    <div style={{ width: '100%' }}>
      <DatePicker
        inline
        selected={startDate}
        onChange={date => setStartDate(date)}
        calendarContainer={({ children }) => {
          return <StyledCalendarContainer>{children}</StyledCalendarContainer>;
        }}
        formatWeekDay={nameOfDay => {
          return (
            <Typography variant={'h6'} color={'gray.dark'}>
              {nameOfDay.substring(0, 1)}
            </Typography>
          );
        }}
        // highlightDates={[
        //   new Date('2023-06-01'),
        // ]}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <StyledCalendarHeader>
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

            <Typography variant={'h5'} color={'gray.dark'}>
              {monthDate.toLocaleString('ko', {
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
          </StyledCalendarHeader>
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
                padding: '10px 0px',
              }}
            >
              <Typography
                variant={'subtitle3'}
                // style={{
                //   color: date?.getMonth() === 8 ? 'red' : 'inherit',
                // }}
              >
                {day}
              </Typography>
            </div>
          );
        }}
        locale={ko}
      />
    </div>
  );
};

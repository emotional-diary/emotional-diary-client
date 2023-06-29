import React from 'react';
import router from 'next/router';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';

import { Typography } from '@components/typography';
import { changeDateFormat, dateToSting, hexToRgba } from '@utils/index';
import { useCalendarStore, useDiaryStore } from '@store/index';
import { Modal } from '@components/modal';

registerLocale('ko', ko);

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-top: 15px;

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

    .react-datepicker__day {
      width: 31px;
      height: 38px;
    }

    // 선택된 month와 다른 날짜들
    .react-datepicker__day--outside-month {
      opacity: 0.3;
    }
    // 선택된 날짜
    .react-datepicker__day--selected {
      background-color: ${({ theme }) =>
        hexToRgba(theme.palette.secondary.light, 0.15)};
      border-radius: 5px;
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

  .react-datepicker__navigation-icon::before {
    border-color: #b2b2b2;
    border-width: 2px 2px 0 0;
  }
`;

export const Calendar = () => {
  const {
    calendar: { selectedDate },
    setCalendar,
  } = useCalendarStore();
  const { diaryList } = useDiaryStore();
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';

  const includeExceptionPath = React.useMemo(
    () => pathname.includes('/diary/new'),
    [pathname]
  );

  React.useEffect(() => {
    if (includeExceptionPath) {
      return;
    }
    setCalendar({ selectedDate: new Date() });
  }, []);

  const writtenDate = React.useCallback(
    (date: Date | undefined) => {
      // 선택된 날짜에 작성된 일기가 있는지 확인
      // 날짜가 하나씩 밀리기 때문에 하루 전 날짜를 구해서 비교
      return diaryList.find(diary => {
        const previousDiaryAt = new Date(diary.diaryAt).setDate(
          new Date(diary.diaryAt).getDate() - 1
        );
        return (
          changeDateFormat(new Date(previousDiaryAt)).slice(0, 10) ===
          date?.toISOString().slice(0, 10)
        );
      });
    },
    [diaryList]
  );

  const selectedDiary = (date: Date) => {
    const diary = diaryList.find(
      diary => dateToSting(new Date(diary.diaryAt)) === dateToSting(date)
    );
    return diary;
  };

  const handleDateClick = (date: Date) => {
    if (includeExceptionPath) {
      if (date > new Date()) {
        alert('이후 날짜의 일기는 미리 작성할 수 없어요.');
        return;
      }
      if (selectedDiary(date)) {
        alert('이미 작성한 일기가 있어요.');
        return;
      }
    }

    setCalendar({ selectedDate: date });
  };

  // console.log(selectedDate);

  return (
    <div style={{ width: '100%' }}>
      <DatePicker
        inline
        selected={selectedDate}
        onChange={date => handleDateClick(date as Date)}
        calendarContainer={({ children }) => {
          return <StyledCalendarContainer>{children}</StyledCalendarContainer>;
        }}
        formatWeekDay={nameOfDay => {
          return (
            <Typography variant={'subtitle2'} color={'gray.dark'}>
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
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <Typography
                variant={'subtitle2'}
                style={{
                  fontWeight:
                    selectedDate?.getDate() === day ? 'bold' : 'normal',
                }}
              >
                {day}
              </Typography>
              {writtenDate(date) ? (
                <img
                  src={'/images/icons/coffee_calendar.png'}
                  alt={'coffee_icon'}
                  width={13}
                  height={9}
                />
              ) : (
                <div
                  style={{
                    width: '13px',
                    height: '9px',
                  }}
                />
              )}
            </div>
          );
        }}
        locale={ko}
      />
    </div>
  );
};

export const CalendarModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { calendar } = useCalendarStore();

  return (
    <Modal open={open} onClose={onClose}>
      <Calendar />
    </Modal>
  );
};

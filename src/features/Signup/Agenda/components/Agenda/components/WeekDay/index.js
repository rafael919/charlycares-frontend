import React from 'react';
import styled from 'styled-components';
import WeekDayLetters from '../WeekDayLetters';
import WeekDayNumber from '../WeekDayNumber';

const StyledWeekDay = styled.div`
  min-height: 3rem;
  min-width: 3.45rem;
  width: 16%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WeekDay = ({ index, date, holiday }) => {
  if (index === undefined || date === undefined) return null;
  const currentDayInMonth = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const dayFromAPI = new Date(date).getDate();
  const monthFromAPI = new Date(date).getMonth();

  return (
    <StyledWeekDay>
      <WeekDayLetters index={index} />
      <WeekDayNumber
        notAvailable={
          (currentDayInMonth > dayFromAPI && currentMonth === monthFromAPI) ||
          currentMonth > monthFromAPI
        }
        currentDay={
          currentDayInMonth === dayFromAPI && currentMonth === monthFromAPI
        }
        holiday={holiday}
        date={date}
      />
    </StyledWeekDay>
  );
};

export default WeekDay;

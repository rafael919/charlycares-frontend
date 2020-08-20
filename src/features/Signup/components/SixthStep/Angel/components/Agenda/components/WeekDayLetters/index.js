import React from 'react';
import styled from 'styled-components';

const StyledWeekDayLetter = styled.div`
  font-size: 0.625rem;
  color: ${props => props.notAvailable && '#c7c7c9'};
`;

const WeekDayLetters = ({ index, notAvailable }) => {
  let letter;
  switch (index) {
    case 0:
      letter = 'M';
      break;
    case 1:
      letter = 'T';
      break;
    case 2:
      letter = 'W';
      break;
    case 3:
      letter = 'T';
      break;
    case 4:
      letter = 'F';
      break;
    case 5:
      letter = 'S';
      break;
    case 6:
      letter = 'S';
      break;

    default:
      letter = '';
  }
  return (
    <StyledWeekDayLetter notAvailable={notAvailable}>
      {letter}
    </StyledWeekDayLetter>
  );
};

export default WeekDayLetters;

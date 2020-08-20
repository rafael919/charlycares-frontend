import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import rightArrow from 'Assets/icons/btn-large-arrow-right.svg';
import moment from 'moment';

const StyledWeekControl = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
  font-size: 0.9375rem;
`;

const LeftArrow = styled(Image)`
  &&& {
    height: 24px;
    transform: rotate(-180deg);
  }
`;

const WeekControl = ({ onRight, onLeft, weekNumber, date }) => {
  const currentYear = new Date(date).getFullYear().toString();
  return (
    <StyledWeekControl>
      <div onClick={onLeft}>
        <LeftArrow avatar src={rightArrow} />
      </div>
      <div>
        Week {weekNumber},{' '}
        {date &&
          moment(currentYear)
            .add(weekNumber, 'weeks')
            .format('MMM. YYYY')}
      </div>
      <div onClick={onRight}>
        <Image style={{ height: 24 }} avatar src={rightArrow} />
      </div>
    </StyledWeekControl>
  );
};

export default WeekControl;

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

const WeekControl = ({ onRight, onLeft, weekNumber, date, showNextWeek, showPreviousWeek }) => {
  return (
    <StyledWeekControl>
      {showPreviousWeek ? (<div onClick={onLeft}>
        <LeftArrow avatar src={rightArrow} />
      </div>) : <div style={{width: '24px'}}></div>}
      <div>
        Week {weekNumber},{' '}
        {date &&
          moment(date)
            .format('MMM YYYY')}
      </div>
      {showNextWeek ? <div onClick={onRight}>
        <Image style={{ height: 24 }} avatar src={rightArrow} />
      </div> : <div style={{width: '24px'}}></div>}
    </StyledWeekControl>
  );
};

export default WeekControl;

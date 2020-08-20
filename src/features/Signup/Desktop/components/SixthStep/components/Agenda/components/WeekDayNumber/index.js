import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Image } from 'semantic-ui-react';
import holidayImg from 'Assets/icons/icn-calendar-holiday.svg';

const StyledWeekDayNumber = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
`;

const CurrentDay = StyledWeekDayNumber.extend`
  padding: 0.25rem 0.45rem;
  border: 1px solid ${props => props.theme.primaryTextColor};
  border-radius: 50%;
`;

const NotAvailableDay = StyledWeekDayNumber.extend`
  color: #c7c7c9;
  position: relative;
  font-weight: 400;
  padding: 0.25rem 0.45rem;
  &:before {
    content: '';
    height: 1px;
    width: 100%;
    background-color: #c7c7c9;
    position: absolute;
    top: 50%;
    left: 0;
    transform-origin: 50% 0;
    transform: rotate(-30deg);
  }
`;

const HolidayDay = StyledWeekDayNumber.extend`
  padding: 0.25rem 0.45rem;
  position: relative;
`;

const HolidayImage = styled(Image)`
  &&& {
    position: absolute;
    top: -13%;
    left: 76%;
  }
`;

const WeekDayNumber = ({ date, currentDay, notAvailable, holiday }) => {
  if (!date) return null;

  let formatedDate = moment(date).format('DD');

  if (currentDay) {
    return <CurrentDay>{formatedDate}</CurrentDay>;
  }

  if (notAvailable) {
    return <NotAvailableDay>{formatedDate}</NotAvailableDay>;
  }

  if (holiday) {
    return (
      <HolidayDay>
        <HolidayImage src={holidayImg} />
        {formatedDate}
      </HolidayDay>
    );
  }

  return <StyledWeekDayNumber>{formatedDate}</StyledWeekDayNumber>;
};

export default WeekDayNumber;

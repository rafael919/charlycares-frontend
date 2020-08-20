import React from 'react';
import styled from 'styled-components';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

const getNumberOfSelectedDays = (days = []) => {
  if (!days.length) return 0;
  return days.reduce((count, day) => {
    if (day.current_state === 'accepted') {
      return count + 1;
    }
    return count;
  }, 0);
}

const Day = ({ day, selectedDays, totalDays }) => {
  const startDate = moment(day.start_date, 'YYYY-MM-DD HH:mm');
  const endDate = moment(day.end_date, 'YYYY-MM-DD HH:mm');
  return (
    <DayWrapper>
      <DayTimeRow>
        <div>
          <InlineText primaryFont fontSize="1.25rem">
            {startDate.clone().format('dddd')}
          </InlineText>
        </div>
        <div>
          <InlineText primaryFont>{`${startDate
            .clone()
            .format('HH:mm')} - ${endDate
            .clone()
            .format('HH:mm')}`}</InlineText>
        </div>
      </DayTimeRow>
      <RepetitionsContainer>
        <SelectedDays>{getNumberOfSelectedDays(selectedDays)}</SelectedDays> / {totalDays.length}{' '}
        <FormattedMessage id="days" />
      </RepetitionsContainer>
    </DayWrapper>
  );
};

const DayWrapper = styled.li`
  padding: 2rem 0 1rem;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;

  &:first-child {
    padding: 1rem 0;
  }
`;

const DayTimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedDays = styled.span`
  display: inline-block;
  padding: 0.1rem 0.4rem;
  background-color: ${props => props.theme.defaultBtnBackgroundColor};
  border-radius: 0.125rem;
`;

const RepetitionsContainer = styled.div`
  padding-top: 0.5rem;
`;

export default Day;

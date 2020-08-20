import { isMobile } from 'react-device-detect';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import groupBy from 'lodash.groupby';

import Day from '../Day';
import Week from '../Week';

const getWeekYear = (date, day) =>
  moment([date.year(), date.month(), day]).isoWeek();

const Month = ({
  month,
  events,
  showBookings,
  role,
  angel_id,
  withoutAvailability,
  onWeekSelect,
  sWeek,
  dayAvailability,
}) => (
  <Container>
    <MonthName>{month && month.format('MMMM YYYY')}</MonthName>
    <MonthContainer>
      {generateWeeksInMonth(month, events).map((week, i) => (
        <Week key={i}>
          {week.map(
            (
              {
                today,
                isBeforeToday,
                id,
                availability,
                current_state,
                date,
                booking_id,
                start_date,
                end_date,
                eventsData,
                startDate
              },
              dayIndex
            ) => {
              const details = {
                start_date,
                end_date,
                current_state,
              };
              const weekNumber = getWeekYear(month, date);

              return (
                <React.Fragment key={id}>
                  {sWeek === weekNumber ? <Marker /> : null}
                  <Day
                    eventsData={eventsData}
                    today={today}
                    isBeforeToday={isBeforeToday}
                    state={availability ? availability : current_state}
                    bookingState={current_state}
                    number={date}
                    date={startDate}
                    bookingId={booking_id}
                    showBookings={showBookings}
                    details={details}
                    role={role}
                    angel_id={angel_id}
                    week_number={weekNumber}
                    withoutAvailability={withoutAvailability}
                    onWeekSelect={onWeekSelect}
                  />
                </React.Fragment>
              );
            }
          )}
        </Week>
      ))}
    </MonthContainer>
  </Container>
);

const generateWeeksInMonth = (month, events) => {
  if (!month || !events) return [];
  const weeksInMonth = [];
  const currentMonth = month;
  const startDay = month
    .clone()
    .startOf('month')
    .startOf('isoWeek');
  const endDay = month
    .clone()
    .endOf('month')
    .endOf('isoWeek');

  const index = startDay.clone().subtract(1, 'day');
  const currentMonthCheck = startDay.clone();
  const today = moment();
  const groupedEvents = groupBy(events, event =>
    moment(event.start_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
  );

  while (
    index.isBefore(endDay, 'day') &&
    currentMonthCheck.isBefore(endDay, 'day')
  ) {
    weeksInMonth.push(
      new Array(7).fill(0).map(() => {
        if (!currentMonth.isSame(currentMonthCheck, 'month')) {
          index.add(1, 'day');
          currentMonthCheck.add(1, 'day');
          return { date: '', id: uniqid() };
        }
        index.add(1, 'day');

        currentMonthCheck.add(1, 'day');

        return {
          date: index.clone().date(),
          startDate: index.clone().format('YYYY-MM-DD'),
          id: uniqid(),
          eventsData: groupedEvents[index.clone().format('YYYY-MM-DD')] || [],
          today: index.isSame(today, 'day'),
          isBeforeToday: index.isBefore(today, 'day'),
        };
      })
    );
  }

  return weeksInMonth;
};

const Container = styled.div`
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`;

const MonthContainer = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  transform: translate3d(0, 0, 0);
  ${isMobile ? ` min-height: 59.2vw;` : ` min-height: 18.5rem;`};
`;

const MonthName = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1.0625rem;
  padding: ${!isMobile ? '1.25rem 0 1.25rem 2.75rem' : '1.25rem 0'};
`;

const Marker = styled.div`
  position: absolute;
  top: -5px;
  left: 0;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.defaultGrey};
  width: 100%;
  height: 100%;
  border-radius: 50px;
  z-index: -1;
`;

export default Month;

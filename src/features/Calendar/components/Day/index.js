import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import uuid from 'uniqid';
import UnavailableAfternoon from 'Assets/icons/cal-available-evening.svg';
import UnavailableMorning from 'Assets/icons/cal-available-morning.svg';
import CalUnavailableWholeDay from 'Assets/icons/cal-available-day.svg';
import CalUnavailableWholeDayFixed from 'Assets/icons/cal-available-day-fixed.svg';

const Day = ({
  number,
  today,
  bookingId,
  showBookings,
  history,
  details,
  role,
  id,
  angel_id,
  withoutAvailability,
  week_number,
  eventsData = [],
  isBeforeToday,
  availability,
  date,
}) => {
  const filteredEventsByRole = eventsData.filter(e => {
    if (role === 'family') {
      return (
        e.current_state === 'new' ||
        e.current_state === 'available' ||
        e.current_state === 'unavailable' ||
        e.current_state === 'pending' ||
        e.current_state === 'accepted'
      );
    }
    return true;
  });

  return (
    <DayContainer
      onClick={
        week_number !== -1 &&
        week_number !== undefined &&
        !isNaN(week_number) &&
        showBookings &&
        role === 'angel'
          ? () => navigateToAddUnavailability(history, date)
          : details && details.start_date
          ? () => navigateToDetailPage(history, details, angel_id)
          : null
      }
      today={today}
      isBeforeToday={isBeforeToday}
      role={role}
      eventsData={filteredEventsByRole}
      empty={!number}
      withoutAvailability={withoutAvailability}
      id={today ? 'today' : null}
      availability={availability}
    >
      <React.Fragment>
        {role === 'family' ? (
          number
        ) : (
          <InnerDayContainer eventsData={filteredEventsByRole} role={role}>
            {number}
          </InnerDayContainer>
        )}
        {showBookings ? (
          <DotsContainer today={today}>
            {generateEventDots(filteredEventsByRole, role)}
          </DotsContainer>
        ) : null}
      </React.Fragment>
    </DayContainer>
  );
};

// const navigateToWeekPage = memoizeWith(
//   (_, id) => id,
//   curry((history, id, onWeekSelect, _ev) => {
//     onWeekSelect(id);
//     history.push('/calendar/week', id);
//   })
// );

const navigateToAddUnavailability = memoizeWith(
  () => uuid(),
  curry((history, date) =>
    isMobile 
    ? history.push('/calendar/not-available', {
      start: moment(`${date} 12:00:00`).format('YYYY-MM-DDTHH:mm'),
      end: moment(`${date} 15:00:00`).format('YYYY-MM-DDTHH:mm'),
    })
    : history.push('/calendar/add', moment(date).week())
  )
);

const navigateToDetailPage = memoizeWith(
  () => uuid(),
  curry((history, details, angel_id, _ev) =>
    isMobile
      ? history.push('/calendar/availability-detail/', details)
      : history.push(
          '/calendar/availability/' + angel_id + '/availability-detail/',
          details
        )
  )
);

const DayContainer = styled.div`
  width: 2.153rem;
  height: 2.153rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-right: 4.28%;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
  &:nth-child(7n) {
    margin-right: 0;
  }
  ${props =>
    props.today &&
    `
    border: 2px solid ${props.theme.primaryText};
    border-radius: 50%;`} ${props => getStyleOfState(props)}
`;

const InnerDayContainer = styled.div`
  position: relative;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: ${props => (props.today ? '-0.85rem' : '-0.575rem')};
  left: 0;
  right: 0;
  display: flex;

  justify-content: space-around;
`;

const Dot = styled.div`
  position: relative;
  border-radius: 50%;
  width: 0.625rem;
  height: 0.625rem;
  ${props => getDotStyle(props)};
`;

const isUnavailableInMorning = event => {
  const momentStart = moment(
    moment(event.start_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
    'HH:mm'
  );
  const momentEnd = moment(
    moment(event.end_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
    'HH:mm'
  );
  return (
    moment(momentStart).isBetween(
      moment('00:00', 'HH:mm'), //00:15
      moment('15:00', 'HH:mm')
    ) &&
    moment(momentEnd).isBetween(
      moment('00:00', 'HH:mm'), //23:15
      moment('15:01', 'HH:mm')
    ) &&
    event.current_state !== 'available'
  );
};

const isUnavailableAfternoon = event => {
  const momentStart = moment(
    moment(event.start_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
    'HH:mm'
  );
  const momentEnd = moment(
    moment(event.end_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
    'HH:mm'
  );
  return (
    moment(momentStart).isBetween(
      moment('14:59', 'HH:mm'),
      moment('23:59', 'HH:mm')
    ) &&
    moment(momentEnd).isBetween(
      moment('15:00', 'HH:mm'),
      moment('23:59', 'HH:mm')
    ) &&
    event.current_state !== 'available'
  );
};

const isUnavailableBothParts = event =>
  !isUnavailableInMorning(event) && !isUnavailableAfternoon(event);

const generateEventDots = (eventsData, role) => {
  if (!eventsData || !eventsData.length) return null;
  return eventsData
    .filter(
      e =>
        e.current_state !== 'available' &&
        e.current_state !== 'unavailable' &&
        e.current_state !== 'standby'
    )
    .map((event, i) => (
      <Dot key={i} event={event.current_state} userRole={role} />
    ));
};

const getDotStyle = props => {
  if (
    props.event === 'pending' ||
    props.event === 'accepted' ||
    props.event === 'new'
  ) {
    switch (props.event) {
      case 'pending':
        return `
          background: #fff;
          border: 3px solid ${props.theme.orange};
        `;
      case 'new':
        return `
          background: ${props.theme.primaryColor};
        `;
      case 'canceled':
        return `
          background: ${props.theme.secondaryColor};
        `;
      case 'pending-approval':
        return `
          background: props.theme.orange;
        `;
      case 'accepted':
        return `
          background: ${props.theme.green};
          z-index: 10;
        `;
      case 'declined':
        return `
          border: 3px solid ${props.theme.secondaryColor};
          background: #fff;
          z-index: 10;
        `;
      case 'standby':
        return `
          border: 3px solid ${props.theme.primaryColor};
          background: #fff;
          z-index: -1;
      `;
      default:
        return null;
    }
  }
};

const getStyleOfState = props => {
  if (props.empty || props.withoutAvailability) return ``;
  if (props.isBeforeToday) {
    return `
      color: ${props.theme.grey};
      position: relative;
      font-weight: 400;
    `;
  }

  if (
    props.availability &&
    (props.availability.morning === 1 ||
      props.availability.afternoon === 1 ||
      props.availability.evening === 1)
  ) {
    return `
      background-image: url(${CalUnavailableWholeDayFixed});
      border-radius: 36px;
      background-size: contain;
      background-repeat: no-repeat;
    `;
  }

  if (!props.eventsData.length) {
    return `
      background: '#FFFFFF';
      border-radius: 50%;
  `;
  }

  const filteredData = props.eventsData.filter(event => {
    if (props.role === 'angel') {
      return (
        event.current_state !== 'accepted' &&
        event.current_state !== 'new' &&
        event.current_state !== 'standby' &&
        event.current_state !== 'declined' &&
        event.current_state !== 'pending-approval'
      );
    } else {
      return (
        event.current_state !== 'new' &&
        event.current_state !== 'standby' &&
        event.current_state !== 'declined'
      );
    }
  });

  const unavailableMorning = filteredData.some(event =>
    isUnavailableInMorning(event)
  );

  const unavailableAfternoon = filteredData.some(event =>
    isUnavailableAfternoon(event)
  );

  const wholeDayUnavailable = filteredData.some(
    event => event.all_day && event.current_state === 'unavailable'
  );

  const unavailableBothParts = filteredData.some(
    event =>
      (unavailableAfternoon && unavailableMorning) ||
      isUnavailableBothParts(event)
  );

  if (wholeDayUnavailable) {
    return `        
      position: relative;
      font-weight: 400;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 90%;
        height: 1px;
        background: black;
        transform-origin: 0 100%;
        transform: rotate(-30deg) translate(25%, -5px);
    `;
  }

  if (unavailableBothParts) {
    return `
      background-image: url(${CalUnavailableWholeDay});
      border-radius: 36px;
      background-size: cover; 
      background-repeat: no-repeat; 
    `;
  }

  if (unavailableAfternoon) {
    return `
      background-image: url(${UnavailableAfternoon});
      border-radius: 36px;
      background-size: cover; 
      background-repeat: no-repeat; 
    `;
  }

  if (unavailableMorning) {
    return `
      background-image: url(${UnavailableMorning});
      border-radius: 36px;
      background-size: cover; 
      background-repeat: no-repeat; 
    `;
  }

  return ``;

};

export default withRouter(Day);

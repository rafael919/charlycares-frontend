//@flow

import { Select } from 'semantic-ui-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

//TODO Desktop Timer requirements
// -------------------------------------------
//* The number of hours that can be selected before start date are defined by property `hoursBeforeStart`.
// Example:
//     hoursBeforeStart = 6
//         Current date is 2019-03-21 13:00:00
//         First selection should be 2019-03-21 07:00:00
//     hoursBeforeStart = 0
//         Current date is 2019-03-21 13:00:00
//         First selection should be 2019-03-21 07:00:00
//* The number of hours that can be selected from the start date are defined by property `minHoursFromNow`
// Example:
//     minHoursFromNow = 3
//         Current date is 2019-03-21 13:00:00
//         First selection should be 2019-03-21 16:00:00
//     Q: We probably want to combine this with hoursBeforeStart. minHoursFromNow is not the perfect term as it isn't from now perse, but from start date.
// It should keep a minimum difference between start and end date specified by property `difference`
// Example:
//     difference = 30
//         Selected start date is 2019-03-21 13:00:00
//         First selectable end time should be 2019-03-21 13:30:00
// It should be possible to specificy `interval` property. Interval determines the steps in minutes
// Example:
//     interval = 5: 10:00, 10:05, 10:10
//     interval = 15: 10:00, 10:15, 10:30
// Difference between start and end date can't be more than 23 hours
// Example:
//     Selected start date is 2019-03-21 13:00:00
//     Last selectable end time should be 2019-03-22 12:00:00
// Places where timer is used:
// booking/create
// paymentconfirmation
// calendar/not-available

const CustomSelect = styled(Select)`
  &&& {
    border: 0;
    background: transparent;
    color: ${props => props.theme.secondaryColor};
    font-family: ${props => props.theme.primaryFont};
    margin-right: -0.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > .text {
      color: ${props => props.theme.secondaryColor} !important;
    }

    & > .menu {
      border: 0;
      z-index: 1000;

      & span {
        color: ${props => props.theme.secondaryColor};
      }
    }
  }
`;

class DesktopTime extends React.Component {
  static defaultProps = {
    difference: 120,
    hoursBeforeStart: 0,
    interval: 15,
    minHoursFromNow: 0,
  };

  dateFormat = 'YYYY-MM-DD HH:mm';
  timeFormat = 'HH:mm';

  generateTimes = (
    startTime,
    type,
    startDate,
    difference,
    hoursBeforeStart,
    interval,
    minHoursFromNow,
    value
  ) => {
    let mStart;
    let mEnd;
    const now = moment();
    const sDate = moment(startDate, 'YYYY-MM-DD');

    if (type === 'end') {
      mStart = moment(startTime, this.timeFormat);
      mStart.add(difference, 'm');
      mEnd = mStart
        .clone()
        .add(23 - difference / 60, 'h')
        .add(45, 'm');
    } else {
      const date = moment(startTime, this.dateFormat);
      if (sDate.isAfter(now, 'd')) {
        mStart = moment(`${startDate} 06:00`, this.dateFormat);
        mEnd = moment(`${startDate} 23:45`, this.dateFormat);
      } else {
        const start = date.format(this.timeFormat);

        mStart = moment(`${startDate} ${start}`, this.dateFormat);
        mEnd = moment(`${startDate} 23:45`, this.dateFormat);
      }
    }

    //Hours before start time

    if (hoursBeforeStart > 0 && type === 'start') {
      mStart.subtract(hoursBeforeStart, 'hours');
    }

    let i = 0;
    let times = [];
    while (mStart.isSameOrBefore(mEnd)) {
      times.push({
        key: i,
        value: mStart.format(this.timeFormat),
        text: mStart.format(this.timeFormat),
      });

      mStart.add(interval, 'minutes');
      i++;
    }

    return times;
  };

  render() {
    const {
      startTime,
      type,
      startDate,
      difference,
      hoursBeforeStart,
      interval,
      minHoursFromNow,
      value,
      ...rest
    } = this.props;

    const times = this.generateTimes(
      startTime,
      type,
      startDate,
      difference,
      hoursBeforeStart,
      interval,
      minHoursFromNow,
      value
    );
    return (
      <CustomSelect
        {...rest}
        value={value}
        selection
        compact
        options={times}
        key={`${startTime}_${startDate}`}
      />
    );
  }
}

export default DesktopTime;

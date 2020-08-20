import moment from 'moment';
import { nearestMinutes } from 'Utils';

import {
  ON_ADD_DAY,
  ON_CLEAR_DAYS,
  ON_ADDRESS_SELECT,
  ON_RESERVATION_CHANGE,
  ON_CHILD_SELECT,
  ADD_REPEATED_DAY,
  CLEAR_REPEATED_DAYS,
  REMOVE_DAY,
} from './actions';

const initialState = {
  days: [],
};

export default (state = initialState, action) => {
  const date = moment();
  const initialStartTime = nearestMinutes(15, date.clone().add(3, 'hours'))
    .startOf('hour')
    .format('YYYY-MM-DD HH:mm');

  const startTime = `${
    state.days[state.days.length - 1]
      ? moment(
          state.days[state.days.length - 1].startTime,
          'YYYY-MM-DD HH:mm'
        ).format('YYYY-MM-DD HH:mm')
      : nearestMinutes(15, date.clone().add(3, 'hours')).format(
          'YYYY-MM-DD HH:mm'
        )
  }`;

  const endTime = `${
    state.days[state.days.length - 1]
      ? moment(
          state.days[state.days.length - 1].endTime,
          'YYYY-MM-DD HH:mm'
        ).format('YYYY-MM-DD HH:mm')
      : nearestMinutes(15, date.clone().add(5, 'h')).format('YYYY-MM-DD HH:mm')
  }`;

  switch (action.type) {
    case ON_ADD_DAY:
      return {
        ...state,
        days: [
          ...state.days,
          {
            id: state.days.length + 1,
            initialDate: state.days[state.days.length - 1]
              ? moment(
                  state.days[state.days.length - 1].startDate,
                  'YYYY-MM-DD'
                )
                  .add(1, 'day')
                  .format('YYYY-MM-DD')
              : date.clone().format('YYYY-MM-DD'),
            initialStartTime: moment(startTime, 'YYYY-MM-DD HH:mm').format(
              'YYYY-MM-DD HH:mm'
            ),
            initialEndTime: moment(endTime, 'YYYY-MM-DD HH:mm').format(
              'YYYY-MM-DD HH:mm'
            ),
            startDate:
              state.days.length >= 1
                ? moment(startTime, 'YYYY-MM-DD HH:mm')
                    .add(1, 'd')
                    .format('YYYY-MM-DD')
                : moment(startTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD'),
            startTime:
              state.days.length >= 1
                ? moment(startTime, 'YYYY-MM-DD HH:mm')
                    .add(1, 'd')
                    .format('YYYY-MM-DD HH:mm')
                : startTime,
            endTime:
              state.days.length >= 1
                ? moment(endTime, 'YYYY-MM-DD HH:mm')
                    .add(state.days.length, 'd')
                    .format('YYYY-MM-DD HH:mm')
                : endTime,
            repetitions: [],
          },
        ],
      };
    case REMOVE_DAY:
      return {
        ...state,
        days: state.days.filter(day => day.id !== action.payload),
      };
    case ON_CLEAR_DAYS:
      return {
        ...state,
        days: [
          {
            id: 1,
            initialDate: date.clone().format('YYYY-MM-DD'),
            initialStartTime: initialStartTime,
            startDate: state.days[state.days.length - 1]
              ? moment(
                  state.days[state.days.length - 1].startDate,
                  'YYYY-MM-DD'
                ).format('YYYY-MM-DD')
              : date
                  .clone()
                  .add(2, 'h')
                  .format('YYYY-MM-DD'),
            startTime: nearestMinutes(15, date.clone().add(3, 'hours')).format(
              'YYYY-MM-DD HH:mm'
            ),
            endTime: nearestMinutes(15, date.clone().add(5, 'h')).format(
              'YYYY-MM-DD HH:mm'
            ),
            repetitions: [],
          },
        ],
      };
    case ON_ADDRESS_SELECT:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case ON_CHILD_SELECT:
      return {
        ...state,
        selectedChildren: action.payload,
      };
    case ON_RESERVATION_CHANGE:
      return {
        ...state,
        days: action.payload,
      };
    case ADD_REPEATED_DAY:
      return {
        ...state,
        days: action.payload,
      };
    case CLEAR_REPEATED_DAYS:
      return {
        ...state,
        days: action.payload,
      };
    default:
      return state;
  }
};

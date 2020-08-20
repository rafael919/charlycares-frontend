// @flow

import { FormattedMessage } from 'react-intl';
import { InlineText } from 'Components/Text';
// import { nearestMinutes } from 'Utils';
import * as React from 'react';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Info from 'Components/InfoOverlay';
import moment from 'moment';
import ArrowDown from 'Assets/icons/btn-small-arrow-down.svg';
import styled from 'styled-components';


import DateTimeValue from './components/DateTimeValue';
import DateTimeWrapper from './components/DateTimeWrapper';
import HiddenInput from './components/HiddenInput';

// datepicker should have the following specs:
// - minimum time difference should be controlled from outside
// - hours allowed before start date should be controlled from outside

type TState = {
  initialStartTime: Moment,
  initialEndTime: Moment,
  startTime: Moment,
  endTime: Moment,
  showError: boolean,
  timeError: boolean,
};

type TProps = {
  startTime: Moment,
  endTime: Moment,
  hoursBeforeStartDate: number,
  minTimeDifference: number,
  onTimeChange: Function,
  onTimeError: Function,
};

const ArrowDownImage = styled.img`
  width: 12px;
  transform: rotate(270deg);
`;

class MobileTimeSelection extends React.Component<TProps, TState> {
  static defaultProps = {
    startTime: moment(),
    hoursBeforeStartDate: 2,
    minTimeDifference: 30,
    onTimeChange: () => {},
    onTimeError: () => {},
  };

  constructor(props) {
    super(props);

    this.standardDateFormat = 'YYYY-MM-DDTHH:mm';
    this.standardTimeFormat = 'HH:mm';
    this.state = {
      initialStartTime: this.props.initialStartTime,
      initialEndTime: this.props.initialEndTime
        ? this.props.endTime
        : this.props.startTime,
      startTime: this.props.startTime,
      endTime: this.props.endTime ? this.props.endTime : this.props.startTime,
      timeError: false,
      showError: false,
    };
  }

  onTimeChange = (e: SyntheticEvent<HTMLInputElement>): void => {
    e.persist();
    const { name, value } = e.currentTarget;
    if (value === '') return;
    this.setState(
      state => {
        if (name === 'startTime') {
          const startTime = moment(value, this.standardDateFormat);
          const diff = state.endTime.diff(startTime, 'm');
          if (diff < this.props.minTimeDifference) {
            return {
              ...state,
              startTime,
              endTime: startTime.clone().add(this.props.minTimeDifference, 'm'),
            };
          }

          if (diff > 23) {
            let endTime = moment(
              startTime.clone().format('YYYY-MM-DD') +
                ' ' +
                state.endTime.clone().format('HH:mm'),
              'YYYY-MM-DD HH:mm'
            );
            if (endTime < startTime) {
              endTime.add(1, 'day');
            }
            return {
              ...state,
              startTime,
              endTime,
            };
          }

          return {
            ...state,
            startTime,
          };
        }

        if (
          (this.props.endTime &&
            this.props.endTime.isSame(state.startTime, 'day')) ||
          !this.props.endTime
        ) {
          const endTime = moment(
            `${state.startTime.clone().format('YYYY-MM-DD')}T${value}`,
            this.standardDateFormat
          );

          if (endTime.isBefore(state.startTime)) {
            return {
              ...state,
              endTime: endTime.clone().add(1, 'day'),
            };
          }
          return {
            ...state,
            endTime: endTime.clone(),
          };
        }

        if (
          moment(value, 'HH:mm').isBefore(
            moment(state.startTime.clone().format('HH:mm'), 'HH:mm')
          )
        ) {
          const endTime = moment(
            `${this.props.endTime.clone().format('YYYY-MM-DD')}T${value}`,
            this.standardDateFormat
          );

          return {
            ...state,
            endTime: endTime.clone(),
          };
        }
        const endTime = moment(
          `${state.startTime.clone().format('YYYY-MM-DD')}T${value}`,
          this.standardDateFormat
        );

        return {
          ...state,
          endTime: endTime.clone(),
        };
      },
      () => {
        this.props.onTimeChange({
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          timeError: this.state.timeError,
        });
      }
    );
  };

  onStartTimeBlur = (): void => {
    this.setState(state => {
      if (state.initialStartTime.diff) {
        const diffWithInitialStartTime = state.initialStartTime.diff(
          state.startTime,
          'h'
        );
        if (diffWithInitialStartTime > this.props.hoursBeforeStartDate) {
          return {
            ...state,
            startTime: state.initialStartTime,
          };
        }
        return null;
      } else {
        const diffWithInitialStartTime = moment(
          state.initialStartTime,
          'YYYY-MM-DD HH:mm'
        ).diff(moment(state.startTime, 'HH:mm'), 'h');
        if (diffWithInitialStartTime > this.props.hoursBeforeStartDate) {
          return {
            ...state,
            startTime: state.initialStartTime,
          };
        }
        return null;
      }
    });
  };

  onEndTimeBlur = (): void => {
    this.setState(
      state => {
        const diff = state.endTime.diff(state.startTime, 'm');
        if (diff < this.props.minTimeDifference) {
          return {
            ...state,
            showError: true,
            timeError: true,
            endTime: state.endTime.clone(),
          };
        }
        return {
          ...state,
          timeError: false,
          endTime: state.endTime.clone(),
        };
      },
      () => {
        this.props.onTimeError({ timeError: this.state.timeError });
      }
    );
  };

  onTimeErrorClose = (): void => {
    this.setState({ showError: false });
  };

  render() {
    const { chatBook } = this.props;

    return (
      <React.Fragment>
        <Info
          top="-1rem"
          onClose={this.onTimeErrorClose}
          active={this.state.showError}
        >
          <FormattedMessage id="errors.timeError" />
        </Info>
        <CustomRow padding={chatBook ? '7px 0 0 0' : '1.667rem 0 0.8335rem 0'}>
          <CustomColumn width={chatBook ? 4 : 5}>
            <InlineText primaryFont>
              <FormattedMessage id="booking.create.day.start" />
            </InlineText>
          </CustomColumn>
          <CustomColumn
            padding="0 0 0 1em"
            textAlign="right"
            width={chatBook ? 12 : 11}
          >
            <DateTimeWrapper chatBook={chatBook}>
              <DateTimeValue>
                {this.state.startTime && this.state.startTime.clone
                  ? this.state.startTime.clone().format('dd. DD MMMM')
                  : moment(this.state.startTime).format('dd. DD MMMM')}
              </DateTimeValue>
              <HiddenInput
                name="startTime"
                onChange={this.onTimeChange}
                onBlur={this.onStartTimeBlur}
                value={
                  this.state.startTime && this.state.startTime.clone
                    ? this.state.startTime
                        .clone()
                        .format(this.standardDateFormat)
                    : moment(this.state.startTime, 'YYYY-MM-DD HH:mm').format(
                        this.standardDateFormat
                      )
                }
                type="datetime-local"
              />
              <DateTimeValue>
                {this.state.startTime && this.state.startTime.clone
                  ? this.state.startTime.clone().format('HH:mm')
                  : moment(this.state.startTime, 'YYYY-MM-DD HH:mm').format(
                      'HH:mm'
                    )}
              </DateTimeValue>
              <ArrowDownImage src={ArrowDown} />
            </DateTimeWrapper>
          </CustomColumn>
        </CustomRow>
        <CustomRow padding={chatBook ? '4px 0 0 0' : '0.8335rem 0'}>
          <CustomColumn width={10}>
            <InlineText primaryFont>
              <FormattedMessage id="booking.create.day.end" />
            </InlineText>
          </CustomColumn>
          <CustomColumn textAlign="right" width={6}>
            <DateTimeValue margin="0px 10px 0px 0px">
              {this.state.endTime && this.state.endTime.clone
                ? this.state.endTime.clone().format('HH:mm')
                : moment(this.state.endTime, 'YYYY-MM-DD HH:mm').format(
                    'HH:mm'
                  )}
            </DateTimeValue>
            <HiddenInput
              name="endTime"
              onChange={this.onTimeChange}
              onBlur={this.onEndTimeBlur}
              value={
                this.state.endTime && this.state.endTime.clone
                  ? this.state.endTime.clone().format(this.standardTimeFormat)
                  : moment(this.state.endTime, 'YYYY-MM-DD HH:mm').format(
                      this.standardTimeFormat
                    )
              }
              type="time"
            />
            <ArrowDownImage src={ArrowDown} />
          </CustomColumn>
        </CustomRow>
      </React.Fragment>
    );
  }
}

export default MobileTimeSelection;

import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import AnimatedCircle from 'Components/AnimatedCircle';

class Timer extends PureComponent {
  state = {
    offset: 207.00988,
    offsetLeft: 207.00988,
    secondsLeft: 0,
    offsetPerSec: 0,
    totalSeconds: 0,
    stopTimer: false,
  };

  componentDidMount() {
    const { startTime, endTime } = this.props;
    this.getInitialTimerValues(startTime, endTime);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  calculateCircleCircumference() {
    const outer = document.querySelector('#outer');
    if (outer) {
      return outer.getTotalLength();
    }
  }

  renderTimeLeft() {
    const daysLeft = Math.floor(this.state.secondsLeft / (3600 * 24));
    const hoursLeft = Math.floor((this.state.secondsLeft / 3600) % 24);
    const minutesLeft = Math.floor((this.state.secondsLeft % 3600) / 60);
    return (
      <FormattedMessage
        id="calendar.angel.unavailable.timeLeft"
        values={{ days: daysLeft, hours: hoursLeft, minutes: minutesLeft }}
      />
    );
  }

  getInitialTimerValues(startTime, endTime) {
    const now = moment();
    const mEndTime = moment(endTime, 'YYYY-MM-DD HH:mm:ss');
    const mStartTime = moment(startTime, 'YYYY-MM-DD HH:mm:ss');
    const totalSeconds = mEndTime.diff(mStartTime, 'seconds');
    const secondsLeft = mEndTime.diff(now, 'seconds');
    const offsetPerSec = this.state.offset / totalSeconds;
    const offsetLeft = (secondsLeft * this.state.offset) / totalSeconds;
    this.setState(
      {
        secondsLeft,
        offsetPerSec,
        totalSeconds,
        offsetLeft,
      },
      this.startTimerAnimation
    );
  }

  startTimerAnimation = (startTime, endTime) => {
    this.timerInterval = setInterval(() => {
      this.setState(prevState => {
        if (prevState.offset - this.state.offsetPerSec <= 0) {
          clearInterval(this.timerInterval);
          return {
            stopTimer: true,
          };
        } else {
          return {
            offsetLeft: prevState.offsetLeft - this.state.offsetPerSec,
            secondsLeft: prevState.secondsLeft - 1,
          };
        }
      });
    }, 1000);
  };

  onTimerStop = () => {
    this.setState(
      {
        secondsLeft: 0,
        offsetPerSec: 0,
        totalSeconds: 0,
        stopTimer: true,
      },
      this.props.onStopTimer
    );
  };

  render() {
    return this.state.secondsLeft > 0 && this.state.offset > 0 ? (
      <Container>
        <div>
          <TimerHeading>
            <FormattedMessage id="calendar.angel.unavailable.timerMsg" />
          </TimerHeading>
          <RemainingTime>
            {this.renderTimeLeft(this.props.endTime)}
          </RemainingTime>
        </div>
        <div onClick={this.onTimerStop}>
          <AnimatedCircle
            stopped={this.state.stopTimer}
            dashArray={this.state.offset}
            dashOffset={this.state.offsetLeft}
          />
        </div>
      </Container>
    ) : null;
  }
}

const Container = styled.div`
  background-color: #e6e6e6;
  border-radius: 6px;
  width: 100%;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const TimerHeading = styled.div`
  color: ${props => props.theme.lightGrey};
  font-size: 0.75rem;
`;

const RemainingTime = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 300;
  font-size: 1.125rem;
`;

export default Timer;

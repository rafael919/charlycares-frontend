import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import AnimatedCircle from 'Components/AnimatedCircle';
import PhoneModal from 'Components/PhoneModal';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';

class Timer extends React.PureComponent {
  state = {
    stopped: false,
    hours: 0,
    minutes: 0,
    showPhoneModal: false,
  };
  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  onTimerStop = () => {
    clearInterval(this.timer);
    this.setState(
      {
        stopped: true,
      },
      () => {
        // const { startTime, transactionCosts, credit, bookingId } = this.props;
        // const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');

        // this.props.history.push('/payments/confirmation', {
        //   startTime: startTime.date,
        //   endTime: currentTime,
        //   angel: this.props.angel,
        //   transactionCosts,
        //   credit,
        //   bookingId,
        // });
        this.props.onShowModal();
      }
    );
  };

  setTimer = () => {
    if (this.props.startTime) {
      this.timer = setInterval(() => {
        const currentTime = moment();
        const startTime = moment(
          this.props.startTime.date,
          'YYYY-MM-DD HH:mm:ss.SSSSSS'
        );

        const hours = currentTime.diff(startTime, 'hours');
        const minutes = currentTime
          .subtract(hours, 'hours')
          .diff(startTime, 'minutes');

        this.setState({
          hours,
          minutes,
        });
      }, 1000);
    }
  };

  render() {
    return this.props.startTime ? (
      <Container minimized={this.props.minimized}>
        <PhoneModal
          open={this.state.showPhoneModal}
          toggle={this.togglePhoneModal}
        />
        {!this.props.minimized ? (
          <div>
            <TimerHeading>
              <FormattedMessage id="favorites.timer.heading" />
            </TimerHeading>
            <RemainingTime>
              <FormattedMessage
                id="time"
                values={{
                  hours: this.state.hours,
                  minutes: this.state.minutes,
                }}
              />
            </RemainingTime>
          </div>
        ) : null}

        <TimerWrapper
          pointer={this.props.role === 'family' ? true : false}
          onClick={this.props.role === 'family' ? this.onTimerStop : null}
        >
          {this.props.role === 'family' ? (
            <AnimatedCircle noText stopped={this.state.stopped} />
          ) : (
            <Emergency>
              <CallTextDiv>
                <CallText>
                  <FormattedMessage id="angel.families.timer.emergency" />
                </CallText>
              </CallTextDiv>
              <CallBtnDiv onClick={this.togglePhoneModal}>
                <img src={phoneIconDisabled} alt={"phone disabled"}/>
              </CallBtnDiv>
            </Emergency>
          )}
        </TimerWrapper>
      </Container>
    ) : null;
  }
}

const Container = styled.div`
  background-color: ${({ minimized }) =>
    !minimized ? '#e6e6e6' : 'transparent'};
  border-radius: 6px;
  width: 100%;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  cursor: ${({ pointer }) => (pointer ? 'pointer' : null)};
`;

const Emergency = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 120px;
  background-color: #dd0000;
  border-radius: 6px;
  padding: 3.5px 5px 3px 6px;
`;

const CallTextDiv = styled.div`
  display: flex;
  padding-right: 5px;
  border-right: 1px solid #ffffff;
`;

const CallText = styled.span`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.1rem;
  color: #ffffff;
`;

const CallBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5px 0 3.5px 3.5px;
  cursor: pointer;
`;

export default withRouter(Timer);

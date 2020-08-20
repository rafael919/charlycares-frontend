import { FormattedMessage } from 'react-intl';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';

import ListItem from '../ListItem';

class FamilySection extends React.PureComponent {
  static defaultProps = {
    activeSitting: {},
  };

  state = {
    hours: null,
    minutes: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.activeSitting && !prevState.minutes && !prevState.hours) {
      this.renderTime();
    }
  }

  componentDidMount() {
    this.renderTime();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  renderTime = () => {
    if (this.props.activeSitting) {
      this.timer = setInterval(() => {
        const currentTime = moment();
        const startTime = moment(
          this.props.activeSitting.start_time.date,
          'YYYY-MM-DD HH:mm:ss'
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
    const { activeSitting, angelContact, history, goToChatPress } = this.props;
    const { hours, minutes } = this.state;

    if (!activeSitting) {
      return null;
    }
    return (
      <React.Fragment>
        {!activeSitting || activeSitting.length ? null : <Divider />}
        <CustomRow>
          <Container>
            {activeSitting && typeof activeSitting === 'object' && (
              <ListItem
                family={angelContact.find(
                  v => v.user_id === activeSitting.family.user_id
                )}
                goToChatPress={goToChatPress}
                history={history}
              />
            )}
            <Content>
              <TimeContainer>
                <Left>
                  <TimeHeading>
                    <FormattedMessage id="angel.families.timer" />
                  </TimeHeading>
                  <Time>
                    <FormattedMessage
                      id="time"
                      values={{
                        hours,
                        minutes,
                      }}
                    />
                  </Time>
                </Left>
                <Emergency>
                  <CallTextDiv>
                    <CallText>
                      <FormattedMessage id="angel.families.timer.emergency" />
                    </CallText>
                  </CallTextDiv>
                  <CallBtnDiv href={`tel:+31205929097`}>
                    <img src={phoneIconDisabled} alt={"phone disabled"} />
                  </CallBtnDiv>
                </Emergency>
              </TimeContainer>
            </Content>
          </Container>
        </CustomRow>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
`;

const TimeContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #e6e6e6;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TimeHeading = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
`;

const Time = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1.125rem;
  font-weight: 300;
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

const CallBtnDiv = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5px 0 3.5px 3.5px;
  cursor: pointer;
`;

export default FamilySection;

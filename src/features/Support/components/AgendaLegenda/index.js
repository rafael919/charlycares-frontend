import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import WithRole from 'Components/WithRole';
import AvailableIcon from 'Assets/icons/cal-available-day-fixed.svg';

import holidayIcon from 'Assets/icons/icn-calendar-holiday.svg';

const AgendaLegenda = () => {
  return (
    <WithRole>
      {role => (
        <Container>
          <Heading>
            <FormattedMessage id="support.heading" />
          </Heading>
          <List>
            <Item>
              <BoxPastDay>16</BoxPastDay>
              <Text>
                <FormattedMessage id="support.pastDays" />
              </Text>
            </Item>
            <Item>
              <BoxToday>16</BoxToday>
              <Text>
                <FormattedMessage id="support.today" />
              </Text>
            </Item>
            <Item>
              <BoxAvailable>16</BoxAvailable>
              <Text>
                <FormattedMessage id="support.unavailable" />
              </Text>
            </Item>
            <Item>
              <BoxAvailableMorning>16</BoxAvailableMorning>
              <Text>
                <FormattedMessage id="support.unavailableMorning" />
              </Text>
            </Item>
            <Item>
              <BoxAvailableEvening>16</BoxAvailableEvening>
              <Text>
                <FormattedMessage id="support.unavailableEvening" />
              </Text>
            </Item>
            <Item>
              <BoxAvailableFixed>16</BoxAvailableFixed>
              <Text>
                <FormattedMessage id="support.availableFixed" />
              </Text>
            </Item>
            <Item>
              <BoxUnavailable>16</BoxUnavailable>
              <Text>
                <FormattedMessage id="support.unavailableWholeDay" />
              </Text>
            </Item>
            <Item>
              <BoxBooked>16</BoxBooked>
              <Text>
                {role === 'angel' ? (
                  <FormattedMessage id="support.booked" />
                ) : (
                  <FormattedMessage id="support.willCome" />
                )}
              </Text>
            </Item>
           
              <Item>
                <BoxAcceptedAndWating>16</BoxAcceptedAndWating>
                <Text>
                  {role === 'family' ? (
                    <FormattedMessage id="support.acceptedAndWaiting" />
                    ) : <FormattedMessage id="support.acceptedAndWaitingAngel" />
                  }
                </Text>
              </Item>

            <Item>
              <BoxPending>16</BoxPending>
              <Text>
                <FormattedMessage id="support.bookingPending" />
              </Text>
            </Item>
            {role === 'family' ? (
              <Item>
                <BoxDeclined>16</BoxDeclined>
                <Text>
                  <FormattedMessage id="support.bookingDeclined" />
                </Text>
              </Item>
            ) : null}
            <Item>
              <BoxHoliday>16</BoxHoliday>
              <Text>
                <FormattedMessage id="support.holiday" />
              </Text>
            </Item>
          </List>
        </Container>
      )}
    </WithRole>
  );
};

const Container = styled.div`
  padding: 2rem 1rem;
`;

const Heading = styled.h2`
  font-size: 1.125rem;
`;

const List = styled.ul`
  padding: 0 0 0 0.5rem;
  margin: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 1.5625rem;
  flex-wrap: nowrap;
`;

const Box = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  ${isMobile
    ? `width: 9.6vw; height: 9.6vw;`
    : `width: 2.153rem; height: 2.153rem; z-index: 1;`} ${isMobile
    ? `flex: 1;`
    : `flex: none;`}
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 0.9375rem;
  font-weight: 300;
  padding-left: 4vw;
  flex: 8;
`;

const BoxPastDay = Box.extend`
  color: ${props => props.theme.grey};
  position: relative;
`;

const BoxUnavailable = Box.extend`
  color: ${props => props.theme.primaryText};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 90%;
    height: 1px;
    background: ${props => props.theme.primaryText};
    transform-origin: 0 100%;
    transform: rotate(-30deg) translate(25%, -5px);
  }
`;

const BoxToday = Box.extend`
  border: 1px solid ${props => props.theme.primaryText};
  border-radius: 50%;
`;

const BoxAvailable = Box.extend`
  background: ${props => props.theme.defaultGrey};
  border-radius: 50%;

`;
const BoxAvailableFixed = Box.extend`
  background-image: url(${AvailableIcon});
  background-size: cover; 
  background-repeat: no-repeat; 
  border-radius: 50%;
`;
const BoxAvailableMorning = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.theme.defaultGrey};
    ${isMobile
      ? `height: 9.6vw; width: 4.8vw;`
      : `width: 50%; height: 100%;`} border-top-left-radius: 36px;
    border-bottom-left-radius: 36px;
    border-right: 0;
    z-index: -1;
    transform: rotate(30deg) translate(0%, -10%);
  }
`;

const BoxAvailableEvening = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.theme.defaultGrey};
    ${isMobile
      ? `height: 9.6vw; width: 4.8vw;`
      : `width: 50%; height: 100%;`} border-top-left-radius: 36px;
    border-bottom-left-radius: 36px;
    border-right: 0;
    z-index: -1;
    transform: rotate(-150deg) translate(-100%, 12%);
  }
`;
const BoxBooked = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    background: ${props => props.theme.green};
    ${isMobile
      ? `height: 3.2vw; width: 3.2vw;`
      : `width: 0.625rem; height: 0.625rem;`} border-radius: 50%;
    transform: translate(-50%, 50%);
  }
`;

const BoxAcceptedAndWating = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    background: ${props => props.theme.orange};
    ${isMobile
      ? `height: 3.2vw; width: 3.2vw;`
      : `width: 0.625rem; height: 0.625rem;`} border-radius: 50%;
    transform: translate(-50%, 50%);
  }
`;
const BoxPending = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    background: ${props => props.theme.orange};
    ${isMobile
      ? `height: 3.2vw; width: 3.2vw;`
      : `width: 0.625rem; height: 0.625rem;`} border-radius: 50%;
    transform: translate(-50%, 50%);
    z-index: -1;
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    background: #fff;
    ${isMobile
      ? `height: 1.6vw; width: 1.6vw;`
      : `width: 0.3125rem; height: 0.3125rem;`} border-radius: 50%;
    transform: translate(-50%, 50%);
  }
`;

const BoxDeclined = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    background: ${props => props.theme.secondaryColor};
    ${isMobile
      ? `height: 3.2vw; width: 3.2vw;`
      : `width: 0.625rem; height: 0.625rem;`} border-radius: 50%;
    transform: translate(-50%, 50%);
    z-index: -1;
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    background: #fff;
    ${isMobile
      ? `height: 1.6vw; width: 1.6vw;`
      : `width: 0.3125rem; height: 0.3125rem;`} border-radius: 50%;
    transform: translate(-50%, 50%);
  }
`;

const BoxHoliday = Box.extend`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: url(${holidayIcon}) no-repeat center;
    ${isMobile
      ? `height: 4.8vw; width: 4.3vw;`
      : `width: 0.96875rem; height: 1.09375rem;`} transform: translate(15%, -15%);
  }
`;

export default AgendaLegenda;

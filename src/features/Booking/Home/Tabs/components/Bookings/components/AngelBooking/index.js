import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import pendingStatusIcon from 'Assets/icons/status-pending-requred.svg';
import { Image } from 'semantic-ui-react';

class AngelBooking extends React.Component {
  state = {
    hours: null,
    minutes: null,
    seconds: null,
  };

  componentDidMount() {
    if (this.props.expiresAt && this.props.status === 'pending') {
      this.calculateRemainingTime();
    }
  }

  setTime = time => {
    if (time > 0) {
      if (time < 10) {
        return `0${time}`;
      }
      return time;
    }
    return null;
  };

  calculateRemainingTime = () => {
    this.interval = setInterval(() => {
      const now = moment();
      const endTime = moment(this.props.expiresAt, 'YYYY-MM-DD HH:mm:ss');
      const diff = endTime.diff(now);
      const diffDuration = moment.duration(diff);
      const hours = this.setTime(diffDuration.hours());
      const minutes = this.setTime(diffDuration.minutes());
      const seconds = this.setTime(diffDuration.seconds());

      this.setState({
        hours,
        minutes,
        seconds,
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      status,
      angel,
      repeatQty,
      startDate,
      endDate,
      familyData,
      noBorder,
      onBookingSelect,
      bookings,
    } = this.props;
    const mStartDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    const mEndDate = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    const isStartDateValid = mStartDate.isValid();
    const isEndDateValid = mEndDate.isValid();

    return (
      <BookingContainer
        onClick={onBookingSelect}
        noBorder={noBorder}
        offer={status}
      >
        <Wrapper>
          <DateContainer>
            {repeatQty > 1 && <Repetitions>{repeatQty}x</Repetitions>}
            <WeekDay>
              {bookings && bookings.length > 0
                ? bookings.map((book, i) => {
                    if (i === bookings.length - 1) {
                      return moment(
                        book.start_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('dddd');
                    }
                    return `${moment(
                      book.start_date,
                      'YYYY-MM-DD HH:mm:ss'
                    ).format('dddd')}, `;
                  })
                : isStartDateValid && mStartDate.clone().format('dddd')}
            </WeekDay>
          </DateContainer>
          <DateText>
            {isStartDateValid && mStartDate.clone().format('MMMM DD, YYYY')}
          </DateText>
          {angel && familyData ? (
            <FamilyName>{`${familyData.first_name} ${
              familyData.last_name
            }`}</FamilyName>
          ) : null}
        </Wrapper>
        <TimeContainer>
          <TimeText>
            {isStartDateValid && mStartDate.clone().format('HH:mm')} -{' '}
            {isEndDateValid && mEndDate.clone().format('HH:mm')}
          </TimeText>
          {renderBookingStatus(status)}
          {status === 'pending' ? (
            <ViewOffer>
              {`${this.state.hours ? this.state.hours : '00'}:${
                this.state.minutes ? this.state.minutes : '00'
              }:${this.state.seconds ? this.state.seconds : '00'}`}
            </ViewOffer>
          ) : null}
        </TimeContainer>
      </BookingContainer>
    );
  }
}

function renderBookingStatus(status) {
  switch (status) {
    case 'pending_payment':
    case 'pending_approval':
      return (
        <ViewOffer pendingApproval style={{ paddingRight: '0rem' }}>
          <FormattedMessage id="booking.home.status.pendingApproval" />
          <CustomIcon src={pendingStatusIcon} />
        </ViewOffer>
      );
    case 'pending':
      return (
        <ViewOffer pending>
          <FormattedMessage id="booking.home.status.pending" />
        </ViewOffer>
      );
    case 'pending_edit':
      return (
        <ViewOffer pending>
          <FormattedMessage id="booking.home.status.pendingEdit" />
        </ViewOffer>
      );
    case 'declined_family':
      return (
        <ViewOffer ended>
          <FormattedMessage id="booking.home.status.declinedFamily" />
        </ViewOffer>
      );
    case 'accepted':
      return (
        <ViewOffer accepted>
          <FormattedMessage id="booking.home.status.accepted" />
        </ViewOffer>
      );
    case 'declined':
      return (
        <ViewOffer denied>
          <FormattedMessage id="booking.home.status.declinedAngel" />
        </ViewOffer>
      );
    case 'ended':
      return (
        <ViewOffer ended>
          <FormattedMessage id="booking.home.status.ended" />
        </ViewOffer>
      );
    case 'canceled':
      return (
        <ViewOffer ended>
          <FormattedMessage id="booking.home.status.canceled" />
        </ViewOffer>
      );
    case 'given':
      return (
        <ViewOffer given>
          <FormattedMessage id="booking.home.status.given" />
        </ViewOffer>
      );
    case 'expired':
      return (
        <ViewOffer given>
          <FormattedMessage id="booking.home.status.expired" />
        </ViewOffer>
      );
    default:
      return null;
  }
}

const FamilyName = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  padding-top: 0.5rem;
`;

const BookingContainer = styled.li`
  display: flex;
  padding: 1.5rem 1.25rem;
  width: 100%;
  justify-content: space-between;
  background-color: ${props =>
    props.offer === 'pending' ? '#faf9e3' : '#fff'};
  position: relative;

  ${props =>
    isMobile
      ? `&:last-child {
    border-bottom: 1px solid ${props.theme.defaultGrey};
  }

  &:last-child::after {
    display: none;
  }

  ${!props.noBorder &&
    `
&::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    background: #f9f8f9;
    min-height: 0.4em;
    width: 100%;
    border-top: 1px solid ${props.theme.defaultGrey};
    border-bottom: 1px solid ${props.theme.defaultGrey};
  }
`};`
      : `border: 1px solid #E6E6E6;	border-radius: 4px; margin-bottom: 0.4em; &:last-child { margin-bottom: 0; }`};
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
`;

const WeekDay = styled.div`
  font-size: 0.9375rem;
  font-family: ${props => props.theme.primaryFont};

  &:not(:only-child) {
    margin-left: 0.5rem;
  }
`;

const DateText = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
`;

const Wrapper = styled.div`
  flex: 1;
  margin-right: 0.5rem;
`;

const TimeText = styled.div`
  padding-bottom: 0.5rem;
  font-size: 0.9375rem;
  font-family: ${props => props.theme.primaryFont};
`;

const Repetitions = styled.div`
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  text-align: center;
  border-radius: 0.625rem;
  background-color: #d9d9d9;
  display: inline-block;
  padding: 0 0.4rem;
`;

const TimeContainer = styled.div`
  text-align: right;
  font-size: 0.9375rem;
  font-family: ${props => props.theme.primaryFont};
`;

const CustomIcon = styled(Image)`
  &&& {
    margin-left: 0.2rem;
  }
`;

const ViewOffer = styled.div`
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => (props.offer ? '#fff' : props.theme.lightGrey)};
  background-color: ${props => props.offer && props.theme.green};
  border-radius: 0.625rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 0.4rem;
  padding-right: 0.875rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 0.625rem;
    height: 0.625rem;
    background-color: ${props =>
      props.accepted
        ? props.theme.green
        : props.denied || props.ended || props.given
        ? '#c7c7c9'
        : props.pending && props.theme.orange};
    border-radius: 50%;
    right: 0;
  }
`;

export default AngelBooking;

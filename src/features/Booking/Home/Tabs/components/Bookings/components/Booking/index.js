import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import errorStatusIcon from 'Assets/icons/status-canceled.svg';
import pendingStatusIcon from 'Assets/icons/status-pending-requred.svg';
import clock from 'Assets/icons/icn-time-white.svg';
import { isMobile } from 'react-device-detect';
import placeholder from 'Assets/images/profile-placeholder.png';

import DefaultAngelImage from 'Components/DefaultAngelImage';

const CustomImage = DefaultAngelImage.extend`
  width: 3rem;
  height: 3rem;

  float: left;
  margin-right: 12.5px;
`;

const BookingInfoSection = styled.div`
  width: 60%;
`;

const Booking = ({
  offer,
  status,
  angel,
  repeatQty,
  startDate,
  endDate,
  familyName,
  noBorder,
  onBookingSelect,
  angelInfo,
  allDeclined,
}) => {
  const mStartDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
  const mEndDate = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
  const isStartDateValid = mStartDate.isValid();
  const isEndDateValid = mEndDate.isValid();
  return (
    <BookingContainer
      onClick={onBookingSelect}
      noBorder={noBorder}
      offer={offer}
    >
      <BookingInfoSection>
        {(status === 'accepted' || status === 'ended') && (
          <CustomImage
            src={
              angelInfo && angelInfo[0].image ? angelInfo[0].image : placeholder
            }
          />
        )}

        <DateContainer>
          {repeatQty > 1 && <Repetitions>{repeatQty}x</Repetitions>}
          <WeekDay>
            {isStartDateValid && mStartDate.clone().format('dddd')}
          </WeekDay>
        </DateContainer>
        <DateText>
          {isStartDateValid && mStartDate.clone().format('MMMM DD, YYYY')}
        </DateText>
        <FamilyName>{familyName}</FamilyName>
      </BookingInfoSection>
      <TimeContainer>
        <TimeText>
          {isStartDateValid && mStartDate.clone().format('HH:mm')} -{' '}
          {isEndDateValid && mEndDate.clone().format('HH:mm')}
        </TimeText>
        {offer ? (
          <HasOfferContainer>
            <HasOfferText>view offer now</HasOfferText>
            <Image src={clock} />
          </HasOfferContainer>
        ) : (
          <React.Fragment>
            {renderBookingStatus(status, allDeclined)}
          </React.Fragment>
        )}
      </TimeContainer>
    </BookingContainer>
  );
};

function renderBookingStatus(status, allDeclined) {
  if (!allDeclined) {
    switch (status) {
      case 'pending':
        return (
          <ViewOffer pending>
            <FormattedMessage id="booking.home.status.pending" />{' '}
            <CustomIcon src={pendingStatusIcon} />
          </ViewOffer>
        );
      case 'pending_edit':
        return (
          <ViewOffer pending>
            <FormattedMessage id="booking.home.status.pendingEdit" />{' '}
            <CustomIcon src={pendingStatusIcon} />
          </ViewOffer>
        );
      case 'pending_payment':
        return (
          <ViewOffer pendingPayment style={{ color: '#F56B87' }}>
            <FormattedMessage id="booking.home.status.pendingPayment" />
            <CustomIcon src={errorStatusIcon} />
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
            <FormattedMessage id="booking.home.status.declined" />{' '}
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
      default:
        return null;
    }
  } else {
    return (
      <ViewOffer ended>
        <FormattedMessage id="booking.home.status.allDeclined" />
        <CustomIcon src={errorStatusIcon} />
      </ViewOffer>
    );
  }
}

const CustomIcon = styled(Image)`
  &&& {
    margin-left: 0.2rem;
  }
`;

const FamilyName = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
`;

const BookingContainer = styled.li`
  display: flex;
  padding: 1.5rem 1.25rem;
  width: 100%;
  justify-content: space-between;
  background-color: ${props => (props.offer ? '#fafae3' : '#fff')};
  position: relative;
  transform: translate3d(0, 0, 0);

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
  margin-left: 0.5rem;

  &:first-child {
    margin-left: 0;
  }
`;

const DateText = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
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
  ${isMobile &&
    `
    width: 50%; 
  `}
`;

const ViewOffer = styled.div`
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props => (props.offer ? '#fff' : props.theme.lightGrey)};
  background-color: ${props => props.offer && props.theme.green};
  border-radius: 0.625rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 0.4rem;
`;

const HasOfferText = styled.div`
  font-family: ${props => props.theme.secondaryFont};
  font-size: 0.75rem;
  margin-right: 0.25rem;
`;
const HasOfferContainer = styled.div`
  background: ${props => props.theme.green};
  border-radius: 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5rem;
`;

export default Booking;

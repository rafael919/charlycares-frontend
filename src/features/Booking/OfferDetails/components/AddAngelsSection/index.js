import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';

const AddSectionWrapper = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  padding: ${isMobile ? '0rem' : '0.5rem'};
  ${!isMobile
    ? `
    bottom: -4rem; 
    margin: -1rem; 
    padding: 1.5rem; 
  `
    : null}
  background: #fff;
`;
const AddSectionDesc = styled.div`
  color: ${props => props.theme.defaultBtnTextColor};
  font-size: 0.75rem;
  line-height: 1.5;
  flex: 1;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  text-align: right;
`;

const onAddAngels = (
  history,
  bookingId,
  angels,
  maxAngels,
  bookingDates
) => () => {
  history.push('/booking/search', {
    from: 'bookingDetails',
    bookingId,
    angels,
    maxAngels,
    bookingDates,
  });
};

const AddAngelsSection = ({
  history,
  location,
  angels,
  bookingId,
  maxAngels,
  bookingDates,
}) => {
  return (
    <AddSectionWrapper>
      <AddSectionDesc>
        <FormattedMessage
          id="booking.offers.addAngelsDesc"
          values={{ max: maxAngels }}
        />
      </AddSectionDesc>

      <ButtonWrapper>
        <BasicButton
          onClick={onAddAngels(
            history,
            bookingId,
            angels,
            maxAngels,
            bookingDates
          )}
          size="small"
          primary
        >
          <FormattedMessage id="booking.offers.addAngelsBtn" />
        </BasicButton>
      </ButtonWrapper>
    </AddSectionWrapper>
  );
};

export default withRouter(AddAngelsSection);

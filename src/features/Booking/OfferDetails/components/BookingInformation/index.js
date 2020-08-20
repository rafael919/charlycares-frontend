import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import arrowDown from 'Assets/icons/btn-small-arrow-down.svg';

const BookingInformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: ${props => props.borderTop && '1px solid #e6e6e6'};
  border-bottom: ${props => props.borderBottom && '1px solid #e6e6e6'};
  font-size: 0.9375rem;
  color: ${props => props.theme.grey};
`;

const Image = styled.img`
  cursor: pointer;
`;

const BookingInformation = ({ borderTop, borderBottom, onClick }) => {
  return (
    <BookingInformationContainer
      borderBottom={borderBottom}
      borderTop={borderTop}
      onClick={onClick}
    >
      <FormattedMessage id="booking.offers.allInfo" />
      <Image id="arrow" src={arrowDown} />
    </BookingInformationContainer>
  );
};

export default BookingInformation;

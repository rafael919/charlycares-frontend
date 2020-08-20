import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

const NumberOfAccepted = styled.div`
  display: inline-block;
  padding: 0.1rem 0.4rem;
  background-color: #d9d9d9;
  border-radius: 2px;
  font-size: 0.9375rem;
  line-height: 1.5;
  text-align: center;
`;

const Waiting = NumberOfAccepted.extend`
  font-weight: 600;
  font-size: 1rem;
  padding: 0.1rem 0.7rem;
  vertical-align: middle;
`;
const Declined = NumberOfAccepted.extend`
  font-weight: 600;
  font-size: 1rem;
  padding: 0.1rem 0.6rem;
  vertical-align: middle;
`;

const Days = ({ awaiting, declined, canceled, max, selected }) => {
  return awaiting ? (
    <div>
      <Waiting> ? </Waiting>
    </div>
  ) : declined || canceled ? (
    <div>
      <Declined> X </Declined>
    </div>
  ) : (
    <div>
      <NumberOfAccepted>{selected}</NumberOfAccepted> / {max}{' '}
      <FormattedMessage id="booking.offers.days" />
    </div>
  );
};

export default Days;

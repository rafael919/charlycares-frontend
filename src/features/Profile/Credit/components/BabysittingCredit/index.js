import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

const BabysittingCredit = ({ credit }) => {
  return (
    <Container>
      <Title>
        <FormattedMessage id="profile.family.credit.babySittingCredit" />
      </Title>
      <Value>€ {credit}</Value>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem;
  background-color: ${props => props.theme.defaultGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${isMobile ? 0 : '0 -1rem'};
`;
const Title = styled.div`
  font-size: 1.1875rem;
`;
const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
`;

export default BabysittingCredit;

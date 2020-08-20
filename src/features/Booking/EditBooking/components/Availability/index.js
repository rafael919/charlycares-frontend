import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${isMobile ? '1.5rem 1rem 7rem' : '1.5rem 1rem 2rem'};
`;

const Header = styled.h3`
  font-size: 1rem;
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Availability = ({ children }) => (
  <Container>
    <Header>
      <FormattedMessage id="booking.edit.availableAngelsHeader" />
    </Header>
    <List>{children}</List>
  </Container>
);

export default Availability;

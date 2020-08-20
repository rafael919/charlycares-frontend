import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const CancelMembership = ({ onCancelMembership }) => {
  return (
    <Container>
      <Button onClick={onCancelMembership}>
        <FormattedMessage id="profile.family.membership.cancelMembershipBtn" />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 7rem;
  padding-top: 1.5rem;
`;
const Button = styled.button`
  background: transparent;
  border: 0;
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};

  &:focus {
    outline: 0;
  }
`;

export default CancelMembership;

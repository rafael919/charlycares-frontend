import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

const LinksSectionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  position: relative;
  z-index: 10;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  flex: 1;

  &:first-child {
    border-right: 1px solid #e6e6e6;
  }
`;

const Button = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  background: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:disabled {
    opacity: 0.5;
    :hover {
      cursor: initial;
    }
    color: ${props => props.theme.grey};
  }
`;

const BookingInformation = ({ onCancel, onEdit, editAllowed }) => {
  return (
    <LinksSectionContainer>
      <LinkWrapper>
        <Button onClick={onCancel}>
          <FormattedMessage id="booking.accepted.cancel" />
        </Button>
      </LinkWrapper>

      <LinkWrapper>
        <Button onClick={editAllowed ? onEdit : null} disabled={!editAllowed}>
          <FormattedMessage id="booking.accepted.edit" />
        </Button>
      </LinkWrapper>
    </LinksSectionContainer>
  );
};

export default BookingInformation;

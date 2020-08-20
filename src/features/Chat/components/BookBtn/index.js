import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import WithRole from 'Components/WithRole';
import addIcon from 'Assets/icons/btn-large-add-disabled.svg';

const BookBtn = ({ intl, navigateToBooking }) => {
  return (
    <WithRole>
      {role =>
        role === 'family' && (
          <SendButtonContainer onClick={navigateToBooking}>
            <BookIcon src={addIcon} />
            <Label>{intl.formatMessage({ id: 'chat.bookBtn' })}</Label>
          </SendButtonContainer>
        )
      }
    </WithRole>
  );
};

const SendButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.secondaryColor};
  height: 2.3125rem;
  margin-right: 1rem;
  background: transparent;
  border: 0;
  height: 3rem;
  width: 4rem;

  &:focus {
    outline: 0;
  }
`;

const BookIcon = styled.img`
  width: 3.1rem;
  height: 3.1rem;
  margin-top: -0.75rem;
`;

const Label = styled.div`
  font-size: 0.7rem;
  margin-top: -0.875rem;
  font-family: ${props => props.theme.secondaryFont};
`;

export default injectIntl(BookBtn);

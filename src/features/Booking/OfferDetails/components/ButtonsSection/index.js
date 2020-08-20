import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 1rem;
`;

const RequestWrapper = Wrapper.extend`
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeclineButtonWrapper = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeclineButton = styled.button`
  font-size: 0.9375rem;
  color: ${props => props.theme.defaultBtnTextColor};
  font-family: ${props => props.theme.secondaryFont};
  line-height: 1.6;
  border: 0;
  background: transparent;

  &:focus {
    outline: 0;
  }
`;

const Button = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  background: transparent;
  border: none;
  margin: auto;
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

const ButtonsSection = ({
  notFullyAccepted,
  expired,
  onOfferLook,
  onDecline,
  onAccept,
  requestAgain,
  madeOffer,
}) => {
  return expired && madeOffer ? (
    <RequestWrapper>
      <Button onClick={requestAgain}>
        <FormattedMessage id="booking.offers.requestAgain" />
      </Button>
    </RequestWrapper>
  ) : !expired ? (
    <Wrapper>
      <DeclineButtonWrapper>
        <DeclineButton onClick={onDecline}>
          <FormattedMessage id="booking.offers.btnDecline" />
        </DeclineButton>
      </DeclineButtonWrapper>

      <ButtonWrapper>
        {notFullyAccepted ? (
          <BasicButton onClick={onOfferLook} fluid primary>
            <FormattedMessage id="booking.offers.btnViewOffer" />
          </BasicButton>
        ) : (
          <BasicButton onClick={onAccept} fluid primary>
            <FormattedMessage id="booking.offers.btnAccept" />
          </BasicButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  ) : null;
};

export default ButtonsSection;

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const ConfirmationSection = ({
  sum,
  paymentState,
  chargeLink,
  onSubmit,
  formIsValid,
}) => {
  return (
    <div>
      <Description>
        {paymentState === 'chargeback' ? (
          <FormattedMessage id="payments.family.details.paymentDesc" />
        ) : (
          <FormattedMessage id="payments.family.details.reviewDesc" />
        )}
      </Description>
      <div>
        {onSubmit && typeof onSubmit === 'function' ? (
          <SubmitButton
            disabled={!formIsValid}
            active={formIsValid}
            onClick={onSubmit}
          >
            <FormattedMessage
              id="payments.family.details.chargeBackButton"
              values={{ sum }}
            />
          </SubmitButton>
        ) : (
          <Button href={chargeLink}>
            <FormattedMessage
              id="payments.family.details.chargeBackButton"
              values={{ sum }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

const Description = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  padding-bottom: 0.5rem;
  text-align: left;
`;

const Button = styled.a`
  width: 100%;
  display: block;
  cursor: pointer;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: ${props =>
    props.active
      ? props.theme.primaryColor
      : props.theme.defaultBtnBackgroundColor};
  color: ${props => (props.active ? '#fff' : props.theme.defaultBtnTextColor)};
  font-family: ${props => props.theme.secondaryFont};
  margin: 0 0.25em 0 0;
  padding: 0.6875em 1.5em 0.6875em;
  text-transform: none;
  text-shadow: none;
  font-weight: 600;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 1.85714rem;
  -webkit-box-shadow: 0 0 0 2px transparent inset,
    0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  box-shadow: 0 0 0 2px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    color: ${props => props.theme.defaultBtnTextColor};
  }
`;

const SubmitButton = Button.withComponent('button');

export default ConfirmationSection;

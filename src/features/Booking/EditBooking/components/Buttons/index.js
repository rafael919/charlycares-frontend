import styled from 'styled-components';
import React from 'react';
import BasicButton from 'Components/Buttons/Basic';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Button = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  color: ${props => props.theme.defaultBtnTextColor};
  font-weight: 300;
  flex: 1;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const Buttons = ({
  onCancel,
  onCheckAndConfirm,
  available,
  checked,
  onCancelBooking,
  onConfirm,
}) => (
  <Container>
    <Button onClick={onCancel}>
      {checked && !available ? (
        <FormattedMessage id="booking.edit.cancelEdit" />
      ) : (
        <FormattedMessage id="booking.edit.cancel" />
      )}
    </Button>

    {checked && available ? (
      <BasicButton onClick={onCheckAndConfirm} primary>
        <FormattedMessage id="booking.edit.sendRequest" />
      </BasicButton>
    ) : checked && !available ? (
      <BasicButton onClick={onCancelBooking} primary>
        <FormattedMessage id="booking.edit.cancelBooking" />
      </BasicButton>
    ) : (
      <BasicButton primary onClick={onCheckAndConfirm}>
        <FormattedMessage id="booking.edit.check" />
      </BasicButton>
    )}
  </Container>
);

export default Buttons;

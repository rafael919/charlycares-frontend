import React from 'react';
import styled from 'styled-components';
import Indicator from 'Components/Indicator';
import { isMobile } from 'react-device-detect';

const Image = styled.img``;

const Wrapper = styled.a`
  margin-right: 1rem;
  padding: 0;
  border: 0;
  background: transparent;

  &:last-child {
    margin-right: 0;
  }
`;

const WrapperAsButton = styled.button`
  margin-right: 1rem;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  position: relative;

  &:focus {
    outline: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const NavIcons = ({
  phone,
  onClick,
  activeIcon,
  disabledIcon,
  disabled,
  newMessage,
  togglePhoneModal,
}) => {
  return phone ? (
    <Wrapper
      href={!disabled && isMobile ? `tel:${phone}` : null}
      onClick={!disabled ? togglePhoneModal : null}
    >
      <Image avatar src={disabled ? disabledIcon : activeIcon} />
    </Wrapper>
  ) : (
    <WrapperAsButton onClick={!disabled ? onClick : null}>
      {newMessage > 0 && (
        <Indicator offSet messageCount={newMessage} style={{ right: '0rem' }} />
      )}
      <Image avatar src={disabled ? disabledIcon : activeIcon} />
    </WrapperAsButton>
  );
};

export default NavIcons;

import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';

import phoneIcon from 'Assets/icons/btn-phone.svg';

const CallBtn = ({ name, phone, togglePhoneModal }) => {
  return (
    <Container>
      <Button href={isMobile ? `tel:+${phone}` : null} onClick={togglePhoneModal}>
        <Image src={phoneIcon} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: ${isMobile ? 'center' : 'flex-end'};
`;

const Button = styled.a`
  border: 0;
  background: transparent;
`;

export default CallBtn;

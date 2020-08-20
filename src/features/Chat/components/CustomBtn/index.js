import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Image } from 'semantic-ui-react';

const CustomBtn = ({
  icon,
  type,
  imageUpload,
  phone,
  togglePhoneModal,
  navigateToBooking,
}) => {
  return (
    <Container>
      {type === 'image' ? (
        <Button href={null}>
          <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
            <Image src={icon} />
          </label>
          <InputBtn type="file" accept="image/*" id="file-input" onChange={imageUpload} />
        </Button>
      ) : (type === 'camera' && isMobile) ? (
        <Button href={null}>
          <label htmlFor="camera-input" style={{ cursor: 'pointer' }}>
            <Image src={icon} />
          </label>
          <InputBtn type="file" accept="image/*" capture="camera" id="camera-input" onChange={imageUpload} />
        </Button>
      ) : type === 'phone' ? (
        <Button
          href={isMobile ? `tel:+${phone}` : null}
          onClick={togglePhoneModal}
        >
          <Image src={icon} />
        </Button>
      ) : (
        <Button
          href={null}
          onClick={type === 'book' ? navigateToBooking : null}
        >
          <Image src={icon} />
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
`;

const Button = styled.a`
  border: 0;
  background: transparent;
  width: 2rem;
  cursor: pointer;
`;

const InputBtn = styled.input`
  display: none;
`;

export default CustomBtn;

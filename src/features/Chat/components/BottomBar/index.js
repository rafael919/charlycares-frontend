import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import WithRole from 'Components/WithRole';
import galleryIcon from 'Assets/icons/icn-image.svg';
import cameraIcon from 'Assets/icons/icn-photo.svg';
import phoneIcon from 'Assets/icons/icn-telephone-line.svg';
import calendarIcon from 'Assets/icons/icn-calendar-add.svg';
import CustomBtn from '../CustomBtn';
import SendBtn from '../SendBtn';

const BottomBar = ({
  phone,
  togglePhoneModal,
  imageUpload,
  messages,
  navigateToBooking,
  onSend,
}) => {
  return (
    <Container>
      <SubDiv>
        <CustomBtn type="image" icon={galleryIcon} imageUpload={imageUpload} />
        {isMobile && <CustomBtn type="camera" icon={cameraIcon} imageUpload={imageUpload} />}
        {/* <CustomBtn icon={microphoneIcon} /> */}
        <WithRole>
          {role => (
            <CustomBtn
              type="book"
              icon={calendarIcon}
              navigateToBooking={navigateToBooking(role)}
            />
          )}
        </WithRole>
        <CustomBtn
          type="phone"
          icon={phoneIcon}
          phone={phone}
          togglePhoneModal={togglePhoneModal}
        />
      </SubDiv>
      <SendBtn messages={messages} onSend={onSend} />
    </Container>
  );
};

const Container = styled.div`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  width: ${isMobile ? `calc(100% + 2.1rem)` : `100%`};
  margin-left: -1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
`;

const SubDiv = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export default BottomBar;

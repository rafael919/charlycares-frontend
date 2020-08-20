import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import closeIcon from 'Assets/icons/white-close.svg';
import phoneIcon from 'Assets/icons/icn-telephone-line.svg';
import profileIcon from 'Assets/icons/icn-profile.svg';
import calIcon from 'Assets/icons/icn-calendar.svg';
import calendarIcon from 'Assets/icons/icn-calendar-add.svg';

const goToFamilyProfile = (history, familyId) => () => {
  history.push('/families/' + familyId);
};

const BackgroundItem = ({
  phone,
  history,
  familyId,
  togglePhoneModal,
  wasBooked,
  navigateToBooking,
  onAngelSelect,
  family,
  closeSwipe,
  calendarClick,
}) => {
  return (
    <FirstRow>
      {family && (
        <Button href={null} onClick={calendarClick}>
          <ButtonIcon src={calIcon} />
          <FormattedMessage id="chat.calendar" />
        </Button>
      )}
      <Button
        href={isMobile && phone ? `tel:+${phone}` : null}
        onClick={!isMobile || wasBooked ? togglePhoneModal : null}
      >
        <ButtonIcon src={phoneIcon} />
        <ButtonText enabled={phone ? true : false}>
          <FormattedMessage id="chat.call" />
        </ButtonText>
      </Button>
      <Button href={null} onClick={navigateToBooking}>
        <ButtonIcon src={calendarIcon} />
        <FormattedMessage id="chat.bookBtn" />
      </Button>
      <Button
        href={null}
        onClick={family ? onAngelSelect : goToFamilyProfile(history, familyId)}
      >
        <ButtonIcon src={profileIcon} />
        <FormattedMessage id="profile.family.navTitle" />
      </Button>
      <CloseBtn onClick={closeSwipe}>
        <img src={closeIcon} alt="close" />
      </CloseBtn>
    </FirstRow>
  );
};

const FirstRow = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonIcon = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
`;

const ButtonText = styled.div`
  color: ${props => (props.enabled ? '#5E5E5E' : '#C7C7C9')};
`;

const Button = styled.a`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: #5e5e5e;
  align-items: center;
  justify-content: flex-end;
  padding: 0.1rem 0 0 0;
  margin-right: 1.2rem;
  max-height: 2.9375rem;
  cursor: pointer;

  &:hover {
    color: #5e5e5e;
  }

  &:focus {
    outline: 0;
  }
`;

const CloseBtn = styled.button`
  display: flex;
  width: 2.1rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: #c7c7c9;
  cursor: pointer;
`;

export default withRouter(BackgroundItem);

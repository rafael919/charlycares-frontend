import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import DefaultAngelImage from 'Components/DefaultAngelImage';

import chatIcon from 'Assets/icons/btn-chat.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

const SectionWrapper = styled.li`
  display: flex;
  padding: 0.90625rem 1rem;
  width: 100%;
  position: relative;
  background-color: #fff;
  margin-right: ${({ role }) => (role === 'angel' ? '5rem' : '1rem')};
`;

const SectionWrapperAsDiv = SectionWrapper.extend`
  padding: 0;
`.withComponent('div');

const CustomImage = DefaultAngelImage.extend`
  width: ${({ role }) => (role === 'angel' ? '7.5625rem' : '5.0625rem')};
  border-radius: 5px;
  height: 5.0625rem;
  margin-right: 2.2%;
`;

const Image = styled.img``;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  max-height: 3.125rem;
  cursor: pointer;
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

const ButtonText = styled.div`
  color: ${props => (props.theme.accentText)};
  font-size: 0.75rem;
`;

const AngelName = styled.h5`
  margin-top: 0.55rem !important;
  margin-bottom: 0;
`;

const onNavigate = (history, to, state) => () => {
  history.push(to, state);
};

const FamilySection = ({
  togglePhoneModal,
  bookingEnabled,
  history,
  name,
  img,
  div,
  id,
  onAngelSelect,
  userId,
  role,
}) => {
  const familyData = { img, name };
  return (
    <SectionWrapperAsDiv role={role}>
      <CustomImage role={role} src={img ? img : placeholder} onClick={onAngelSelect} />
      <div>
        <AngelName>
          <FormattedMessage id="booking.activeBabySitting.family" /> {name}
        </AngelName>
        <Buttons>
          <Button
            onClick={
              userId && onNavigate(history, `/families/chat/${userId}`, familyData)
            }
          >
            <Image src={chatIcon} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.message" />
            </ButtonText>
          </Button>

          <CallButton
            onClick={togglePhoneModal}
          >
            <Image src={phoneIcon} />
            <ButtonText>
              <FormattedMessage id="booking.accepted.call" />
            </ButtonText>
          </CallButton>
        </Buttons>
      </div>
    </SectionWrapperAsDiv>
  )
};

export default FamilySection;

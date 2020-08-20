import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import DefaultAngelImage from 'Components/DefaultAngelImage';

import threeDotsIcon from 'Assets/icons/three-dots.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import readIcon from 'Assets/icons/chat-status-read.svg';
import receivedIcon from 'Assets/icons/chat-status-received.svg';
import sentIcon from 'Assets/icons/chat-status-sent.svg';
import awayIcon from 'Assets/icons/status-away.svg';
import onlineIcon from 'Assets/icons/status-online.png';
import offlineIcon from 'Assets/icons/status-offline.png';
import cameraIcon from 'Assets/icons/icn-photo.svg';
import Indicator from 'Components/Indicator';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

const goToChat = (
  history,
  id,
  img,
  phone,
  name,
  book_id,
  last_image,
  last_message,
  goToChatPress
) => () => {
  goToChatPress && goToChatPress(last_message ? last_message : null);

  if (isMobile) {
    history.push('/chat/' + id, { img, phone, name, last_image, book_id });
  } else {
    history.push('/families/chat/' + id, {
      img,
      phone,
      name,
      last_image,
      book_id,
    });
  }
};

const goToFamilyProfile = (history, familyId) => () => {
  history.push('/families/' + familyId);
};

const ButtonText = styled.div`
  color: ${props => (props.enabled ? props.theme.accentText : '#C7C7C9')};
  font-size: 0.75rem;
`;

const FamilyContact = ({
  name,
  img,
  phone,
  id,
  history,
  familyId,
  togglePhoneModal,
  activeSitting,
  threeDots,
  goToChatPress,
  status,
  family,
  readed,
}) => {
  const image = img ? img : placeholder;

  return (
    <FirstRow>
      <Avatar activeSitting={activeSitting}>
        <FamilyImage src={image} />
        {!activeSitting && (
          <StatusIcon
            src={
              status === 1 ? onlineIcon : status === 0 ? awayIcon : offlineIcon
            }
          />
        )}
      </Avatar>
      <ContactInfo>
        <NameRow>
          <FamilyName>Fam. {name}</FamilyName>
          {!activeSitting && family.last_message ? (
            <BadgeDiv>
              {family.unread_message_count > 0 && (
                <Indicator
                  messageCount={family.unread_message_count}
                  position={true}
                />
              )}
              <DateDiv viewDate={family.unread_message_count === 0}>
                {moment(family.last_message.createdAt).format(
                  family.unread_message_count === 0 ? 'DD-MM-YY' : 'HH:mm'
                )}
              </DateDiv>
            </BadgeDiv>
          ) : (
            <DateDiv viewDate={true}>
              {moment(family.createdAt).format('DD-MM-YY')}
            </DateDiv>
          )}
        </NameRow>
        {activeSitting ? (
          <ContactButtonsContainer>
            <Button
              onClick={goToChat(
                history,
                id,
                image,
                phone,
                name,
                family.user.family ? family.user.family.id : 0,
                null,
                family,
                goToChatPress
              )}
            >
              <Image src={chatIcon} />
              <FormattedMessage id="message" />
              {family.unread_message_count > 0 && !readed && (
                <Indicator messageCount={family.unread_message_count} />
              )}
            </Button>
            <PhoneBtn
              href={isMobile && phone ? `tel:+${phone}` : null}
              onClick={!isMobile ? togglePhoneModal : null}
            >
              <ButtonIcon src={phone ? phoneIcon : phoneIconDisabled} />
              <ButtonText enabled={phone ? true : false}>
                <FormattedMessage id="call" />
              </ButtonText>
            </PhoneBtn>
          </ContactButtonsContainer>
        ) : (
          <ContactButtonsContainer>
            {family.typing ? (
              <MContainer>
                <Typing>typing....</Typing>
              </MContainer>
            ) : family.last_message ? (
              <MContainer image={family.last_message.image}>
                <Image
                  src={
                    family.readIcon === 0
                      ? sentIcon
                      : family.readIcon === 1
                      ? receivedIcon
                      : readIcon
                  }
                />
                {family.last_message.image ? (
                  <PhotoDiv
                    onClick={goToChat(
                      history,
                      id,
                      image,
                      phone,
                      name,
                      family.user.family ? family.user.family.id : 0,
                      family.last_message.image,
                      family,
                      goToChatPress
                    )}
                  >
                    <Image src={cameraIcon} />
                    <PhotoText>Photo</PhotoText>
                  </PhotoDiv>
                ) : (
                  <MessageDiv>{family.last_message.text}</MessageDiv>
                )}
              </MContainer>
            ) : (
              <MessageDiv>
                <FormattedMessage
                  id={'chat.emptyLastMessage'}
                  values={{ name: 'Fam. ' + name }}
                />
              </MessageDiv>
            )}
          </ContactButtonsContainer>
        )}
        <MoreInfoButton
          activeSitting={activeSitting}
          image={family.last_message && family.last_message.image}
          onClick={
            activeSitting
              ? goToFamilyProfile(history, family.user_id)
              : goToChat(
                  history,
                  id,
                  image,
                  phone,
                  name,
                  family.user.family ? family.user.family.id : 0,
                  null,
                  family,
                  goToChatPress
                )
          }
        >
          <ButtonIcon src={arrowRight} />
        </MoreInfoButton>
        {!activeSitting && (
          <ThreeDot onClick={threeDots}>
            <ThreeIcon src={threeDotsIcon} draggable="false" />
          </ThreeDot>
        )}
      </ContactInfo>
    </FirstRow>
  );
};

const ContactInfo = styled.div`
  width: 100%;
`;

const FirstRow = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 0.3rem;
  position: relative;
`;

const NameRow = styled.div`
  display: flex;
  width: 85%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const FamilyName = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  height: 1.1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

const BadgeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const DateDiv = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.75rem;
  color: ${props => (props.viewDate ? `#666666` : `#4286f4`)};
  font-weight: 400;
  white-space: nowrap;
  margin-left: 0.2rem;
`;

const MContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => (props.image ? `center` : `flex-start`)};
  justify-content: flex-start;
  margin-top: 0.2rem;
`;

const MessageDiv = styled.div`
  flex-direction: row;
  align-items: flex-start;
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8rem;
  color: #4d4d4d;
  font-weight: 400;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-left: 0.2rem;
  word-wrap: break-word;
`;

const Typing = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8rem;
  color: #4d4d4d;
  font-weight: 400;
  font-style: italic;
`;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PhotoText = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8rem;
  color: #4d4d4d;
  font-weight: 400;
  margin-top: 0.45rem;
`;

const Avatar = styled.div`
  margin-right: 0.5rem;
  position: relative;
  height: ${props => (props.activeSitting ? '5.0625' : '4.0625')}rem;
`;

const FamilyImage = DefaultAngelImage.extend`
  width: 68px;
  height: 68px;
`;

const StatusIcon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 3px;
  margin-bottom: 2px;
`;

const ButtonIcon = styled.img``;

const MoreInfoButton = styled.button`
  position: absolute;
  right: ${props =>
    isMobile ? (props.activeSitting ? `0` : `1rem`) : `1.3rem`};
  height: 100%;
  width: ${props => (props.image ? '50%' : '100%')};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.secondaryColor};
  align-items: center;
  padding: 0;
  margin-right: 2rem;
  justify-content: center;
  border: 0;
  width: 3rem;
  background: transparent;
  position: relative;
  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const PhoneBtn = styled.a`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.secondaryColor};
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0 0 0;
  margin-right: 2rem;
  max-height: 2.9375rem;

  &:focus {
    color: ${props => props.theme.secondaryColor};
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
`;

const ContactButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
`;

const ThreeDot = styled.div`
  width: 1.3rem;
  height: calc(100% + 2.28rem);
  background-color: #efefef;
  position: absolute;
  right: 0;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  cursor: w-resize;
  margin-top: -1.15rem;

  &:focus {
    outline: 0;
  }
`;

const ThreeIcon = styled.img``;

export default withRouter(FamilyContact);

import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import React from 'react';
import styled from 'styled-components';

import presentIcon from 'Assets/icons/icn-present.svg';

const replaceLink = (referralMessage, link) => {
  if (!referralMessage || !link) return '';
  return referralMessage.replace(/{link}/g, link);
};

const PromoContainer = ({ referrals }) => {
  if (!referrals) return null;
  const { message, link, content, title, mail_subject } = referrals;
  const text = replaceLink(message, link);
  return (
    <Container>
      <Heading>{title}</Heading>
      <DescContainer>
        <IconContainer>
          <Icon src={presentIcon} />
        </IconContainer>
        <Desc>{content}</Desc>
      </DescContainer>
      <ShareHeading>
        <FormattedMessage id="profile.family.credit.shareWithFriends" />
      </ShareHeading>
      <ButtonsContainer>
        <ButtonWrapper>
          <BasicButton as="a" primary href={`whatsapp://send?text=${text}`}>
            WhatsApp
          </BasicButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <BasicButton as="a" primary href={`sms://&body=${text}`}>
            SMS
          </BasicButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <BasicButton
            as="a"
            primary
            href={`mailto:?subject=${mail_subject}&body=${text}`}
          >
            E-mail
          </BasicButton>
        </ButtonWrapper>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 2rem;
`;
const Heading = styled.h2`
  font-size: 1rem;
`;

const DescContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 1.5rem;
`;

const Icon = styled.img`
  width: 38px;
  height: 38px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 0.5rem;
`;

const Desc = styled.p`
  font-size: 0.9375rem;
  font-weight: 300;
`;
const ShareHeading = styled.div`
  font-size: 0.9375rem;
  padding-bottom: 1rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-right: 0.5rem;

  &:last-child {
    margin-right: 0;
  }
`;

export default PromoContainer;

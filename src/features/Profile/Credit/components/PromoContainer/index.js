import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import presentIcon from 'Assets/icons/icn-present.svg';

const replaceLink = (referralMessage, link) => {
  if (!referralMessage || !link) return '';
  return referralMessage.replace(/{link}/g, encodeURIComponent(link));
};

const onButtonClick = method => () => {
  if (process.env.NODE_ENV === 'production') {
    window.analytics.track('UShareReferral', {
      method,
    });
  }
};

const PromoContainer = ({
  title,
  content,
  referralMessage,
  mailSubject,
  link,
}) => {
  const text = replaceLink(referralMessage, link);
  return (
    <Container>
      <Heading>{title}</Heading>
      <DescContainer>
        <div>
          <Icon src={presentIcon} />
        </div>
        <Desc>{content}</Desc>
      </DescContainer>
      <ShareHeading>
        <FormattedMessage id="profile.family.credit.shareWithFriends" />
      </ShareHeading>
      <ButtonsContainer>
        <ButtonWrapper>
          {isMobile ? (
            <BasicButton
              onClick={onButtonClick('whatsapp')}
              as="a"
              primary
              href={`whatsapp://send?text=${text}`}
            >
              WhatsApp
            </BasicButton>
          ) : (
            <BasicButton
              onClick={onButtonClick('whatsapp')}
              as="a"
              primary
              href={`https://web.whatsapp.com/send?text=${text}`}
            >
              WhatsApp
            </BasicButton>
          )}
        </ButtonWrapper>
        <ButtonWrapper>
          <BasicButton
            onClick={onButtonClick('sms')}
            as="a"
            primary
            href={`sms://&body=${text}`}
          >
            SMS
          </BasicButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <BasicButton
            onClick={onButtonClick('email')}
            as="a"
            primary
            href={`mailto:?subject=${mailSubject}&body=${text}`}
          >
            E-mail
          </BasicButton>
        </ButtonWrapper>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 10rem;
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
  display: flex;
  align-items: flex-start;
  width: 38px;
  height: 38px;
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

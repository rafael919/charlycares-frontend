import { Rating } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { injectIntl } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import warningIcon from 'Assets/icons/warning.svg';

const Container = styled.div`
  padding-top: 1.375rem;
  padding: ${isMobile ? '1.375rem 1rem 0 1rem' : '1.375rem 0 0 0'};
`;
const Header = styled.h2`
  font-size: 1rem;
`;

const Icon = styled.img`
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 0.5rem;
`;

const Warning = styled.p`
  font-size: 0.75rem;
  color: #dd0000;
  display: flex;
  align-items: flex-start;
`;
const Desc = styled.textarea`
  font-size: 0.9375rem;
  line-height: 1.6;
  border: 0;
  padding-right: 1rem;
  width: 100%;
  margin-bottom: 1rem;

  &::placeholder {
    font-weight: 300;
    font-style: italic;
  }

  &:focus {
    outline: 0;
  }
`;

const RatingSection = ({ rating, onRate, comment, onCommentChange, intl }) => (
  <Container>
    <Header>
      {intl.formatMessage({
        id: 'profile.family.review.heading1',
      })}
    </Header>
    <Rating maxRating={5} rating={rating} size="massive" onRate={onRate} />
    <Header>
      {intl.formatMessage({
        id: 'profile.family.review.heading2',
      })}
    </Header>
    <Warning>
      <Icon src={warningIcon} />{' '}
      {intl.formatMessage({
        id: 'profile.family.review.warning',
      })}
    </Warning>
    <Desc
      rows="7"
      placeholder={intl.formatMessage({
        id: 'profile.family.review.placeholder',
      })}
      value={comment}
      onChange={onCommentChange}
    />
  </Container>
);

export default injectIntl(RatingSection);

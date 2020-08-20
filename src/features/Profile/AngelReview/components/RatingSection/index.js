import { Rating } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { injectIntl } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 1.375rem;
  padding: ${isMobile ? '1.375rem 1rem 0 1rem' : '1.375rem 0 0 0'};
`;
const Header = styled.h2`
  font-size: 1rem;
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

const RatingSection = ({ rating, comment, intl }) => (
  <Container>
    <Header>
      {intl.formatMessage({
        id: 'profile.angel.review.heading1',
      })}
    </Header>
    <Rating maxRating={5} rating={rating} size="normal"/>
    <Desc
      disabled
      rows="7"
      placeholder={intl.formatMessage({
        id: 'profile.family.review.placeholder',
      })}
      value={comment}
    />
  </Container>
);

export default injectIntl(RatingSection);

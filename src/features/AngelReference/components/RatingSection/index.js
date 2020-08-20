import { Rating } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

const RatingSection = ({ setRating, onReviewChange, review, intl}) => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="angelReference.rating1" />
      </Heading>
      <CustomRating onRate={(event, data) => setRating(0, data)} size="large" maxRating={5} />
      <Heading>
        <FormattedMessage id="angelReference.rating2" />
      </Heading>
      <CustomRating onRate={(event, data) => setRating(1, data)}  size="large" maxRating={5} />
      <Heading>
        <FormattedMessage id="angelReference.rating3" />
      </Heading>
      <CustomRating onRate={(event, data) => setRating(2, data)}  size="large" maxRating={5} />
      <Heading>
        <FormattedMessage id="angelReference.rating4" />
      </Heading>
      <CustomRating onRate={(event, data) => setRating(3, data)}  size="large" maxRating={5} />
      <Heading>
        <FormattedMessage id="angelReference.rating5" />
      </Heading>
      <CustomRating onRate={(event, data) => setRating(4, data)}  size="large" maxRating={5} />
      <HeadingSmall>
        <FormattedMessage id="angelReference.reviewHeader" />
      </HeadingSmall>
      <ReviewText
        onChange={onReviewChange}
        value={review}
        placeholder={intl.formatMessage({
              id: 'angelReference.reviewPlaceholder',
            })}
      />
    </Container>
  );
};

const ReviewText = styled.textarea.attrs({
  rows: 4,
})`
  width: 100%;
  font-size: 0.9375rem;
  line-height: 1.6;
  border: 0;
  font-family: ${props => props.theme.secondaryFont}; 
  background: transparent; 
  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-weight: 300;
    color: ${props => props.theme.grey};
    font-style: italic;
  }
  margin-bottom: 4rem;
`;

const Container = styled.div`
  padding: ${isMobile ? '1rem' : 0};
  width: 100%;
`;

const HeadingSmall = styled.h3`
  font-size: 1rem; 
`;
const Heading = styled.h2`
  font-size: 1.1rem;
`;

const CustomRating = styled(Rating)`
  &&& {
    & .active.icon {
      color: ${props =>
        props.stateOfPayment !== 'paid'
          ? props.theme.secondaryColor
          : props.theme.primaryText};
      &:focus {
        outline: 0;
      }
    }
  }
`;

export default injectIntl(RatingSection);

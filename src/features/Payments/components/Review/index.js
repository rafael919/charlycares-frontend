import { FormattedMessage, injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { Rating } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

const Review = ({ rating, review, intl, onReviewChange }) => {
  return (
    <Container>
      <ReviewHeading as="h5">
        <FormattedMessage id="payments.family.details.reviewHeading" />
      </ReviewHeading>

      <div>
        {rating && (
          <RatingContainer>
            <CustomRating size="large" rating={rating} maxRating={5} />
          </RatingContainer>
        )}
        {review && !onReviewChange ? (
          <ReviewCompleted>{review}</ReviewCompleted>
        ) : null}
      </div>
      <div style={{ marginTop: 0, marginBottom: 20 }}>
        {!rating && onReviewChange ? (
          <ReviewText
            onChange={onReviewChange}
            value={review}
            placeholder={intl.formatMessage({
              id: 'payments.family.details.reviewPlaceholder',
            })}
          />
        ) : null}
      </div>
    </Container>
  );
};

const ReviewHeading = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const RatingContainer = styled.div`
  padding-bottom: 0.5rem;
`;

const ReviewCompleted = styled.p`
  font-weight: 300;
  font-size: 0.9375rem;
  line-height: 1.47;
`;

const ReviewText = styled.textarea.attrs({
  rows: 4,
})`
  width: 100%;
  font-size: 0.9375rem;
  line-height: 1.6;
  border: 0;
  font-family: ${props => props.theme.secondaryFont};

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-weight: 300;
    color: ${props => props.theme.grey};
    font-style: italic;
  }
`;

const Container = styled.div`
  ${isMobile ? `padding: 1rem 1rem 10rem;` : `padding: 1rem 0 0;`};
`;

const CustomRating = styled(Rating)`
  &&& {
    & .active.icon {
      color: ${props => props.theme.lightGrey};
    }
  }
`;

export default injectIntl(Review);

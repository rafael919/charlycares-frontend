import { Header } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import Comment from '../Comment';

const ReviewsContainer = styled.div`
  text-align: left;
  min-height: 100%;
`;

const Reviews = ({ ratings = [], name }) => {
  return (
    <ReviewsContainer id="reviews">
      <Header as="h5">
        <FormattedMessage
          id="booking.angel.ratingsHeader"
          values={{ reviews: ratings ? ratings.length : 0, name: name }}
        />
      </Header>
      {ratings && ratings.length
        ? ratings.map(review => <Comment key={review.id} review={review} />)
        : null}
    </ReviewsContainer>
  );
};

export default Reviews;

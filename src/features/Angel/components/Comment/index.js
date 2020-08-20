import React from 'react';
import styled from 'styled-components';
import { Rating } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import moment from 'moment';

const CommentContainer = styled.div`
  padding-bottom: 1.75rem;
`;

const From = styled.div`
  font-size: 0.9375rem;
  position: relative;
`;

const formatDate = date => moment(date, 'DD-MM-YYYY').format('DD MMMM YYYY');

const Comment = ({ review }) => {
  return (
    <CommentContainer>
      <From>
        <div>
          {review.family_name} - {formatDate(review.date)}
        </div>
      </From>
      <Rating size="mini" rating={review.rating} maxRating={5} disabled />
      <Paragraph fontSize="0.9375rem" light>
        {review.comments}
      </Paragraph>
    </CommentContainer>
  );
};

export default Comment;

import React from 'react';
import styled from 'styled-components';
import CustomRow from 'Components/CustomRow';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import { Grid, Header, Rating } from 'semantic-ui-react';

const ReviewHeader = styled(Header)`
  &&& {
    margin-bottom: 0.5rem;
  }
`;

const Review = ({ review }) => {
  return (
    <Grid container>
      <CustomRow padding="2.125rem 0 7rem">
        <CustomColumn padding="0 0 0.8rem 0" width={16}>
          <ReviewHeader as="h5">
            <FormattedMessage id="payments.family.details.reviewHeading" />
          </ReviewHeader>
          <Rating size="large" maxRating={5} rating={review.rating} />
        </CustomColumn>
        {review.comments && (
          <CustomColumn width={16}>
            <Paragraph fontSize="0.9375rem" light>
              {review.comments}
            </Paragraph>
          </CustomColumn>
        )}
      </CustomRow>
    </Grid>
  );
};

export default Review;

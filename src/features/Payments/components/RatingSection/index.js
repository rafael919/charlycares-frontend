import { Paragraph } from 'Components/Text';
import { Rating } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

const RatingSection = ({ sum, stateOfPayment, rating, onRatingChange }) => {
  return (
    <Container id="ratingSection">
      <Heading>
        <FormattedMessage id="payments.family.details.rating" />
        {stateOfPayment !== 'paid' && (
          <ObligatoryText>
            <FormattedMessage id="payments.family.details.obligatory" />
          </ObligatoryText>
        )}
      </Heading>
      {stateOfPayment !== 'paid' && (
        <Paragraph light fontSize="0.9375rem">
          <FormattedMessage id="payments.family.details.reviewDesc" />
        </Paragraph>
      )}
      <div>
        {stateOfPayment === 'paid' ? (
          <CustomRating size="large" rating={rating} maxRating={5} />
        ) : (
          <CustomRating
            onRate={onRatingChange}
            size="massive"
            rating={rating}
            maxRating={5}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: ${isMobile ? '1rem' : 0};
`;

const Heading = styled.h2`
  font-size: 1rem;
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

const ObligatoryText = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.9375rem;
  color: ${props => props.theme.grey};
  font-family: ${props => props.theme.secondaryFont};
  font-style: italic;
  font-weight: 300;
`;

export default RatingSection;

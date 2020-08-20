import React from 'react';
import styled from 'styled-components';

import ProgressBar from './components/ProgressBar';
import { FormattedMessage } from 'react-intl';

const renderDesc = score => {
  switch (score.type) {
    case 'accept_ratio':
      return (
        <FormattedMessage
          id="profile.angel.dashboard.score.acceptRatio"
          values={{ start: score.current, end: score.end }}
        />
      );
    case 'completed_bookings':
      return (
        <FormattedMessage
          id="profile.angel.dashboard.score.completedBookings"
          values={{ start: score.current, end: score.end }}
        />
      );
    case 'written_reviews':
      return (
        <FormattedMessage
          id="profile.angel.dashboard.score.reviewsDesc"
          values={{ start: score.current, end: score.end }}
        />
      );

    default:
      return null;
  }
};

const Score = ({ scores }) => (
  <Container>
    <Heading><FormattedMessage id="profile.angel.dashboard.score.title" /></Heading>
    {scores.map(score => (
      <InnerContainer key={score.type}>
        <SubHeading>
          <FormattedMessage
            id={`profile.angel.dashboard.score.${score.type}`}
          />
        </SubHeading>
        <Desc>{renderDesc(score)}</Desc>
        <ProgressBar
          percent={score.percentage_completed}
          bonus={Number(score.increase)}
        />
      </InnerContainer>
    ))}
  </Container>
);

const Container = styled.div`
  padding: 1.5rem 1rem;
`;

const InnerContainer = styled.div`
  padding: 1.25rem 0;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};

  &:last-child {
    border-bottom: 0;
  }
`;

const Heading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0;
`;

const SubHeading = styled.h3`
  font-size: 0.9375rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

export default Score;

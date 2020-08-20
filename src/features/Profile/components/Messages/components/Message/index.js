import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import activityIcon from 'Assets/icons/activity-pink.svg';

const renderTime = date => {
  if (date.isSame(new Date(), 'day')) {
    return (
      <FormattedMessage
        id="profile.angel.dashboard.messageTimeToday"
        values={{ time: date.clone().format('LT') }}
      />
    );
  }
  return date.clone().format('DD MMMM HH:mm');
};

const Message = ({ title, message, createdAt }) => {
  const mDate = moment(createdAt, 'YYYY-MM-DD HH:mm');
  return (
    <Container>
      <HeadingContainer>
        <Heading>{title}</Heading>
        <TimeAndDate>
          <span>{renderTime(mDate)}</span>
          {mDate.isSame(new Date(), 'day') && <Icon src={activityIcon} />}
        </TimeAndDate>
      </HeadingContainer>
      <MessageText>{message}</MessageText>
    </Container>
  );
};

const Container = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};

  &:first-child {
    padding-top: 0;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
`;

const Heading = styled.div`
  font-size: 0.9375rem;
  font-family: ${props => props.theme.primaryFont};
  flex: 1;
`;

const TimeAndDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
  display: inline-flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 0.3rem;
`;

const MessageText = styled.p`
  font-weight: 300;
  font-size: 0.875rem;
`;

export default Message;

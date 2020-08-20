import { FormattedMessage } from 'react-intl';
import { ProgressiveMessages } from 'Components/Progressive';
import ShowMore from '@tedconf/react-show-more';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import arrowDownIcon from 'Assets/icons/btn-small-arrow-down.svg';

import Message from './components/Message';

const countTodayMessages = messages => {
  const today = new Date();
  return messages.reduce((count, message) => {
    if (moment(message.created_at).isSame(today)) {
      return count + 1;
    }
    return count;
  }, 0);
};

const Messages = ({ messages, isLoading, numOfMessages, showTitle }) => {
  const numberOfTodayMessages = countTodayMessages(messages);
  return (
    <Container>
      {showTitle ? <Heading>
        <FormattedMessage id="profile.angel.dashboard.messagesHeading" />{' '}
        <NewMessagesInfo>
          {numberOfTodayMessages > 0 && (
            <FormattedMessage
              id="profile.angel.dashboard.newMessages"
              values={{ number: numberOfTodayMessages }}
            />
          )}
        </NewMessagesInfo>
      </Heading> : null}

      {isLoading ? (
        <ProgressiveMessages isLoading />
      ) : (
        <ShowMore items={messages} by={numOfMessages}>
          {({ current, onMore }) => {
            return (
              <React.Fragment>
                <MessagesList>
                  {current.map(({ title, message, id, created_at }) => {
                    return (
                      <Message
                        key={id}
                        title={title}
                        message={message}
                        createdAt={created_at}
                      />
                    );
                  })}
                </MessagesList>
                {!!onMore ? (
                  <LoadMoreButton onClick={onMore}>
                    <span>
                      <FormattedMessage id="profile.angel.dashboard.showNext10" />
                    </span>
                    <Icon src={arrowDownIcon} />
                  </LoadMoreButton>
                ) : null}
              </React.Fragment>
            );
          }}
        </ShowMore>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

const Heading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const MessagesList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;
const NewMessagesInfo = styled.span`
  font-size: 0.8125rem;
  color: ${props => props.theme.secondaryColor};
`;

const LoadMoreButton = styled.button`
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  font-family: ${props => props.theme.secondaryFont};
  padding: 1rem 0 0.5rem;
  width: 100%;

  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img`
  margin-left: 0.5rem;
`;

export default Messages;

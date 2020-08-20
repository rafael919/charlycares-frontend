import { withRouter } from 'react-router-dom';
import ArrowRightButton from 'Components/Buttons/ArrowRight';
import React from 'react';
import styled from 'styled-components';
import pinkDotIcon from 'Assets/icons/activity-pink.svg';
import { FormattedMessage } from 'react-intl';

const navigateTo = (history, to) => () => {
  history.push(to);
};

const ConfigItem = ({ name, value, to, history, messages, ratings }) => {
  return (
    <Container onClick={navigateTo(history, to)}>
      <ConfigName>{name}</ConfigName>
      {value && <ConfigValue>{value}</ConfigValue>}
      {messages > 0 && (
        <MessagesContainer>
          <MessagesText>
            {messages}{' '}
            <FormattedMessage id="payments.family.home.newMessages" />
          </MessagesText>
          <Icon src={pinkDotIcon} />
        </MessagesContainer>
      )}
      {messages === 0 && (
        <MessagesContainer>
          <MessagesText>
            <FormattedMessage id="payments.family.home.noMessages" />
          </MessagesText>
        </MessagesContainer>
      )}
      {ratings ? (
        <MessagesContainer>
          <MessagesText>
            <FormattedMessage id="profile.family.ratingAndReviews.ratings" />
            <Ratings>{ratings}</Ratings>
          </MessagesText>
        </MessagesContainer>
      ) : null}
      {ratings === 0 ? (
        <MessagesContainer>
          <MessagesText>
            <FormattedMessage id="profile.family.ratingAndReviews.noRatings" />
          </MessagesText>
        </MessagesContainer>
      ) : null}
      <ArrowRightButton to={to} />
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 1rem 1rem 1rem 0;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  cursor: pointer;
`;

const ConfigName = styled.div`
  font-weight: 300;
  font-size: 1.0625rem;
`;

const Ratings = styled.div`
  font-weight: 600;
  background: #dd0000;
  border-radius: 50%;
  display: inline-block;
  color: #fff;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  margin-left: 0.25rem;
`;

const ConfigValue = ConfigName.extend`
  color: ${props => props.theme.grey};
`;

const MessagesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MessagesText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.secondaryColor};
`;
const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 0.5rem;
`;
export default withRouter(ConfigItem);

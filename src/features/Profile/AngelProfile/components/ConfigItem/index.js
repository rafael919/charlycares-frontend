import { withRouter } from 'react-router-dom';
import ArrowRightButton from 'Components/Buttons/ArrowRight';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import pinkDotIcon from 'Assets/icons/activity-pink.svg';

import ProgressBar from '../ProgressBar';

const navigateTo = (history, to) => () => {
  history.push(to);
};

const calculatePercent = (total, current) => 100 * (current / total);

const ConfigItem = ({
  name,
  value,
  messages,
  progress,
  to = '/profile',
  history,
}) => {
  return (
    <Container onClick={navigateTo(history, to)}>
      <div>
        <ConfigName>{name}</ConfigName>
        {progress && (
          <ProgressBar
            progress={progress}
            percent={calculatePercent(progress.total, progress.finished)}
          />
        )}
      </div>
      {value && <ConfigValue>{value}</ConfigValue>}
      {messages > 0 && (
        <MessagesContainer>
          <MessagesText>{messages} <FormattedMessage id="payments.family.home.newMessages" /></MessagesText>
          <Icon src={pinkDotIcon} />
        </MessagesContainer>
      )}
      {messages === 0 && (
        <MessagesContainer>
          <MessagesText><FormattedMessage id="payments.family.home.noMessages" /></MessagesText>
        </MessagesContainer>
      )}
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

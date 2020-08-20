import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import unAvailableIcon from 'Assets/icons/icon-tabbar-not-available.svg';

const options = [
                {hours: 24, message: "calendar.angel.unavailable.oneDay"},
                {hours: 168, message: "calendar.angel.unavailable.oneWeek"},
                {hours: 720, message: "calendar.angel.unavailable.oneMonth"}
              ];

const Hours = ({ onSetInactive }) => {
  return (
    <div>
      <HeaderContainer>
        <div>
          <Icon src={unAvailableIcon} />
        </div>
        <TextWrapper>
          <Heading>
            <FormattedMessage id="calendar.angel.unavailable.heading" />
          </Heading>
          <Desc>
            <FormattedMessage id="calendar.angel.unavailable.desc" />
          </Desc>
        </TextWrapper>
      </HeaderContainer>
      <ButtonsRow>
        {options.map((option, i) => (
          <Button onClick={onSetInactive(option.hours)} key={i}>
            <FormattedMessage
              id={option.message}
            />
          </Button>
        ))}
      </ButtonsRow>
    </div>
  );
};

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
`;

const Button = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  background: transparent;
  border: 0;
  border-right: 1px solid #e6e6e6;
  padding: 0.875rem 1.625rem;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:last-child {
    border-right: 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const TextWrapper = styled.div`
  margin-left: 0.5rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
  font-family: ${props => props.theme.primaryFont};
  margin-bottom: 0.5rem;
  padding-top: 0.4rem;
`;

const Desc = styled.p`
  color: ${props => props.theme.grey};
  font-size: 0.75rem;
`;

const Icon = styled.img``;

export default Hours;

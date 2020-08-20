import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import addIcon from 'Assets/icons/btn-tabbar-large-calendar.svg';

const Icon = styled.img``;

const Container = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.9375rem;
  margin-left: 0.5rem;
`;

const UpdateCalendarBtn = () => (
  <Container>
    <Icon src={addIcon} />
    <Text><FormattedMessage id="menu.desktop.angel.updateCalendar" /></Text>
  </Container>
);

export default UpdateCalendarBtn;

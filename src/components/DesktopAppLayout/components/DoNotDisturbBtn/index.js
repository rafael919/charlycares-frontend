import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import disturb from 'Assets/icons/icon-tabbar-available.svg';
import dontDisturb from 'Assets/icons/icon-tabbar-not-available.svg';

const Icon = styled.img``;

const Container = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
`;

const Text = styled.div`
  font-size: 0.9375rem;
  margin-left: 0.5rem;
`;

const DoNotDisturbBtn = ({ isInDisturbMode }) => (
  <Container>
    {isInDisturbMode ? <Icon src={dontDisturb} /> : <Icon src={disturb} />}
    <Text>
      <FormattedMessage id="dontDisturb" />
    </Text>
  </Container>
);

export default DoNotDisturbBtn;

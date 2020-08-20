import { Icon } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import ErrorContainer from '../components/ErrorContainer';
import ErrorText from '../components/ErrorText';

const RefreshBtn = styled.button`
  border: 0;
  background: transparent;
  margin-bottom: 10vh;
`;

const WithConfirm = ({ onRetry, errors }) => (
  <ErrorContainer>
    <RefreshBtn onClick={onRetry}>
      <Icon style={{ color: '#d9d9d9' }} size="huge" name="refresh" />
    </RefreshBtn>
    <ErrorText errors={errors} />
  </ErrorContainer>
);

export default WithConfirm;

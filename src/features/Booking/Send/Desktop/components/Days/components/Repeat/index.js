import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
`;

const RepeatValue = styled.span`
  color: ${({ theme }) => theme.lightGrey};
  font-family: ${({ theme }) => theme.primaryFont};
`;

const NavigateToRepeatsBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;

  &:focus {
    outline: 0;
  }
`;

const Repeat = ({ repeats, history, dayId }) => (
  <Container>
    <div>
      <FormattedMessage id="repeat" />
    </div>
    <NavigateToRepeatsBtn>
      <RepeatValue>{repeats} x</RepeatValue>
    </NavigateToRepeatsBtn>
  </Container>
);

export default withRouter(Repeat);

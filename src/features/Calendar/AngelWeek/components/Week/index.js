import React from 'react';
import styled from 'styled-components';

const WeekContainer = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  padding-bottom: 4rem;
  min-height: 100%;
`;

const Week = ({ children }) => <WeekContainer>{children}</WeekContainer>;

export default Week;

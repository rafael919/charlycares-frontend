import React from 'react';
import styled from 'styled-components';

const SelectedAngelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 1.25rem;
`;

const SelectedAngel = ({ children, pose }) => {
  return <SelectedAngelWrapper>{children}</SelectedAngelWrapper>;
};

export default SelectedAngel;

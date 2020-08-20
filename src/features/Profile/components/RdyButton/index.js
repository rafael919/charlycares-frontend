import styled from 'styled-components';

const RdyButton = styled.button`
  border: 0;
  background: transparent;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  cursor: pointer;

  :disabled {
    color: #c7c7c9;
  }
  &:focus {
    outline: 0;
  }
`;

export default RdyButton;

import styled from 'styled-components';

const ClearBtn = styled.button`
  background: transparent;
  border: 0;
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  font-size: 1rem;

  &:focus {
    outline: 0;
  }
`;

export default ClearBtn;

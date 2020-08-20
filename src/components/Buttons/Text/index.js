import styled from 'styled-components';

const TextButton = styled.button`
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${props => props.disabled ? props.theme.defaultGrey : props.theme.secondaryColor};
  background: transparent;
  border: 0;
`;

export default TextButton;

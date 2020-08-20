import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: ${props => props.theme.errorColor};
  padding-top: 0.3em;
  min-height: 1.6875rem;
  font-weight: 300;
  font-size: 0.9375rem;
`;

export default ErrorMessage;

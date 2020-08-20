import styled from 'styled-components';

const ErrorContainer = styled.div`
  min-width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  filter: blur(0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ErrorContainer;

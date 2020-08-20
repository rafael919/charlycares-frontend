import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  background: #fff;
  top: ${({ top }) => (top ? top : 0)};
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  -webkit-transform: translateZ(0);
  -webkit-filter: blur(0);
`;

export default Container;

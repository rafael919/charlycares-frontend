import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const AnimationWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding: ${({ padding }) => (padding ? padding : '0 !important')};
  will-change: auto;
  height: 100%;
  &::-webkit-scrollbar {
    background-color: #f9f8f9;
    display: none;
  }
  overflow: auto;
  ${isMobile ? `position: fixed;` : null}
`;

export default AnimationWrapper;

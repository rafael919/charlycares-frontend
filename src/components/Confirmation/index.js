import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const Confirmation = styled.div`
  position: ${props =>
    !props.nonSticky && !isMobile
      ? 'sticky'
      : props.nonSticky
      ? 'initial'
      : 'fixed'};
  position: ${props =>
    !props.nonSticky && !isMobile
      ? '-webkit-sticky'
      : props.nonSticky
      ? 'initial'
      : 'fixed'};
  position: ${({ sticky, absolute }) => {
    if (sticky) {
      return 'sticky';
    }
    if (absolute) {
      return 'absolute';
    }
    return null;
  }};
  bottom: ${isMobile ? '0' : '-3.5rem'};
  bottom: ${({ bottom }) => (bottom ? bottom : null)};
  left: 0;
  background-color: ${isMobile
    ? 'rgba(250, 250, 250, 0.9);'
    : props => (props.color == null ? '#fff' : props.color)};
  box-shadow: ${isMobile ? '0 0.5px 0 0 rgba(0, 0, 0, 0.25) inset' : 'unset'};
  border-top: ${props => (props.noBorder ? 0 : '1px solid #e6e6e6')};
  width: 100%;
  padding: ${isMobile ? '0.75rem' : '0.5rem'};
  text-align: center;
  z-index: ${isMobile ? 999 : 'unset'};
  will-change: auto;
`;

export default Confirmation;

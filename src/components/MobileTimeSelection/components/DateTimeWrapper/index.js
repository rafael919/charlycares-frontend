import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: ${isMobile ? 'space-between' : 'flex-end'};
  align-items: center;
  padding: ${props => (props.chatBook ? `0` : `0 1rem`)};
  position: relative;
`;

export default DateTimeWrapper;

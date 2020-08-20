import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height : 20%;
  padding-bottom: 7rem;
  padding-top: ${props =>
    props.hasPending ? 0 : isMobile ? '3.1rem' : '0.75rem'};
  cursor: pointer;
  backgroundColor : red
`;

export default Container;

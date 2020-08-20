import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  padding-top: ${props =>
    props.hasPending ? 0 : isMobile ? '0.75rem' : '0.75rem'};
  padding-bottom: 20rem;
  cursor: pointer;
  overflow-y: scroll;
  max-height: 100vh;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    background-color: #f9f8f9;
    display: none;
  }
`;

export default Container;

import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Week = styled.ul`
  list-style: none;
  padding: 0;
  padding-bottom: ${isMobile ? 6 : 0}rem;

  & li:last-child {
    border-bottom: 0;
  }
`;

export default Week;

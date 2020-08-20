import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const ConfigList = styled.ul`
  width: 100%;
  padding: ${isMobile ? '0.5rem 1rem 10rem' : '0.5rem 0 10rem'};
  margin: 0;
`;

export default ConfigList;

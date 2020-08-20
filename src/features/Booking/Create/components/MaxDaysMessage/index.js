import styled from 'styled-components';
import isMobile from 'react-device-detect'; 

const MaxDaysMessage = styled.div`
  font-size: 0.8125rem;
  font-weight: 300;
  flex: 0.8;
  margin-bottom: ${!isMobile ? '3rem' : null}
`;

export default MaxDaysMessage;

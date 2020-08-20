import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const AngelsListItem = styled.div`
  margin-bottom: ${!isMobile ? '0.3125rem' : null};
  ${props =>
    !isMobile ? 'border: 1px solid ' + props.theme.defaultGrey : null};
  width: ${isMobile ? '95.5%' : '100%'};
  display: flex;
  padding-bottom: 1rem;
  padding-left: ${isMobile ? '1.5rem' : '1rem'};
  padding-top: 1rem;
  justify-content: flex-start;
  position: relative;
  background: ${!isMobile ? '#fff' : 'inherit'};
  ${!isMobile ? '  border-radius: 5px;' : null} &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;

export default AngelsListItem;

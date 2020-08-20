import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const ListDivider = styled.li`
  height: 2rem;

  ${props => ( isMobile ? `border-top: 1px solid ${props.theme.defaultGrey}; border-bottom: 1px solid ${props.theme.defaultGrey};` : `` ) }
  
  background: #f9f8f9;

  &:first-child,
  &:last-child {
    display: none;
  }
`;

export default ListDivider;

import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

const StyledMenu = styled(Menu)`
  &&& {
    background: #fafafa;
    padding: 0;
    box-shadow: 0 0.5px rgba(0, 0, 0, 0.25) inset;
    max-height: 57px;
    transform: translate3d(0, 0, 0);
    position: fixed;
    bottom: 0;
    top: unset;
  }
`;

export default StyledMenu;

import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuItemTop = styled(Menu.Item)`
  &&& {
    font-size: 0.9375rem;
    position: relative;
    background: ${({ theme, active }) => active && 'transparent'} !important;

    &:hover {
      color: ${({ theme }) => theme.secondaryColor};
    }
    &:active {
      color: ${({ theme }) => theme.secondaryColor};
  }
`;

export default MenuItemTop;

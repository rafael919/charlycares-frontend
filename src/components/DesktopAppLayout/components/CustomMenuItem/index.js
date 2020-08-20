import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const CustomMenuItem = styled(Menu.Item)`
  &&& {
    font-size: 0.9375rem;
    position: relative;
    background: ${({ theme, active }) => active && 'transparent'} !important;
    color: ${({ theme, active }) => active && theme.secondaryColor} !important;
    ${({ theme, active }) =>
      active &&
      `   
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 1px;
            width: 65%;
            background: ${theme.secondaryColor};
        }
    }
    `}

    &:hover {
      color: ${({ theme }) => theme.secondaryColor};
      background: transparent !important;
    }
    &:active {
      color: ${({ theme }) => theme.secondaryColor};
  }
`;

export default CustomMenuItem;

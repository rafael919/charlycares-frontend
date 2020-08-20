import styled from 'styled-components';
import { Select } from 'semantic-ui-react';

const CustomRepeat = styled(Select)`
  &&& {
    border: 0;
    background: transparent;
    color: ${props => props.theme.secondaryColor};
    font-family: ${props => props.theme.primaryFont};
    margin-right: -0.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > .text {
      color: ${props => props.theme.secondaryColor} !important;
    }

    & > .menu {
      border: 0;

      & span {
        color: ${props => props.theme.secondaryColor};
      }
    }
  }
`;

export default CustomRepeat;

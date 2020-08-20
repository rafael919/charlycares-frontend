import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';

const Tabs = styled(Tab)`
  position: relative;
  padding-top: 3rem;
  &&& {
    & .ui.menu {
      ${isMobile ? '' : 'margin-top: 0.1rem;'};
    }

    & .ui.menu > .item {
      flex-grow: 1;
      flex-basis: 0;
      text-align: center;
      display: block;
      font-size: 0.9375rem;
      background-color: ${isMobile ? '#fff' : 'transparent'};
      padding: 0.875em 2.2%;
    }

    & .ui.secondary.menu {
      background-color: ${isMobile ? '#fff' : 'transparent'};
      margin-bottom: 0;
      border-bottom: 0 !important;
      ${isMobile
        ? `position: fixed; -webkit-overflow-scrolling: touch; top: 0px; z-index: 9999; margin: 0; width: 100%; overflow-y: hidden; ::-webkit-scrollbar { display: none;
           height: 10px;}; overflow-x: scroll;`
        : ''}
      top: 2.75rem;
    }
    & .ui.secondary.pointing.menu {
      border-top: 1px solid #f8f7f8;
      border-bottom: 0 !important;
      padding-bottom: 1px;
    }

    & .ui.menu > .active.item {
      color: ${props => props.theme.secondaryColor};
      border-color: ${props => props.theme.secondaryColor};
    }
  }
`;

export default Tabs;

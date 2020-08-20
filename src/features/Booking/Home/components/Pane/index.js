import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';

const Pane = styled(Tab.Pane)`
  &&& {
    border: 0;
    box-shadow: none;
    padding: 0;
  }
`;

export default Pane;

import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const Btn = styled(Segment)`
  &&& {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 0.08em;
    padding-top: 0.31em;
  }
`;

export default Btn;

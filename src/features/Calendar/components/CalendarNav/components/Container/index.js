import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const Container = styled(Segment.Group)`
  &&& {
    width: 100%;
    margin: 0;
    background: #fafafa;
    border: none;

    & > .segment {
      border-left: 0;
    }
  }
`;

export default Container;

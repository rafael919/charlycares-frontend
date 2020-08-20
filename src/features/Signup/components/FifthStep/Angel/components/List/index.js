import styled from 'styled-components';
import { List } from 'semantic-ui-react';

const StyledList = styled(List)`
  &&& {
    & > .item:last-child {
      padding-bottom: 0.75em;
    }
  }
`;

export default StyledList;

import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

const CustomGrid = styled(Grid)`
  &&& {
    & > .column:first-child {
      margin-right: 1rem;
    }
  }
`;

export default CustomGrid;

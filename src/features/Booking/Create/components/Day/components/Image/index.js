import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  &&& {
    display: block;
    height: 24px;
    margin-left: -1rem;
  }
`;

export default StyledImage;

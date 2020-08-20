import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';

const CHeader = ({ primary, secondary, noMargin, ...rest }) => (
  <Header {...rest} />
);

const Heading = styled(CHeader)`
  &&& {
    font-weight: ${props => props.fontWeight && props.fontWeight};
    ${props => (props.noMargin ? 'margin-bottom: 0;' : '')};
    font-size: ${props => (props.fontSize ? props.fontSize : 'inherit')};
    color: ${props =>
      props.primary
        ? props.theme.primaryText
        : props.secondary
          ? props.theme.secondaryText
          : props.color
            ? props.color
            : props.theme.primaryText};
  }
`;

export default Heading;

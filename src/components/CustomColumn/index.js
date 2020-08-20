// @flow

import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

type Props = {
  noPadding: boolean,
  padding: string,
  fullStretch: boolean,
};

export const CColumn: Grid.Column = ({
  noPadding,
  padding,
  fullStretch,
  ...rest
}: {
  noPadding: boolean,
  padding: string,
  fullStretch: boolean,
  rest: Array<Object>,
}) => <Grid.Column {...rest} />;

const CustomColumn = styled(CColumn)`
  &&& {
    padding: ${(props: Props): string | number =>
      props.noPadding ? 0 : props.padding && props.padding} !important;
    margin-left: ${props => props.fullStretch && '-1rem'};
    margin-right: ${props => props.fullStretch && '-1rem'};
    margin-bottom: ${props => (props.marginbottom ? props.marginbottom : 'none')};
    position: relative;
    text-align: ${props => (props.textAlign ? props.textAlign : 'none')};
  }
`;

export default CustomColumn;

// @flow
import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

type Props = {
  noPadding: boolean,
  padding: string,
  paddingTop: string,
};

export const CRow: Grid.Row = ({
  noPadding,
  padding,
  paddingTop,
  borderBottom,
  noBorderTop,
  ...rest
}: {
  noPadding: boolean,
  borderBottom: boolean,
  padding: string,
  paddingTop: string,
  rest: Array<Object>,
}) => <Grid.Row {...rest} />;

const CustomStyledRow = styled(CRow)`
  &&& {
    text-align: ${props => props.textAlign};
    padding-top: ${(props: Props): string =>
      props.paddingTop && props.paddingTop};
    padding: ${(props: Props): string | number =>
      props.noPadding ? 0 : props.padding ? props.padding : ''};
    border-bottom: ${props =>
      props.borderBottom ? '1px solid #e6e6e6' : '0px'};
    border-top: ${props => (props.noBorderTop ? '1px solid #e6e6e6' : `0px`)};
  }
`;

export default CustomStyledRow;

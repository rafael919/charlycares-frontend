import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const CustomColumn = ({
  isWhite,
  withScroll,
  noPaddingBottom,
  overflow,
  ...rest
}) => <Grid.Column {...rest} />;

const WhiteColumn = styled(CustomColumn)`
  &&& {
    background: ${props => (!props.isWhite ? 'transparent' : '#fff')};
    border-radius: 0.3125rem;
    border: ${({ isWhite, theme }) =>
      !isWhite ? 0 : `1px solid ${theme.defaultGrey}`};
    ${({ withScroll, overflow }) => {
      if (withScroll) {
        return `
          height: 85vh;
          overflow: ${overflow ? `hidden` : `auto`};
        `;
      } else {
        return `
          height: 100%;
          min-height: 100vh;
        `;
      }
    }}

    padding: 0 1rem 4rem !important;
    ${props => props.noPaddingBottom && `padding-bottom: 0 !important;`}
    &::-webkit-scrollbar {
      background-color: #f9f8f9;
      display: none;
    }
  }
`;

export default WhiteColumn;

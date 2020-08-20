import React from 'react';
import styled from 'styled-components';

const Ext = ({ ...rest }) => <a {...rest} />;

const ExternalLink = styled(Ext)`
  color: ${props => props.theme.secondaryColor};
  font-size: ${props => props.fontSize && props.fontSize};
  font-family: ${props =>
    props.primary
      ? props.theme.primaryFont
      : props.secondary
        ? props.theme.secondaryFont
        : props.theme.primaryFont};
  &:focus {
    color: ${props => props.theme.secondaryColor};
  }

  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
`;

export default ExternalLink;

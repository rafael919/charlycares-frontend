import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CCustomLink = ({ primary, ...rest }) => <Link {...rest} />;

const CustomLink = styled(CCustomLink)`
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

export default CustomLink;

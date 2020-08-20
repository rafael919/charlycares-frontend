//@flow
import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

type Props = {
  facebook: boolean,
  outline: boolean,
  color: string,
  basicBtn: boolean,
  rest: Array<string>,
};

export const CustomButton: Button = ({
  facebook,
  outline,
  color,
  basicBtn,
  padding,
  ...rest
}: Props) => {
  return <Button {...rest} />;
};

const BasicButton = styled(CustomButton)`
  &&& {
    ${props => (props.padding ? `padding: ${props.padding}` : '')};
    position: relative;
    color: ${props =>
      props.color
        ? props.color
        : props.basicBtn
        ? props.theme.defaultBtnTextColor
        : props.primary || props.facebook || props.outline
        ? props.theme.secondaryTextColor
        : props.theme.defaultBtnTextColor
      };
    font-weight: 400;
    background: ${props =>
      props.basicBtn
        ? props.theme.defaultBtnBackgroundColor
        : props.facebook
        ? '#3B5998'
        : props.outline
        ? 'transparent'
        : props.background && props.background
        ? props.background
        : props.background
      };

    box-shadow: ${props =>
      props.outline && '0 0 0 2px ' + props.outline + ' inset'};
    ${props =>
      props.facebook || props.outline
        ? `
        &:hover, &:focus {
          color: #fff;
        }
      
      `
        : props.basicBtn
        ? `
        &:hover, &:focus {
          color: ${props.theme.defaultBtnTextColor};
        }
      
      `
        : null};
    &:disabled {
      background-color: ${props => props.theme.defaultBtnBackgroundColor};
      color: ${props => props.theme.grey};
    }

    &:hover {
      color: ${({ theme, facebook, basicBtn, primary }) =>
        facebook || basicBtn || primary ? '#fff' : theme.primaryColor};
    }
  }
`;

export default BasicButton;

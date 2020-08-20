import styled from 'styled-components';

export const InlineText = styled.span`
  &&& {
    font-size: ${props => props.fontSize && props.fontSize};
    font-family: ${props => (props.fontFamily ? props.fontFamily : props.primaryFont && props.theme.primaryFont)};
    color: ${props =>
      props.primary
        ? props.theme.primaryText
        : props.secondary
          ? props.theme.secondaryText
          : props.accentText
            ? props.theme.accentText
            : props.color
              ? props.color
              : props.theme.primaryText};
    display: ${props => props.block && 'block'};
    line-height: ${props => (props.lineHeight ? props.lineHeight : 'normal')};
    font-weight: ${props => (props.bold ? 600 : props.light ? 300 : 400)};
  }
`;

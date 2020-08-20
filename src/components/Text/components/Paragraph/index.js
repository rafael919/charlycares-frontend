import styled from 'styled-components';

export const Paragraph = styled.p`
  &&& {
    color: ${props =>
      props.color
        ? props.color
        : props.primary
          ? props.theme.primaryText
          : props.secondary
            ? props.theme.secondaryText
            : props.theme.primaryText};
    font-size: ${props => props.fontSize && props.fontSize};
    font-family: ${({ theme, primary }) =>
      primary ? theme.primaryFont : theme.secondaryFont};
    text-align: ${props => props.textAlign && props.textAlign};
    font-weight: ${props => (props.bold ? 600 : props.light ? 300 : 400)};
    margin-bottom: ${props =>
      props.noMargin ? 0 : props.margin && props.margin};
    word-break: break-word;
  }
`;

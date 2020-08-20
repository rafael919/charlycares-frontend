import styled from 'styled-components';

const Message = styled.textarea.attrs({
  rows: 10,
})`
  width: 100%;
  font-size: 0.9375rem;

  ::placeholder {
    font-style: italic;
    color: ${props => props.theme.grey};
    font-weight: 300;
  }
`;

export default Message;

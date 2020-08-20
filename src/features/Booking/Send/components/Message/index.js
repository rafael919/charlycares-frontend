import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Message = styled.textarea`
  width: 100%;
  font-size: 0.9375rem;
  font-weight: 300;
  line-height: 1.6;
  border: ${isMobile ? null : 0};
  font-family: ${props => props.theme.secondaryFont};

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-style: italic;
    color: ${props => props.theme.grey};
    font-weight: 300;
  }
`;

export default Message;

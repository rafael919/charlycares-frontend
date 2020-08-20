import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Messages = styled.div`
  background: #e6e6e6;
  overflow-y: hidden;
  width: calc(100% + 2.15rem);
  margin-left: -1rem;
  margin-bottom: -2.8rem;

  height: ${props =>
    props.img ? `calc(100vh - 15rem)` : `calc(100vh - 14rem)`};

  ${props =>
    isMobile &&
    `height: 93.5%;
    margin-right: -1rem;
  ${props.img && `padding-top: 0.27rem;`}`}

  &::-webkit-scrollbar {
    background-color: #f9f8f9;
    display: none;
  }
`;

export default Messages;

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import cornerLeft from 'Assets/icons/corner-left.svg';
import cornerRight from 'Assets/icons/corner-right.svg';
import statusReadIcon from 'Assets/icons/chat-status-read.svg';
import statusReceivedIcon from 'Assets/icons/chat-status-read.svg';
import statusSentIcon from 'Assets/icons/chat-status-sent.svg';

const Message = ({ me, you, message, createdAt, status = 1 }) => {
  return (
    <Container>
      <CreatedAt>
        {moment(createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MMMM HH:mm')}
      </CreatedAt>
      <ChatBaloon me={me} you={you}>
        <CustomImage me={me} you={you} src={you ? cornerLeft : cornerRight} />
        {message}
        {me ? <Indicator
          src={
            status === 1
              ? statusSentIcon
              : status === 2
                ? statusReceivedIcon
                : statusReadIcon
          }
        /> : null }
      </ChatBaloon>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreatedAt = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
  text-align: center;
  padding: 0.5rem 0;
`;

const ChatBaloon = styled.div`
  max-width: 75%;
  word-wrap: break-word;
  padding: 0.5rem 0.9375rem 1.2rem;
  font-size: 0.9375rem;
  line-height: 1.34;
  position: relative;
  ${props => props.me && 'margin-left: auto;'}
  background-color: ${props =>
    props.you ? '#fff' : props.me ? '#DFF1D4' : '#fff'};
  border: 1px solid #c7c7c9;
  border-radius: ${props =>
    props.you
      ? '5px 5px 5px 0;'
      : props.me
        ? '5px 5px 0 5px;'
        : '5px 5px 5px 0;'};
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2);

  &::after {
    content: '';
    width: 15px;
    height: 5px;
    position: absolute;
    bottom: -1px;
    ${props => (props.you ? 'left: 0;' : props.me ? 'right: 0;' : 'left: 0;')};

    background-color: ${props =>
      props.you ? '#fff' : props.me ? '#DFF1D4' : '#fff'};
    z-index: 0;
  }
`;
const CustomImage = styled.img`
  position: absolute;
  ${props =>
    props.you ? `left: -5px;` : props.me ? ` right: -5px;` : `left: -5px;`};
  bottom: -16px;
  z-index: 0;
  width: 25px;
  height: auto;
`;

const Indicator = styled.img`
  position: absolute;
  bottom: 0.1rem;
  right: 0.5rem;
  z-index : -99
`;

export default Message;

import React from 'react';
import styled from 'styled-components';
import { Time } from 'react-web-gifted-chat';
import readIcon from 'Assets/icons/chat-status-read.svg';
import receivedIcon from 'Assets/icons/chat-status-received.svg';
import sentIcon from 'Assets/icons/chat-status-sent.svg';

const RenderTime = ({ props }) => {
  const textStyle = { fontSize: '12px', color: '#A9A9AC' };
  return (
    <TimeDiv>
      <Time
        {...props}
        textStyle={{
          left: textStyle,
          right: textStyle,
        }}
      />
      {props.position === 'right' && (
        <img
          src={
            props.currentMessage.read === 0
              ? sentIcon
              : props.currentMessage.read === 1 ||
                !props.currentMessage.viewed_at
              ? receivedIcon
              : readIcon
          }
          alt={"message sent"}
        />
      )}
    </TimeDiv>
  );
};

const TimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
`;

export default RenderTime;

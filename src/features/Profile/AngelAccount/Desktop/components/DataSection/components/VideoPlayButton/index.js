import styled from 'styled-components';
import React from 'react';
import videoIcon from 'Assets/icons/icn-play-square-small.svg';

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img``;

const VideoPlayButton = props => (
  <Button {...props}>
    <Icon src={videoIcon} />
  </Button>
);

export default VideoPlayButton;

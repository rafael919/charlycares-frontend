import styled from 'styled-components';
import React from 'react';
import standByIcon from 'Assets/icons/icn-standby.svg';
import eventIcon from 'Assets/icons/event-fixed.svg';

const Icon = styled.img``;

const StandByAndAvailableIcon = ({ standBy, fixed }) => {
  if (standBy) {
    return <Icon src={standByIcon} />;
  }
  if (fixed) {
    return <Icon src={eventIcon} />;
  }

  return null;
};

export default StandByAndAvailableIcon;

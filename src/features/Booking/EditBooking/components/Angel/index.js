import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/icn-check-blue.svg';
import crossIcon from 'Assets/icons/close.svg';
import placeholder from 'Assets/images/profile-placeholder.png';

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.3125rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Name = styled.span`
  font-size: 0.9375rem;
  font-weight: 400;
  font-family: ${props => props.theme.secondaryFont};
`;

const AngelWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  margin-right: 1rem;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.defaultGrey};
  width: 2.5625rem;
  height: 2.5625rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
`;
const Icon = styled.img`
  margin-right: ${props => (props.unavailable ? '-0.3rem' : 0)};
`;

const Angel = ({ angel, unavailable }) => (
  <Item>
    <AngelWrapper>
      <Image src={angel.image ? angel.image : placeholder} />
      <Name>{angel.first_name}</Name>
    </AngelWrapper>
    <Icon unavailable={unavailable} src={unavailable ? crossIcon : checkIcon} />
  </Item>
);

export default Angel;

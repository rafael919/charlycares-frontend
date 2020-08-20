import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';

const Language = ({ name, selected, onSelect }) => {
  return (
    <LanguageContainer>
      <Name>{name}</Name>
      <Button onClick={onSelect}>
        <Icon src={selected ? checkIcon : addIcon} />
      </Button>
    </LanguageContainer>
  );
};

const LanguageContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding-top: 0;
  }
`;

const Name = styled.div`
  font-size: 0.9375rem;
`;

const Button = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  &:focus {
    outline: 0;
  }
`;
const Icon = styled.img`
  width: 44px;
  height: 44px;
`;

export default Language;

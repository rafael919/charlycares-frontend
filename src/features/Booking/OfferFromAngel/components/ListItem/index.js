import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/icn-check.svg';

const StyledListItem = styled.li`
  &&& {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
`;
const StyledListValue = styled.div`
  display: flex;
  align-items: center;
  color: ${props =>
    !props.checked ? props.theme.grey : props.theme.primaryText};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  min-width: 2rem;
  min-height: 2rem;
`;

const ListItem = ({ date, checked, onAdd }) => {
  return (
    <StyledListItem>
      <StyledListValue checked={checked}>{date}</StyledListValue>
      <ButtonContainer onClick={onAdd}>
        <ImageContainer>{checked && <Image src={checkIcon} />}</ImageContainer>
      </ButtonContainer>
    </StyledListItem>
  );
};

export default ListItem;

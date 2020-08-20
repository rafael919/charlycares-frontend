import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';

import circleCheck from 'Assets/icons/btn-check-on.svg';
import addBtn from 'Assets/icons/add-btn.svg';

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
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomImage = styled(Image)`
  &&& {
    width: 44px;
    height: 44px;
  }
`;

const ListItem = ({ date, checked, onAdd }) => {
  return (
    <StyledListItem>
      <StyledListValue>{date}</StyledListValue>
      <ButtonContainer onClick={onAdd}>
        <div>
          <CustomImage src={checked ? circleCheck : addBtn} />
        </div>
      </ButtonContainer>
    </StyledListItem>
  );
};

export default ListItem;

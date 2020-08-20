import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';
import selectedIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/add-btn.svg';

const Item = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  padding-bottom: 1.125rem;
  justify-content: space-between;
`;
const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  padding: 0;
`;
const Icon = styled.img`
  display: block;
  height: 100%;
  width: auto;
`;

const Reason = ({ onReasonSelect, data, selected }) => {
  if (!data) return null;
  return (
    <Item>
      <Paragraph noMargin light fontSize="0.9375rem">
        {data.reason}
      </Paragraph>
      <Button onClick={onReasonSelect(data)}>
        <Icon src={selected ? selectedIcon : addIcon} />
      </Button>
    </Item>
  );
};

export default Reason;

import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import btnCheck from 'Assets/icons/btn-check.svg';
import btnAdd from 'Assets/icons/btn-check-off.svg';

const Button = styled.div.attrs({
  role: 'button',
})`
  background-color: #e6e6e6;
  width: 151px;
  padding: 0.375rem 3.625rem 0.5rem 2.375rem;
  border-radius: 1.125rem;
  color: #68686e;
  text-align: center;
  position: relative;
  font-weight: 600;
`;

const BtnIcon = styled(Image)`
  &&& {
    position: absolute;
    right: 0.1875rem;
    width: 1.875rem;
    height: 1.875rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const SelectedButton = ({ selected }) => {
  return (
    <Button>
      {selected ? 'Selected' : 'Add Angel'}
      <BtnIcon src={selected ? btnCheck : btnAdd} />
    </Button>
  );
};

export default SelectedButton;

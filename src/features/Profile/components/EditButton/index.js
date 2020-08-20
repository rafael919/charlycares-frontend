import React from 'react';
import styled from 'styled-components';

import btnEdit from 'Assets/icons/btn-edit.svg';

const EditButton = props => {
  return (
    <Button {...props}>
      <Icon src={btnEdit} />
    </Button>
  );
};

const Button = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(30%, -50%);

  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

export default EditButton;

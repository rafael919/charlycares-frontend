import React from 'react';
import styled from 'styled-components';

import addIcon from 'Assets/icons/btn-large-add.svg';

const Button = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img``;

const navigateToBooking = history => () => history.push('/booking/create');

const AddBtn = ({ history }) => (
  <Button onClick={navigateToBooking(history)}>
    <Image src={addIcon} />
  </Button>
);

export default AddBtn;

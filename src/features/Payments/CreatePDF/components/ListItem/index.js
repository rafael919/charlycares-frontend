import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';

import PaymentItem from '../../../components/PaymentItem';
import moment from 'moment';

const ListItem = ({ description, date, paymentDesc, selected, onSelect, payment}) => {
  return (
    <ListItemContainer>
      <PaymentItem
        div
        withButton
        divider
        sum={payment.total_amount}
        description={moment(
          payment.created_at,
          'YYYY-MM-DD HH:mm:ss'
        ).format('dddd')}
        date={moment(
          payment.created_at,
          'YYYY-MM-DD HH:mm:ss'
        ).format('MMMM DD, YYYY')}
        paymentDesc={paymentDesc}
      />
      <Button onClick={() => onSelect(payment)} >
        <Icon src={selected ? checkIcon : addIcon} />
      </Button>
    </ListItemContainer>
  );
};

const ListItemContainer = styled.li`
  display: flex;
  width: 100%;

  & > div {
    padding-right: 0;
  }

  &:last-child > div:after {
    display: none;
  }
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icon = styled.img`
  width: 44px;
  height: 44px;
`;

export default ListItem;

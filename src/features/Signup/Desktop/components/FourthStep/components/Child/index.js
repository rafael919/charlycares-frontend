//@flow

import React from 'react';
import { List, Image } from 'semantic-ui-react';
import RemoveBtn from 'Components/RemoveBtn';
import styled from 'styled-components';
import deleteIcon from 'Assets/icons/delete.svg';
import childIcon from 'Assets/icons/child.svg';
import moment from 'moment';

const DeleteIcon = styled(Image)`
  &&& {
    width: 20px;
    display: inline-block;
  }
`;

const ChildIcon = styled(Image)`
  &&& {
    width: 26px;
    margin-right: 0.6875rem !important;
    display: inline-block;
  }
`;

type Props = {
  date: string,
  removeChild: Function,
};

const Child = ({ date, removeChild }: Props) => {
  return (
    <List.Item>
      <List.Content floated="right">
        <RemoveBtn onClick={removeChild} circular>
          <DeleteIcon avatar src={deleteIcon} />
        </RemoveBtn>
      </List.Content>
      <ChildIcon avatar src={childIcon} />
      <List.Content>{moment(date).format('MMMM DD, YYYY')}</List.Content>
    </List.Item>
  );
};

export default Child;

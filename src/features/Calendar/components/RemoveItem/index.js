import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import deleteIcon from 'Assets/icons/btn-trash.svg';

const RemoveItem = ({ topBorder, onClickSingle, onClickEverywhere, showRemoveEverywhere }) => { 
  return (
    showRemoveEverywhere ? (<Container topBorder={topBorder}>
      <Text onClick={onClickSingle}>
        <FormattedMessage id="calendar.angel.removeItem" />
      </Text>
      <Border> 
      </Border> 
      <Text onClick={onClickEverywhere}>
        <FormattedMessage id="calendar.angel.removeItemEverywhere" />
      </Text>
    </Container>) 
    : (<Container style={{justifyContent: 'center'}} onClick={onClickSingle} topBorder={topBorder}>
      <div>
        <Icon src={deleteIcon} />
      </div>
      <Text style={{width: 'initial'}}>
        <FormattedMessage id="calendar.angel.removeItem" />
      </Text>
    </Container>
    )
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.25rem 0;
  ${props => props.topBorder && 'border-top: 1px solid #e6e6e6;'};
`;

const Icon = styled.img`
  margin-right: 0.5rem;
`;

const Border = styled.div`
  border-left: solid 1px; 
  border-color: ${props => props.theme.defaultGrey}; 
  height: 2rem; 
`
const Text = styled.div`
  width: 50%; 
  text-align: center;
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  font-weight: 600;
`;

export default RemoveItem;

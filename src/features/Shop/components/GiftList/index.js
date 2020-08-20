import React from 'react';
import styled from 'styled-components';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';

import Gift from '../components/Gift';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;

  & > li:last-child:after {
    display: none;
  }
`;

const onItemSelect = memoizeWith(
  id => id,
  curry((id, history, gift, _e) => {
    history.push('/shop/purchase/' + id, { from: 'shop', gift: gift });
  })
);

const GiftList = ({
  showType,
  availablePoints,
  gifts = [],
  history,
  togglePhoneModal,
  onPressBtn,
}) => {
  return (
    <Container>
      {gifts.map((gift, idx) => {
        if (showType === 'all') {
          return (
            <Gift
              key={idx}
              showType={showType}
              availablePoints={availablePoints}
              gift={gift}
              history={history}
              togglePhoneModal={togglePhoneModal}
              onItemSelect={onItemSelect(gift.id, history, gift)}
              onPressBtn={onPressBtn}
            />
          );
        } else {
          return (
            gift.type === 'purchased' && (
              <Gift
                key={idx}
                showType={showType}
                availablePoints={availablePoints}
                gift={gift}
                history={history}
                togglePhoneModal={togglePhoneModal}
                onPressBtn={onPressBtn}
              />
            )
          );
        }
      })}
    </Container>
  );
};

export default GiftList;

import React from 'react';
import styled from 'styled-components';

import HistoryItem from '../components/HistoryItem';


const Container = styled.ul`
  padding: 0;
  padding-top: 1rem;
  margin: 0;
  width: 100%;

  & > li:last-child:after {
    display: none;
  }
`;

const TransactionHistoryList = ({
  transactionHistories = [],
  history,
  togglePhoneModal,
}) => {
  return (
    <Container>
      {transactionHistories.map((historyItem, idx) => (
        <HistoryItem
          key={idx}
          historyItem={historyItem}
          history={history}
          togglePhoneModal={togglePhoneModal}
        />
      ))}
    </Container>
  );
};

export default TransactionHistoryList;

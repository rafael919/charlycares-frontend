import styled from 'styled-components';

const PaymentsList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 40vh;
  &::-webkit-scrollbar {
    background-color: #f9f8f9;
    display: none;
  }

  & > li:last-child:after {
    display: none;
  }
`;

export default PaymentsList;

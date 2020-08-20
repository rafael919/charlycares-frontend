import styled from 'styled-components';

const PaymentsList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;

  & > li:last-child:after {
    display: none;
  }
`;

export default PaymentsList;

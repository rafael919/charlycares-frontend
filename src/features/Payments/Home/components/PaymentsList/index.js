import styled from 'styled-components';

const PaymentsList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;

  & > li:last-child:after {
    display: none;
  }
`;

export default PaymentsList;

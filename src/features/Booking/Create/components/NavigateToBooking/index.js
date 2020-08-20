import styled from 'styled-components';

const NavigateToBooking = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  font-weight: 300;
  color: ${props => props.theme.lightGrey};
  display: flex;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

export default NavigateToBooking;

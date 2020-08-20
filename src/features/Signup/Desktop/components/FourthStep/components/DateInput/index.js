import styled from 'styled-components';

const DateInput = styled.input.attrs({
  type: 'date',
  id: 'birthdate',
})`
  height: 32px;
  width: 205px;

  transform: translateY(-50%);
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 0;
`;

export default DateInput;

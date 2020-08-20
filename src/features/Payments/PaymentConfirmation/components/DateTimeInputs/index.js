import styled from 'styled-components';

const DateTimeInputs = styled.input`
  font-family: ${props => props.theme.primaryFont};
  max-width: 100%;
  position: absolute;
  opacity: 0;
  right: 0;
  z-index: 9999;
  text-align: right;
  caret-color: #000;
`;

export default DateTimeInputs;

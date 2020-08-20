import styled from 'styled-components';

const HiddenInput = styled.input`
  width: 100%;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  opacity: 0;
  z-index: 999;
  caret-color: #000;
`;

export default HiddenInput;

import styled from 'styled-components';

const AddButton = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 0.9rem;
  padding: 0;
  background: transparent;
  margin: 0;
  border: 0;
  cursor: pointer;
  z-index: 19;

  &:focus {
    outline: 0;
  }
`;

export default AddButton;

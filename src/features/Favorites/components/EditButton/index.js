import styled from 'styled-components';

const EditButton = styled.button`
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${({ theme }) => theme.secondaryColor};
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

export default EditButton;

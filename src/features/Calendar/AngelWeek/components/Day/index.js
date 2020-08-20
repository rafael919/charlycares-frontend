import styled from 'styled-components';

const Day = styled.div`
  display: flex;
  flex-direction: column;
  width: 12.99%;
  align-self: stretch;
  margin-top: -1.2rem;
  border-right: 1px solid #c7c7c9;
  position: relative;
  background: ${({ theme }) => theme.defaultGrey};
`;

export default Day;

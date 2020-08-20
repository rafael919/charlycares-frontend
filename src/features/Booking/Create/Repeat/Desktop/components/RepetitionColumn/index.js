import styled from 'styled-components';

const RepetitionColumn = styled.div`
  flex: 1;
  text-align: ${({ textAlign }) =>
    textAlign === 'center'
      ? 'center'
      : textAlign === 'right'
      ? 'right'
      : 'center'};
`;

export default RepetitionColumn;

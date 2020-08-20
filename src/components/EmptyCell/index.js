import styled from 'styled-components';

const EmptyCell = styled.div`
  background: #f9f8f9;
  flex: 1;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: ${props => props.padding && props.padding};
`;

export default EmptyCell;

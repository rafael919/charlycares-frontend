import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  color: ${props => props.theme.secondaryColor};
  cursor: pointer;
  font-family: ${props => props.theme.primaryFont};
`;

export default FilterContainer;

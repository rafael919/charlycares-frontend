import styled from 'styled-components';

const FilterCounter = styled.div`
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.1875rem;
  height: 1.0625rem;
  background-color: #d9d9d9;
  color: ${props => props.theme.primaryText};
  font-size: 0.8125rem;
  font-family: ${props => props.theme.secondaryFont};
  border-radius: 2px;
  text-align: center;
  margin-right: 0.3125rem;
`;

export default FilterCounter;

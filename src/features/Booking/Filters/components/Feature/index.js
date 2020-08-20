import styled from 'styled-components';

const Feature = styled.li`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 1rem;
  padding-top: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export default Feature;

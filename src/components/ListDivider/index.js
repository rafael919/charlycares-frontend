import styled from 'styled-components';

const ListDivider = styled.li`
	border-bottom: 1px solid ${props => props.theme.defaultGrey};
  background: #f9f8f9;
  &:first-child,
  &:last-child {
    display: none;
  }
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
`;

export default ListDivider;

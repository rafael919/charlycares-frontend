import styled from 'styled-components';

const Header = styled.h1`
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  padding-bottom: 1.2rem;
`;

export default Header;

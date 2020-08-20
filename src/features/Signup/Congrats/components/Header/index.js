import styled from 'styled-components';

const Header = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.primaryFont};
`;

export default Header;

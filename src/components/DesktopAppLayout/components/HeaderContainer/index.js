import styled from 'styled-components';

const HeaderContainer = styled.div`
  &&& {
    border: 0;
    border-radius: 0;
    box-shadow: unset;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.defaultGrey};
    background: #fff;
  }
`;

export default HeaderContainer;

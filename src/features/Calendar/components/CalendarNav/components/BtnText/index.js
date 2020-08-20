import styled from 'styled-components';

const BtnText = styled.span`
  color: ${props =>
    props.isSelected ? props.theme.secondaryColor : 'rgba(48,48,54,0.4)'};
  font-size: 0.525rem;
  font-weight: 600;

  @media (min-width: 23.4375em) {
    font-size: 0.625rem;
  }
`;

export default BtnText;

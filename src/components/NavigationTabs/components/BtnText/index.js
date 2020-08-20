import styled from 'styled-components';

const BtnText = styled.span`
  color: ${props =>
    props.isSelected ? props.theme.secondaryColor : 'rgba(48,48,54,0.4)'};
  font-size: 0.625em;
  font-weight: 600;
`;

export default BtnText;

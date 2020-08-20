import styled from 'styled-components';

const DateTimeValue = styled.span`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  margin: ${props => props.margin ? props.margin : null};
  font-weight: 400;
`;

export default DateTimeValue;

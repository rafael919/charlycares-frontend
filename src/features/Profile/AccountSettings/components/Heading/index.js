import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: ${props => (props.noMargin ? 0 : '1.25rem')};
`;

export default Heading;

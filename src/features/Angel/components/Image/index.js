import styled from 'styled-components';

const Image = styled.img`
  width: 9.4375rem;
  height: 9.4375rem;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.defaultGrey};
`;

export default Image;

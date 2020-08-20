import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: ${props =>
    props.src && `url(${props.src}) no-repeat center center`};
  background-size: ${props => props.src && 'cover'};
  position: absolute;
  top: 0;
  left: 0;
`;

export default Background;

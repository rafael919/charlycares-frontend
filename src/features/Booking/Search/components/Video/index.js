import styled from 'styled-components';

const Video = styled.video`
  display: ${props => (props.active ? 'block' : 'none')};
  width: 100%;
  max-width: 100%;
  height: auto;

  &:-webkit-full-screen {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;

export default Video;

import styled from 'styled-components';

const Video = styled.video`
  display: ${props => (props.active ? 'block' : 'none')};

  &:-webkit-full-screen {
    width: 100vh;
    height: 100vh;
  }
`;

export default Video;

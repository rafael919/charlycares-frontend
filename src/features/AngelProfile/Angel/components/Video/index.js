import styled from 'styled-components';

const Video = styled.video`
  display: ${props => (props.active ? 'block' : 'none')};

  &:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
`;

export default Video;

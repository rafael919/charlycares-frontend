import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
  min-width: 20vw;
  min-height: 80vh;
  position: ${isMobile ? 'absolute' : 'fixed'};
  background: rgba(255, 255, 255, 0.95);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  -webkit-transform: translateZ(0);
  -webkit-filter: blur(0);
`;

const Circle = styled.circle.attrs({
  fill: 'none',
  stroke: props => props.theme.green,
  strokeWidth: 6,
  strokeMiterlimit: 10,
  cx: 65.1,
  cy: 65.1,
  r: 62.1,
})`
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  animation: dash 0.9s ease-in-out;
  animation: dash 0.9s ease-in-out;

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

const Check = styled.polyline.attrs({
  fill: 'none',
  stroke: props => props.theme.green,
  strokeWidth: 6,
  strokeLinecap: 'round',
  strokeMiterlimit: 10,
  points: '100.2,40.2 51.5,88.8 29.8,67.5',
})`
 stroke-dashoffset: -100;
    -webkit-animation: dash-check .9s .35s ease-in-out forwards;
    animation: dash-check .9s .35s ease-in-out forwards;
  }
  
  @-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}
  `;

const SvgContainer = styled.div`
  width: 15vw;
  height: 15vw;
`;

const Message = styled.div`
  color: #ccc;
  padding-top: 0.5em;
  padding-bottom: 3em;
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  line-height: 1.5;
`;

class Success extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isVisible) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
    }
    if (this.props.isVisible !== prevProps.isVisible) {
      document.querySelector('body').removeAttribute('style');
    }
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    if (body.hasAttribute('style')) {
      body.removeAttribute('style');
    }
  }

  render() {
    return (
      this.props.isVisible && (
        <Container>
          <SvgContainer>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 130.2 130.2"
            >
              <Circle />
              <Check />
            </svg>
          </SvgContainer>
          <Message>{this.props.children}</Message>
          <BasicButton onClick={this.props.onConfirm} fluid={isMobile}>
            OK
          </BasicButton>
        </Container>
      )
    );
  }
}

export default Success;

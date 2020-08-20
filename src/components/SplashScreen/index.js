import styled from 'styled-components';
import React from 'react';
import anime from 'animejs';

import logo from 'Assets/images/logo2.png';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

const Logo = styled.img.attrs({
  alt: 'logo',
})`
  width: 60vw;
`;

class SplashScreen extends React.PureComponent {
  wrapperRef = React.createRef();
  state = {
    display: 'block',
  };

  componentDidMount() {
    anime({
      targets: this.wrapperRef.current,
      opacity: [1, 0.5],
      loop: true,
      duration: 600,
      direction: 'alternate',
      easing: 'linear',
      elasticity: 3,
    });
  }

  onAnimComplete = () => {
    this.setState({
      display: 'none',
    });
  };

  render() {
    return (
      <div>
        <Container>
          <div ref={this.wrapperRef}>
            <Logo src={logo} />
          </div>
        </Container>
      </div>
    );
  }
}

export default SplashScreen;

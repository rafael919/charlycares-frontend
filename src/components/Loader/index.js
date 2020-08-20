import React, { PureComponent } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Container = styled(Dimmer)`
  &&& {
    background: rgba(255, 255, 255, 0.5) !important;
    position: absolute;
  }
`;

const FLoader = ({ top, ...rest }) => <Loader {...rest} />;

const SLoader = styled(FLoader)`
  &&& {
    ${props => (props.top ? 'top: 20%;' : null)};
  }
`;

export default class CustomLoader extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    if (body.hasAttribute('style')) {
      body.removeAttribute('style');
    }
  }

  render() {
    let loader;

    if (isMobile) {
      loader = (
        <Dimmer active>
          <SLoader top={this.props.top} size="large" />
        </Dimmer>
      );
    } else {
      loader = (
        <Container active>
          <SLoader top={this.props.top} size="large" />
        </Container>
      );
    }

    return loader;
  }
}

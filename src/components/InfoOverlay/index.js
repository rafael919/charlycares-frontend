import React from 'react';
import Container from './components/Container';
import Text from './components/Text';
import BasicButton from 'Components/Buttons/Basic';

export default class InfoOverlay extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.active) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
    }
    if (this.props.active !== prevProps.active && !this.props.active) {
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
    return this.props.active ? (
      <Container top={this.props.top}>
        <Text>{this.props.children}</Text>
        <BasicButton onClick={this.props.onClose} fluid>
          Close
        </BasicButton>
      </Container>
    ) : null;
  }
}

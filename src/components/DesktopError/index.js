import React, { Component } from 'react';

import WithConfirm from './components/WithConfirm';
import WithRetry from './components/WithRetry';

export default class Error extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
    }
    if (this.props.errors !== prevProps.errors && !this.props.errors) {
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
    return this.props.errors ? (
      this.props.onRetry ? (
        <WithRetry errors={this.props.errors} onRetry={this.props.onRetry} />
      ) : (
        <WithConfirm
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
      )
    ) : null;
  }
}

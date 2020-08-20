import React from 'react';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.step !== prevProps.step) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default ScrollToTop;

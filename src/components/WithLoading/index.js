import { connect } from 'react-redux';
import { PureComponent } from 'react';

import { getLoadingStatus } from '../../ui/selectors';

class WithLoading extends PureComponent {
  render() {
    console.log(this.props);
    return this.props.children(this.props.isLoading);
  }
}

export default connect(state => ({
  isLoading: getLoadingStatus(state),
}))(WithLoading);

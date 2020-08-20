import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getRole } from './selectors';

class WithRole extends PureComponent {
  render() {
    return this.props.children(this.props.role);
  }
}

export default connect(state => ({
  role: getRole(state),
}))(WithRole);

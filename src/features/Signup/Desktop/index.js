import { connect } from 'react-redux';
import React, { Component } from 'react';

import { onEmailSignupReset } from '../actions';

import {
  FamilyEmailSignupWizard,
  AngelEmailSignupWizard,
} from './components/Wizard';

class Signup extends Component {
  render() {
    if (this.props.match.params.user === 'family') {
      return (
        <FamilyEmailSignupWizard
          user={this.props.match.params.user}
          onBack={this.props.onEmailSignUpReset}
          referralData={
            this.props.location.state
              ? this.props.location.state.referral
              : null
          }
        />
      );
    } else if (this.props.match.params.user === 'angel') {
      return (
        <AngelEmailSignupWizard
          user={this.props.match.params.user}
          onBack={this.props.onEmailSignUpReset}
          referralData={
            this.props.location.state
              ? this.props.location.state.referral
              : null
          }
        />
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  onEmailSignUpReset: () => dispatch(onEmailSignupReset()),
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);

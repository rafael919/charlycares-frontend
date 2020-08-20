import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React from 'react';

import { onEmailSignup, onEmailSignupReset } from './actions';
import defaultTheme from '../../themes/default';

import {
  FamilyEmailSignupWizard,
  AngelEmailSignupWizard,
} from './components/Wizard';

class Signup extends React.Component {
  render() {
    if (this.props.match.params.user === 'family') {
      return (
        <ThemeProvider theme={defaultTheme}>
          <FamilyEmailSignupWizard
            user={this.props.match.params.user}
            onBack={this.props.onEmailSignUpReset}
            referralData={
              this.props.location.state
                ? this.props.location.state.referral
                : null
            }
          />
        </ThemeProvider>
      );
    } else if (this.props.match.params.user === 'angel') {
      return (
        <ThemeProvider theme={defaultTheme}>
          <AngelEmailSignupWizard
            user={this.props.match.params.user}
            onBack={this.props.onEmailSignUpReset}
            referralData={
              this.props.location.state
                ? this.props.location.state.referral
                : null
            }
          />
        </ThemeProvider>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  onEmailSignUp: () => dispatch(onEmailSignup()),
  onEmailSignUpReset: () => dispatch(onEmailSignupReset()),
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);

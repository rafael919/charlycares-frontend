import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import ErrorMessage from 'Components/ErrorMessage';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getAuthStatus } from '../../../../../data/auth/selectors';
import { getLoadingStatus, getErrors } from '../../../../../ui/selectors';
import { onErrorConfirm } from '../../../../../ui/actions';
import ErrorSection from './components/ErrorSection';
import HeaderSection from './components/HeaderSection';
import LanguageList from './components/LanguageList';

class LanguageSelectionStep extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.userRole === 'angel' &&
      (this.props.authenticated === true &&
        this.props.authenticated !== prevProps.authenticated)
    ) {
      this.props.history.push('/appointments');
    }
  }

  onLanguageToggle = lang => () => {
    if (this.props.userRole === 'family') {
      this.props.setFieldValue(
        `fourthBStepFamily.languages.${lang}`,
        !this.props.values.fourthBStepFamily.languages[lang]
      );
      this.props.setFieldTouched(`fourthBStepFamily.languages`, true);
    } else {
      this.props.setFieldValue(
        `fourthBStepAngel.languages.${lang}`,
        !this.props.values.fourthBStepAngel.languages[lang]
      );
      this.props.setFieldTouched(`fourthBStepAngel.languages`, true);
    }
  };

  onSubmit = () => {
    if (
      process.env.NODE_ENV === 'production' &&
      this.props.userRole === 'family'
    ) {
      window.analytics.track('FSignUpLanguage');
    }
    if (
      process.env.NODE_ENV === 'production' &&
      this.props.userRole === 'angel'
    ) {
      window.analytics.track('ASignUpLanguage');
    }

    this.props.submitForm();
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          errors={this.props.apiErrors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading ? <Loader /> : null}
        <CustomRow padding="12rem 0 0 0" columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <HeaderSection userRole={this.props.userRole} />
          </Grid.Column>
        </CustomRow>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            {this.props.userRole === 'family' ? (
              <LanguageList
                selectedLanguages={
                  this.props.values && this.props.values.fourthBStepFamily
                    ? this.props.values.fourthBStepFamily.languages
                    : null
                }
                onLanguageSelect={this.onLanguageToggle}
              />
            ) : (
              <LanguageList
                selectedLanguages={
                  this.props.values && this.props.values.fourthBStepAngel
                    ? this.props.values.fourthBStepAngel.languages
                    : null
                }
                onLanguageSelect={this.onLanguageToggle}
              />
            )}
            <ErrorSection>
              {this.props.errors &&
              this.props.touched &&
              this.props.touched.fourthBStepFamily &&
              this.props.errors.fourthBStepFamily &&
              this.props.errors.fourthBStepFamily.languages &&
              this.props.touched.fourthBStepFamily.languages ? (
                <ErrorMessage>
                  {this.props.errors.fourthBStepFamily.languages}
                </ErrorMessage>
              ) : null}
              {this.props.errors &&
              this.props.touched &&
              this.props.touched.fourthBStepAngel &&
              this.props.errors.fourthBStepAngel &&
              this.props.errors.fourthBStepAngel.languages &&
              this.props.touched.fourthBStepAngel.languages ? (
                <ErrorMessage>
                  {this.props.errors.fourthBStepAngel.languages}
                </ErrorMessage>
              ) : null}
            </ErrorSection>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              primary
              fluid
              disabled={
                (this.props.errors && this.props.errors.fourthBStepAngel) ||
                (this.props.errors && this.props.errors.fourthBStepFamily)
                  ? true
                  : false
              }
              onClick={this.onSubmit}
            >
              <FormattedMessage id="signup.fourthBStep.btn" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default connect(
  state => ({
    isLoading: getLoadingStatus(state),
    apiErrors: getErrors(state),
    authenticated: getAuthStatus(state),
  }),
  {
    onErrorConfirm,
  }
)(withRouter(LanguageSelectionStep));

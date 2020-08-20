import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import ErrorMessage from 'Components/ErrorMessage';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import Confirmation from 'Components/Confirmation';
import styled from 'styled-components';
import TextButton from 'Components/Buttons/Text';

import { getAuthStatus } from '../../../../data/auth/selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import ErrorSection from './components/ErrorSection';
import HeaderSection from './components/HeaderSection';
import LanguageList from './components/LanguageList';


const ButtonContainer = styled.div`
  width: ${props => props.width};
  display: inline-block;
`

const Container = styled.div`

`;

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

  onFormSubmit = () => {
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
      <Layout 
        onNavBack={this.props.previous}
        navRightComponent={() => {return (this.props.userRole === 'family' ? '2/4' : '')}}
      >
        <Error
          errors={this.props.apiErrors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading ? <Loader /> : null}
        <CustomRow>
          <CustomColumn>
            <HeaderSection userRole={this.props.userRole} />
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
            {this.props.userRole === 'angel' ? 
            <BasicButton
              primary
              fluid
              disabled={
                (this.props.errors && this.props.errors.fourthBStepAngel) ||
                (this.props.errors && this.props.errors.fourthBStepFamily)
                  ? true
                  : false
              }
              onClick={this.onFormSubmit}
              >
                <FormattedMessage id="signup.fourthBStep.btn" />
              </BasicButton> : 
            <Confirmation>
              <Container>
                <ButtonContainer width={'45%'}>
                  <TextButton
                    disabled={true}
                  >
                    <FormattedMessage id="profile.family.complete.skip" />
                  </TextButton>
                </ButtonContainer>
                <ButtonContainer width={'55%'}>
                  <BasicButton
                    primary
                    onClick={this.onFormSubmit}
                    disabled={
                      (this.props.errors && this.props.errors.fourthBStepAngel) ||
                      (this.props.errors && this.props.errors.fourthBStepFamily)
                        ? true
                        : false
                    }
                  >
                    <FormattedMessage id="signup.family.fourthStep.btn" />
                  </BasicButton>
                </ButtonContainer>
              </Container>
            </Confirmation>
          }
              
          </CustomColumn>
        </CustomRow>
      </Layout>
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

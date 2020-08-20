import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import ExternalLink from 'Components/ExternalLink';
import CustomRow from 'Components/CustomRow';
import CustomLink from 'Components/CustomLink';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import Toggle from 'Components/Toggle';
import VisibilityIcon from 'Components/VisibilityIcon';
import API from '../api';
import { withRouter } from 'react-router-dom';

import { onNextStep } from '../../../utils';

class SecondStep extends Component {
  state = {
    isPasswordVisible: false,
    isLoading: false,
    error: null,
    emailValid: false,
  };

  setAnalytics = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('ASignUpEmail');
    }
  };

  onValidate = callback => () => {
    this.setState(
      state => ({ ...state, error: null, isLoading: true }),
      () => {
        API.validate({ email: this.props.values.secondStepAngel.email })
          .then(res => {
            this.setState({ isLoading: false, emailValid: true });
            callback();
          })
          .catch(err => {
            this.setState({
              error: err.response.data.message,
              isLoading: false,
            });
          });
      }
    );
  };

  onPasswordVisibilityChange = () => {
    this.setState(prevState => {
      return {
        isPasswordVisible: !prevState.isPasswordVisible,
      };
    });
  };

  goToLogin = () => {
    this.props.history.replace('/login');
  };

  render() {
    const {
      values,
      setErrors,
      setTouched,
      next,
      schema,
      previous,
    } = this.props;

    return (
      <Layout
        onNavBack={previous}
        navTitle={<FormattedMessage id="signup.angel.header" />}
        navRightComponent={() => (
          <CustomLink primary to="/login">
            <FormattedMessage id="navigation.login" />
          </CustomLink>
        )}
      >
        <CustomRow>
          <Grid.Column width={16}>
            <Header>
              <FormattedMessage id="signup.angel.secondStep.header" />
            </Header>
          </Grid.Column>
          <Grid.Column width={16} as="p">
            <FormattedMessage id="signup.angel.secondStep.description" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.secondStep.email" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepAngel &&
                    this.props.touched.secondStepAngel
                      ? this.props.touched.secondStepAngel.email &&
                        this.props.errors.secondStepAngel.email
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepAngel.email}
                  onChange={this.props.handleChange}
                  name="secondStepAngel.email"
                  type="email"
                  onBlur={this.props.handleBlur}
                  transparent
                  loading={this.state.isLoading}
                />
                <FieldError
                  errors={this.props.errors}
                  touched={this.props.touched}
                  field="secondStepAngel.email"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepAngel.email}
                      </ErrorMessage>
                    );
                  }}
                />
                {this.state.error &&
                this.state.error.email &&
                Array.isArray(this.state.error.email) ? (
                  <ErrorMessage>{this.state.error.email[0]}</ErrorMessage>
                ) : null}
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.secondStep.password" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepAngel &&
                    this.props.touched.secondStepAngel
                      ? this.props.touched.secondStepAngel.password &&
                        this.props.errors.secondStepAngel.password
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepAngel.password}
                  onChange={this.props.handleChange}
                  name="secondStepAngel.password"
                  type={this.state.isPasswordVisible ? 'text' : 'password'}
                  onBlur={this.props.handleBlur}
                  transparent
                  action={
                    <VisibilityIcon
                      hasError={
                        this.props.errors.secondStepAngel &&
                        this.props.touched.secondStepAngel
                          ? this.props.touched.secondStepAngel.password &&
                            this.props.errors.secondStepAngel.password
                            ? true
                            : false
                          : false
                      }
                      visible={this.state.isPasswordVisible}
                      onIconClick={this.onPasswordVisibilityChange}
                    />
                  }
                />
                <FieldError
                  errors={this.props.errors}
                  touched={this.props.touched}
                  field="secondStepAngel.password"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepAngel.password}
                      </ErrorMessage>
                    );
                  }}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <CustomColumn width={12} verticalAlign="middle">
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.angel.secondStep.agreeWith" />
            </InlineText>{' '}
            <ExternalLink
              fontSize="0.875em"
              href="https://www.charlycares.com/gebruikersovereenkomst"
            >
              <FormattedMessage id="signup.angel.secondStep.termsAndConditions" />
            </ExternalLink>{' '}
          </CustomColumn>
          <CustomColumn width={4} verticalAlign="middle">
            <Toggle
              value={values.secondStepAngel.terms}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepAngel.terms"
            />
          </CustomColumn>
          <CustomColumn width={16} verticalAlign="middle">
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepAngel.terms"
              render={() => {
                return (
                  <ErrorMessage>
                    {this.props.errors.secondStepAngel.terms}
                  </ErrorMessage>
                );
              }}
            />
          </CustomColumn>
          <CustomColumn width={12} verticalAlign="middle">
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.angel.secondStep.agreeWith" />
            </InlineText>{' '}
            <ExternalLink
              fontSize="0.875em"
              href="https://www.charlycares.com/privacy"
            >
              <FormattedMessage id="signup.angel.secondStep.privacyPolicy" />
            </ExternalLink>{' '}
          </CustomColumn>
          <CustomColumn width={4} verticalAlign="middle">
            <Toggle
              value={values.secondStepAngel.privacy}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepAngel.privacy"
            />
          </CustomColumn>
          <CustomColumn width={16} verticalAlign="middle">
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepAngel.privacy"
              render={() => {
                return (
                  <ErrorMessage>
                    {this.props.errors.secondStepAngel.privacy}
                  </ErrorMessage>
                );
              }}
            />
          </CustomColumn>
        </CustomRow>
        <Grid.Row verticalAlign="middle">
          <CustomColumn width={16}>
            <BasicButton
              primary={
                this.props.touched &&
                this.props.errors &&
                this.props.touched.secondStepAngel &&
                !this.props.errors.secondStepAngel
                  ? true
                  : false
              }
              onClick={this.onValidate(
                onNextStep('secondStepAngel')({
                  schema,
                  values,
                  setErrors,
                  setTouched,
                  next,
                  callback: this.setAnalytics,
                  fields: ['email', 'password', 'terms', 'privacy'],
                })
              )}
              fluid
            >
              <FormattedMessage id="signup.angel.secondStep.btn" />
            </BasicButton>
          </CustomColumn>
        </Grid.Row>
      </Layout>
    );
  }
}

export default withRouter(SecondStep);

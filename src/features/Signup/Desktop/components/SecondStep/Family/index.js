import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import ExternalLink from 'Components/ExternalLink';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import NoPadding from 'Components/NoPadding';
import React, { Component } from 'react';
import Toggle from 'Components/Toggle';
import VisibilityIcon from 'Components/VisibilityIcon';
import API from '../api';

import { onNextStep } from '../../../../utils';

export default class SecondStep extends Component {
  state = {
    isPasswordVisible: false,
    isLoading: false,
    error: null,
    emailValid: false,
  };
  
  setAnalytics = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSignUpEmail');
    }
  };

  onPasswordVisibilityChange = () => {
    this.setState(prevState => {
      return {
        isPasswordVisible: !prevState.isPasswordVisible,
      };
    });
  };

  onValidate = callback => () => {
    this.setState(
      state => ({ ...state, error: null, isLoading: true }),
      () => {
        API.validate({ email: this.props.values.secondStepFamily.email })
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

  render() {
    const { values, setErrors, setTouched, next, schema } = this.props;
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.family.secondStep.header" 
                  values={{
                    name: this.props.values.firstStepFamily.name
                  }}
                />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.family.secondStep.description" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.family.secondStep.email" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepFamily &&
                    this.props.touched.secondStepFamily
                      ? this.props.touched.secondStepFamily.email &&
                        this.props.errors.secondStepFamily.email
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepFamily.email}
                  onChange={this.props.handleChange}
                  name="secondStepFamily.email"
                  type="email"
                  onBlur={this.props.handleBlur}
                  transparent
                  loading={this.state.isLoading}
                />
                <FieldError
                  errors={this.props.errors || this.state.error}
                  touched={this.props.touched}
                  field="secondStepFamily.email"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepFamily.email}
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
                  <FormattedMessage id="signup.family.secondStep.password" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepFamily &&
                    this.props.touched.secondStepFamily
                      ? this.props.touched.secondStepFamily.password &&
                        this.props.errors.secondStepFamily.password
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepFamily.password}
                  onChange={this.props.handleChange}
                  name="secondStepFamily.password"
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
                  field="secondStepFamily.password"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepFamily.password}
                      </ErrorMessage>
                    );
                  }}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="left" computer={6} mobile={12} tablet={12}>
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.family.secondStep.agree" />
            </InlineText>{' '}
            <ExternalLink
              fontSize="0.875em"
              href="https://www.charlycares.com/gebruikersovereenkomst"
            >
              <FormattedMessage id="signup.family.secondStep.terms" />
            </ExternalLink>{' '}
          </Grid.Column>
          <Grid.Column textAlign="right" computer={2} mobile={4} tablet={4}>
            <Toggle
              value={values.secondStepFamily.terms}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepFamily.terms"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="left" computer={6} mobile={12} tablet={12}>
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.family.secondStep.agree" />
            </InlineText>{' '}
            <ExternalLink
              fontSize="0.875em"
              href="https://www.charlycares.com/privacy"
            >
              <FormattedMessage id="signup.family.secondStep.privacy" />
            </ExternalLink>{' '}
          </Grid.Column>
          <Grid.Column textAlign="right" computer={2} mobile={4} tablet={4}>
            <Toggle
              value={values.secondStepFamily.privacy}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepFamily.privacy"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row as={NoPadding} columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepFamily.terms"
              render={() => {
                return (
                  <ErrorMessage>
                    * {this.props.errors.secondStepFamily.terms}
                  </ErrorMessage>
                );
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row as={NoPadding} columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepFamily.privacy"
              render={() => {
                return (
                  <ErrorMessage>
                    * {this.props.errors.secondStepFamily.privacy}
                  </ErrorMessage>
                );
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              disabled={this.props.errors.secondStepFamily ? true : false}
              primary
              onClick={this.onValidate(
                onNextStep('secondStepFamily')({
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
              <FormattedMessage id="signup.family.secondStep.btn" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

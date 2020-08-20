import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import ExternalLink from 'Components/ExternalLink';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import Label from 'Components/Label';
import Toggle from 'Components/Toggle';
import VisibilityIcon from 'Components/VisibilityIcon';
import React, { Component } from 'react';
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

  render() {
    const { values, setErrors, setTouched, next, schema } = this.props;
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.secondStep.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.angel.secondStep.description" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
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
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column computer={6} mobile={10} tablet={10}>
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.angel.secondStep.agreeWith" />
            </InlineText>{' '}
            <ExternalLink
              fontSize="0.875em"
              href="https://www.charlycares.com/gebruikersovereenkomst"
            >
              <FormattedMessage id="signup.angel.secondStep.termsAndConditions" />
            </ExternalLink>{' '}
          </Grid.Column>
          <Grid.Column textAlign="right" computer={2} mobile={6} tablet={6}>
            <Toggle
              value={values.secondStepAngel.terms}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepAngel.terms"
            />
          </Grid.Column>
        </Grid.Row>
        <CustomRow noPadding columns={1}>
          <CustomColumn computer={8} mobile={16} tablet={16}>
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
        </CustomRow>
        <Grid.Row columns={2}>
          <Grid.Column computer={6} mobile={10} tablet={10}>
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.angel.secondStep.agreeWith" />
            </InlineText>{' '}
            <ExternalLink
              fontSize="0.875em"
              href="https://www.charlycares.com/privacy"
            >
              <FormattedMessage id="signup.angel.secondStep.privacyPolicy" />
            </ExternalLink>{' '}
          </Grid.Column>
          <Grid.Column textAlign="right" computer={2} mobile={6} tablet={6}>
            <Toggle
              value={values.secondStepAngel.privacy}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepAngel.privacy"
            />
          </Grid.Column>
        </Grid.Row>
        <CustomRow noPadding columns={1}>
          <CustomColumn computer={8} mobile={16} tablet={16}>
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

        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              disabled={this.props.errors.secondStepAngel ? true : false}
              primary
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
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

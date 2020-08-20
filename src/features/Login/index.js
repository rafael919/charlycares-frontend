import { connect } from 'react-redux';
import { Dimmer, Form, Header, Loader } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import { Paragraph } from 'Components/Text';
import { Redirect } from 'react-router-dom';
import BasicButtons from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React, { Component, Fragment } from 'react';
import VisibilityIcon from 'Components/VisibilityIcon';
import { getLocale } from 'Utils';

import {
  getAuthStatus,
  getMembershipStatus,
  getRoleStatus,
  getSuspendedStatus,
  getAcceptedStatus,
  getAppointmentStatus,
  getTimerStatus,
} from '../../data/auth/selectors';

import { getLoadingStatus, getErrors } from './selectors';
import { onErrorConfirm } from '../../ui/actions';
import { onLoginReq } from '../../data/user/actions';

class Login extends Component {
  static defaultProps = {
    locale: getLocale() === 'nl' ? 'nl_NL' : 'en_GB',
  };

  state = {
    isPasswordVisible: false,
    schema: null,
  };

  componentDidMount() {
    if (this.props.locale === 'nl_NL') {
      import('./formSchemaNL.js').then(res => {
        this.setState({
          schema: res,
        });
      });
    } else {
      import('./formSchemaEN.js').then(res => {
        this.setState({
          schema: res,
        });
      });
    }
  }

  onPasswordVisibilityChange = () => {
    this.setState(prevState => {
      return {
        isPasswordVisible: !prevState.isPasswordVisible,
      };
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.isAuthenticated !== this.props.isAuthenticated ||
      nextProps.hasMembership !== this.props.hasMembership ||
      nextProps.suspened !== this.props.suspended ||
      nextProps.hasAppointment !== this.props.hasAppointment ||
      nextProps.isAccepted !== this.props.isAccepted ||
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.errors !== this.props.errors ||
      nextState.isPasswordVisible !== this.state.isPasswordVisible ||
      nextState.schema !== this.state.schema
    ) {
      return true;
    }
    return false;
  }
  render() {
    const {
      role,
      isAuthenticated,
      hasMembership,
      isSuspended,
      history,
      isLoading,
      onLoginReq,
      hasCanceledMembership,
      isDismissed,
      isRetired,
    } = this.props;
    if (isAuthenticated) {
      if (role === 'family' && hasCanceledMembership) {
        return <Redirect to="/reactivate" />;
      } else if (role === 'family' && hasMembership === false) {
        return <Redirect to="/welcome-back" />;
      } else if (role === 'angel' && isSuspended) {
        return <Redirect to="/suspended" />;
      } else if (role === 'angel' && isDismissed) {
        return <Redirect to="/dismissed" />;
      } else if (role === 'angel' && isRetired) {
        return <Redirect to="/retired" />;
      }

      return <Redirect to="/booking" />;
    }

    if (this.state.schema) {
      return (
        <Layout onNavBack={history.goBack}>
          <Dimmer active={isLoading}>
            <Loader size="large"> Checking credentials... </Loader>
          </Dimmer>
          <CustomRow>
            <CustomColumn width={16}>
              <CustomRow>
                <Header as="h3">
                  <FormattedMessage id="login.family.header" />
                </Header>
              </CustomRow>
              <CustomRow paddingTop="0.375em">
                <Paragraph fontSize="0.9375em">
                  <FormattedMessage id="login.family.description" />
                </Paragraph>
              </CustomRow>
              <Formik
                validationSchema={this.state.schema.default}
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={onLoginReq}
                render={({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                }) => {
                  return (
                    <Fragment>
                      <CustomRow paddingTop="2em">
                        <CustomColumn width={16}>
                          <Form>
                            <Form.Field>
                              <Label>
                                <FormattedMessage id="login.family.email" />
                              </Label>
                              <CustomInput
                                hasError={
                                  errors.email && touched.email
                                    ? touched.email === true && errors.email
                                      ? true
                                      : false
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                autoComplete="username"
                                value={values.email}
                                type="email"
                                transparent
                              />
                              <FieldError
                                errors={errors}
                                touched={touched}
                                field="email"
                                render={() => (
                                  <ErrorMessage> {errors.email} </ErrorMessage>
                                )}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>
                                <FormattedMessage id="login.family.password" />
                              </Label>
                              <CustomInput
                                hasError={
                                  errors.password && touched.password
                                    ? touched.password === true &&
                                      errors.password
                                      ? true
                                      : false
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                value={values.password}
                                type={
                                  this.state.isPasswordVisible
                                    ? 'text'
                                    : 'password'
                                }
                                transparent
                                autoComplete="current-password"
                                action={
                                  errors.password && touched.password ? null : (
                                    <VisibilityIcon
                                      visible={this.state.isPasswordVisible}
                                      onIconClick={
                                        this.onPasswordVisibilityChange
                                      }
                                    />
                                  )
                                }
                              />
                              <FieldError
                                errors={errors}
                                touched={touched}
                                field="password"
                                render={() => (
                                  <ErrorMessage>{errors.password}</ErrorMessage>
                                )}
                              />
                            </Form.Field>
                          </Form>
                        </CustomColumn>
                      </CustomRow>
                      <CustomRow paddingTop="1.25em">
                        <CustomColumn width={16}>
                          <BasicButtons onClick={handleSubmit} primary fluid>
                            <FormattedMessage id="login.family.loginBtn" />
                          </BasicButtons>
                          {this.props.errors ? (
                            <ErrorMessage>
                              <FormattedMessage id="errors.badCredentials" />
                            </ErrorMessage>
                          ) : null}
                        </CustomColumn>
                      </CustomRow>
                    </Fragment>
                  );
                }}
              />
              <CustomRow textAlign="center" paddingTop="1.25em">
                <CustomLink to="/password-recovery">
                  <FormattedMessage id="login.family.forgotPassword" />
                </CustomLink>
              </CustomRow>
              <CustomRow textAlign="center" paddingTop="1.25em">
                <FormattedMessage id="login.family.noAccount" />
                <CustomLink to="/">
                  <FormattedMessage id="login.family.createAccount" />
                </CustomLink>
              </CustomRow>
            </CustomColumn>
          </CustomRow>
        </Layout>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  isAuthenticated: getAuthStatus(state),
  hasMembership: getMembershipStatus(state),
  role: getRoleStatus(state),
  hasActiveTimer: getTimerStatus(state),
  isSuspended: getSuspendedStatus(state),
  isAccepted: getAcceptedStatus(state),
  hasAppointment: getAppointmentStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onLoginReq: data => {
    return dispatch(onLoginReq(data));
  },
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

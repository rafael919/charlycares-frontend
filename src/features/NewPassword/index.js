import { Form } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Paragraph } from 'Components/Text';
import { Formik } from 'formik';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import FieldError from 'Components/FieldError';
import ErrorMessage from 'Components/ErrorMessage';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import VisibilityIcon from 'Components/VisibilityIcon';
import React, { Component } from 'react';
import API from './api';
import { getLocale } from 'Utils';

class NewPassword extends Component {
  state = {
    isPasswordVisible: false,
    error: null,
    isLoading: false,
    success: false,
  };

  initialFormValue = {
    password: '',
  };

  static defaultProps = {
    locale: getLocale() === 'nl' ? 'nl_NL' : 'en_GB',
  };

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      if (this.props.locale === 'nl_NL') {
        import('./formSchemaNL.js').then(res => {
          this.setState({
            schema: res,
            isLoading: false,
          });
        });
      } else {
        import('./formSchemaEN.js').then(res => {
          this.setState({
            schema: res,
            isLoading: false,
          });
        });
      }
    });
  }

  onPasswordVisibilityChange = () => {
    this.setState(prevState => {
      return {
        isPasswordVisible: !prevState.isPasswordVisible,
      };
    });
  };

  onCheckEmail = values => {
    const data = {
      password: values.password,
      password_confirmation: values.password,
      token: this.props.match.params.token,
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.passwordReset(data)
          .then(res => {
            if (res.status === 200) {
              this.setState({
                success: true,
                isLoading: false,
              });
            }
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout
        navBorder
        onNavClose={this.props.history.goBack}
        navTitle={<FormattedMessage id="password.recovery.header" />}
      >
        <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />
        {this.state.isLoading ? <Loader /> : null}
        <CustomRow paddingTop="3rem">
          <CustomColumn width={16}>
            <CustomRow>
              <Paragraph light>
                {this.props.intl.formatMessage({
                  id: 'password.recovery.newPassword',
                })}
              </Paragraph>
            </CustomRow>
            <Formik
              initialValues={this.initialFormValue}
              validationSchema={this.state.formSchema}
              onSubmit={this.onCheckEmail}
              render={({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              }) => (
                <React.Fragment>
                  <CustomRow paddingTop="1.875rem">
                    <Form>
                      <Form.Field>
                        <Label>
                          <FormattedMessage id="password.recovery.password" />
                        </Label>
                        <CustomInput
                          hasError={
                            errors.password && touched.password
                              ? touched.password === true && errors.password
                                ? true
                                : false
                              : false
                          }
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          type={
                            this.state.isPasswordVisible ? 'text' : 'password'
                          }
                          transparent
                          action={
                            <VisibilityIcon
                              hasError={
                                errors && touched
                                  ? touched.password && errors.password
                                    ? true
                                    : false
                                  : false
                              }
                              visible={this.state.isPasswordVisible}
                              onIconClick={this.onPasswordVisibilityChange}
                            />
                          }
                        />
                      </Form.Field>
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="password"
                        render={() => (
                          <ErrorMessage> {errors.password} </ErrorMessage>
                        )}
                      />
                    </Form>
                  </CustomRow>
                  <CustomRow paddingTop="1.75em">
                    <BasicButton
                      onClick={handleSubmit}
                      fluid
                      primary
                      disabled={
                        errors.password && touched.password
                          ? touched.password === true && errors.password
                            ? true
                            : false
                          : false
                      }
                    >
                      <FormattedMessage id="password.recovery.resetPassword" />
                    </BasicButton>
                  </CustomRow>
                </React.Fragment>
              )}
            />
            <CustomRow textAlign="center" paddingTop="1.75em">
              <CustomLink to="/login">
                <FormattedMessage id="password.recovery.backToLoginLink" />
              </CustomLink>
            </CustomRow>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(NewPassword);

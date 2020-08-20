import { Form } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
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
import formSchema from './formSchema';
import React, { Component } from 'react';
import API from './api';
import SuccessfulEmail from './components/SuccessfulEmail';

class PasswordRecovery extends Component {
  state = {
    error: null,
    isLoading: false,
    success: false,
  };

  initialFormValue = {
    email: '',
  };

  onCheckEmail = values => {
    const data = {
      ...values,
      confirmation_link:
        process.env.NODE_ENV === 'development'
          ? `${process.env.REACT_APP_DOMAIN_DEV}/password-recovery/{code}`
          : `${process.env.REACT_APP_DOMAIN_PROD}/password-recovery/{code}`,
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.checkEmail(data)
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
      return <SuccessfulEmail />;
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
                  id: 'password.recovery.desc',
                })}
              </Paragraph>
            </CustomRow>
            <Formik
              initialValues={this.initialFormValue}
              validationSchema={formSchema}
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
                          <FormattedMessage id="password.recovery.email" />
                        </Label>
                        <CustomInput
                          hasError={
                            errors.email && touched.email
                              ? touched.email === true && errors.email
                                ? true
                                : false
                              : false
                          }
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          type="email"
                          transparent
                        />
                      </Form.Field>
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="email"
                        render={() => (
                          <ErrorMessage> {errors.email} </ErrorMessage>
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
                        errors.email && touched.email
                          ? touched.email === true && errors.email
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

export default injectIntl(PasswordRecovery);

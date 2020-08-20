import { Form, Grid, Header } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Formik } from 'formik';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import CustomLink from 'Components/CustomLink';
import DesktopError from 'Components/DesktopError';
import ErrorMessage from 'Components/ErrorMessage';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import API from '../api';
import formSchema from '../formSchema';
import SuccessfulEmail from '../components/SuccessfulEmail';

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
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader /> : null}
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="password.recovery.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Paragraph light>
              {this.props.intl.formatMessage({
                id: 'password.recovery.desc',
              })}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>

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
              <Grid.Row textAlign="left" columns={1}>
                <Grid.Column
                  textAlign="left"
                  computer={8}
                  mobile={16}
                  tablet={16}
                >
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
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="left" columns={1}>
                <Grid.Column
                  textAlign="left"
                  computer={8}
                  mobile={16}
                  tablet={16}
                >
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
                </Grid.Column>
              </Grid.Row>
            </React.Fragment>
          )}
        />

        <Grid.Row columns={1}>
          <Grid.Column textAlign="center" computer={8} mobile={16} tablet={16}>
            <CustomLink to="/login">
              <FormattedMessage id="password.recovery.backToLoginLink" />
            </CustomLink>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(PasswordRecovery);

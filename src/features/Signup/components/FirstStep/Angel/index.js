import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import CustomLink from 'Components/CustomLink';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React from 'react';

import { onNextStep } from '../../../utils';

class FirstStep extends React.Component {
  setAnalytics = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('ASignUpName');
    }
  };

  render() {
    const {
      values,
      next,
      handleChange,
      errors,
      setErrors,
      touched,
      handleBlur,
      setTouched,
      history,
      schema,
    } = this.props;
    return (
      <Layout
        onNavBack={history.goBack}
        navTitle={<FormattedMessage id="signup.angel.header" />}
        navRightComponent={() => (
          <CustomLink primary to="/login">
            <FormattedMessage id="navigation.login" />
          </CustomLink>
        )}
      >
        <CustomRow>
          <CustomColumn width={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.firstStep.header" />
            </Header>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.firstStep.firstName" />
                </Label>
                <CustomInput
                  hasError={
                    errors.firstStepAngel && touched.firstStepAngel
                      ? touched.firstStepAngel.name &&
                        errors.firstStepAngel.name
                        ? true
                        : false
                      : false
                  }
                  type="text"
                  name="firstStepAngel.name"
                  value={values.firstStepAngel.name}
                  transparent
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FieldError
                  errors={errors}
                  touched={touched}
                  field="firstStepAngel.name"
                  render={() => (
                    <ErrorMessage>{errors.firstStepAngel.name}</ErrorMessage>
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.firstStep.lastName" />
                </Label>
                <CustomInput
                  hasError={
                    errors.firstStepAngel && touched.firstStepAngel
                      ? touched.firstStepAngel.lastName &&
                        errors.firstStepAngel.lastName
                        ? true
                        : false
                      : false
                  }
                  type="text"
                  name="firstStepAngel.lastName"
                  value={values.firstStepAngel.lastName}
                  onChange={handleChange}
                  transparent
                  onBlur={handleBlur}
                />
                <FieldError
                  errors={errors}
                  touched={touched}
                  field="firstStepAngel.lastName"
                  render={() => (
                    <ErrorMessage>
                      {errors.firstStepAngel.lastName}
                    </ErrorMessage>
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.firstStep.birthdate" />
                </Label>
                <CustomInput
                  hasError={
                    errors.firstStepAngel && touched.firstStepAngel
                      ? touched.firstStepAngel.birthdate &&
                        errors.firstStepAngel.birthdate
                        ? true
                        : false
                      : false
                  }
                  type="date"
                  name="firstStepAngel.birthdate"
                  value={values.firstStepAngel.birthdate}
                  onChange={handleChange}
                  transparent
                  onBlur={handleBlur}
                />
                <FieldError
                  errors={errors}
                  touched={touched}
                  field="firstStepAngel.birthdate"
                  render={() => (
                    <ErrorMessage>
                      {errors.firstStepAngel.birthdate}
                    </ErrorMessage>
                  )}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </CustomRow>
        <Grid.Row verticalAlign="middle">
          <CustomColumn width={16}>
            <BasicButton
              primary={
                touched.firstStepAngel &&
                !errors.firstStepAngel &&
                Object.keys(touched.firstStepAngel).length > 0
              }
              onClick={onNextStep('firstStepAngel')({
                schema,
                values,
                setErrors,
                setTouched,
                next,
                callback: this.setAnalytics,
                fields: ['name', 'lastName', 'birthdate'],
              })}
              fluid
            >
              <FormattedMessage id="signup.angel.firstStep.btn" />
            </BasicButton>
          </CustomColumn>
        </Grid.Row>
      </Layout>
    );
  }
}

export default withRouter(FirstStep);

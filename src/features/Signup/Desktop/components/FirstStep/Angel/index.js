import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import DateTime from 'react-datetime';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import Label from 'Components/Label';
import moment from 'moment';
import React from 'react';

// import { firstStepAngel } from '../../Wizard/Angel/formSchema';
import { onNextStep } from '../../../../utils';

const onDateChange = setFieldValue => date => {
  if (moment.isMoment(date)) {
    setFieldValue('firstStepAngel.birthdate', date.format('YYYY-MM-DD'));
  }
  setFieldValue('firstStepAngel.birthdate', date);
};

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
      setFieldValue,
      errors,
      setErrors,
      touched,
      handleBlur,
      setTouched,
      schema,
    } = this.props;

    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row textAlign="left">
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.firstStep.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
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
                <DateTime
                  dateFormat="DD-MM-YYYY"
                  closeOnSelect
                  timeFormat={false}
                  onChange={onDateChange(setFieldValue)}
                  renderInput={props => (
                    <CustomInput
                      transparent
                      {...props}
                      hasError={
                        errors.firstStepAngel && touched.firstStepAngel
                          ? touched.firstStepAngel.birthdate &&
                            errors.firstStepAngel.birthdate
                            ? true
                            : false
                          : false
                      }
                    />
                  )}
                  className="rdt-relative"
                  viewMode="years"
                  value={values.firstStepAngel.birthdate}
                  inputProps={{
                    name: 'firstStepAngel.birthdate',
                  }}
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
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              primary
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
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default FirstStep;

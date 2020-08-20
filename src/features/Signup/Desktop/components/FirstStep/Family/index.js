import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import React from 'react';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';

import { onNextStep } from '../../../../utils';

class FirstStep extends React.Component {
  setAnalytics = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSignUpName');
    }
  };

  componentDidMount() {console.log('mount');
    if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_STAGE === 'testing') {  
      window.analytics.track('FAssignTestGroup', {
        group: 'B',
        test: 'onboarding-10'
      });
    }
  } 
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
      schema,
    } = this.props;

    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.family.firstStep.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.family.firstStep.firstName" />
                </Label>
                <CustomInput
                  hasError={
                    errors.firstStepFamily && touched.firstStepFamily
                      ? touched.firstStepFamily.name &&
                        errors.firstStepFamily.name
                        ? true
                        : false
                      : false
                  }
                  type="text"
                  name="firstStepFamily.name"
                  value={values.firstStepFamily.name}
                  transparent
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FieldError
                  errors={errors}
                  touched={touched}
                  field="firstStepFamily.name"
                  render={() => (
                    <ErrorMessage>{errors.firstStepFamily.name}</ErrorMessage>
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.family.firstStep.lastName" />
                </Label>
                <CustomInput
                  fluid
                  hasError={
                    errors.firstStepFamily && touched.firstStepFamily
                      ? touched.firstStepFamily.lastName &&
                        errors.firstStepFamily.lastName
                        ? true
                        : false
                      : false
                  }
                  type="text"
                  name="firstStepFamily.lastName"
                  value={values.firstStepFamily.lastName}
                  onChange={handleChange}
                  transparent
                  onBlur={handleBlur}
                />
                <FieldError
                  errors={errors}
                  touched={touched}
                  field="firstStepFamily.lastName"
                  render={() => (
                    <ErrorMessage>
                      {errors.firstStepFamily.lastName}
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
              disabled={
                !touched.firstStepFamily || errors.firstStepFamily
                  ? true
                  : false
              }
              onClick={onNextStep('firstStepFamily')({
                schema,
                values,
                setErrors,
                setTouched,
                next,
                callback: this.setAnalytics,
                fields: ['name', 'lastName'],
              })}
              fluid
            >
              <FormattedMessage id="signup.family.firstStep.btn" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default FirstStep;

import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React from 'react';

import { onNextStep } from '../../../utils';

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
      history,
      schema,
    } = this.props;

    return (
      <Layout
        onNavBack={history.goBack}
        navRightComponent={() => (
          <CustomLink primary to="/login">
            <FormattedMessage id="navigation.login" />
          </CustomLink>
        )}
      >
        <CustomRow>
          <CustomColumn width={16}>
            <Header as="h3" style={{lineHeight: '2rem'}}>
              <FormattedMessage id="signup.family.firstStep.header" /> <br />
              <FormattedMessage id="signup.family.firstStep.secondHeader" />
            </Header>
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
          </CustomColumn>
        </CustomRow>
        <Grid.Row verticalAlign="middle">
          <CustomColumn width={16}>
            <BasicButton
              primary={
                touched.firstStepFamily &&
                !errors.firstStepFamily &&
                Object.keys(touched.firstStepFamily).length > 0
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
          </CustomColumn>
        </Grid.Row>
      </Layout>
    );
  }
}

export default withRouter(FirstStep);

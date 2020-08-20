//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'libphonenumber-js/mobile';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import React from 'react';
import API from '../api';

import { onNextStep } from '../../../../utils';
import LandCodes from '../components/LandCodes';

type Values = {
  firstStepFamily: {
    name: string,
    lastName: string,
  },
  secondStepFamily: {
    email: string,
    password: string,
    terms: boolean,
  },
  thirdStepFamily: {
    postalCode: string,
    streetNumber: string,
    phone: string,
    landCode: string,
  },
};

type Error = {
  thirdStepFamily?: {
    postalCode?: string,
    streetNumber?: string,
    phone?: string,
    landCode?: string,
  },
};

type Props = {
  next: Function,
  values: Values,
  handleChange: Function,
  previous: Function,
  errors: Error,
  setErrors: Function,
  touched: Object,
  handleBlur: Function,
  setTouched: Function,
  setFieldValue: Function,
  setFieldTouched: Function,
};

type State = {
  landCodes: Array<{
    key: string,
    value: string,
    text: string,
  }>,
};

export default class ThirdStep extends React.PureComponent<Props, State> {
  state = {
    landCodes: [
      { key: 'NL', text: 'NL (+31)', value: '31' },
      { key: 'US', text: 'US (+1)', value: '1' },
      { key: 'GB', text: 'GB (+44)', value: '44' },
    ],
    errorMessages: null,
    streetNumberError: false,
    isLoading: false,
  };

  setAnalytics = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSignUpPostalcode');
    }
  };

  onHouseNumberBlur = handleBlur => e => {
    e.persist();
    this.setState({ isLoading: true }, () => {
      API.validate({
        street_number: e.target.value,
      })
        .then(res => {
          this.setState(
            {
              errorMessages: null,
              streetNumberError: false,
              isLoading: false,
            },
            () => {
              handleBlur(e);
            }
          );
        })
        .catch(err => {
          this.setState({
            errorMessages: err.response.data.message.street_number,
            streetNumberError: true,
            isLoading: false,
          });
        });
    });
  };

  static defaultProps = {
    next: () => {},
    values: {
      firstStepFamily: {
        name: '',
        lastName: '',
      },
      secondStepFamily: {
        email: '',
        password: '',
        terms: false,
      },
      thirdStepFamily: {
        postalCode: '',
        streetNumber: '',
        landCode: '31',
        phone: '',
      },
      fourthStepFamily: {
        children: [],
      },
    },
    handleChange: () => {},
    setFieldValue: () => {},
    setFieldTouched: () => {},
  };

  isFullPhoneNotValid(values: Object) {
    const phone = parsePhoneNumberFromString(
      `+${values.thirdStepFamily.landCode}${values.thirdStepFamily.phone}`
    );
    if (phone) {
      return !phone.isValid();
    }
  }

  loadMoreAndSearch = (
    values: Array<{
      key: string,
      value: string,
      text: string,
    }>,
    data: string
  ) => {
    if (this.state.landCodes.length === 3) {
      import('../country.json').then(r => {
        this.setState({
          landCodes: r,
        });
      });
    }
    return values.filter(value => {
      return (
        value.text.toLowerCase().includes(data) || value.text.includes(data)
      );
    });
  };

  render() {
    const {
      setErrors,
      setTouched,
      next,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      initPostalCodeCheck,
      postalCodeInvalid,
      schema,
    } = this.props;

    const { streetNumberError } = this.state;

    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.family.thirdStep.header1" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.family.thirdStep.description1" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.family.thirdStep.postalCode" />
                      </Label>
                      <CustomInput
                        hasError={
                          postalCodeInvalid
                            ? true
                            : errors.thirdStepFamily && touched.thirdStepFamily
                            ? touched.thirdStepFamily.postalCode &&
                              errors.thirdStepFamily.postalCode
                              ? true
                              : false
                            : false
                        }
                        value={values.thirdStepFamily.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="thirdStepFamily.postalCode"
                        type="text"
                        transparent
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepFamily.postalCode"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepFamily &&
                              errors.thirdStepFamily.postalCode}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.family.thirdStep.streetNumber" />
                      </Label>
                      <CustomInput
                        hasError={
                          errors.thirdStepFamily && touched.thirdStepFamily
                            ? touched.thirdStepFamily.streetNumber &&
                              errors.thirdStepFamily.streetNumber
                              ? true
                              : false
                            : false
                        }
                        value={values.thirdStepFamily.streetNumber}
                        onChange={handleChange}
                        onBlur={this.onHouseNumberBlur(handleBlur)}
                        name="thirdStepFamily.streetNumber"
                        type="text"
                        transparent
                        loading={this.state.isLoading}
                      />
                      {this.state.streetNumberError &&
                      this.state.errorMessages.length
                        ? this.state.errorMessages.map((data, i) => (
                            <ErrorMessage key={i}>{data}</ErrorMessage>
                          ))
                        : null}
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepFamily.streetNumber"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepFamily &&
                              errors.thirdStepFamily.streetNumber}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.family.thirdStep.landCode" />
                      </Label>

                      <LandCodes
                        icon={null}
                        search={this.loadMoreAndSearch}
                        basic
                        name="thirdStepFamily.landCode"
                        error={
                          errors.thirdStepFamily && touched.thirdStepFamily
                            ? touched.thirdStepFamily.landCode &&
                              errors.thirdStepFamily.landCode
                              ? true
                              : false
                            : false
                        }
                        fluid
                        onChange={(e, data) => {
                          setFieldValue('thirdStepFamily.landCode', data.value);
                          setFieldTouched('thirdStepFamily.landCode', true);
                        }}
                        value={values.thirdStepFamily.landCode}
                        options={this.state.landCodes}
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepFamily.landCode"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepFamily &&
                              errors.thirdStepFamily.landCode}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Form.Field width={16}>
                      <Label>
                        <FormattedMessage id="signup.family.thirdStep.phone" />
                      </Label>
                      <CustomInput
                        hasError={
                          this.isFullPhoneNotValid(values) &&
                          touched.thirdStepFamily &&
                          touched.thirdStepFamily.phone
                        }
                        placeholder="612345678"
                        value={values.thirdStepFamily.phone}
                        onChange={handleChange}
                        name="thirdStepFamily.phone"
                        type="text"
                        onBlur={handleBlur}
                        transparent
                      />
                      <FieldError
                        additionalCondition={this.isFullPhoneNotValid(values)}
                        additionalConditionErrMsg="Phone is not valid"
                        errors={errors}
                        touched={touched}
                        field="thirdStepFamily.phone"
                        render={additionalConditionErrMsg => (
                          <ErrorMessage>
                            {errors.thirdStepFamily &&
                            errors.thirdStepFamily.phone
                              ? errors.thirdStepFamily.phone
                              : additionalConditionErrMsg &&
                                additionalConditionErrMsg}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              primary
              loading={this.props.isCheckingCode}
              disabled={
                errors.thirdStepFamily ||
                this.props.isCheckingCode ||
                streetNumberError
                  ? true
                  : false
              }
              onClick={onNextStep('thirdStepFamily')({
                schema,
                setErrors,
                setTouched,
                next,
                values,
                additionalCondition:
                  !this.isFullPhoneNotValid(values) && !streetNumberError,
                postalCodeChecking: initPostalCodeCheck,
                callback: this.setAnalytics,
                fields: ['postalCode', 'streetNumber', 'landCode', 'phone'],
              })}
              fluid
            >
              <FormattedMessage id="signup.family.thirdStep.btn" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

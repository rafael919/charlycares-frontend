//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'libphonenumber-js/mobile';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import LandCodes from '../components/LandCodes';
import React, { Component } from 'react';
import API from '../api';

import { onNextStep } from '../../../utils';

type Values = {
  firstStepAngel: {
    name: string,
    lastName: string,
    birthdate: string,
  },
  secondStepAngel: {
    email: string,
    password: string,
    terms: boolean,
  },
  thirdStepAngel: {
    postalCode: string,
    streetNumber: string,
    phone: string,
    landCode: string,
  },
};

type Error = {
  thirdStepAngel?: {
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

export default class ThirdStep extends Component<Props, State> {
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
      window.analytics.track('ASignUpPostalcode');
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
      firstStepAngel: {
        name: '',
        lastName: '',
      },
      secondStepAngel: {
        email: '',
        password: '',
        terms: false,
      },
      thirdStepAngel: {
        postalCode: '',
        streetNumber: '',
        landCode: '31',
        phone: '',
      },
      fourthStepAngel: {
        children: [],
      },
    },
    handleChange: () => {},
    setFieldValue: () => {},
    setFieldTouched: () => {},
  };

  isFullPhoneNotValid(values: Object) {
    const phone = parsePhoneNumberFromString(
      `+${values.thirdStepAngel.landCode}${values.thirdStepAngel.phone}`
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
      previous,
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
      <Layout onNavBack={previous}>
        <CustomRow>
          <Grid.Column width={16}>
            <Header>
              <FormattedMessage id="signup.angel.thirdStep.header1" />
            </Header>
          </Grid.Column>
          <Grid.Column width={16} as="p">
            <FormattedMessage id="signup.angel.thirdStep.description1" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.postalCode" />
                      </Label>
                      <CustomInput
                        hasError={
                          postalCodeInvalid
                            ? true
                            : errors.thirdStepAngel && touched.thirdStepAngel
                            ? touched.thirdStepAngel.postalCode &&
                              errors.thirdStepAngel.postalCode
                              ? true
                              : false
                            : false
                        }
                        value={values.thirdStepAngel.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="thirdStepAngel.postalCode"
                        type="text"
                        transparent
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.postalCode"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                              errors.thirdStepAngel.postalCode}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.streetNumber" />
                      </Label>
                      <CustomInput
                        hasError={
                          errors.thirdStepAngel && touched.thirdStepAngel
                            ? touched.thirdStepAngel.streetNumber &&
                              errors.thirdStepAngel.streetNumber
                              ? true
                              : false
                            : false
                        }
                        value={values.thirdStepAngel.streetNumber}
                        onChange={handleChange}
                        onBlur={this.onHouseNumberBlur(handleBlur)}
                        name="thirdStepAngel.streetNumber"
                        type="text"
                        transparent
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
                        field="thirdStepAngel.streetNumber"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                              errors.thirdStepAngel.streetNumber}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
          <Grid.Column width={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.landCode" />
                      </Label>

                      <LandCodes
                        icon={null}
                        search={this.loadMoreAndSearch}
                        basic
                        name="thirdStepAngel.landCode"
                        error={
                          errors.thirdStepAngel && touched.thirdStepAngel
                            ? touched.thirdStepAngel.landCode &&
                              errors.thirdStepAngel.landCode
                              ? true
                              : false
                            : false
                        }
                        fluid
                        onChange={(e, data) => {
                          setFieldValue('thirdStepAngel.landCode', data.value);
                          setFieldTouched('thirdStepAngel.landCode', true);
                        }}
                        value={values.thirdStepAngel.landCode}
                        options={this.state.landCodes}
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.landCode"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                              errors.thirdStepAngel.landCode}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Form.Field width={16}>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.phone" />
                      </Label>
                      <CustomInput
                        hasError={
                          this.isFullPhoneNotValid(values) &&
                          touched.thirdStepAngel &&
                          touched.thirdStepAngel.phone
                        }
                        value={values.thirdStepAngel.phone}
                        onChange={handleChange}
                        name="thirdStepAngel.phone"
                        type="text"
                        placeholder="612345678"
                        onBlur={handleBlur}
                        transparent
                      />
                      <FieldError
                        additionalCondition={this.isFullPhoneNotValid(values)}
                        additionalConditionErrMsg="Phone is not valid"
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.phone"
                        render={additionalConditionErrMsg => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                            errors.thirdStepAngel.phone
                              ? errors.thirdStepAngel.phone
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
        </CustomRow>
        <Grid.Row verticalAlign="middle">
          <CustomColumn width={16}>
            <BasicButton
              fluid
              primary
              loading={this.props.isCheckingCode}
              disabled={
                errors.thirdStepAngel ||
                this.props.isCheckingCode ||
                this.isFullPhoneNotValid(values) ||
                streetNumberError
                  ? true
                  : false
              }
              onClick={onNextStep('thirdStepAngel')({
                schema,
                setErrors,
                setTouched,
                next,
                values,
                callback: this.setAnalytics,
                additionalCondition:
                  !this.isFullPhoneNotValid(values) && !streetNumberError,
                postalCodeChecking: initPostalCodeCheck,
                fields: ['postalCode', 'streetNumber', 'landCode', 'phone'],
              })}
            >
              <FormattedMessage id="signup.angel.thirdStep.btn" />
            </BasicButton>
          </CustomColumn>
        </Grid.Row>
      </Layout>
    );
  }
}

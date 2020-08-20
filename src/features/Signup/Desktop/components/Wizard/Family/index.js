//@flow

import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import API from '../api';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import { FirstStepFamily } from '../../FirstStep';
import { FourthStepFamily } from '../../FourthStep';
import { getAuthStatus } from '../../../../../../data/auth/selectors';
import { onFamilySignupReq } from '../../../../../../data/user/actions';
import { SecondStepFamily } from '../../SecondStep';
import { ThirdStepFamily } from '../../ThirdStep';
import LanguageSelectionStep from '../../LanguageSelectionStep';
import type { PayloadFamily } from '../../../../../data/user/actions';
import OutsideService from '../../OutsideService';
import { getLocale } from 'Utils';

type Props = {
  onBack: Function,
  onSignup: Function,
  errorReset: Function,
  isLoading: boolean,
  apiErrors: Object,
  authenticated: boolean,
  history: Object,
  user: string,
  facebookData: {
    first_name: string,
    last_name: string,
    email: string,
    locale: string,
    gender: string,
  },
};

let initialValues = {
  firstStepFamily: {
    name: '',
    lastName: '',
  },
  secondStepFamily: {
    email: '',
    password: '',
    terms: false,
    privacy: false,
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
  fourthBStepFamily: {
    languages: {
      dutch: false,
      english: false,
      french: false,
      german: false,
      spanish: false,
      italian: false,
    },
  },
};

class FamilyEmailSignupWizard extends Component<Props> {
  static defaultProps = {
    onBack: () => {},
    locale: getLocale() === 'nl' ? 'nl_NL' : 'en_GB',
  };

  state = {
    isLoading: false,
    city: null,
    schema: null,
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

  onFormSubmit = ({
    firstStepFamily,
    secondStepFamily,
    thirdStepFamily,
    fourthStepFamily,
    fourthBStepFamily,
  }): void => {
    const data: PayloadFamily = {
      locale: this.props.locale,
      email: secondStepFamily.email,
      password: secondStepFamily.password,
      password_confirmation: secondStepFamily.password,
      postalcode: thirdStepFamily.postalCode,
      phone: thirdStepFamily.landCode + thirdStepFamily.phone,
      first_name: firstStepFamily.name,
      last_name: firstStepFamily.lastName,
      street_number: thirdStepFamily.streetNumber,
      city: 'Amsterdam',
      street_name: 'Wijde Kapelsteeg',
      gender: this.props.facebookData
        ? this.props.facebookData.gender
        : 'female',
      confirmation_link:
        'https://app.charlycares.com/#/angels-signup/step4/{confirmation_link}',
      kids: fourthStepFamily.children.map(child => {
        return child.birthDate;
      }),
      languages: fourthBStepFamily.languages,
      referral: this.props.referralData,
    };

    this.props.onSignup(data);
  };

  checkIsCityInServiceRange = (values, push, next) => {
    // if city not in range push to out of service screen
    API.checkPostalCode({
      postalcode: values.thirdStepFamily.postalCode,
    })
      .then(res => {
        this.setState({
          isLoading: false,
        });
        if (res.data && res.data.active === false) {
          this.onFormSubmit({ ...values, postalcode: false });
          return push('outsideService');
        } else {
          next();
        }
      })
      .catch(err => {
        this.setState({
          postalCodeInvalid: true,
          isLoading: false,
        });
      });
  };

  initPostalCodeCheck = (values, push, next) => () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.checkIsCityInServiceRange(values, push, next);
      }
    );
  };
  render() {
    if (this.props.authenticated === true) {
      return <Redirect to="/how-it-works" />;
    }

    if (this.state.schema) {
      return (
        <Formik
          validationSchema={this.state.schema.default}
          initialValues={initialValues}
          onSubmit={this.onFormSubmit}
          render={({
            values,
            handleChange,
            errors,
            touched,
            setErrors,
            handleBlur,
            setTouched,
            setFieldValue,
            submitForm,
            setFieldError,
            setFieldTouched,
          }) => {
            return (
              <Wizard
                render={({ step, replace, push }) => (
                  <TransitionGroup component={null}>
                    <CSSTransition
                      mountOnEnter={true}
                      unmountOnExit={true}
                      classNames="fade"
                      key={step.id}
                      timeout={{
                        enter: 200,
                        exit: 0,
                      }}
                    >
                      <Steps>
                        <Step
                          id="firstStep"
                          render={({ next }) => (
                            <FirstStepFamily
                              handleChange={handleChange}
                              values={values}
                              next={next}
                              previous={this.props.onBack}
                              setErrors={setErrors}
                              errors={errors}
                              touched={touched}
                              handleBlur={handleBlur}
                              setTouched={setTouched}
                              schema={this.state.schema.firstStepFamily}
                            />
                          )}
                        />
                        <Step
                          id="secondStep"
                          render={({ next, previous }) => (
                            <SecondStepFamily
                              handleChange={handleChange}
                              values={values}
                              next={next}
                              previous={previous}
                              setErrors={setErrors}
                              errors={errors}
                              touched={touched}
                              handleBlur={handleBlur}
                              setTouched={setTouched}
                              schema={this.state.schema.secondStepFamily}
                            />
                          )}
                        />
                        <Step
                          id="thirdStep"
                          render={({ next, previous }) => (
                            <ThirdStepFamily
                              handleChange={handleChange}
                              values={values}
                              next={next}
                              previous={previous}
                              setErrors={setErrors}
                              errors={errors}
                              touched={touched}
                              handleBlur={handleBlur}
                              setTouched={setTouched}
                              setFieldError={setFieldError}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              postalCodeInvalid={this.state.postalCodeInvalid}
                              initPostalCodeCheck={this.initPostalCodeCheck(
                                values,
                                push,
                                next
                              )}
                              isCheckingCode={this.state.isLoading}
                              schema={this.state.schema.thirdStepFamily}
                            />
                          )}
                        />
                        <Step
                          id="fourthStep"
                          render={({ next, previous }) => (
                            <FourthStepFamily
                              handleChange={handleChange}
                              values={values}
                              next={next}
                              previous={previous}
                              setErrors={setErrors}
                              errors={errors}
                              setFieldValue={setFieldValue}
                              schema={this.state.schema.fourthStepFamily}
                            />
                          )}
                        />
                        <Step
                          id="fourthBStep"
                          render={({ next, previous }) => (
                            <LanguageSelectionStep
                              userRole="family"
                              handleChange={handleChange}
                              values={values}
                              touched={touched}
                              previous={previous}
                              errors={errors}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              submitForm={submitForm}
                            />
                          )}
                        />
                        <Step
                          id="outsideService"
                          render={() => (
                            <OutsideService
                              userRole="family"
                              replaceStep={replace}
                              values={values}
                              city={this.state.city}
                              submitForm={this.onFormSubmit}
                            />
                          )}
                        />
                      </Steps>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            );
          }}
        />
      );
    }
    return null;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  onSignup: data => dispatch(onFamilySignupReq(data)),
});

const mapStateToProps = state => ({
  authenticated: getAuthStatus(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyEmailSignupWizard);

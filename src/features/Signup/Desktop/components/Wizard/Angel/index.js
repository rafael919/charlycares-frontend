//@flow
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import moment from 'moment';
import React, { Component } from 'react';

import { FirstStepAngel } from '../../FirstStep';
import { onAngelSignupReq } from '../../../../../../data/user/actions';
import API from '../api';

// import formSchema from './formSchema';
import { FourthStepAngel } from '../../FourthStep';
import { SecondStepAngel } from '../../SecondStep';
import { ThirdStepAngel } from '../../ThirdStep';
// import FifthStepAngel from '../../FifthStep';
// import SixthStepAngel from '../../SixthStep';
// import SeventhStepAngel from '../../SeventhStep';
// import EighthStepAngel from '../../EighthStep';
import LanguageSelectionStep from '../../LanguageSelectionStep';
import OutsideService from '../../OutsideService';
import type {
  PayloadAngel,
  SignUpReqAngelAction,
} from '../../../../../../data/user/actions';
import { getLocale } from 'Utils';

type Props = {
  onBack: Function,
  onSignup: Function,
  isLoading: boolean,
  apiErrors: Object,
  authenticated: boolean,
  history: Object,
  user: string,
  facebookData: {
    first_name: string,
    last_name: string,
    birthday: string,
    email: string,
    locale: string,
    gender: string,
  },
};

var initialValues = {
  firstStepAngel: {
    name: '',
    lastName: '',
    birthdate: '',
  },
  secondStepAngel: {
    email: '',
    password: '',
    privacy: false,
    terms: false,
  },
  thirdStepAngel: {
    postalCode: '',
    streetNumber: '',
    landCode: '31',
    phone: '',
  },
  fourthStepAngel: {
    education: 'MBO',
    fieldOfStudy: '',
  },
  fourthBStepAngel: {
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

class AngelEmailSignupWizard extends Component<Props> {
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
    firstStepAngel,
    secondStepAngel,
    thirdStepAngel,
    fourthStepAngel,
    fourthBStepAngel,
  }): void => {
    const data: PayloadAngel = {
      locale: this.props.locale,
      email: secondStepAngel.email,
      password: secondStepAngel.password,
      password_confirmation: secondStepAngel.password,
      postalcode: thirdStepAngel.postalCode,
      phone: thirdStepAngel.landCode + thirdStepAngel.phone,
      first_name: firstStepAngel.name,
      last_name: firstStepAngel.lastName,
      street_number: thirdStepAngel.streetNumber,
      city: 'Amsterdam',
      street_name: 'Wijde Kapelsteeg',
      gender: this.props.facebookData
        ? this.props.facebookData.gender
        : 'female',
      confirmation_link:
        'https://app.charlycares.com/#/angels-signup/step4/{confirmation_link}',
      nationality: 'Dutch',
      education: fourthStepAngel.education,
      field_of_study: fourthStepAngel.fieldOfStudy,
      liability_insurance: true,
      driving_licence: true,
      birthdate: moment(firstStepAngel.birthdate, 'DD-MM-YYYY').format(
        'YYYY-MM-DD'
      ),
      languages: fourthBStepAngel.languages,
      referral: this.props.referralData,
    };

    this.props.onSignup(data);
  };

  checkIsCityInServiceRange = (values, push, next) => {
    // if city not in range push to out of service screen
    API.checkPostalCode({
      postalcode: values.thirdStepAngel.postalCode,
    })
      .then(res => {
        this.setState({
          isLoading: false,
          city: res.data.city,
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
                render={({ step, push, replace }) => (
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
                            <FirstStepAngel
                              handleChange={handleChange}
                              values={values}
                              next={next}
                              previous={this.props.onBack}
                              setErrors={setErrors}
                              errors={errors}
                              touched={touched}
                              handleBlur={handleBlur}
                              setTouched={setTouched}
                              setFieldValue={setFieldValue}
                              schema={this.state.schema.firstStepAngel}
                            />
                          )}
                        />
                        <Step
                          id="secondStep"
                          render={({ next, previous }) => (
                            <SecondStepAngel
                              handleChange={handleChange}
                              values={values}
                              next={next}
                              previous={previous}
                              setErrors={setErrors}
                              errors={errors}
                              touched={touched}
                              handleBlur={handleBlur}
                              setTouched={setTouched}
                              schema={this.state.schema.secondStepAngel}
                            />
                          )}
                        />
                        <Step
                          id="thirdStep"
                          render={({ next, previous }) => (
                            <ThirdStepAngel
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
                              initPostalCodeCheck={this.initPostalCodeCheck(
                                values,
                                push,
                                next
                              )}
                              isCheckingCode={this.state.isLoading}
                              postalCodeInvalid={this.state.postalCodeInvalid}
                              schema={this.state.schema.thirdStepAngel}
                            />
                          )}
                        />
                        <Step
                          id="fourthStep"
                          render={({ next, previous }) => (
                            <FourthStepAngel
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              values={values}
                              next={next}
                              previous={previous}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              setFieldError={setFieldError}
                              schema={this.state.schema.fourthStepAngel}
                            />
                          )}
                        />
                        <Step
                          id="fourthBStep"
                          render={({ next, previous }) => (
                            <LanguageSelectionStep
                              userRole="angel"
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              values={values}
                              errors={errors}
                              touched={touched}
                              next={next}
                              previous={previous}
                              submitForm={submitForm}
                            />
                          )}
                        />
                        <Step
                          id="outsideService"
                          render={() => (
                            <OutsideService
                              userRole="angel"
                              city={this.state.city}
                              values={values}
                              replaceStep={replace}
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

const mapDispatchToProps = (dispatch: *) => {
  return {
    onSignup: (data: PayloadAngel): SignUpReqAngelAction => {
      return dispatch(onAngelSignupReq(data));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AngelEmailSignupWizard);

//@flow

import { FormattedMessage, injectIntl } from 'react-intl';
import { Header, Form, Grid } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import Label from 'Components/Label';
import Layout from 'Components/Layout';

import CustomDropDown from '../components/CustomDropDown';

import React, { Component } from 'react';

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
  },
  fourthStepAngel: {
    education: string,
    fieldOfStudy: string,
  },
};

type Props = {
  next: Function,
  values: Values,
  handleChange: Function,
  handleBlur: Function,
  previous: Function,
  onErrorReset: Function,
  submitForm: Function,
  isLoading: boolean,
  errors?: Object,
  intl: Object,
  authenticated: boolean,
  setFieldValue: Function,
  setFieldTouched: Function,
};

class FourthStep extends Component<Props> {
  static defaultProps = {
    next: () => {},
    values: {
      firstStepAngel: {
        name: '',
        lastName: '',
        birthdate: '',
      },
      secondStepAngel: {
        email: '',
        password: '',
        terms: false,
      },
      thirdStepAngel: {
        postalCode: '',
        streetNumber: '',
        landCode: '+31',
        phone: '',
      },
      fourthStepAngel: {
        education: 'MBO',
      },
    },
    handleChange: () => {},
    submitForm: () => {},
    setFieldValue: () => {},
    setFieldTouched: () => {},
  };

  state = {
    educationLevels: [
      { key: 'MBO', text: 'MBO', value: 'MBO' },
      { key: 'HBO', text: 'HBO', value: 'HBO' },
      { key: 'WO', text: 'WO', value: 'WO' },
    ],
  };

  onNext = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('ASignUpEducation');
    }
    this.props.next();
  };

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      previous,
      intl,
      setFieldTouched,
      setFieldValue,
    } = this.props;

    return (
      <Layout onNavBack={previous}>
        <CustomRow>
          <Grid.Column width={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.fourthStep.header" />
            </Header>
          </Grid.Column>
          <Grid.Column width={16} as="p">
            <FormattedMessage id="signup.angel.fourthStep.description" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.fourthStep.education" />
                </Label>
                <CustomDropDown
                  icon={null}
                  search={this.loadMoreAndSearch}
                  basic
                  name="fourthStepAngel.education"
                  fluid
                  onChange={(e, data) => {
                    setFieldValue('fourthStepAngel.education', data.value);
                    setFieldTouched('fourthStepAngel.education', true);
                  }}
                  value={values.fourthStepAngel.education}
                  options={this.state.educationLevels}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.fourthStep.fieldOfStudy" />
                </Label>
                <CustomInput
                  placeholder={intl.formatMessage({
                    id: 'signup.angel.fourthStep.fieldOfStudyPlaceholder',
                  })}
                  type="text"
                  name="fourthStepAngel.fieldOfStudy"
                  value={values.fourthStepAngel.fieldOfStudy}
                  transparent
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </CustomRow>
        <CustomRow verticalAlign="middle">
          <CustomColumn width={16}>
            <BasicButton primary onClick={this.onNext} fluid>
              <FormattedMessage id="signup.angel.fourthStep.btn" />
            </BasicButton>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(FourthStep);

//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Header, List } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import NoPadding from 'Components/NoPadding';
import React, { Component, Fragment } from 'react';
import uniqid from 'uniqid';
import DatePicker from '../components/DatePicker';

import Child from '../components/Child';

type Values = {
  firstStepFamily: {
    name: string,
    lastName: string,
  },
  secondStepFamily: {
    email: string,
    password: string,
  },
  thirdStepFamily: {
    postalCode: string,
    streetNumber: string,
    phone: string,
  },
  fourthStepFamily: {
    children: [
      {
        id: string,
        birthDate: string,
      },
    ],
  },
};

type Props = {
  next: Function,
  values: Values,
  handleChange: Function,
  previous: Function,
  setFieldValue: Function,
  submitForm: Function,
  onErrorReset: Function,
  isLoading: boolean,
  apiErrors?: Object,
};

type State = {
  selectedBirthDate: string,
};

class FourthStep extends Component<Props, State> {
  birthDate: ?HTMLInputElement;

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
        landCode: '+31',
        phone: '',
      },
      fourthStepFamily: {
        children: [],
      },
    },
    handleChange: () => {},
    submitForm: () => {},
  };

  state = {
    selectedBirthDate: '',
    pickerOpen: false,
    viewMode: 'years',
  };

  onNext = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSignUpKids');
    }
    this.props.next();
  };

  renderChildren = () => {
    const { fourthStepFamily } = this.props.values;
    return fourthStepFamily.children.map((child, i) => (
      <Child
        key={child.id}
        removeChild={this.removeChild(child.id)}
        date={child.birthDate}
      />
    ));
  };

  removeChild = (id: string) => () => {
    const { fourthStepFamily } = this.props.values;
    const filteredArr = fourthStepFamily.children.filter(
      child => id !== child.id
    );

    this.props.setFieldValue('fourthStepFamily.children', filteredArr);
  };

  onBlur = () => {
    this.setState({ pickerOpen: false, viewMode: 'years' });
  };

  onDateSelect = (time: Object) => {
    const newChild = {
      id: uniqid('id-'),
      birthDate: time.format('YYYY-MM-DD'),
    };

    this.setState({ pickerOpen: false }, () => {
      this.props.setFieldValue('fourthStepFamily.children', [
        ...this.props.values.fourthStepFamily.children,
        newChild,
      ]);
    });
  };

  onPickerOpen = () => {
    this.setState({
      pickerOpen: true,
    });
  };

  render() {
    return (
      <Fragment>
        <DesktopWelcomeLayout withLogo>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Header as="h3">
                <FormattedMessage id="signup.family.fourthStep.header" />
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Paragraph light fontSize="0.9375rem">
                <FormattedMessage id="signup.family.fourthStep.description" />
              </Paragraph>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <List relaxed="very" verticalAlign="middle">
                {this.renderChildren()}
              </List>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column as={NoPadding} computer={8} mobile={16} tablet={16}>
              <div onClick={this.onPickerOpen}>
                <AddBtn
                  padding="0 .78571429em"
                  text={
                    <FormattedMessage id="signup.family.fourthStep.addBtn" />
                  }
                />
              </div>
              {this.state.pickerOpen && (
                <DatePicker
                  viewMode={this.state.viewMode}
                  onChange={this.onDateSelect}
                  pickerOpen={this.state.pickerOpen}
                />
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <BasicButton
                primary
                onClick={this.onNext}
                disabled={
                  this.props.values.fourthStepFamily.children.length === 0
                }
                fluid
              >
                <FormattedMessage id="signup.family.fourthStep.btn" />
              </BasicButton>
            </Grid.Column>
          </Grid.Row>
        </DesktopWelcomeLayout>
      </Fragment>
    );
  }
}

export default FourthStep;

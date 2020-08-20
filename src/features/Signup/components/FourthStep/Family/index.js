//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Header, List } from 'semantic-ui-react';
import AddBtn from 'Components/Buttons/AddBtn';
import TextButton from 'Components/Buttons/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import uniqid from 'uniqid';
import { isIOS } from 'react-device-detect';
import styled from 'styled-components';
import Confirmation from 'Components/Confirmation';

import Child from '../components/Child';
import DateInput from '../components/DateInput';

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

const ButtonContainer = styled.div`
  width: ${props => props.width};
  display: inline-block;
`

const Container = styled.div`

`;

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

  onAddChild = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (!e.target.value.length) return;
    const newChild = {
      id: uniqid('id-'),
      birthDate: this.state.selectedBirthDate,
    };
    this.props.setFieldValue('fourthStepFamily.children', [
      ...this.props.values.fourthStepFamily.children,
      newChild,
    ]);
    this.setState(prevState => {
      return {
        selectedBirthDate: '',
      };
    });
  };


  onAddChildAndroid = () => {
    const newChild = {
      id: uniqid('id-'),
      birthDate: this.state.selectedBirthDate,
    };
    this.props.setFieldValue('fourthStepFamily.children', [
      ...this.props.values.fourthStepFamily.children,
      newChild,
    ]);
    this.setState(prevState => {
      return {
        selectedBirthDate: '',
      };
    });
  };


  onDateSelect = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.value || !e.target.value.length) return;
    if (isIOS) {
      this.setState({
        selectedBirthDate: e.target.value,
      });
    } else {
      this.setState(
        {
          selectedBirthDate: e.target.value,
        },
        () => {
          this.onAddChildAndroid();
        }
      );
    }
  };

  onNext = () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSignUpKids');
    }
    this.props.next();
  };

  render() {
    return (
      <Layout 
        onNavBack={this.props.previous}
        navRightComponent={() => {return('1/4')}}
      >
        <CustomRow>
          <CustomColumn width={16}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" style={{lineHeight: '2rem'}}>
                    <FormattedMessage id="signup.family.fourthStep.header" /> <br />
                    <FormattedMessage id="signup.family.fourthStep.secondHeader" />
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <List relaxed="very" verticalAlign="middle">
                    {this.renderChildren()}
                  </List>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <AddBtn
                  as="label"
                  htmlFor="birthdate"
                  padding="0 .78571429em"
                  text={
                    <FormattedMessage id="signup.family.fourthStep.addBtn" />
                  }
                >
                  <DateInput
                    value={this.state.selectedBirthDate}
                    onChange={this.onDateSelect}
                    onBlur={this.onAddChild}
                  />
                </AddBtn>
              </Grid.Row>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <Container>
            <ButtonContainer width={'45%'}>
              <TextButton
                disabled={true}
              >
                <FormattedMessage id="profile.family.complete.skip" />
              </TextButton>
            </ButtonContainer>
            <ButtonContainer width={'55%'}>
              <BasicButton
                primary
                onClick={this.onNext}
                disabled={this.props.values.fourthStepFamily.children.length === 0}
              >
                <FormattedMessage id="signup.family.fourthStep.btn" />
              </BasicButton>
            </ButtonContainer>
          </Container>
        </Confirmation>
      </Layout>
    );
  }
}

export default FourthStep;

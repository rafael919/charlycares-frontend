import React, { Component } from 'react';
import styled from 'styled-components';
import { Dropdown, Form } from 'semantic-ui-react';
import CustomInput from 'Components/CustomInput';
import BasicButton from 'Components/Buttons/Basic';
import Label from 'Components/Label';
import { FormattedMessage } from 'react-intl';

export default class PhoneNumberAdd extends Component {
  state = {
    landCodes: [
      { key: 'NL', text: 'NL (+31)', value: '31' },
      { key: 'US', text: 'US (+1)', value: '1' },
      { key: 'GB', text: 'GB (+44)', value: '44' },
    ],
    countryCode: '31',
    phoneNumber: '',
  };

  loadMoreAndSearch = (
    values: Array<{
      key: string,
      value: string,
      text: string,
    }>,
    data: string
  ) => {
    if (this.state.landCodes.length === 3) {
      import('../../../../Signup/components/ThirdStep/country.json').then(r => {
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

  setValue = (field, e) => {
    console.log(field, e);
    this.setState({
      [field]: e.target.value,
    });
  };

  submitPhoneNumber = () => {
    const phoneNumber = this.state.countryCode + this.state.phoneNumber;
    this.setState({
      phoneNumber: '',
    });
    this.props.onAddPhone(phoneNumber);
  };

  render() {
    return (
      <Container>
        <Row>
          <Form.Field>
            <Label>
              <FormattedMessage id="profile.family.edit.country" />
            </Label>
            <CountryCode
              icon={null}
              search={this.loadMoreAndSearch}
              basic
              name="thirdStepFamily.landCode"
              fluid
              value={'31'}
              options={this.state.landCodes}
              type="text"
              onChange={e => this.setValue('countryCode', e)}
            />
          </Form.Field>
          <Form.Field style={{ marginLeft: '1rem', width: '70%' }}>
            <Label>
              <FormattedMessage id="profile.family.edit.phone" />
            </Label>
            <CustomInput
              style={{ width: '100%' }}
              type="text"
              transparent
              placeholder="612345678"
              onChange={e => this.setValue('phoneNumber', e)}
            />
          </Form.Field>
        </Row>

        <Row style={{ marginTop: '1rem' }}>
          <CancelButton onClick={this.props.closeAddSecondPhone}>
            <FormattedMessage id="profile.family.edit.cancel" />
          </CancelButton>
          <BasicButton
            disabled={this.state.phoneNumber.length < 9}
            primary
            onClick={this.submitPhoneNumber}
          >
            <FormattedMessage id="profile.family.edit.confirm" />
          </BasicButton>
        </Row>
      </Container>
    );
  }
}

const CancelButton = styled.div`
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.secondaryColor};
`;
const Row = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Container = styled.div`
  display: inline-block;
`;

const CountryCode = styled(Dropdown)`
  &&& {
    border-bottom: 1px solid #ccc;
    padding: 0.44rem 0.2rem;
  }
`;

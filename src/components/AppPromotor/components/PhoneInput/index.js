import { Form, Grid } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import CustomInput from 'Components/CustomInput';
import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import LandCodes from 'Components/LandCodes';

const ButtonsContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

const PhoneDesc = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
  text-align: left;
  color: ${props => props.theme.lightGrey};
  margin-bottom: 0.5rem;
`;

const Container = styled.div`
  padding-bottom: 1.25rem;
  margin-top: 2rem;
`;

class AddNewPhone extends React.Component {
  state = {
    landCodes: [
      { key: 'NL', text: 'NL (+31)', value: '31' },
      { key: 'US', text: 'US (+1)', value: '1' },
      { key: 'GB', text: 'GB (+44)', value: '44' },
    ],
  };

  loadMoreAndSearch = (values, data) => {
    if (this.state.landCodes.length === 3) {
      import('../../../../features/Signup/components/ThirdStep/country.json').then(
        r => {
          this.setState({
            landCodes: r,
          });
        }
      );
    }
    return values.filter(value => {
      return (
        value.text.toLowerCase().includes(data) || value.text.includes(data)
      );
    });
  };
  render() {
    const {
      onChangePhoneNumber,
      country,
      phone,
      onSend,
    } = this.props;

    return (
      <Container>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <Form.Field>
                  <PhoneDesc>
                    <FormattedMessage id="promotor.country" />
                  </PhoneDesc>
                  <LandCodes
                    icon={null}
                    search={this.loadMoreAndSearch}
                    basic
                    name="country"
                    fluid
                    onChange={onChangePhoneNumber}
                    options={this.state.landCodes}
                    value={country}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={10}>
                <Form.Field>
                  <PhoneDesc>
                    <FormattedMessage id="promotor.phoneNumber" />
                  </PhoneDesc>
                  <CustomInput
                    value={phone}
                    onChange={onChangePhoneNumber}
                    name="phone"
                    type="text"
                    transparent
                    padding={"0.4rem 0.2rem 0rem !important;"}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <ButtonsContainer>
                <BasicButton
                  disabled={!phone.length ? true : false}
                  onClick={onSend}
                  primary
                  fluid
                >
                  <FormattedMessage id="promotor.sendSms" />
                </BasicButton>
              </ButtonsContainer>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

export default AddNewPhone;

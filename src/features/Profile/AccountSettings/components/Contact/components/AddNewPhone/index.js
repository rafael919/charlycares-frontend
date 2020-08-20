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

const CancelButton = styled.button`
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 1rem;
  background: transparent;
  border: none;
  &:focus {
    outline: 0;
  }
`;

const PhoneDesc = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
`;

const Container = styled.div`
  padding-bottom: 1.25rem;
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
      import('../../../../../../Signup/components/ThirdStep/country.json').then(
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
      onAddPhoneCancel,
      onAngelEditPhone,
      country,
      phone,
      onAngelAddNumber,
    } = this.props;

    return (
      <Container>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <PhoneDesc>
                    <FormattedMessage id="profile.family.contact.country" />
                  </PhoneDesc>
                  <LandCodes
                    icon={null}
                    search={this.loadMoreAndSearch}
                    basic
                    name="country"
                    fluid
                    onChange={onAngelEditPhone}
                    options={this.state.landCodes}
                    value={country}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <PhoneDesc>
                    <FormattedMessage id="profile.family.contact.phoneNumber" />
                  </PhoneDesc>
                  <CustomInput
                    value={phone}
                    onChange={onAngelEditPhone}
                    name="phone"
                    type="text"
                    transparent
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <ButtonsContainer>
                <CancelButton onClick={onAddPhoneCancel}>
                  <FormattedMessage id="profile.family.contact.cancel" />
                </CancelButton>
                <BasicButton
                  disabled={!phone.length ? true : false}
                  onClick={onAngelAddNumber}
                  primary
                >
                  <FormattedMessage id="profile.family.contact.addNumber" />
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

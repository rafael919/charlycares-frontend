import { Form, Grid } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import CustomInput from 'Components/CustomInput';
import React from 'react';
import styled from 'styled-components';
import ErrorMessage from 'Components/ErrorMessage';

const AddressTitle = styled.h2`
  font-size: 1rem;
`;

const PhoneDesc = styled.div`
  font-weight: 300;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.lightGrey};
`;

const Container = styled.div`
  padding-top: 1.25rem;
`;

class AddNewAddress extends React.Component {
  state = {
    error: false,
  };

  onPostalCodeBlur = e => {
    e.persist();
    this.setState(state => {
      if (e.target.value.match(/^\d{4}[A-Za-z]{2}$/)) {
        return {
          ...state,
          error: false,
        };
      }
      return {
        ...state,
        error: true,
      };
    });
  };

  render() {
    const {
      onAddressChange,
      postalCode,
      streetNumber,
    } = this.props;

    return (
      <Container>
        <AddressTitle>
          <FormattedMessage id="profile.family.contact.cityAddress" />
        </AddressTitle>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <PhoneDesc>
                    <FormattedMessage id="profile.family.contact.postalCode" />
                  </PhoneDesc>
                  <CustomInput
                    value={postalCode}
                    onChange={onAddressChange}
                    onBlur={this.onPostalCodeBlur}
                    name="postalCode"
                    type="text"
                    transparent
                  />
                  {this.state.error ? (
                    <ErrorMessage>
                      <FormattedMessage id="profile.family.contact.postalCodeError" />
                    </ErrorMessage>
                  ) : null}
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <PhoneDesc>
                    <FormattedMessage id="profile.family.contact.streetNumber" />
                  </PhoneDesc>
                  <CustomInput
                    value={streetNumber}
                    onChange={onAddressChange}
                    name="streetNumber"
                    type="text"
                    transparent
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

export default AddNewAddress;

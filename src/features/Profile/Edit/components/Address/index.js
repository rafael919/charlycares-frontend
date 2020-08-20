import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';
import ErrorMessage from 'Components/ErrorMessage';
import API from '../../api';
import { Loader } from 'semantic-ui-react';

import homeIcon from 'Assets/icons/icn-feature-house.svg';

import EditButton from '../../../components/EditButton';

class Address extends React.PureComponent {
  state = {
    isPostalCodeEdited: false,
    streetNumberError: false,
    errorMessages: null,
    isLoading: false,
  };

  postalCodeInput = React.createRef();

  onAddressEdit = () => {
    this.setState(
      {
        isAddressEdited: true,
      },
      () => {
        this.postalCodeInput.current.focus();
      }
    );
  };

  onHouseNumberBlur = e => {
    e.persist();
    this.setState({ isLoading: true }, () => {
      API.validate({
        street_number: e.target.value,
      })
        .then(res => {
          this.setState({
            errorMessages: null,
            streetNumberError: false,
            isAddressEdited: false,
            isLoading: false,
          });
        })
        .catch(err => {
          this.setState(
            {
              errorMessages: err.response.data.message.street_number,
              streetNumberError: true,
              isLoading: false,
            },
            this.props.onTouchReset
          );
        });
    });
  };

  render() {
    const {
      address,
      city,
      onAddressChange,
      postalcode,
      street_number,
    } = this.props;
    return (
      <Container>
        <Heading>
          <FormattedMessage id="profile.family.edit.address" />
        </Heading>
        {this.state.isAddressEdited ? (
          <div>
            <AddressContainer>
              <div>
                <InputContainer style={{ width: '50%' }}>
                  <AddressTitle>
                    <FormattedMessage id="profile.family.edit.postalCode" />
                  </AddressTitle>
                  <Postalcode
                    innerRef={this.postalCodeInput}
                    disabled={!this.state.isAddressEdited}
                    onChange={onAddressChange('postalcode')}
                    value={postalcode}
                  />
                </InputContainer>
                <InputContainer style={{ width: '40%', marginLeft: '0.5rem' }}>
                  <AddressTitle>
                    <FormattedMessage id="profile.family.edit.houseNumber" />
                  </AddressTitle>
                  <HouseNumber
                    onBlur={this.onHouseNumberBlur}
                    disabled={!this.state.isAddressEdited}
                    onChange={onAddressChange('street_number')}
                    value={street_number}
                  />
                  {this.state.isLoading ? (
                    <CustomLoader size="small" active />
                  ) : null}
                </InputContainer>
                {this.state.streetNumberError && this.state.errorMessages.length
                  ? this.state.errorMessages.map((err, i) => (
                      <ErrorMessage key={i}>{err}</ErrorMessage>
                    ))
                  : null}
              </div>
            </AddressContainer>
            <AddressContainer>
              <Icon src={homeIcon} style={{ marginTop: '1rem' }} />
              <AddressTitlePlaceholder>
                Address will be fetched
              </AddressTitlePlaceholder>
            </AddressContainer>
          </div>
        ) : null}
        {!this.state.isAddressEdited ? (
          <AddressContainer>
            <Icon src={homeIcon} />
            <FixedContainer>
              <Streetname>{address}</Streetname>
              <City>{city}</City>
            </FixedContainer>
            <EditButton onClick={this.onAddressEdit} />
          </AddressContainer>
        ) : null}
      </Container>
    );
  }
}

const Streetname = styled.h4`
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 1rem;
  width: 90%;
`;

const AddressTitlePlaceholder = styled.h5`
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.grey};
  font-weight: 300;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem !important;
`;

const FixedContainer = styled.div`
  width: 90%;
`;
const City = styled.h4`
  margin-top: 0.275rem;
  font-size: 0.75rem;
`;

const Container = styled.div`
  padding: ${isMobile ? '1.25rem 1rem 1.25rem' : '1.25rem 0 1.25rem'};
`;

const Heading = styled.h2`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
`;

const AddressTitle = styled.h5`
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.grey};
  font-weight: 300;
  font-size: 0.75rem;
`;

const InputContainer = styled.div`
  display: inline-block;
  border-bottom: ${props => props.theme.defaultGrey + ' 1px solid'};
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;

const CustomLoader = styled(Loader)`
  &&& {
    position: absolute;
    left: unset;
    right: -0.25rem;
    top: 70%;
  }
`;

const Postalcode = styled.input`
  font-family: ${props => props.theme.secondaryFont};
  font-size: 0.9375rem;
  border: 0;
  padding-bottom: 0.5rem;
  caret-color: #000;

  &:focus {
    outline: 0;
  }
`;

const HouseNumber = styled.input`
  font-family: ${props => props.theme.secondaryFont};
  font-size: 0.9375rem;
  border: 0;
  padding-bottom: 0.5rem;
  caret-color: #000;

  &:focus {
    outline: 0;
  }
`;

export default Address;

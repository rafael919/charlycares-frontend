import { connect } from 'react-redux';
import { AngelTabBar, FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { parseNumber } from 'libphonenumber-js';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import pick from 'ramda/es/pick';
import React, { Component } from 'react';
import * as yup from 'yup';

import {
  getUser,
  getUserSettings,
  getUserProfile,
  getMembershipData,
  getUserRole,
} from './selectors';

import {
  getToken
} from '../../../data/auth/selectors';

import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onLogout } from '../../../data/auth/actions';
import { onSettingsUpdate, onFBInfoUpdate } from './actions';
import Contact from './components/Contact';
import Credentials from './components/Credentials';
import LogoutBtn from './components/LogoutBtn';
import PaymentMethod from './components/PaymentMethod';
import RdyButton from '../components/RdyButton';
import SettingsSection from './components/SettingsSection';
import { isValidIBAN } from 'Utils';
import NoPushNotificationsSection from './components/NoPushNotificationsSection';

class AccountSettings extends Component {
  static defaultProps = {
    settings: {},
    membershipData: {},
    profile: {},
  };

  ibanInput = React.createRef();

  initialState = {
    email: {
      edited: false,
      value: this.props.user.email,
      valid: true,
      error: null,
    },
    password: {
      edited: false,
      value: 'aaaaaaaaaaaaa',
    },
    country: '31',
    isIBANEdited: false,
    isIBANValid: true,
    iban: this.props.profile.account_number,
    phone: this.props.profile.phone,
    isPhoneEdited: false,
    isCityEdited: false,
    isStreetAddressEdited: false,
    initialSecondPhone: this.props.profile.second_phone,
    secondPhone: this.props.profile.second_phone,
    isSecondPhoneValid: true,
    isAddressEdited: false,
    addSecondPhone: false,
    emailPromo: this.props.settings.promo_mail === 1 ? true : false,
    emailSystem: this.props.settings.system_mail === 1 ? true : false,
    pushPromo: this.props.settings.promo_push === 1 ? true : false,
    pushSystem: this.props.settings.system_push === 1 ? true : false,
    settingsTouched: false,
    FBError: false,
    city: `${this.setPostalCodeLetterSpacing(this.props.profile.postalcode)}, ${
      this.props.profile.city
    }`,
    streetAddress: `${this.props.profile.street_name} ${
      this.props.profile.street_number
    }`,
    postalCode: '',
    streetNumber: '',
  };
  state = this.initialState;

  emailInput = React.createRef();
  passwordInput = React.createRef();
  phoneInput = React.createRef();
  addressInput = React.createRef();

  componentDidMount() {
    window.scrollTo(0, 0);
    if(this.props.history.location.state && this.props.history.location.state.from === 'push-settings') {
      document
        .querySelector('#noPush')
        .scrollIntoView();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.profile && this.props.profile !== prevProps.profile) {
      this.setState({
        city: `${this.setPostalCodeLetterSpacing(
          this.props.profile.postalcode
        )}, ${this.props.profile.city}`,
        streetAddress: `${this.props.profile.street_name} ${
          this.props.profile.street_number
        }`,
      });
    }
  }

  onCredentialsChange = type => e => {
    e.persist();
    this.setState(prevState => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          edited: true,
          value: e.target.value,
        },
        settingsTouched: true,
      };
    });
  };

  setPostalCodeLetterSpacing(postalCode) {
    const numbers = postalCode.slice(0, 4);
    const letters = postalCode.slice(-2);
    return `${numbers} ${letters}`;
  }

  validateCredentials = (type, yupObj) => {
    yupObj
      .validate(this.state[type].value)
      .then(res => {
        this.setState(prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              edited: false,
              valid: true,
              error: null,
            },
          };
        });
      })
      .catch(err => {
        this.setState(prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              edited: true,
              valid: false,
              error: err.message,
            },
            settingsTouched: false,
          };
        });
      });
  };

  onCredentialsFocusOut = type => () => {
    if (type === 'email') {
      const emailString = yup.string().email();
      this.validateCredentials(type, emailString);
    } else {
      const passwordString = yup.string().min(6);
      this.validateCredentials(type, passwordString);
    }
  };

  onCredentialsEdit = type => () => {
    const input = `${type}Input`;

    if (type === 'password') {
      this.setState(
        prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              value: '',
              edited: true,
            },
          };
        },
        () => {
          this[input].current.focus();
        }
      );
    } else {
      this.setState(
        prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              edited: true,
            },
          };
        },
        () => {
          this[input].current.focus();
        }
      );
    }
  };

  onInputsChange = type => e => {
    e.persist();
    this.setState(prevState => {
      return {
        ...prevState,
        [type]: e.target.value,
        settingsTouched: true,
      };
    });
  };

  onAddPhone = phoneNumber => {
    if (this.state.phone.length > 0) {
      this.setState(prevState => ({
        ...prevState,
        addSecondPhone: false,
        secondPhone: phoneNumber,
        settingsTouched: true,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        phone: phoneNumber,
        settingsTouched: true,
      }));
    }
  };

  onRemovePhone = () => {
    if (this.state.secondPhone && this.state.secondPhone.length > 0) {
      this.setState(prevState => ({
        ...prevState,
        phone: this.state.secondPhone,
      }));
      this.onRemoveSecondPhone();
    } else {
      this.setState(prevState => ({
        ...prevState,
        phone: '',
        settingsTouched: true,
      }));
    }
  };

  onAngelRemovePhone = () => {
    this.setState(prevState => ({
      ...prevState,
      phone: '',
      settingsTouched: true,
    }));
  };

  onAngelAddPhone = () => {
    this.setState(state => ({
      ...state,
      isPhoneEdited: !state.isPhoneEdited,
    }));
  };

  onAngelAddNumber = () => {
    this.setState(state => {
      return {
        ...state,
        phone: `+${state.country}${state.phone}`,
        isPhoneEdited: false,
      };
    });
  };

  onAngelEditPhone = (e, data) => {
    this.setState(state => {
      if (data.name === 'country') {
        return {
          ...state,
          country: data.value,
        };
      } else {
        return {
          ...state,
          phone: data.value,
        };
      }
    });
  };

  onRemoveSecondPhone = () => {
    this.setState(prevState => ({
      ...prevState,
      secondPhone: '',
      addSecondPhone: false,
      settingsTouched: true,
      initialSecondPhone: '',
    }));
  };

  openSecondPhone = () => {
    this.setState(prevState => ({
      ...prevState,
      addSecondPhone: true,
    }));
  };

  closeAddSecondPhone = () => {
    this.setState(prevState => ({
      ...prevState,
      addSecondPhone: false,
    }));
  };

  onSecondPhoneFocusOut = () => {
    const parsedNum = parseNumber(this.state.secondPhone);
    if (!Object.keys(parsedNum).length) {
      this.setState({
        isSecondPhoneValid: false,
        settingsTouched: false,
      });
    } else {
      this.setState({
        isSecondPhoneValid: true,
        settingsTouched: true,
      });
    }
  };

  onSettingsChange = type => e => {
    e.persist();
    this.setState(prevState => {
      return {
        ...prevState,
        [type]: Boolean(e.target.checked),
        settingsTouched: true,
      };
    });
  };

  onProfileUpdate = () => {
    let payload = {};
    const filteredState = pick(
      [
        'phone',
        'secondPhone',
        'city',
        'emailPromo',
        'emailSystem',
        'pushPromo',
        'pushSystem',
        'email',
        'password',
        'iban',
        'postalCode',
        'streetNumber',
      ],
      this.state
    );
    for (let prop in filteredState) {
      if (prop === 'email' || prop === 'password') {
        if (this.initialState[prop].value !== filteredState[prop].value) {
          payload[prop] = filteredState[prop].value;
        }
      } else {
        if (this.initialState[prop] !== filteredState[prop]) {
          if (prop === 'secondPhone') {
            payload['second_phone'] = filteredState[prop].replace(/\+/g, '');
          } else {
            if (prop === 'postalCode') {
              payload['postalcode'] = filteredState[prop];
            } else if (prop === 'streetNumber') {
              payload['street_number'] = filteredState[prop];
            } else {
              payload[prop] = filteredState[prop];
            }
          }
        }
        if (prop === 'emailPromo') {
          payload['promo_mail'] = filteredState[prop];
        }
        if (prop === 'phone') {
          payload['phone'] = filteredState[prop].slice(1);
        }
        if (prop === 'emailPromo') {
          payload['promo_mail'] = filteredState[prop];
        }
        if (prop === 'emailSystem') {
          payload['system_mail'] = filteredState[prop];
        }
        if (prop === 'pushPromo') {
          payload['promo_push'] = filteredState[prop];
        }
        if (prop === 'pushSystem') {
          payload['system_push'] = filteredState[prop];
        }
      }
      if (prop === 'iban') {
        payload['account_number'] = filteredState[prop];
      }
    }

    this.setState(
      {
        settingsTouched: false,
        isAddressEdited: false,
        streetNumber: '',
        postalCode: '',
      },
      () => {
        this.props.onSettingsUpdate(payload);
      }
    );
  };

  handleFacebookData = data => {
    if (data.accessToken && data.id) {
      return this.props.onFBInfoUpdate({
        fb_id: data.id,
        fb_token: data.accessToken,
      });
    }
    return this.setState({
      FBError: true,
    });
  };

  onFBConnectFailure = e => {
    this.setState({
      FBError: true,
    });
  };

  onPhoneEdit = () => {
    this.setState(
      {
        isPhoneEdited: true,
      },
      () => {
        this.phoneInput.current.focus();
      }
    );
  };

  onInputsBlur = inputEditState => () => {
    this.setState({
      [inputEditState]: false,
    });
  };

  onIBANChange = e => {
    this.setState({
      iban: e.target.value,
    });
  };

  onIBANEdit = () => {
    this.setState(
      prevState => ({
        ...prevState,
        isIBANEdited: true,
      }),
      () => {
        if (this.state.isIBANEdited) {
          this.ibanInput.current.focus();
        }
      }
    );
  };

  onIBANBlur = () => {
    this.setState(prevState => {
      if (!prevState.iban || !isValidIBAN(prevState.iban)) {
        return {
          isIBANValid: false,
        };
      }
      if (this.initialState.iban !== this.state.iban) {
        return {
          isIBANEdited: false,
          settingsTouched: true,
          isIBANValid: true,
        };
      }
      return {
        isIBANEdited: false,
        isIBANValid: true,
      };
    });
  };

  goToInstructions = () => {
    this.props.history.push('/profile/push-settings')
  };

  onRegisterPush = () => {
    this.setState({
      isLoading: true
    }, () => {
      try {
        var parameters = {
          isLoggedIn: true,
          sessionToken: this.props.token
        };
        window.webkit.messageHandlers.iOS.postMessage(parameters);
      } catch (err) {
        if (typeof window.Android !== 'undefined') {
          window.Android.isLoggedIn(this.props.token);
        }
      }
      setTimeout(() => {
        this.setState({
          hasRegistered: true,
          isLoading: false
        });
      }, 1000);
    })
  };

  onAddressChange = e => {
    e.persist();
    this.setState(state => {
      return {
        ...state,
        settingsTouched: true,
        [e.target.name]: e.target.value,
      };
    });
  };

  onAddressEdit = () => {
    this.setState({ isAddressEdited: true });
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="profile.family.Acc&SettingsNavTitle" />}
        navRightComponent={() => (
          <RdyButton
            onClick={this.onProfileUpdate}
            disabled={!this.state.settingsTouched}
          >
            <FormattedMessage id="save" />
          </RdyButton>
        )}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {(this.props.isLoading || this.state.isLoading) && <Loader />}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Contact
              onInputsBlur={this.onInputsBlur}
              onPhoneEdit={this.onPhoneEdit}
              onRemovePhone={this.onRemovePhone}
              phoneInput={this.phoneInput}
              addressInput={this.addressInput}
              isCityEdited={this.state.isCityEdited}
              isPhoneEdited={this.state.isPhoneEdited}
              isStreetAddressEdited={this.state.isStreetAddressEdited}
              city={this.state.city}
              streetAddress={this.state.streetAddress}
              phone={this.state.phone}
              country={this.state.country}
              initialSecondPhone={this.state.initialSecondPhone}
              secondPhone={this.state.secondPhone}
              onChange={this.onInputsChange}
              addSecondPhone={this.state.addSecondPhone}
              onAddPhone={this.onAddPhone}
              openSecondPhone={this.openSecondPhone}
              onRemoveSecondPhone={this.onRemoveSecondPhone}
              onSecondPhoneFocusOut={this.onSecondPhoneFocusOut}
              isSecondPhoneValid={this.state.isSecondPhoneValid}
              closeAddSecondPhone={this.closeAddSecondPhone}
              onAngelRemovePhone={this.onAngelRemovePhone}
              onAngelAddPhone={this.onAngelAddPhone}
              onAngelEditPhone={this.onAngelEditPhone}
              onAngelAddNumber={this.onAngelAddNumber}
              onAddressChange={this.onAddressChange}
              postalCode={this.state.postalCode}
              streetNumber={this.state.streetNumber}
              isAddressEdited={this.state.isAddressEdited}
              onAddressEdit={this.onAddressEdit}
            />
            <Divider />
            {this.props.role === 'family' ? (
              this.props.membershipData.active_payments && (
                <PaymentMethod
                  link={this.props.membershipData.payment_link}
                  accountNumber={this.props.profile.account_number}
                  activePayments={this.props.membershipData.active_payments}
                />
              )
            ) : (
              <PaymentMethod
                iban={this.state.iban}
                onIBANChange={this.onIBANChange}
                onIBANBlur={this.onIBANBlur}
                accountNumber={this.props.profile.account_number}
                onIBANEdit={this.onIBANEdit}
                isIBANEdited={this.state.isIBANEdited}
                ibanInput={this.ibanInput}
                isIBANValid={this.state.isIBANValid}
                role={this.props.role}
              />
            )}
            <Divider>
              <FormattedMessage id="profile.family.settings" />
            </Divider>
            {this.props.role === 'family' ? (
              <div>
                <SettingsSection
                  border
                  onSettingsChange1={this.onSettingsChange('emailPromo')}
                  onSettingsChange2={this.onSettingsChange('emailSystem')}
                  title={<FormattedMessage id="profile.family.email" />}
                  value={this.props.user.email}
                  toggleName1={
                    <FormattedMessage id="profile.family.promotions" />
                  }
                  toggleName2={
                    <FormattedMessage id="profile.family.reservationsAndReviews" />
                  }
                  toggleVal1={this.state.emailPromo}
                  toggleVal2={this.state.emailSystem}
                />
                <SettingsSection
                  border
                  onSettingsChange1={this.onSettingsChange('pushPromo')}
                  onSettingsChange2={this.onSettingsChange('pushSystem')}
                  title={
                    <FormattedMessage id="profile.family.pushNotifications" />
                  }
                  toggleName1={
                    <FormattedMessage id="profile.family.promotions" />
                  }
                  toggleName2={
                    <FormattedMessage id="profile.family.reservationsAndReviews" />
                  }
                  toggleVal1={this.state.pushPromo}
                  toggleVal2={this.state.pushSystem}
                />
              </div>
            ) : (
              <div>
                <SettingsSection
                  border
                  onSettingsChange1={this.onSettingsChange('emailPromo')}
                  title={<FormattedMessage id="profile.family.email" />}
                  value={this.props.user.email}
                  toggleName1={
                    <FormattedMessage id="profile.family.promotions" />
                  }
                  toggleVal1={this.state.emailPromo}
                />
                <SettingsSection
                  border
                  onSettingsChange1={this.onSettingsChange('pushPromo')}
                  title={
                    <FormattedMessage id="profile.family.pushNotifications" />
                  }
                  toggleName1={
                    <FormattedMessage id="profile.family.promotions" />
                  }
                  toggleVal1={this.state.pushPromo}
                />
              </div>
            )}
            <NoPushNotificationsSection
              onRegisterPush={this.onRegisterPush}
              goToInstructions={this.goToInstructions}
              hasRegistered={this.state.hasRegistered}
            />
            <Divider />
            <Credentials
              emailRef={this.emailInput}
              passwordRef={this.passwordInput}
              email={this.state.email}
              password={this.state.password}
              onEdit={this.onCredentialsEdit}
              onChange={this.onCredentialsChange}
              onCredentialsFocusOut={this.onCredentialsFocusOut}
              handleFacebookData={this.handleFacebookData}
            />
            <LogoutBtn onClick={this.props.onLogout} />
          </CustomColumn>
        </CustomRow>
        {this.props.role === 'family' ? <FamilyTabBar /> : <AngelTabBar />}
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  user: getUser(state),
  settings: getUserSettings(state),
  membershipData: getMembershipData(state),
  profile: getUserProfile(state),
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
  role: getUserRole(state),
  token: getToken(state),
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    if (process.env.NODE_ENV === 'production') {
      window.analytics.reset();
    }
    dispatch(onLogout());
  },
  onSettingsUpdate: data => dispatch(onSettingsUpdate(data)),
  onFBInfoUpdate: data => dispatch(onFBInfoUpdate(data)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings);

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import curry from 'ramda/es/curry';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import memoizeWith from 'ramda/es/memoizeWith';
import Navigation from 'Components/Navigation';
import omit from 'ramda/es/omit';
import React, { Component, Fragment } from 'react';
import uniqid from 'uniqid';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { getUserProfile, getUpdateStatus, getUserRole } from '../selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetProfile, onSetImage } from '../../../../data/user/actions';
import { onUpdateProfile } from '../actions';
import Address from '../components/Address';
import Children from '../components/Children';
import DataSection from '../components/DataSection';
import Languages from '../components/Languages';
import RdyButton from '../../components/RdyButton';

class ProfileEdit extends Component {
  propsToOmitInLanguages = [
    'created_at',
    'deleted_at',
    'user_id',
    'updated_at',
    'id',
  ];
  initialState = {
    short_bio: this.props.profile.family.short_bio,
    postalcode: this.props.profile.family.postalcode,
    street_number: this.props.profile.family.street_number,
    city: this.props.profile.city,
    address: `${this.props.profile.street_name} ${
      this.props.profile.street_number
    }`,
    imageSrc: this.props.profile.image,
    imageData: null,
    touched: false,
    languages: omit(this.propsToOmitInLanguages, this.props.profile.languages),
    kids: this.props.profile.kids,
    currentView: 'years',
    showDateTimeModal: true,
  };

  state = this.initialState;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.onGetProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.updatedProfile &&
      this.props.updatedProfile.profile &&
      this.props.updatedProfile.profile !== prevProps.updatedProfile.profile
    ) {
      const profile = this.props.updatedProfile.profile;
      this.setState({
        address: `${profile.street_name} ${profile.street_number}`,
        city: profile.city,
      });
    }
    if (prevProps.profile !== this.props.profile) {
      this.setState({
        postalcode: this.props.profile.postalcode,
        street_number: this.props.profile.street_number,
        short_bio: this.props.profile.family.short_bio,
        city: this.props.profile.city,
        address: `${this.props.profile.street_name} ${
          this.props.profile.street_number
        }`,
        imageSrc: this.props.profile.image,
        languages: omit(
          this.propsToOmitInLanguages,
          this.props.profile.languages
        ),
      });

      if (this.props.profile.kids) {
        this.setState({
          kids: this.props.profile.kids,
        });
      }
    }
  }

  onLanguageSelect = lang => () => {
    this.setState(prevState => ({
      ...prevState,
      languages: {
        ...prevState.languages,
        [lang]: !prevState.languages[lang],
      },
      touched: true,
    }));
  };

  onImageChange = (imageSrc, imageData) => {
    this.setState(
      {
        imageSrc,
        imageData,
        touched: true,
      },
      () => {
        this.props.onSetImage(imageSrc);
      }
    );
  };

  onDescChange = e => {
    this.setState({
      short_bio: e.target.value,
      touched: true,
    });
  };

  isAddressFilledIn = () => {};
  onAddressChange = memoizeWith(
    type => type,
    curry(type => e => {
      this.setState(
        {
          [type]: e.target.value,
        },
        () => {
          this.setState({
            touched: this.state.postalcode && this.state.street_number,
          });
        }
      );
    })
  );

  onAddChild = (e: SyntheticInputEvent<HTMLInputElement>, data) => {
    let kids = this.state.kids;
    kids[uniqid('id-')] = e.format('YYYY-MM-DD');
    this.setState(
      {
        showDateTimeModal: false,
      },
      this.setState({
        touched: true,
        kids: kids,
        currentView: 'years',
      })
    );
    setTimeout(() => {
      this.setState({
        showDateTimeModal: true,
      });
    }, 100);
  };

  onRemoveChild = key => {
    let kids = this.state.kids;
    delete kids[key];
    this.setState({
      touched: true,
      kids: kids,
    });
  };

  onUpdateProfile = () => {
    let data = {
      languages: {},
      kids: {},
    };

    for (let value in this.state) {
      if (value === 'touched' || value === 'imageSrc') continue;
      if (this.state[value] !== this.initialState[value]) {
        if (value === 'imageData') {
          data.image = this.state[value];
        } else if (value === 'languages') {
          for (let lang in this.state.languages) {
            if (
              this.state.languages[lang] !== this.initialState.languages[lang]
            ) {
              data.languages[lang] = this.state.languages[lang];
            }
          }
        } else {
          data[value] = this.state[value];
        }
      }
    }

    this.setState(
      {
        touched: false,
      },
      () => {
        this.props.onUpdateProfile(this.props.role, data);
      }
    );
  };

  render() {
    const { first_name, last_name, image } = this.props.profile;
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.family.edit.navTitle" />}
          onBack={this.props.history.goBack}
          rightComp={() => (
            <RdyButton
              onClick={this.onUpdateProfile}
              disabled={!this.state.touched}
            >
              <FormattedMessage id="navigation.save" />
            </RdyButton>
          )}
        />

        {this.props.isLoading && <Loader top />}
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <Segment basic vertical>
          <DataSection
            firstName={first_name}
            surname={last_name}
            desc={this.state.short_bio}
            image={image}
            onImageChange={this.onImageChange}
            onDescChange={this.onDescChange}
          />
          <Divider fitted />
          <Address
            onAddressChange={this.onAddressChange}
            city={this.state.city}
            address={this.state.address}
            postalcode={this.state.postalcode}
            street_number={this.state.street_number}
          />
          <Divider fitted />
          {this.state.kids && (
            <Children
              children={this.state.kids}
              removeChild={this.onRemoveChild}
              addChild={this.onAddChild}
              currentView={this.state.currentView}
              showDateTimeModal={this.state.showDateTimeModal}
            />
          )}
          <Divider fitted />
          <Languages
            onLanguageSelect={this.onLanguageSelect}
            languages={this.state.languages}
          />
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: getUserProfile(state),
  updatedProfile: getUpdateStatus(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  role: getUserRole(state),
});

export default connect(
  mapStateToProps,
  {
    onErrorConfirm,
    onUpdateProfile,
    onGetProfile,
    onSetImage,
  }
)(ProfileEdit);

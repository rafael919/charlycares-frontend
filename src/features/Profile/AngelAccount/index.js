import { connect } from 'react-redux';
import { AngelTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import curry from 'ramda/es/curry';
import { Modal, Image } from 'semantic-ui-react';

import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import pick from 'ramda/es/pick';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onAngelVideoRemove } from '../../../data/user/actions';
import { getUserLanguages } from '../AngelProfile/selectors';
import { getUserProfile, getVideoUploadUrl } from './selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onUpdateProfile } from './actions';
import DataSection from './components/DataSection';
import Languages from './components/Languages';
import RdyButton from '../components/RdyButton';
import Skills from './components/Skills';
import VideoExplanation from './components/VideoExplanation';
import CloseIcon from 'Assets/icons/close.svg';

const CustomModal = styled(Modal)`
  margin-top: 8rem !important;
  top: 10% !important;
  &&& {
    & > .content {
      padding: 0 1.5rem 1.5rem;
    }
  }
`;

const CloseImage = styled(Image)`
  position: absolute !important;
  top: 0.5rem;
  right: 1rem;
`;
class AngelAccount extends PureComponent {
  supportedLanguages = [
    'english',
    'german',
    'french',
    'spanish',
    'italian',
    'dutch',
  ];
  initialState = {
    firstName: this.props.profile.first_name,
    lastName: this.props.profile.last_name,
    birthdate: moment(
      this.props.profile.birthdate,
      'YYYY-MM-DD HH:mm:ss'
    ).format('YYYY-MM-DD'),
    isBirthdateValid: true,
    driverLicense: this.props.profile.angel.driving_license,
    bio: this.props.profile.angel.short_bio,
    fieldOfStudy: this.props.profile.angel.field_of_study,
    education: this.props.profile.angel.education,
    languages: pick(this.supportedLanguages, this.props.profile.languages),
    isOverlayActive: false,
    video: null,
    error: null,
  };

  state = this.initialState;

  onDriverLicenseStatusChange = () => {
    this.setState(prevState => ({
      driverLicense: !prevState.driverLicense,
      touched: true,
    }));
  };

  getSkills = () => {
    if (this.props.profile) {
      return pick(
        [
          'first_aid',
          'babysit_expertise',
          'driving_license',
          'liability_insurance',
          'works_with_kids',
        ],
        this.props.profile
      );
    }
  };

  onBioChange = e => {
    this.setState({
      bio: e.target.value,
      touched: true,
    });
  };

  onLanguageSelect = memoizeWith(
    lang => lang,
    curry((lang, _ev) => {
      this.setState(prevState => {
        return {
          ...prevState,
          languages: {
            ...prevState.languages,
            [lang]: !prevState.languages[lang],
          },
          touched: true,
        };
      });
    })
  );

  onProfileUpdate = () => {
    let payload = {
      languages: {},
      profile: {},
      angelData: {
        id: this.props.profile.angel.id,
      },
      video: null,
      url: this.props.videoUploadUrl,
    };

    for (let prop in this.initialState) {
      if (prop === 'languages') {
        for (let lang in this.state.languages) {
          if (
            this.state.languages[lang] !== this.initialState.languages[lang]
          ) {
            payload.languages[lang] = this.state.languages[lang];
          }
        }
      } else {
        if (this.initialState[prop] !== this.state[prop]) {
          switch (prop) {
            case 'driverLicense':
              payload.driving_license = this.state[prop];
              break;
            case 'bio':
              payload.short_bio = this.state[prop];
              break;
            case 'firstName':
              payload.first_name = this.state[prop];
              break;
            case 'lastName':
              payload.last_name = this.state[prop];
              break;
            case 'birthdate':
              payload.birthdate = this.state[prop];
              break;
            case 'fieldOfStudy':
              payload.field_of_study = this.state[prop];
              break;
            case 'education':
              payload.education = this.state[prop];
              break;
            case 'video':
              payload.video = this.state[prop];
              break;
            default:
              break;
          }
        }
      }
    }

    this.setState({ touched: false }, () => {
      this.props.onUpdateProfile(payload);
    });
  };

  onBirthDateChange = e => {
    e.persist();
    this.setState(prevState => {
      if (moment().diff(moment(e.target.value, 'YYYY-MM-DD'), 'years') < 16) {
        return {
          isBirthdateValid: false,
        };
      }
      return {
        birthdate: e.target.value,
        isBirthdateValid: true,
        touched: true,
      };
    });
  };

  handleOverlay = state => () => {
    this.setState(prevState => {
      if (state === 'open') {
        return {
          isOverlayActive: true,
        };
      }
      return {
        isOverlayActive: false,
      };
    });
  };

  toggleVideoModal = () => {
    this.setState({
      showVideoModal: !this.state.showVideoModal,
    });
  };

  onInputChange = e => {
    const input = e.target.getAttribute('name');
    this.setState({
      [input]: e.target.value,
      touched: true,
    });
  };

  onVideoUpload = e => {
    e.persist();
    if (e.target.files && e.target.files[0]) {
      this.setState(state => {
        if (e.target.files[0].size > 60000000) {
          return {
            ...state,
            error: {
              video: true,
            },
          };
        }
        return {
          ...state,
          video: e.target.files[0],
          touched: true,
        };
      });
    }
  };

  onVideoErrorConfirm = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="profile.angel.edit.navTitle" />}
        navRightComponent={() => (
          <RdyButton
            onClick={this.onProfileUpdate}
            disabled={!this.state.touched}
          >
            <FormattedMessage id="navigation.rdy" />
          </RdyButton>
        )}
      >
        <CustomModal
          open={this.state.showVideoModal}
          onClose={this.toggleVideoModal}
          size="mini"
        >
          <CloseImage src={CloseIcon} onClick={this.toggleVideoModal} />
          <Modal.Content>
            <VideoExplanation />
          </Modal.Content>
        </CustomModal>

        {this.props.isLoading && <Loader />}
        <Error
          errors={this.props.errors || this.state.error}
          onErrorConfirm={
            this.state.error
              ? this.onVideoErrorConfirm
              : this.props.onErrorConfirm
          }
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            {this.props.profile && (
              <DataSection
                profile={this.props.profile}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                birthdate={this.state.birthdate}
                bio={this.state.bio}
                isBirthdateValid={this.state.isBirthdateValid}
                onOverlayOpen={this.toggleVideoModal}
                fieldOfStudy={this.state.fieldOfStudy}
                education={this.state.education}
                onBioChange={this.onBioChange}
                onBirthDateChange={this.onBirthDateChange}
                onInputChange={this.onInputChange}
                onVideoUpload={this.onVideoUpload}
                video={this.props.profile.angel.video}
                onVideoRemove={this.props.onAngelVideoRemove}
              />
            )}
            <Divider />
            <Skills
              onDriverLicenseStatusChange={this.onDriverLicenseStatusChange}
              driverLicense={this.state.driverLicense}
              skills={this.getSkills()}
            />
            <Divider />
            <Languages
              onLanguageSelect={this.onLanguageSelect}
              languages={this.state.languages}
            />
          </CustomColumn>
        </CustomRow>
        <AngelTabBar />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    profile: getUserProfile(state),
    languages: getUserLanguages(state),
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
    videoUploadUrl: getVideoUploadUrl(state),
  }),
  {
    onUpdateProfile,
    onErrorConfirm,
    onAngelVideoRemove,
  }
)(AngelAccount);

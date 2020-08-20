import Layout from 'Components/Layout';
import React from 'react';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import Confirmation from 'Components/Confirmation';

import { connect } from 'react-redux';
import { getUserProfile } from './selectors';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import ConfirmationSection from './components/ConfirmationSection';

import { onUpdateProfile } from '../Edit/actions';

class CompleteProfile extends React.Component {
  state = {
    step: 1,
    dog: false,
    cat: false,
    short_bio: '',
  };

  onNextStep = () => {
    const data = {};
    if (this.state.step === 1) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'development'
      ) {
        window.analytics.track('FSignUpInfo', {});
      }
      data.short_bio = this.state.short_bio;
      data.dog = this.state.dog;
      data.cat = this.state.cat;
    } else if (this.state.step === 2) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'development'
      ) {
        window.analytics.track('FSignUpPhoto', {});
      }
      data.image = this.state.imageData;
    } else {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'development'
      ) {
        window.analytics.track('FSignUpThanks', {});
      }
      this.props.history.push('/onboarding');
    }

    this.props.onUpdateProfile('family', data);
    this.setState({
      step: this.state.step + 1,
    });
  };

  onSkipStep = () => {
    this.setState({
      step: this.state.step + 1,
    });
  };

  onImageChange = (imageSrc, imageData) => {
    console.log(imageSrc, imageData);
    this.setState({
      imageSrc,
      imageData,
    });
  };

  onDescChange = e => {
    this.setState({
      short_bio: e.target.value,
    });
  };

  onToggleDog = () => {
    this.setState({
      dog: !this.state.dog,
    });
  };
  onToggleCat = () => {
    this.setState({
      cat: !this.state.cat,
    });
  };

  renderStep = () => {
    switch (this.state.step) {
      case 1:
        return (
          <FirstStep
            short_bio={this.state.short_bio}
            dog={this.state.dog}
            cat={this.state.cat}
            onDescChange={this.onDescChange}
            onToggleDog={this.onToggleDog}
            onToggleCat={this.onToggleCat}
          />
        );
      case 2:
        return (
          <SecondStep
            onImageChange={this.onImageChange}
            image={this.state.imageSrc}
          />
        );
      case 3:
        return (
          <ThirdStep
            onNextStep={this.onNextStep}
            firstName={this.props.profile.first_name}
          />
        );
      default:
        return null;
    }
  };
  render() {
    return (
      <Layout
        navRightComponent={() => {
          return this.state.step <= 2 ? this.state.step + 2 + '/4' : null;
        }}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading && <Loader />}
        <CustomRow paddingTop={'1.5rem'}>
          <CustomColumn>
            {this.renderStep()}
            {this.state.step <= 2 ? (
              <Confirmation>
                <ConfirmationSection
                  onNextStep={this.onNextStep}
                  onSkipStep={this.onSkipStep}
                />
              </Confirmation>
            ) : null}
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  profile: getUserProfile(state),
});

export default connect(
  mapStateToProps,
  { onUpdateProfile }
)(CompleteProfile);

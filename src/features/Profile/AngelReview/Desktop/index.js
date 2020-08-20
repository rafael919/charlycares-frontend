import { isMobile } from 'react-device-detect';
import DesktopError from 'Components/DesktopError';
import Divider from 'Components/Divider';
import Loader from 'Components/Loader';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component } from 'react';

import Family from '../components/Family';
import RatingSection from '../components/RatingSection';
import placeholder from 'Assets/images/familyProfilePlaceholder.png';

export default class RatingAndReviews extends Component {
  state = {
    rating: this.props.location.state.rating,
    comment: this.props.location.state.comments,
    isLoading: false,
    error: null,
  };

  onFamilySelect = family_id => () => {
    if (isMobile) {
      this.props.history.push('/family/' + family_id);
    } else {
      this.props.history.push('/profile/family/' + family_id);
    }
  };

  render() {
    const { state } = this.props.location;
    const startDate = moment(state.start_date, 'YYYY-MM-DD HH:mm:ss');
    return (
      <React.Fragment>
        {this.state.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <Navigation
          title={startDate.clone().format('dddd')}
          subTitle={startDate.clone().format('MMMM DD, YYYY')}
          onBack={this.props.history.goBack}
        />
        <Divider desktopBorderBottom/>
        {state.family ? <Family
          onFamilySelect={ this.onFamilySelect(state.family.family_id)}
          img={state.family.image ? state.family.image : placeholder}
          key={state.family.id}
          shortBio={state.family.short_bio}
          name={state.family.last_name}
          phone={state.family.phone}
          familyId={state.family.family_id}
          userId={state.family.user_id}
          history={this.props.history}
          wasBooked={state.family.last_booked ? true : false}
          newMessage={state.family.new_messages > 0 ? true : false}
          // togglePhoneModal={togglePhoneModal}
        /> : null }
        <Divider desktopBorderTop desktopBorderBottom/>
        <RatingSection
          rating={this.state.rating}
          onRate={this.onRate}
          comment={this.state.comment}
        />
      </React.Fragment>
    );
  }
}

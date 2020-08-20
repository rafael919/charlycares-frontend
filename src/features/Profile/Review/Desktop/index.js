import { getAge } from 'Utils';
import { isMobile } from 'react-device-detect';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import DesktopError from 'Components/DesktopError';
import Divider from 'Components/Divider';
import Loader from 'Components/Loader';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component } from 'react';
import API from '../api';

import Angel from '../components/Angel';
import RatingSection from '../components/RatingSection';

export default class RatingAndReviews extends Component {
  state = {
    rating: this.props.location.state.rating,
    comment: this.props.location.state.comments,
    isLoading: false,
    error: null,
  };

  onRate = (e, data) => {
    this.setState({
      rating: data.rating,
    });
  };

  onCommentChange = e => {
    this.setState({
      comment: e.target.value,
    });
  };

  onAngelSelect = id => () => {
    if (isMobile) {
      this.props.history.push('/angel/' + id);
    } else {
      this.props.history.push('/profile/angel/' + id);
    }
  };

  onRatingUpdate = () => {
    const data = {
      rating: this.state.rating,
      comments: this.state.comment,
    };
    this.setState({ isLoading: true }, () => {
      API.updateRating(this.props.location.state.booking_id, data)
        .then(res => {
          this.setState(
            {
              isLoading: false,
            },
            () => {
              this.props.history.goBack();
            }
          );
        })
        .catch(err => {
          this.setState({
            isLoading: false,
            error: err,
          });
        });
    });
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  isButtonDisabled = () => {
    return (
      this.state.comment !== this.props.location.state.comments ||
      this.state.rating !== this.props.location.state.rating
    );
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
        <Divider />
        <Angel
          onAngelSelect={this.onAngelSelect(state.angel.id)}
          img={state.angel.image}
          key={state.angel.id}
          name={state.angel.first_name}
          age={getAge(state.angel.birthdate)}
          phone={state.angel.phone}
          id={state.angel.id}
          userId={state.angel.user_id}
          history={this.props.history}
          wasBooked={state.angel.last_booked ? true : false}
          newMessage={state.angel.unread_message_count}
          // togglePhoneModal={togglePhoneModal}
        />
        <Divider />
        <RatingSection
          rating={this.state.rating}
          onRate={this.onRate}
          comment={this.state.comment}
          onCommentChange={this.onCommentChange}
        />
        <Confirmation>
          <BasicButton
            disabled={!this.isButtonDisabled()}
            primary
            fluid
            onClick={this.onRatingUpdate}
          >
            <FormattedMessage id="profile.family.review.button" />
          </BasicButton>
        </Confirmation>
      </React.Fragment>
    );
  }
}

import { FormattedMessage } from 'react-intl';
import Navigation from 'Components/Navigation';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import WithRole from 'Components/WithRole';

import Family from '../components/Family';
import Angel from '../components/Angel';
import API from '../api';
import List from '../components/List';

export default class RatingAndReviews extends Component {
  state = {
    isLoading: false,
    error: null,
    ratings: null,
  };

  componentDidMount() {
    this.getRatings();
  }

  getRatings = () => {
    this.setState({ isLoading: true }, () => {
      API.getRatings()
        .then(res => {
          this.setState({
            ratings: res.data.data,
            isLoading: false,
          });
        })
        .catch(err => {
          this.setState({
            error: err,
            isLoading: false,
          });
        });
    });
  };

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  render() {
    const { ratings } = this.state;
    return (
      <React.Fragment>
        <Navigation
          title={
            <FormattedMessage id="profile.family.ratingAndReviews.title" />
          }
          onBack={this.props.history.goBack}
        />
        {this.state.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <WithRole>
        {role => role === 'family' ? <List>
          {ratings && ratings.length
            ? this.state.ratings.map(data => {
                return <Angel key={data.id} data={data} />;
              })
            : null}
        </List> : 
          ratings && ratings.length
            ? this.state.ratings.map(data => {
                return <Family key={data.id} data={data} />;
              })
            : null
        }
        </WithRole>
      </React.Fragment>
    );
  }
}

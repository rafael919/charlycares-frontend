import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import WithRole from 'Components/WithRole';
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';

import Family from './components/Family';
import Angel from './components/Angel';
import API from './api';
import List from './components/List';

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
      <Layout
        navBorder
        longTitle
        onNavBack={this.props.history.goBack}
        navTitle={
          <FormattedMessage id="profile.family.ratingAndReviews.title" />
        }
      >
        {this.state.isLoading ? <Loader /> : null}
        <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <WithRole>
              {role =>
                role === 'family' ? (
                  <List>
                    {ratings && ratings.length
                      ? this.state.ratings.map(data => {
                          return <Angel key={data.id} data={data} />;
                        })
                      : null}
                  </List>
                ) : ratings && ratings.length ? (
                  this.state.ratings.map(data => {
                    return <Family key={data.id} data={data} />;
                  })
                ) : null
              }
            </WithRole>
          </CustomColumn>
        </CustomRow>
        <WithRole>
          {role => (role === 'family' ? <FamilyTabBar /> : <AngelTabBar />)}
        </WithRole>
      </Layout>
    );
  }
}

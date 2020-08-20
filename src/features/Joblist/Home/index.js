import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ProgressiveFacebook } from 'Components/Progressive';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import EmptyCell from 'Components/EmptyCell';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import { AngelTabBar } from 'Components/NavigationTabs';

import { getListings } from '../selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onGetListings } from '../actions';

import Listings from '../components/Listings';

class JoblistHome extends Component {
  state = {
    listings: [],
  };

  componentDidMount() {
    this.props.onGetListings();
  }

  render() {
    return (
      <Layout
        navTitle={<FormattedMessage id="joblist.angel.navTitle" />}
        navBorder
      >
        <ContentWrapper>
          <CustomRow noPadding>
            {this.props.isLoading ? (
              <CustomColumn>
                <ProgressiveFacebook isLoading={true} />
              </CustomColumn>
            ) : (
              <CustomColumn noPadding>
                <Listings
                  history={this.props.history}
                  listings={this.props.listings}
                />
              </CustomColumn>
            )}
          </CustomRow>
          <EmptyCell padding="4rem 0" />
        </ContentWrapper>
        <AngelTabBar />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  listings: getListings(state),
});

const mapDispatchToProps = dispatch => ({
  onGetListings: () => dispatch(onGetListings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoblistHome);

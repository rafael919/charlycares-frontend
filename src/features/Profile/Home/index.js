import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getLoadingStatus } from '../../../ui/selectors';
import {
  getUser,
  getUserRole,
  getRatings,
  getNumberOfUnreadMessages,
} from './selectors';
import { onGetUserProfileData } from '../../../data/user/actions';
import { preloadAllRoutes } from '../routes';
import ConfigItem from './components/ConfigItem';
import ConfigList from './components/ConfigList';
import ProfileSection from './components/ProfileSection';
import LanguageSwitcher from 'Components/LanguageSwitcher';
import { AppContext } from '../../App';

class ProfileHome extends Component {
  componentDidMount() {
    this.props.getUserProfileData();
    preloadAllRoutes();
  }

  getNumberOfUnrated = () => {
    if (this.props.ratings) {
      const unrated = this.props.ratings.filter(
        rating => rating.comments === ''
      );
      return unrated.length;
    }
  };

  render() {
    console.log(this.props);
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="profile.family.navTitle" />}
        navRightComponent={() => (
          <AppContext.Consumer>
            {({ setLocale, locale }) => (
              <LanguageSwitcher setLocale={setLocale} locale={locale} />
            )}
          </AppContext.Consumer>
        )}
      >
        {this.props.isLoading && !this.props.user && <Loader />}
        {this.props.user &&
          this.props.user.profile &&
          this.props.user.profile.family && (
            <CustomRow noPadding>
              <CustomColumn noPadding>
                <Divider />
                <ProfileSection
                  history={this.props.history}
                  role={this.props.role}
                  profile={this.props.user.profile}
                />
                <Divider />
                <ConfigList>
                  <ConfigItem
                    name={<FormattedMessage id="profile.family.account" />}
                    value={
                      <FormattedMessage
                        id="profile.family.accFamilyName"
                        values={{
                          name:
                            this.props.user.profile &&
                            this.props.user.profile.last_name,
                        }}
                      />
                    }
                    to="/profile/settings"
                  />
                  <ConfigItem
                    to="/profile/rating-reviews"
                    name={
                      <FormattedMessage id="profile.family.ratingAndReviews" />
                    }
                    ratings={this.getNumberOfUnrated()}
                  />
                  <ConfigItem
                    to="/profile/notifications"
                    name={
                      <FormattedMessage id="profile.family.notifications" />
                    }
                    messages={this.props.unreadMessages}
                  />
                  <ConfigItem
                    name={
                      <FormattedMessage id="profile.family.balanceAndPromoCodes" />
                    }
                    value={`€ ${this.props.user.profile.credit}`}
                    to="/profile/credit"
                  />
                  {this.props.user.referralSettings.active_family_campaign && <ConfigItem
                    name={
                      <FormattedMessage id="profile.family.referrals.family" />
                    }
                    to="/profile/referrals/family"
                  />}
                  {this.props.user.referralSettings.active_angel_campaign && <ConfigItem
                    name={
                      <FormattedMessage id="profile.family.referrals.angel" />
                    }
                    to="/profile/referrals/angel"
                  />}
                  {this.props.user.membershipData &&
                    this.props.user.membershipData.active_payments && (
                      <ConfigItem
                        name={
                          <FormattedMessage id="profile.family.membership" />
                        }
                        value={this.props.user.membershipData.current_state}
                        to="/profile/membership"
                      />
                    )}
                  <ConfigItem
                    name={
                      <FormattedMessage id="profile.family.termsAndConditions" />
                    }
                    to="/profile/conditions"
                  />
                  <ConfigItem
                    name={<FormattedMessage id="profile.family.needHelp" />}
                    to="/profile/help"
                  />
                </ConfigList>
              </CustomColumn>
            </CustomRow>
          )}

        <FamilyTabBar />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  unreadMessages: getNumberOfUnreadMessages(state),
  user: getUser(state),
  role: getUserRole(state),
  isLoading: getLoadingStatus(state),
  ratings: getRatings(state),
});

const mapDispatchToProps = dispatch => ({
  getUserProfileData: () => dispatch(onGetUserProfileData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHome);

import { AngelTabBar } from 'Components/NavigationTabs';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import LanguageSwitcher from 'Components/LanguageSwitcher';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React from 'react';

import { AppContext } from '../../App';
import { getCredit } from './selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import {
  getUser,
  getUserProfile,
  getNumberOfUnreadMessages,
} from './selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetUserProfileData } from '../../../data/user/actions';
import ConfigItem from './components/ConfigItem';
import ConfigList from './components/ConfigList';
import ProfileSection from './components/ProfileSection';

class AngelProfile extends React.PureComponent {
  componentDidMount() {
    this.props.onGetUserProfileData();
  }

  onEditProfile = () => {
    this.props.history.push('/profile/edit');
  };

  render() {
    const {
      isLoading,
      errors,
      onErrorConfirm,
      first_name,
      last_name,
      image,
      angel,
    } = this.props.profile;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="profile.angel.home.navTitle" />}
        navRightComponent={() => (
          <AppContext.Consumer>
            {({ setLocale, locale }) => (
              <LanguageSwitcher setLocale={setLocale} locale={locale} />
            )}
          </AppContext.Consumer>
        )}
      >
        {isLoading && <Loader />}
        <Error errors={errors} onErrorConfirm={onErrorConfirm} />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <ProfileSection
              onEdit={this.onEditProfile}
              bio={angel && angel.short_bio ? angel.short_bio : ''}
              fullName={`${first_name} ${last_name}`}
              image={image}
            />
            <Divider />
            <ConfigList>
              <ConfigItem
                to="/profile/dashboard"
                name={<FormattedMessage id="profile.angel.home.dashboard" />}
                messages={this.props.unreadMessages}
              />
              <ConfigItem
                to="/profile/rating-reviews"
                name={
                  <FormattedMessage id="profile.angel.home.ratingsAndReviews" />
                }
              />
              <ConfigItem
                name={
                  <FormattedMessage id="profile.angel.home.sittingPreferences" />
                }
                // progress={{ total: 13, finished: 4 }}
                to="/profile/preferences"
              />
              <ConfigItem
                to="/profile/settings"
                name={
                  <FormattedMessage id="profile.angel.home.account&settings" />
                }
              />
              <ConfigItem
                to="/payments"
                name={<FormattedMessage id="profile.angel.home.payments" />}
              />
              {this.props.user.referralSettings.active_family_campaign && (
                <ConfigItem
                  name={
                    <FormattedMessage id="profile.angel.referrals.family" />
                  }
                  to="/profile/referrals/family"
                />
              )}
              {this.props.user.referralSettings.active_angel_campaign && (
                <ConfigItem
                  name={<FormattedMessage id="profile.angel.referrals.angel" />}
                  to="/profile/referrals/angel"
                />
              )}
              <ConfigItem
                name={<FormattedMessage id="menu.desktop.angel.shop" />}
                to="/shop"
              />
              <ConfigItem
                to="/profile/credit"
                name={
                  <FormattedMessage id="profile.angel.home.creditsAndPromotional" />
                }
                value={
                  <FormattedNumber
                    value={Number(this.props.credit) || 0}
                    style="currency"
                    currency="EUR"
                  />
                }
              />
              <ConfigItem
                to="/profile/conditions"
                name={
                  <FormattedMessage id="profile.angel.home.generalConditions" />
                }
              />
              <ConfigItem
                name={<FormattedMessage id="profile.angel.home.help" />}
                to="/profile/help"
              />
            </ConfigList>
          </CustomColumn>
        </CustomRow>
        <AngelTabBar />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    errors: getErrors(state),
    profile: getUserProfile(state),
    credit: getCredit(state),
    isLoading: getLoadingStatus(state),
    unreadMessages: getNumberOfUnreadMessages(state),
    user: getUser(state),
  }),
  {
    onGetUserProfileData,
    onErrorConfirm,
  }
)(AngelProfile);

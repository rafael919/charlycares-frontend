import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import React, { PureComponent, Fragment } from 'react';

import { getCredit } from '../selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import {
  getUser,
  getUserProfile,
  getNumberOfUnreadMessages,
} from '../selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetUserProfileData } from '../../../../data/user/actions';
import ConfigItem from '../components/ConfigItem';
import ConfigList from '../components/ConfigList';
import ProfileSection from '../components/ProfileSection';

class AngelProfile extends PureComponent {
  componentDidMount() {
    this.props.onGetUserProfileData();
  }

  onEditProfile = () => {
    this.props.history.push('/profile/edit');
  };

  render() {
    if (!this.props.profile) return <Loader />;
    const { first_name, last_name, image, angel } = this.props.profile;
    return (
      <Fragment>
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading ? <Loader /> : null}
        <Segment basic vertical>
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
              to="/profile/credit"
              name={
                <FormattedMessage id="profile.angel.home.creditsAndPromotional" />
              }
              value={
                <FormattedNumber
                  value={this.props.credit || 0}
                  style="currency"
                  currency="EUR"
                />
              }
            />
            {this.props.user.referralSettings.active_family_campaign && (
              <ConfigItem
                name={<FormattedMessage id="profile.angel.referrals.family" />}
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
              to="/profile/conditions"
              name={
                <FormattedMessage id="profile.angel.home.generalConditions" />
              }
            />
            <ConfigItem
              name={<FormattedMessage id="profile.angel.home.help" />}
              to="/profile/help"
            />
            <ConfigItem
              name={<FormattedMessage id="menu.desktop.angel.shop" />}
              to="/shop"
            />
          </ConfigList>
        </Segment>
      </Fragment>
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

import { connect } from 'react-redux';
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { isAngel } from 'Utils';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import WithRole from 'Components/WithRole';

import { getBookings } from '../data/selectors';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetBookings } from '../data/actions';
import AllTab from './Tabs/All';
import Tabs from './components/Tabs';

class BookingHome extends Component {
  state = {
    activeTabIndex: 0,
  };

  getBookingsByType = (bookings = [], type) => {
    return bookings.filter(booking => booking.current_state.includes(type));
  };

  onTabChange = (e, data) => {
    this.setState({
      activeTabIndex: data.activeIndex,
    });
  };

  createTabBar = (role, activeIndex) => {
    const intl = this.props.intl;
    if (role === 'family') {
      return [
        {
          menuItem: intl.formatMessage({ id: 'bookings.home.tabs.family.all' }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="all" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.family.pending',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="pending" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.family.accepted',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="accepted" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.family.declined',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="declined" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.family.ended',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="ended" />
          ),
        },
      ];
    } else if (role === 'angel') {
      return [
        {
          menuItem: intl.formatMessage({ id: 'bookings.home.tabs.angel.all' }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="all" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.angel.pending',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="pending" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.angel.accepted',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="accepted" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.angel.declined',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="declined" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.angel.canceled',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="canceled" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.angel.given',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="given" />
          ),
        },
        {
          menuItem: intl.formatMessage({
            id: 'bookings.home.tabs.angel.ended',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="ended" />
          ),
        },
      ];
    }
  };

  render() {
    return (
      <Layout
        backgroundColor="#f8f7f8"
        navLeftComponent={() => (
          <WithRole>
            {role =>
              isAngel(role) ? null : (
                <CustomLink primary role="banner" to="/calendar">
                  <FormattedMessage id="navigation.agenda" />
                </CustomLink>
              )
            }
          </WithRole>
        )}
        navRightComponent={() => (
          <CustomLink primary role="banner" to="/faq">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
        navTitle={<FormattedMessage id="booking.home.navTitle" />}
        centered
        role="main"
      >
        <CustomRow noPadding>
          <CustomColumn noPadding width={16}>
            <WithRole>
              {role => (
                <Tabs
                  onTabChange={this.onTabChange}
                  menu={{
                    secondary: true,
                    pointing: true,
                    aligned: 'center',
                  }}
                  panes={this.createTabBar(role, this.state.activeTabIndex)}
                />
              )}
            </WithRole>
          </CustomColumn>
        </CustomRow>
        <WithRole>
          {role => (isAngel(role) ? <AngelTabBar /> : <FamilyTabBar />)}
        </WithRole>
      </Layout>
    );
  }
}

BookingHome.propTypes = {
  intl: intlShape.isRequired,
};

BookingHome = injectIntl(BookingHome);

const mapStateToProps = state => ({
  bookings: getBookings(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  getBookings: () => dispatch(onGetBookings()),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingHome);

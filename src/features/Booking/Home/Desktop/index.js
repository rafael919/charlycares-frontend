import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import WithRole from 'Components/WithRole';
import AppPromotor from 'Components/AppPromotor';
import React, { PureComponent } from 'react';

import { getBookings } from '../../data/selectors';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetBookings } from '../../data/actions';
import AllTab from '../Tabs/All';
import Tabs from '../components/Tabs';
import { getHasDownloadedApp } from '../../../../data/auth/selectors';

class BookingHome extends PureComponent {
  state = {
    activeTabIndex: 0,
    showAppPromotor: true,
  };

  onTabChange = (e, data) => {
    this.setState({
      activeTabIndex: data.activeIndex,
    });
  };

  getBookingsByType = (bookings = [], types) => {
    return bookings.filter(
      booking => booking.current_state.indexOf(types) !== -1
    );
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
            id: 'bookings.home.tabs.family.canceled',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="canceled" />
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
            id: 'bookings.home.tabs.angel.accepted',
          }),
          render: () => (
            <AllTab role={role} activeIndex={activeIndex} type="accepted" />
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
            <AllTab
              role={role}
              activeIndex={activeIndex}
              type="desktop_given"
            />
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

  toggleAppPromotor = () => {
    this.setState({
      showAppPromotor: !this.state.showAppPromotor
    });
  }
  render() {
    return (
      <div>   
      {(!this.props.hasDownloadedApp && this.props.location && this.props.location.state && this.props.location.state.from === 'booking/send') ? 
        <AppPromotor 
          toggle={this.toggleAppPromotor}
          show={this.state.showAppPromotor}
        /> : null
      }

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
      </div>
    );
  }
}

BookingHome.propTypes = {
  intl: intlShape.isRequired,
};

BookingHome = injectIntl(BookingHome);

const mapStateToProps = state => ({
  hasDownloadedApp: getHasDownloadedApp(state),
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

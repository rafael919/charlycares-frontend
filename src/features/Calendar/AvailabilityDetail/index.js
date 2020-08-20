import React from 'react';
import Layout from 'Components/Layout';
import moment from 'moment';

import HourRow from './components/HourRow';
import Hour from './components/Hour';
import Container from './components/Container';
import AddBtn from './components/AddBtn';

export default class AvailabilityDetail extends React.Component {
  state = {};

  makeHours = () => {
    let hours = [];
    for (let hour = 0; hour < 24; hour++) {
      hours.push(moment(hour, 'HH').format('HH:mm'));
    }
    return hours;
  };

  renderHours = (h, i, arr) => {
    console.log(this.props.location.state);
    const firstHour = this.props.location.state.start_date.split(' ')[1];
    const lastHour = this.props.location.state.end_date.split(' ')[1];
    if (this.isSameHour(firstHour, h)) {
      const minutes = moment(firstHour, 'HH:mm:ss').minutes();
      if (minutes > 0 && minutes <= 30) {
        return (
          <HourRow availableFirstHalf key={h}>
            <Hour availableFirstHalf>{h}</Hour>
          </HourRow>
        );
      }
      if (minutes > 30 && minutes < 59) {
        return (
          <HourRow availableSecondHalf key={h}>
            <Hour availableSecondHalf>{h}</Hour>
          </HourRow>
        );
      }
    }
    if (this.isSameHour(lastHour, h)) {
      const minutes = moment(lastHour, 'HH:mm:ss').minutes();
      if (minutes > 0 && minutes <= 30) {
        return (
          <HourRow availableFirstHalf key={h}>
            <Hour availableFirstHalf>{h}</Hour>
          </HourRow>
        );
      }
      if (minutes > 30 && minutes < 59) {
        return (
          <HourRow availableSecondHalf key={h}>
            <Hour availableSecondHalf>{h}</Hour>
          </HourRow>
        );
      }
    }

    if (this.isBetweenHours(h)) {
      return (
        <HourRow available key={h}>
          <Hour available>{h}</Hour>
        </HourRow>
      );
    }
    return (
      <HourRow key={h}>
        <Hour>{h}</Hour>
      </HourRow>
    );
  };

  isSameHour(value, h) {
    return moment(h, 'HH:mm').isSame(moment(value, 'HH:mm:ss'), 'hour');
  }

  isBetweenHours(value) {
    if (
      this.props.location.state.start_date &&
      this.props.location.state.end_date
    ) {
      const { state } = this.props.location;
      const startTime = state.start_date.split(' ')[1];
      const endTime = state.end_date.split(' ')[1];

      return moment(value, 'HH:mm').isBetween(
        moment(startTime, 'HH:mm:ss'),
        moment(endTime, 'HH:mm:ss'),
        'hour',
        '[]'
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <Layout
        navRightComponent={() => <AddBtn history={this.props.history} />}
        navTitle={
          this.props.location.state &&
          moment(
            this.props.location.state.start_date,
            'YYYY-MM-DD HH:mm:ss'
          ).format('DD MMMM YYYY')
        }
        onNavBack={this.props.history.goBack}
      >
        <Container>
          {this.props.location.state && this.makeHours().map(this.renderHours)}
        </Container>
      </Layout>
    );
  }
}

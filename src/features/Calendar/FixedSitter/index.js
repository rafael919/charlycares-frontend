import { injectIntl, FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import React from 'react';
import moment from 'moment';
import API from './api';

import Header from './components/Header';
import NightDay from './components/NightDay';
import Week from './components/Week';
import Day from './components/Day';

class Cancellation extends React.Component {
  state = {
    availabilities: null,
    error: null,
    isLoading: true,
  };

  getWeekDays = () => {
    let weekDays = [];
    for (let i = 1; i <= 7; i++) {
      weekDays.push(
        moment()
          .day(i)
          .format('dddd')
      );
    }
    return weekDays.map(day => {
      return day.slice(0, 1).toUpperCase() + day.slice(1);
    });
  };

  componentDidMount() {
    API.getAvailability()
      .then(res => {
        this.setState({
          availabilities: res.data.data,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
      });
  }

  onStatusChange = (day, period) => () => {
    this.setState(state => {
      return {
        availabilities: state.availabilities.map(d => {
          if (d.day_of_week === day) {
            return {
              ...d,
              [period]: d[period] === 0 ? 1 : 0,
            };
          }
          return d;
        }),
      };
    });
  };

  onAvailabilityUpdate = () => {
    this.setState({ isLoading: true }, () => {
      API.updateAvailability({ availabilities: this.state.availabilities })
        .then(res => {
          this.props.history.replace('/calendar');
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
        });
    });
  };

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="calendar.angel.fixedSitter.title" />}
        onNavBack={this.props.history.goBack}
      >
        {this.state.isLoading ? <Loader /> : null}
        <CustomRow padding="0">
          <Error
            errors={this.state.error}
            onErrorConfirm={this.onErrorConfirm}
          />
          <CustomColumn padding="0 1rem 7rem">
            <Divider inner />
            <Header>
              {this.props.intl.formatMessage({
                id: 'calendar.angel.fixedSitter.header',
              })}
            </Header>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'calendar.angel.fixedSitter.desc',
              })}
            </Paragraph>
            <NightDay />
            {this.state.availabilities && this.state.availabilities.length ? (
              <Week>
                {this.getWeekDays().map((day, i) => (
                  <Day
                    key={i}
                    day={day}
                    weekend={i === 6 || i === 5}
                    onStatusChange={this.onStatusChange}
                    data={this.state.availabilities[i]}
                  />
                ))}
              </Week>
            ) : null}
          </CustomColumn>
        </CustomRow>
        <Confirmation sticky>
          <BasicButton onClick={this.onAvailabilityUpdate} fluid primary>
            <FormattedMessage id="save" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

export default injectIntl(Cancellation);

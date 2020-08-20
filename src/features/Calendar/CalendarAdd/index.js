import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import curry from 'ramda/es/curry';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import {
  LoadableNotAvailable,
  LoadableUnavailable,
  LoadableFixedSitting,
} from '../routes';

import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import API from './api';
import React, { PureComponent } from 'react';

import Feature from './components/Feature';
import StandByList from './components/StandByList';
import StandByListItem from './components/StandByListItem';

import { getUser } from '../../../data/user/selectors';

class CalendarAdd extends PureComponent {
  getNextNearestDayInWeek = dayInWeekIndex => {
    const now = moment();
    const today = now.clone().isoWeekday();
    if (today <= dayInWeekIndex) {
      return now.clone().isoWeekday(dayInWeekIndex);
    } else {
      return now
        .clone()
        .add(1, 'weeks')
        .isoWeekday(dayInWeekIndex);
    }
  };

  getStandBy = () => {
    API.getStandByEvents()
      .then(resp => {
        this.setState({
          isLoadingStandby: false,
          standBy: resp.data.data,
        });
      })
      .catch(errors => {
        this.setState({
          errors,
          isLoading: false,
        });
      });
  };

  standBy = this.getStandBy();

  state = {
    isLoading: false,
    errors: null,
    touched: false,
  };

  componentDidMount() {
    LoadableNotAvailable.preload();
    LoadableUnavailable.preload();
    LoadableFixedSitting.preload();
  }

  navigateToFeature = path => () => {
    if (this.props.location.state) {
      this.props.history.push(path, this.props.location.state);
    } else {
      this.props.history.push(path);
    }
  };

  getLocalizationId(start, end) {
    if (start === '08:00' && end === '23:00') {
      return 'calendar.angel.addInCalendar.standBy.all';
    } else if (start !== '08:00' && end === '23:00') {
      return 'calendar.angel.addInCalendar.standBy.from';
    } else {
      return 'calendar.angel.addInCalendar.standBy.between';
    }
  }

  onStandByOptionSelect = memoizeWith(
    id => id,
    curry((id, _ev) => {
      const updated = this.state.standBy.map(day => {
        if (day.id === id) {
          return {
            ...day,
            selected: !day.selected,
            touched: true,
          };
        }
        return day;
      });
      this.setState(prevState => {
        return {
          ...prevState,
          standBy: updated,
          touched: true,
        };
      });
    })
  );

  updateStandby = () => {
    const selected = this.state.standBy.reduce((arr, curr) => {
      if (curr.selected) {
        arr.push({
          start_date: curr.start_date,
          end_date: curr.end_date,
          current_state: 'standby',
        });
      }
      return arr;
    }, []);
    API.addStandByEvents(selected)
      .then(() => {
        this.setState({
          isLoading: false,
          touched: false,
        });
      })
      .catch(errors => {
        this.setState({
          errors,
          isLoading: false,
        });
      });
  };

  onUpdate = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.updateStandby
    );
  };
  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  render() {
    const { user } = this.props;

    let notify_disable = true;
    if (user && user.role === 'angel') {
      if (
        moment().diff(
          moment(user.last_notification),
          'days'
        ) < 14
      ) {
        notify_disable = false;
      }
    }

    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={
          <FormattedMessage id="calendar.angel.addInCalendar.navTitle" />
        }
      >
        {this.state.isLoading ? <Loader isLoading /> : null}
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow>
                <Feature
                  onClick={this.navigateToFeature('/calendar/not-available')}
                  notAvailable
                  title={
                    <FormattedMessage id="calendar.angel.addInCalendar.title1" />
                  }
                >
                  <FormattedMessage id="calendar.angel.addInCalendar.notAvailableDesc" />
                </Feature>
                <Feature
                  onClick={this.navigateToFeature('/calendar/fixed-sitter')}
                  fixed
                  title={
                    <FormattedMessage id="calendar.angel.addInCalendar.title2" />
                  }
                >
                  <FormattedMessage id="calendar.angel.addInCalendar.fixedSittingDesc" />
                </Feature>
                <Feature
                  onClick={
                    notify_disable
                      ? this.navigateToFeature('/calendar/up-to-date')
                      : null
                  }
                  calendar
                  title={
                    <FormattedMessage id="calendar.angel.addInCalendar.title4" />
                  }
                >
                  <FormattedMessage id="calendar.angel.addInCalendar.calendarDesc" />
                </Feature>
              </CustomRow>
            </Grid>
            <Divider />
            {this.state.standBy && (
              <Grid container>
                <CustomRow padding="1rem 0 0">
                  <Feature
                    standBy
                    title={
                      <FormattedMessage id="calendar.angel.addInCalendar.title3" />
                    }
                  >
                    <FormattedMessage id="calendar.angel.addInCalendar.standByDesc" />
                  </Feature>
                </CustomRow>
                <CustomRow noPadding>
                  <StandByList>
                    {this.state.standBy.map(day => {
                      const start = moment(day.start_date, 'YYYY-MM-DD HH:mm');
                      const end = moment(day.end_date, 'YYYY-MM-DD HH:mm');
                      const startTime = start.clone().format('HH:mm');
                      const endTime = end.clone().format('HH:mm');
                      return (
                        <StandByListItem
                          onDaySelect={this.onStandByOptionSelect(day.id)}
                          key={day.id}
                          checked={day.selected}
                        >
                          <FormattedMessage
                            values={{
                              startTime: startTime,
                              endTime: endTime,
                              day: start.clone().format('dddd'),
                            }}
                            id={this.getLocalizationId(startTime, endTime)}
                          />
                        </StandByListItem>
                      );
                    })}
                  </StandByList>
                </CustomRow>
                <CustomRow>
                  <BasicButton
                    disabled={!this.state.touched}
                    onClick={this.onUpdate}
                    fluid
                    primary
                  >
                    Update
                  </BasicButton>
                </CustomRow>
              </Grid>
            )}
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(
  mapStateToProps,
   {}
)(CalendarAdd);

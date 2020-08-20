import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Grid } from 'semantic-ui-react';
import curry from 'ramda/es/curry';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';

import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import API from '../api';
import React, { PureComponent, Fragment } from 'react';
import Navigation from 'Components/Navigation';

import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';

import Feature from '../components/Feature';
import NotAvailable from '../../NotAvailable/Desktop';
import FixedSitter from '../../FixedSitter/Desktop';
import UpToDate from '../../UpToDate/Desktop';
import StandByList from '../components/StandByList';
import StandByListItem from '../components/StandByListItem';

import { getUser } from '../../../../data/user/selectors';

class CalendarAdd extends PureComponent {
  static defaultProps = {
    onClearSelection: () => {},
    onClose: () => {},
  };

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

  state = {
    isLoading: false,
    errors: null,
    touched: false,
    showNotAvailable: false,
    showFixedSitting: false,
    showUpToDate: false,
    isLoadingStandby: true,
  };

  getStandBy = () => {
    API.getStandByEvents()
      .then(resp => {
        this.setState({ isLoadingStandby: false, standBy: resp.data.data });
      })
      .catch(errors => {
        this.setState({ errors, isLoading: false });
      });
  };

  standBy = this.getStandBy();

  handleNotAvailable = () => {
    this.setState(state => ({
      ...state,
      showNotAvailable: !state.showNotAvailable,
    }));
  };
  handleFixedSitting = () => {
    this.setState(state => ({
      ...state,
      showFixedSitting: !state.showFixedSitting,
    }));
  };

  handleUpToDate = () => {
    this.setState(state => ({
      ...state,
      showUpToDate: !state.showUpToDate,
    }));
  };

  handleStandBy = () => {
    this.setState(state => ({
      ...state,
      showStandBy: !state.showStandBy,
    }));
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
        this.setState({ isLoading: false, touched: false });
      })
      .catch(errors => {
        this.setState({ errors, isLoading: false });
      });
  };

  onUpdate = () => {
    this.setState({ isLoading: true }, this.updateStandby);
  };
  onErrorConfirm = () => {
    this.setState({ errors: null });
  };

  onClose = () => {
    this.props.onClearSelection();
    this.props.onClose();
  };

  closeModalAndClearSelection = () => {
    this.props.onClearSelection();
  }

  render() {
    console.log(this.props);
    const { day, endHour, startHour, user, from } = this.props;
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

    const time = {
      day,
      startHour,
      endHour,
    };
    if (this.state.showFixedSitting) {
      return (
        <FixedSitter
          navigate={this.props.history}
          handleFixedSitting={this.handleFixedSitting}
          handleModalClose={this.onClose}
          time={time}
        />
      );
    }
    if (this.state.showNotAvailable) {
      return (
        <NotAvailable
          navigate={this.props.history}
          handleNotAvailable={this.handleNotAvailable}
          handleModalClose={this.onClose}
          time={time}
        />
      );
    }

    if (from === 'week') {
      return (
        <NotAvailable
          closeOnBack={true}
          navigate={this.props.history}
          handleNotAvailable={this.handleNotAvailable}
          handleModalClose={this.closeModalAndClearSelection}
          time={time}
        />
      );
    }
    if (this.state.showUpToDate) {
      return (
        <UpToDate
          navigate={this.props.history}
          handleUpToDate={this.handleUpToDate}
          handleModalClose={this.onClose}
          time={time}
        />
      );
    }

    return (
      <Fragment>
        <Navigation
          title={
            <FormattedMessage id="calendar.angel.addInCalendar.navTitle" />
          }
          onClose={this.onClose}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}
        <DesktopError
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <Segment basic vertical>
          <Feature
            onClick={this.handleNotAvailable}
            notAvailable
            title={
              <FormattedMessage id="calendar.angel.addInCalendar.title1" />
            }
          >
            <FormattedMessage id="calendar.angel.addInCalendar.notAvailableDesc" />
          </Feature>
          <Feature
            onClick={this.handleFixedSitting}
            fixed
            title={
              <FormattedMessage id="calendar.angel.addInCalendar.title2" />
            }
          >
            <FormattedMessage id="calendar.angel.addInCalendar.fixedSittingDesc" />
          </Feature>
          <Feature
            onClick={notify_disable ? this.handleUpToDate : null}
            calendar
            title={
              <FormattedMessage id="calendar.angel.addInCalendar.title4" />
            }
          >
            <FormattedMessage id="calendar.angel.addInCalendar.calendarDesc" />
          </Feature>
          {this.state.standBy && !this.props.time ? (
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
                    const start = moment(day.start_date, 'YYYY-MM-DD HH:mm:ss');
                    const end = moment(day.end_date, 'YYYY-MM-DD HH:mm:ss');
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
          ) : null}
        </Segment>
      </Fragment>
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

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import { Segment } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import Loader from 'Components/Loader';

import React, { Component, Fragment } from 'react';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import {
  onAddEvent,
  onRemoveEvent,
  onRemoveEventEverywhere,
} from '../../data/actions';

import API from '../../data/api';
import Config from './components/Config';
import RemoveItem from '../../components/RemoveItem';

class NotAvailable extends Component {
  format = 'dd. DD MMMM';
  yearFormat = 'dd. DD MMMM YYYY';
  recurringTypes = ['never', 'daily', 'weekly', 'monthly'];

  state = {};

  componentDidMount() {
    let tempStartDate;
    let tempEndDate;
    let wholeDay = false;
    console.log(this.props);
    if (this.props.time && this.props.time.day) {
      tempStartDate = moment(
        `${this.props.time.day.clone().format('YYYY-MM-DD')}T${
          this.props.time.startHour < 10
            ? `0${this.props.time.startHour}:00`
            : `${this.props.time.startHour}:00`
        }`,
        'YYYY-MM-DDTHH:mm'
      );
      tempEndDate = moment(
        `${this.props.time.day.clone().format('YYYY-MM-DD')}T${
          this.props.time.endHour < 10
            ? `0${this.props.time.endHour}:00`
            : `${this.props.time.endHour}:00`
        }`,
        'YYYY-MM-DDTHH:mm'
      );
    } else if (this.props.location && this.props.location.state) {
      tempStartDate = moment(
        this.props.location.state.start,
        'YYYY-MM-DDTHH:mm'
      );
      tempEndDate = moment(
        this.props.location.state.end,
        'YYYY-MM-DDTHH:mm'
      );
      wholeDay = this.props.location.state.wholeDay;

    } else {
      const now = moment();
      tempStartDate = nearestMinutes(15, now.clone().add(2, 'hours'));
      tempEndDate = nearestMinutes(15, now.clone().add(4, 'hours'));
    }
    this.setState({
      wholeDay: wholeDay,
      startDate: tempStartDate.clone().format(this.format),
      year: tempStartDate.clone().year(),
      endDate: tempEndDate.clone().format(this.format),
      startTime: wholeDay ? '12:00' : tempStartDate.clone().format('HH:mm'),
      initialStartTime: wholeDay ? '12:00' : tempStartDate.clone().format('HH:mm'),
      initialEndTime: wholeDay ? '18:00' : tempEndDate.clone().format('HH:mm'),
      endTime: wholeDay ? '18:00' : tempEndDate.clone().format('HH:mm'),
      repeatEndDate: tempStartDate
        .clone()
        .add(4, 'weeks')
        .format(this.yearFormat),
      tempRepeatEndDate: tempStartDate.format(this.yearFormat),
      parentId:
        this.props.location && this.props.location.state
          ? this.props.location.state.parentId
          : 0,
      existingEvent:
        this.props.location && this.props.location.state ? true : false,
      isLoading: false,
      error: null,
      selectedRecurringType: this.recurringTypes[0],
    });
  }

  onValueChange = input => mDate => {
    this.setState(state => {
      if (
        input === 'startDate' &&
        moment(state.endDate, this.format).isBefore(mDate)
      ) {
        return {
          ...state,
          [input]: mDate.format(this.format),
          endDate: mDate.format(this.format),
          year: mDate.clone().year(),
          repeatEndDate: mDate
            .clone()
            .add(4, 'weeks')
            .format(this.yearFormat),
        };
      }
      if (
        input === 'endDate' &&
        moment(state.startDate, this.format).isAfter(mDate)
      ) {
        return {
          ...state,
          [input]: mDate.format(this.format),
          startDate: mDate.format(this.format),
          year: mDate.clone().year(),
          repeatEndDate: mDate
            .clone()
            .add(4, 'weeks')
            .format(this.yearFormat),
        };
      }
      if (
        input === 'repeatEndDate'
      ) {
        return {
          ...state,
          [input]: mDate.clone().format(this.yearFormat),
        };
      }
      return {
        ...state,
        [input]: mDate.format(this.format),
      };
    });
  };

  onSelectChange = (e, data) => {
    const input = e.target.getAttribute('name');
    if (input === 'wholeDay') {
      return this.setState({
        wholeDay: !this.state.wholeDay,
      });
    }
    this.setState({
      [data.name]: data.value,
    });
  };

  onTimeChange = (_, { name, value }) => {
    this.setState(state => {
      if (
        name === 'startTime' &&
        moment(state.endTime, 'HH:mm').diff(moment(value, 'HH:mm'), 'minutes') <
          30
      ) {
        return {
          [name]: value,
          endTime: moment(value, 'HH:mm')
            .add(30, 'minutes')
            .format('HH:mm'),
          endDate: moment(value, 'dd. DD MMMM')
            .add('days', 1)
            .format('dd. DD MMMM'),
        };
      }
      if (
        name === 'endTime' &&
        moment(moment(value, 'HH:mm')).diff(
          moment(state.startTime, 'HH:mm'),
          'minutes'
        ) < 30
      ) {
        return {
          [name]: value,
          endDate: moment(state.startDate, 'dd. DD MMMM')
            .add('days', 1)
            .format('dd. DD MMMM'),
        };
      }
      return {
        [name]: value,
      };
    });
  };

  onRepeatDateBlur = e => {
    e.persist();
    this.setState(state => ({
      ...state,
      repeatEndDate: moment(state.tempRepeatEndDate, this.yearFormat).format(
        this.yearFormat
      ),
    }));
  };

  onEventUpdate = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        let data;
        if (this.state.existingEvent) {
          data = {
            start_date: moment(
              `${this.state.startDate} ${this.state.year} ${this.state.startTime}`,
              'dd. DD MMMM YYYY HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(
              `${this.state.startDate} ${this.state.year} ${this.state.endTime}`,
              'dd. DD MMMM YYYY HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            all_day: this.state.wholeDay,
          };
          const { id } = this.props.location.state;
          API.updateEvent(id, data)
            .then(res => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  this.props.history.replace('/calendar/add', moment(data.start_date).week());
                }
              );
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        } else {
          data = {
            start_date: moment(
              `${this.state.startDate} ${this.state.year} ${this.state.startTime}`,
              'dd. DD MMMM YYYY HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(
              `${this.state.startDate} ${this.state.year} ${this.state.endTime}`,
              'dd. DD MMMM YYYY HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            all_day: this.state.wholeDay,
            recurring_end_date: moment(
              `${this.state.repeatEndDate}`,
              this.yearFormat
            ).format('YYYY-MM-DD HH:mm:ss'),
            recurring_type: this.state.selectedRecurringType,
            current_state: 'unavailable',
          };

          this.props.onAddEvent(data, this.props.handleModalClose);
        }
      }
    );
  };

  onRemoveEvent = () => {
    const { id, start } = this.props.location.state;
    const weekNumber = moment(start, 'YYYY-MM-DDTHH:mm').isoWeek();
    this.props.onRemoveEvent(
      id,
      this.props.history.push('/calendar/week', weekNumber)
    );
  };

  onRemoveEventEverywhere = () => {
    const { parentId, start } = this.props.location.state;
    const weekNumber = moment(start, 'YYYY-MM-DDTHH:mm').isoWeek();
    this.props.onRemoveEventEverywhere(
      parentId,
      this.props.history.push('/calendar/week', weekNumber)
    );
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="calendar.angel.notAvailable.title" />}
          onClose={
            this.props.closeOnBack
              ? this.props.handleModalClose
              : this.props.handleNotAvailable
          }
        />
        {this.state.startDate ? (
          <Segment basic vertical>
            <Config
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              year={this.state.year}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              onValueChange={this.onValueChange}
              onSelectChange={this.onSelectChange}
              onTimeChange={this.onTimeChange}
              recurringTypes={this.recurringTypes}
              selectedRecurringType={this.state.selectedRecurringType}
              initialStartTime={this.state.initialStartTime}
              initialEndTime={this.state.initialEndTime}
              wholeDay={this.state.wholeDay}
              repeatEndDate={this.state.repeatEndDate}
              selectedRepeatEndDate={this.state.repeatEndDate}
              existingEvent={this.state.existingEvent}
            />
          </Segment>
        ) : null}
        {this.state.existingEvent ? (
          <div>
            <RemoveItem
              onClickSingle={this.onRemoveEvent}
              onClickEverywhere={this.onRemoveEventEverywhere}
              showRemoveEverywhere={this.state.parentId > 0}
              topBorder
            />
          </div>
        ) : null}
        {this.props.isLoading ? <Loader /> : null}
        <BasicButton primary fluid onClick={this.onEventUpdate}>
          <FormattedMessage id="save" />
        </BasicButton>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onAddEvent: (data, callback) => dispatch(onAddEvent(data, callback)),
  onRemoveEvent: (id, callback) => dispatch(onRemoveEvent(id, callback)),
  onRemoveEventEverywhere: (parentId, callback) =>
    dispatch(onRemoveEventEverywhere(parentId, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotAvailable);

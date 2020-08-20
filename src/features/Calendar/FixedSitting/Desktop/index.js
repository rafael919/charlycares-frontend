import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import BasicButton from 'Components/Buttons/Basic';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import React, { Component, Fragment } from 'react';

import API from '../../data/api';
import Config from './components/Config';
import RemoveItem from '../../components/RemoveItem';
import {
  onAddEvent,
  onRemoveEvent,
  onRemoveEventEverywhere,
} from '../../data/actions';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';

class FixedSitting extends Component {
  constructor(props) {
    super(props);
    this.format = 'dd. DD MMMM';
    this.recurringTypes = ['never', 'daily', 'weekly', 'monthly'];
    const now = moment();
    let tempStartDate;
    let tempEndDate;
    if (props.time && props.time.day) {
      tempStartDate = moment(
        `${props.time.day.clone().format('YYYY-MM-DD')}T${
          props.time.startHour < 10
            ? `0${props.time.startHour}:00`
            : `${props.time.startHour}:00`
        }`,
        'YYYY-MM-DDTHH:mm'
      );
      tempEndDate = moment(
        `${props.time.day.clone().format('YYYY-MM-DD')}T${
          props.time.endHour < 10
            ? `0${props.time.endHour}:00`
            : `${props.time.endHour}:00`
        }`,
        'YYYY-MM-DDTHH:mm'
      );
    } else if (props.location && props.location.state) {
      tempStartDate = moment(props.location.state.start, 'YYYY-MM-DDTHH:mm');
      tempEndDate = moment(props.location.state.end, 'HH:mm');
    } else {
      tempStartDate = nearestMinutes(15, now.clone().add(2, 'hours'));
      tempEndDate = nearestMinutes(15, now.clone().add(4, 'hours'));
    }

    this.state = {
      wholeDay: false,
      startDate: tempStartDate.clone().format(this.format),
      endDate: tempEndDate.clone().format(this.format),
      startTime: tempStartDate.clone().format('HH:mm'),
      endTime: tempEndDate.clone().format('HH:mm'),
      initialStartTime: tempStartDate.clone().format('HH:mm'),
      initialEndTime: tempEndDate.clone().format('HH:mm'),
      parentId:
        this.props.location && this.props.location.state
          ? this.props.location.state.parentId
          : 0,
      repeatEndDate: tempStartDate
        .clone()
        .add(3, 'months')
        .format(this.format),
      tempRepeatEndDate: tempStartDate.format(this.format),
      existingEvent: props.location && props.location.state ? true : false,
      isLoading: false,
      error: null,
      selectedRecurringType: this.recurringTypes[0],
    };
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
          repeatEndDate: mDate
            .clone()
            .add(3, 'months')
            .format(this.format),
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
          repeatEndDate: mDate
            .clone()
            .add(3, 'months')
            .format(this.format),
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
        [input]: e.target.value,
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
      repeatEndDate: moment(state.tempRepeatEndDate, 'YYYY-MM-DD').format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    }));
  };

  onEventUpdate = () => {
    let data;
    if (this.state.existingEvent) {
      data = {
        start_date: moment(
          `${this.state.startDate} ${this.state.startTime}`,
          'dd. DD MMMM HH:mm'
        ).format('YYYY-MM-DD HH:mm:ss'),
        end_date: moment(
          `${this.state.endDate} ${this.state.endTime}`,
          'dd. DD MMMM HH:mm'
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
              this.props.history.replace('/calendar/add');
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
          `${this.state.startDate} ${this.state.startTime}`,
          'dd. DD MMMM HH:mm'
        ).format('YYYY-MM-DD HH:mm:ss'),
        end_date: moment(
          `${this.state.endDate} ${this.state.endTime}`,
          'dd. DD MMMM HH:mm'
        ).format('YYYY-MM-DD HH:mm:ss'),
        all_day: this.state.wholeDay,
        recurring_end_date: moment(
          this.state.repeatEndDate,
          this.format
        ).format('YYYY-MM-DD HH:mm:ss'),
        recurring_type: this.state.selectedRecurringType,
        current_state: 'available',
      };

      this.props.onAddEvent(data, this.props.handleModalClose);
    }
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
          title={<FormattedMessage id="calendar.angel.fixedSitting.title" />}
          onBack={
            this.props.history
              ? this.props.history.goBack
              : this.props.handleFixedSitting
          }
        />
        <DesktopError
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.props.isLoading ? <Loader isLoading /> : null}
        <Segment basic vertical>
          <Segment basic vertical>
            <Config
              startDate={this.state.startDate}
              endDate={this.state.endDate}
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
              existingEvent={this.state.existingEvent}
            />
          </Segment>
          {/* <Segment basic vertical>
            <Sitting selected={['option1', 'option3']} />
          </Segment>
          <SittingTypes /> */}
          {this.state.existingEvent ? (
            <RemoveItem
              onClickSingle={this.onRemoveEvent}
              onClickEverywhere={this.onRemoveEventEverywhere}
              showRemoveEverywhere={this.state.parentId > 0}
              topBorder
            />
          ) : null}

          <BasicButton primary fluid onClick={this.onEventUpdate}>
            <FormattedMessage id="save" />
          </BasicButton>
        </Segment>
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
)(FixedSitting);

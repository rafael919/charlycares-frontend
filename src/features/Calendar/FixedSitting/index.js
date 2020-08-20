import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { nearestMinutes } from 'Utils';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { Component } from 'react';

import Config from '../components/Config';
import RemoveItem from '../components/RemoveItem';
import {
  onAddEvent,
  onRemoveEvent,
  onRemoveEventEverywhere,
} from '../data/actions';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import API from '../data/api';

class FixedSitting extends Component {
  constructor(props) {
    super(props);
    this.format = 'YYYY-MM-DDTHH:mm';
    this.recurringTypes = ['never', 'daily', 'weekly', 'monthly'];
    const now = moment();
    let tempStartDate;
    let tempEndDate;
    if (
      props.location &&
      props.location.state &&
      props.location.state.startHour
    ) {
      tempStartDate = moment(
        `${props.location.state.day}T${
          props.location.startHour < 10
            ? `0${props.location.state.startHour}:00`
            : `${props.location.state.startHour}:00`
        }`,
        this.format
      );
      tempEndDate = moment(
        `${props.location.state.day}T${
          props.location.endHour < 10
            ? `0${props.location.state.endHour}:00`
            : `${props.location.state.endHour}:00`
        }`,
        this.format
      );
    } else if (
      props.location &&
      props.location.state &&
      !props.location.state.startHour
    ) {
      tempStartDate = moment(props.location.state.start, this.format);
      tempEndDate = moment(props.location.state.end, 'HH:mm');
    } else {
      tempStartDate = nearestMinutes(15, now.clone().add(2, 'hours'));
      tempEndDate = nearestMinutes(15, now.clone().add(4, 'hours'));
    }

    this.state = {
      wholeDay: false,
      tempStartDate: tempStartDate.format(this.format),
      tempEndDate: tempEndDate.format('HH:mm'),
      momentEnd: tempEndDate,
      startDate: tempStartDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: tempEndDate.format('HH:mm'),
      parentId:
        this.props.location && this.props.location.state
          ? this.props.location.state.parentId
          : 0,
      repeatEndDate: tempStartDate
        .clone()
        .add(3, 'months')
        .format(this.format),
      tempRepeatEndDate: tempStartDate.format(this.format),
      existingEvent:
        props.location.state && props.location.state.id ? true : false,
      isLoading: false,
      error: null,
      selectedRecurringType: 0,
      recurringTypeLabel: this.recurringTypes[0],
    };
  }

  onValueChange = e => {
    const input = e.target.getAttribute('name');
    if (input === 'selectedRecurringType') {
      return this.setState({
        [input]: e.target.value,
        recurringTypeLabel: this.recurringTypes[Number(e.target.value)],
      });
    }
    if (input === 'wholeDay') {
      return this.setState({
        wholeDay: !this.state.wholeDay,
      });
    }
    this.setState({
      [input]: e.target.value,
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

  onDateBlur = e => {
    e.persist();

    // const input = e.target.getAttribute('id');
    this.setState(state => {
      const startDate = moment(state.tempStartDate, this.format);
      const endDate = moment(
        moment(state.tempStartDate, this.format).format('YYYY-MM-DD') +
          ' ' +
          state.tempEndDate,
        'YYYY-MM-DD HH:mm'
      );

      if (endDate.isBefore(startDate)) {
        return {
          ...state,
          startDate: nearestMinutes(15, startDate).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          endDate: nearestMinutes(15, startDate)
            .add(1, 'day')
            .format('HH:mm'),
          momentEnd: nearestMinutes(15, endDate)
            .clone()
            .add(1, 'day'),
          repeatEndDate: nearestMinutes(15, startDate)
            .add(3, 'months')
            .format(this.format),
        };
      } else {
        return {
          ...state,
          startDate: nearestMinutes(15, startDate.clone()).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          endDate: nearestMinutes(15, endDate).format('HH:mm'),
          momentEnd: nearestMinutes(15, endDate),
          repeatEndDate: nearestMinutes(15, startDate)
            .add(3, 'months')
            .format(this.format),
        };
      }
    });
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
            start_date: this.state.startDate,
            end_date: this.state.momentEnd.format('YYYY-MM-DD HH:mm:ss'),
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
                  this.props.history.push('/calendar');
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
            start_date: this.state.startDate,
            end_date: this.state.momentEnd.format('YYYY-MM-DD HH:mm:ss'),
            all_day: this.state.wholeDay,
            recurring_end_date: moment(
              this.state.repeatEndDate,
              this.format
            ).format('YYYY-MM-DD HH:mm:ss'),
            recurring_type: this.state.recurringTypeLabel,
            current_state: 'available',
          };

          this.props.onAddEvent(data, this.goToWeek);
        }
      }
    );
  };

  onRemoveEvent = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const { id } = this.props.location.state;
        API.deleteEvent(id)
          .then(res => {
            this.setState(
              {
                isLoading: false,
              },
              () => {
                this.props.history.push('/calendar');
              }
            );
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  onRemoveEventEverywhere = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const { id } = this.props.location.state;
        API.deleteEventEverywhere(id)
          .then(res => {
            this.setState(
              {
                isLoading: false,
              },
              () => {
                this.props.history.push('/calendar');
              }
            );
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  goToWeek = () => {
    this.props.history.push('/calendar/week');
  };

  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="calendar.angel.fixedSitting.title" />}
        navRightComponent={() => (
          <CustomLink to="/support">
            <FormattedMessage id="support" />
          </CustomLink>
        )}
      >
        {this.props.isLoading ? <Loader isLoading /> : null}
        {this.state.error ? (
          <Error
            errors={this.state.error}
            onErrorConfirm={this.onErrorConfirm}
          />
        ) : null}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow>
                <Config
                  wholeDay={this.state.wholeDay}
                  tempStartDate={this.state.tempStartDate}
                  tempEndDate={this.state.tempEndDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  momentEnd={this.state.momentEnd}
                  repeatEndDate={this.state.tempRepeatEndDate}
                  selectedRepeatEndDate={this.state.repeatEndDate}
                  onValueChange={this.onValueChange}
                  onDateBlur={this.onDateBlur}
                  onSelectRepeat={this.onSelectRepeat}
                  onRepeatDateBlur={this.onRepeatDateBlur}
                  existingEvent={this.state.existingEvent}
                  selectedRecurringType={this.state.selectedRecurringType}
                  recurringTypes={this.recurringTypes}
                />
              </CustomRow>
            </Grid>
            <Grid container>
              {/* <CustomRow padding="1rem 0 0">
                <Sitting selected={['option1', 'option3']} />
              </CustomRow>
              <CustomRow noPadding>
                <SittingTypes />
              </CustomRow> */}
              {this.state.existingEvent ? (
                <CustomRow noPadding>
                  <RemoveItem
                    onClickSingle={this.onRemoveEvent}
                    onClickEverywhere={this.onRemoveEventEverywhere}
                    showRemoveEverywhere={this.state.parentId > 0}
                  />
                </CustomRow>
              ) : null}
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid onClick={this.onEventUpdate}>
            <FormattedMessage id="save" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onAddEvent: (data, callback) => dispatch(onAddEvent(data, callback)),
  onRemoveEvent: (data, callback) => dispatch(onRemoveEvent(data, callback)),
  onRemoveEventEverywhere: (parentId, callback) =>
    dispatch(onRemoveEventEverywhere(parentId, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FixedSitting);

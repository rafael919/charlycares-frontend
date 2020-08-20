import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import AnimationWrapper from 'Components/AnimationWrapper';
import DesktopError from 'Components/DesktopError';
import InfiniteScroller from 'react-infinite-scroller';
import Loader from 'Components/Loader';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Fragment } from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import flatten from 'lodash.flatten';

import {
  getEvents,
  getNewEvents,
  getDayAvailability,
  getNewBooking,
  getUpdatedAt,
} from '../selectors';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { getUserRole } from '../../../../data/auth/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import {
  onGetAngelEventsError,
  onGetAngelEvents,
  onClearAngelEvents,
} from '../actions';
import { slideIn, slideOut } from '../../../../themes/animations';
import API from '../api';
import Month from '../../components/Month';
import styled from 'styled-components';

class Availability extends React.Component {
  wrapperRef = React.createRef();
  initialState = {
    startingMonth: moment()
      .clone()
      .subtract(1, 'month'),
    events: [],
    availability: [],
    newBookings: [],
    months: [],
    lastMonthIndex: null,
    isLoading: false,
    week: null,
  };
  state = this.initialState;

  componentDidMount() {
    slideIn(this.wrapperRef.current);
    if (this.props.location.pathname.includes('/show-calendar')) {
      const repetitions = flatten(
        this.props.newBooking.map(day => day.repetitions)
      ).map(date => {
        return {
          current_state: 'new',
          start_date: date,
        };
      });

      this.setState({
        newBookings: [
          ...this.props.newBooking.map(day => ({
            current_state: 'new',
            end_date: `${day.startDate} ${day.startTime}`,
            start_date: `${day.startDate} ${day.endTime}`,
          })),
          ...repetitions,
        ],
      });
    }
  }

  componentWillUnmount() {
    if (this.props.role === 'angel') {
      this.props.onClearAngelEvents();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updatedAt !== prevProps.updatedAt) {
      this.refetchEvents();
    }

    if (
      this.props.location.pathname.includes('/show-calendar') &&
      this.props.newBooking !== prevProps.newBooking
    ) {
      const repetitions = flatten(
        this.props.newBooking.map(day => day.repetitions)
      ).map(date => {
        return {
          current_state: 'new',
          start_date: date,
        };
      });

      this.setState({
        newBookings: [
          ...this.props.newBooking.map(day => ({
            current_state: 'new',
            end_date: `${day.startDate} ${day.startTime}`,
            start_date: `${day.startDate} ${day.endTime}`,
          })),
          ...repetitions,
        ],
      });
    }
  }

  filterEventsForMonth = (month, events) => {
    if (!events.length) return [];
    return events.filter(
      event =>
        event &&
        moment(event.start_date, 'YYYY-MM-DD HH:mm:ss').isSame(month, 'month')
    );
  };

  onWeekSelect = selectedWeeK => {
    this.setState({
      week: selectedWeeK,
    });
  };

  refetchEvents = () => {
    this.props.onClearAngelEvents();
    this.setState(this.initialState);
  };

  loadMoreMonths = page => {
    if (page === this.state.lastMonthIndex) return;
    const nextMonth = this.state.startingMonth.clone().add(page, 'months');
    const startDate = nextMonth.startOf('month').format('YYYY-MM-DD');
    const endDate = nextMonth.endOf('month').format('YYYY-MM-DD');

    if (
      this.props.role === 'angel' &&
      this.props.location.pathname.includes('calendar')
    ) {
      this.setState(prevState => {
        return {
          months: [...prevState.months, nextMonth],
          lastMonthIndex: page,
          isLoading: false,
        };
      });
      this.props.onGetAngelEvents(startDate, endDate);
    }
    if (
      this.props.role === 'family' &&
      (this.props.location.pathname.includes('show-calendar') ||
        this.props.location.pathname.includes('calendar'))
    ) {
      API.getEventsFamily(startDate, endDate, this.props.match.params.id)
        .then(({ data }) => {
          let events = data.data.events || data;

          this.setState(prevState => {
            return {
              months: [...prevState.months, nextMonth],
              lastMonthIndex: page,
              events: prevState.events.concat(events),
              availability: data.data.availability,
              isLoading: false,
            };
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
            error: err,
          });
        });
    }
    if (
      this.props.role === 'family' &&
      this.props.location.pathname.includes('availability')
    ) {
      API.getEvents(startDate, endDate, this.props.match.params.id)
        .then(({ data }) => {
          this.setState(prevState => {
            let events = data.data.events || data;
            return {
              months: [...prevState.months, nextMonth],
              lastMonthIndex: page,
              events: prevState.events.concat(events),
              availability: data.data.availability,
              isLoading: false,
            };
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
            error: err,
          });
        });
    }
  };

  onClose = () => {
    slideOut(this.wrapperRef.current, this.props.history.goBack);
  };
  render() {
    let events =
      this.props.role === 'angel' ? this.props.events : this.state.events;
    const showBookings =
      this.props.role === 'angel' ||
      (this.props.role === 'family' && !this.props.match.params.id);

    const allEvents = this.props.location.pathname.includes('/show-calendar')
      ? [...events, ...this.state.newBookings]
      : events;
      console.log(this.state.months);
    return (
      <Fragment>
        {(this.props.location.pathname === '/booking/angel-booking/calendar' ||
          this.props.location.pathname.includes('/booking/search') ||
          this.props.location.pathname.includes('/booking/availability')) && (
          <Navigation
            title={<FormattedMessage id="navigation.tabs.calendar" />}
            onBack={this.props.history.goBack}
          />
        )}
        {this.state.week ? <Overlay /> : null}
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}
        <AnimationWrapper
          key={this.props.updatedAt}
          padding="0.75rem 0 0 0"
          innerRef={this.wrapperRef}
        >
          <InfiniteScroller
            pageStart={0}
            threshold={this.props.role === 'angel' ? 0 : 300}
            loadMore={this.loadMoreMonths}
            hasMore={true}
            useWindow={false}
            loader={<ScrollerLoader key={9999} />}
          >
            {this.state.months.map((m, i) => (
              <Month
                dayAvailability={
                  this.props.availability.length
                    ? this.props.availability
                    : this.state.availability
                }
                showBookings={showBookings}
                month={m}
                role={this.props.role}
                events={this.filterEventsForMonth(m, allEvents)}
                key={i}
                angel_id={this.props.match.params.id}
                withoutAvailability={
                  this.props.role === 'family' && !this.props.match.params.id
                }
                onWeekSelect={this.onWeekSelect}
                sWeek={this.state.week}
              />
            ))}
          </InfiniteScroller>
        </AnimationWrapper>
      </Fragment>
    );
  }
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f9f8f9;
`;

const mapStateToProps = state => ({
  errors: getErrors(state),
  role: getUserRole(state),
  newBooking: getNewBooking(state),
  events: getEvents(state),
  availability: getDayAvailability(state),
  newEvents: getNewEvents(state),
  isLoading: getLoadingStatus(state),
  updatedAt: getUpdatedAt(state),
});

const mapDispatchToProps = dispatch => ({
  onError: err => dispatch(onGetAngelEventsError(err)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
  onGetAngelEvents: (startDate, endDate) =>
    dispatch(onGetAngelEvents(startDate, endDate)),
  onClearAngelEvents: () => dispatch(onClearAngelEvents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Availability));

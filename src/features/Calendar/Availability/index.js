import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import AnimationWrapper from 'Components/AnimationWrapper';
import CustomLink from 'Components/CustomLink';
import Error from 'Components/Error';
import InfiniteScroller from 'react-infinite-scroller';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getErrors } from '../../../ui/selectors';
import { getUserRole } from '../../../data/auth/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetAngelEventsError } from './actions';
import API from './api';
import CalendarNav from '../components/CalendarNav';
import Month from '../components/Month';
import flatten from 'lodash.flatten';
import { getNewBooking } from './selectors';

class Availability extends React.PureComponent {
  wrapperRef = React.createRef();
  state = {
    startingMonth: moment().subtract(1, 'month'),
    events: [],
    newBookings: [],
    months: [],
    lastMonthIndex: 1,
    isLoading: false,
    availability: [],
    redirectToAngel: false,
  };

  componentDidMount() {
    if (this.props.location.pathname.includes('/calendar')) {
      const repetitions = flatten(
        this.props.newBooking.map(day => day.repetitions)
      ).map(date => ({
        current_state: 'new',
        start_date: date,
      }));

      this.setState({
        newBookings: [
          ...this.props.newBooking.map(day => ({
            current_state: 'new',
            end_date: day.starTime,
            start_date: day.endTime,
          })),
          ...repetitions,
        ],
      });
    }
  }

  onWeekSelect = selectedWeeK => {
    this.setState({
      week: selectedWeeK,
    });
  };

  loadMoreMonths = page => {
    const nextMonth = this.state.startingMonth.clone().add(page, 'months');
    const startDate = nextMonth.startOf('month').format('YYYY-MM-DD');
    const endDate = nextMonth.endOf('month').format('YYYY-MM-DD');

    if (
      this.props.role === 'family' &&
      this.props.location.pathname.includes('calendar') &&
      !this.props.location.pathname.includes('availability')
    ) {
      API.getEventsFamily(startDate, endDate, this.props.match.params.id)
        .then(({ data }) => {
          let events = data.data.events || data;
          this.setState(prevState => {
            return {
              months: prevState.months.concat(nextMonth),
              lastMonthIndex: page,
              events: prevState.events.concat(events),
              isLoading: false,
            };
          });
        })
        .catch(err => this.props.onError(err));
    } else {
      API.getEvents(startDate, endDate, this.props.match.params.id)
        .then(({ data }) => {
          let events = data.data.events || data;
          this.setState(prevState => {
            const months = prevState.months.concat(nextMonth).sort((a, b) => {return(a > b ? 1 : -1 )});
            console.log(months[0].month());
            return {
              months: months,
              lastMonthIndex: page,
              events: prevState.events.concat(events),
              isLoading: false,
            };
          }, console.log(this.state.months));
        })
        .catch(err => this.props.onError(err));
    }
  };

  onClose = () => {
    this.props.history.push('/booking');
  };

  onBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      if (this.props.location.state.from.includes('/booking/angel/')) {
        this.props.history.replace(
          '/booking/angel/' + this.props.match.params.id,
          {
            from: 'calendar',
          }
        );
      }
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    if (this.state.redirectToAngel) {
      return (
        <Redirect
          to={{
            pathname: '/booking/angel/' + this.props.match.params.id,
            state: {
              from: 'calendar',
            },
          }}
        />
      );
    }

    const { months, events } = this.state;
    const { role } = this.props;
    const showBookings =
      role === 'angel' || (role === 'family' && !this.props.match.params.id);
    const allEvents = this.props.location.pathname.includes('/calendar')
      ? [...events, ...this.state.newBookings]
      : events;
    return (
      <React.Fragment>
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}

        <Layout
          navBorder
          onNavBack={this.props.role === 'family' ? this.onBack : null}
          onNavClose={this.props.role === 'angel' ? this.onClose : null}
          navTitle={
            this.props.role === 'family' &&
            !this.props.location.pathname.includes('availability') ? (
              <FormattedMessage id="calendar.family.calendar.navTitle" />
            ) : this.props.role === 'family' ? (
              <FormattedMessage id="calendar.family.availability.navTitle" />
            ) : (
              <FormattedMessage id="calendar.angel.navTitle" />
            )
          }
          navRightComponent={() => (
            <CustomLink to="/support">
              <FormattedMessage id="navigation.legenda" />
            </CustomLink>
          )}
          withDays
        >
          <AnimationWrapper
            id="grid"
            padding={
              this.props.role === 'angel' ? '2rem 0 3.25rem 0' : '2rem 0 0 0'
            }
            innerRef={this.wrapperRef}
          >
            <InfiniteScroller
              pageStart={0}
              threshold={0}
              loadMore={this.loadMoreMonths}
              hasMore={true}
              loader={<ScrollerLoader key={9999} />}
              useWindow={false}
            >
              {months.map((m, i) => (
                <Month
                  showBookings={showBookings}
                  withoutAvailability={
                    role === 'family' && !this.props.match.params.id
                  }
                  month={m}
                  key={i}
                  role={this.props.role}
                  events={
                    allEvents.length
                      ? allEvents.filter(
                          event =>
                            event &&
                            moment(
                              event.start_date,
                              'YYYY-MM-DD HH:mm:ss'
                            ).isSame(m, 'month')
                        )
                      : []
                  }
                  angel_id={this.props.match.params.id}
                  onWeekSelect={this.onWeekSelect}
                  sWeek={this.state.week}
                />
              ))}
            </InfiniteScroller>
          </AnimationWrapper>
        </Layout>
        {this.props.role === 'angel' && <CalendarNav />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrors(state),
  role: getUserRole(state),
  newBooking: getNewBooking(state),
});

const mapDispatchToProps = dispatch => ({
  onError: err => dispatch(onGetAngelEventsError(err)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Availability);

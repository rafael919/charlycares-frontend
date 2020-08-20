import { FormattedMessage } from 'react-intl';
import anime from 'animejs';
import CustomLink from 'Components/CustomLink';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CalendarNav from '../components/CalendarNav';
import { Cell } from './components/Cell';
import Container from './components/Container';
import Day from './components/Day';
import FixedSitting from './components/FixedSitting';
import Hours from './components/Hours';
import Status from './components/Status';
import Unavailable from './components/Unavailable';
import Week from './components/Week';
import WeekDays from './components/WeekDays';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onGetWeekEvents } from '../data/actions';
import { getWeekEvents } from './selectors';
import Swipe from 'react-easy-swipe';

class AngelWeek extends PureComponent {
  swipeLeftOptions = { rotate: 3 };
  swipeRightOptions = { rotate: -3, translateX: [0, 150] };

  today = moment();

  constructor(props) {
    super(props);

    if (this.props.location.state) {
      const current_week_day = moment()
        .day('Monday')
        .week(this.props.location.state);

      if(current_week_day.week() < moment().week()) {
        current_week_day.add(1, 'year');
      }

      this.state = {
        week: current_week_day,
        hours: this.getHours(),
        today: this.today,
        weekStart: current_week_day.clone().startOf('isoWeek'),
        weekEnd: current_week_day.clone().endOf('isoWeek'),
        weekEvents: [],
        errors: null,
        groupIndex: null,
      };
    } else {
      const current_week_day = moment()
        .day('Monday')
        .week(moment().week());

      if(current_week_day.week() < moment().week()) {
        current_week_day.add(1, 'year');
      }

      this.state = {
        week: current_week_day,
        hours: this.getHours(),
        today: this.today,
        weekStart: current_week_day.clone().startOf('isoWeek'),
        weekEnd: current_week_day.clone().endOf('isoWeek'),
        weekEvents: [],
        errors: null,
        groupIndex: null,
      };
    }
  }

  componentDidMount() {
    this.getEvents();
    const start = document.querySelector('#start');
    if (start) {
      const { y } = start.getBoundingClientRect();
      document.querySelector('#grid').scrollTo(0, y - 48 - 60);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state !== prevProps.location.state) {
      const current_week_day = moment()
        .day('Monday')
        .week(this.props.location.state);

      if(current_week_day.week() < moment().week()) {
        current_week_day.add(1, 'year');
      }
      this.setState(
        {
          week: current_week_day,
          weekStart: current_week_day.clone().startOf('isoWeek'),
          weekEnd: current_week_day.clone().endOf('isoWeek'),
        },
        this.getEvents
      );
    }
  }

  getEvents = () => {
    const format = 'YYYY-MM-DD';
    const data = {
      weekStart: this.state.weekStart.format(format),
      weekEnd: this.state.weekEnd
        .clone()
        // .add(1, 'day')
        .format(format),
    };
    this.props.getWeekEvents(data);
  };

  hasAcceptedWithSameDate = currentDay => {
    const format = 'YYYY-MM-DD HH:mm';
    const mCurrentDay = moment(currentDay.start_date, format);

    const event = this.props.weekEvents.events.find(day => {
      const mDay = moment(day.start_date, format);
      if (mCurrentDay.isSame(mDay, 'day') && day.current_state === 'accepted') {
        return day;
      }
    });
    return Boolean(event);
  };

  onSelectUnavailable = ({ start, end, id, parentId }) => () => {
    this.props.history.push('/calendar/not-available', {
      start: start.format('YYYY-MM-DDTHH:mm'),
      end: end.format('YYYY-MM-DDTHH:mm'),
      parentId,
      id,
    });
  };
  onSelectAvailable = ({ start, end, id, parentId }) => () => {
    this.props.history.push('/calendar/fixed-sitting', {
      start: start.format('YYYY-MM-DDTHH:mm'),
      end: end.format('YYYY-MM-DDTHH:mm'),
      parentId,
      id,
    });
  };

  renderEvents = dayIndex => {
    const format = 'YYYY-MM-DD HH:mm';
    return this.props.weekEvents.map((day, index) => {
      const mStart = moment(day.start_date, format);
      const mEnd = moment(day.end_date, format);
      if (mStart.clone().isoWeekday() === dayIndex + 1) {
        switch (day.current_state) {
          case 'pending':
            return (
              <Status
                key={index}
                pending
                startHasMinutes={Boolean(mStart.clone().minutes())}
                endHasMinutes={Boolean(mEnd.clone().minutes())}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
                booking_id={day.booking_id}
                invitation_id={day.invitation_id}
                history={this.props.history}
              >
                <FormattedMessage
                  id="calendar.angel.weekView.family"
                  values={{ family: day.family }}
                />
              </Status>
            );

          case 'accepted':
            return (
              <Status
                key={index}
                accepted
                startHasMinutes={Boolean(mStart.clone().minutes())}
                endHasMinutes={Boolean(mEnd.clone().minutes())}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
                booking_id={day.booking_id}
                invitation_id={day.invitation_id}
                history={this.props.history}
              >
                <FormattedMessage
                  id="calendar.angel.weekView.family"
                  values={{ family: day.family }}
                />
              </Status>
            );
          case 'unavailable':
            const data = {
              start: mStart.clone(),
              end: mEnd.clone(),
              id: day.id,
              parentId: day.parent_id,
            };
            return (
              <Unavailable
                key={index}
                startHasMinutes={Boolean(mStart.clone().minutes())}
                endHasMinutes={Boolean(mEnd.clone().minutes())}
                from={mStart.clone()}
                to={mEnd.clone()}
                onClick={this.onSelectUnavailable(data)}
              />
            );
          case 'available':
            const fixedSittingData = {
              start: mStart.clone(),
              end: mEnd.clone(),
              id: day.id,
              parentId: day.parent_id,
            };
            return (
              <FixedSitting
                key={index}
                onClick={this.onSelectAvailable(fixedSittingData)}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
                startHasMinutes={Boolean(mStart.clone().minutes())}
                endHasMinutes={Boolean(mEnd.clone().minutes())}
              />
            );

          default:
            return null;
        }
      }
      return null;
    });
  };

  getHours() {
    const start = moment('24:00', 'HH:mm');
    const end = moment('24:00', 'HH:mm');
    const startWorking = start.clone().add(7, 'hours');
    end.add(1, 'day').add(2, 'hours');
    const endWorking = end.clone().subtract(2, 'hours');
    const hours = [];
    let i = 0;
    while (start.isSameOrBefore(end, 'hour')) {
      hours.push({
        time: start.format('HH'),
        available: start.isBetween(startWorking, endWorking, 'hours'),
        index: i,
      });
      i++;
      start.add(1, 'hour');
    }
    return hours;
  }

  onSelectionToggle = ({ hour, day }) => () => {
    this.setState(
      state => {
        if (hour && day) {
          return {
            ...state,
            startHour: hour,
            endHour: hour + 1,
            day,
          };
        }
        return null;
      },
      () => {
        if (hour && day) {
            const startHour =this.state.startHour;
            const endHour = this.state.endHour;
            const day = this.state.day.clone().format('YYYY-MM-DD');
          this.props.history.push('/calendar/not-available', {
            start: moment(`${day} ${startHour}:00`).format('YYYY-MM-DDTHH:mm'),
            end: moment(`${day} ${endHour}:00`).format('YYYY-MM-DDTHH:mm'),
          });
        }
      }
    );
  };

  renderWeek = () => {
    return [...Array(7)].map((value, i) => (
      <Day key={i}>
        <React.Fragment>
          {this.state.hours.map((hour, idx) => {
            const day =
              i === 0
                ? this.state.weekStart
                : this.state.weekStart.clone().add(i, 'd');

            if (hour.index === this.state.hours.length - 3) {
              return (
                <Cell
                  available
                  onClick={this.onSelectionToggle({ hour: idx - 1, day })}
                  key={idx}
                />
              );
            }

            if (
              hour.index === 8 ||
              hour.index === this.state.hours.length - 1
            ) {
              return (
                <Cell
                  onClick={this.onSelectionToggle({ hour: idx - 1, day })}
                  available={false}
                  key={idx}
                />
              );
            }

            return (
              <Cell
                onClick={this.onSelectionToggle({ hour: idx - 1, day })}
                available={hour.available}
                className={hour.available === false ? 'not-selectable' : null}
                hour={idx - 1}
                day={day}
                key={idx}
              />
            );
          })}
        </React.Fragment>
        {this.renderEvents(i)}
      </Day>
    ));
  };

  animateSwipe = (props, onComplete) => () => {
    return anime({
      targets: '[data-swipe-container]',
      rotate: 3,
      duration: 200,
      transformOrigin: '50% 50%',
      opacity: [1, 0],
      translateX: [0, -150],
      easing: 'linear',
      complete: function(anim) {
        anim.reset();
        onComplete();
      },
      ...props,
    });
  };

  moveWeeks = type => () => {
    this.setState(prevState => {
      if (type === 'backward') {
        return {
          ...prevState,
          weekStart: prevState.weekStart.clone().add(1, 'week'),
          weekEnd: prevState.weekEnd.clone().add(1, 'week'),
        };
      }
      return {
        ...prevState,
        weekStart: prevState.weekStart.clone().subtract(1, 'week'),
        weekEnd: prevState.weekEnd.clone().subtract(1, 'week'),
      };
    }, this.getEvents);
  };

  goToCurrentWeek = () => {
    const week = moment()
      .day('Monday')
      .week(moment().week());
    this.setState(state => {
      return {
        ...state,
        weekStart: week.clone().startOf('isoWeek'),
        weekEnd: week.clone().endOf('isoWeek'),
      };
    }, this.getEvents);
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  onClose = () => {
    this.props.history.push('/booking');
  };

  render() {
    return (
      <Layout
        navRightComponent={() => (
          <CustomLink to="/support">
            <FormattedMessage id="navigation.legenda" />
          </CustomLink>
        )}
        navTitle={
          <FormattedMessage
            id="calendar.angel.weekView.navTitle"
            values={{ week: this.state.weekStart.format('w, MMM YYYY') }}
          />
        }
        onNavClose={this.onClose}
      >
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <Swipe
          onSwipeLeft={this.animateSwipe(
            this.swipeLeftOptions,
            this.moveWeeks('backward')
          )}
          onSwipeRight={this.animateSwipe(
            this.swipeRightOptions,
            this.moveWeeks()
          )}
          style={{width: '100%'}}
          tolerance = { 40 }
        >
            <Container data-swipe-container>
              <WeekDays
                weekStart={this.state.weekStart.clone()}
                weekEnd={this.state.weekEnd.clone()}
                today={this.state.today.clone()}
              />
              <Week>
                <Hours hours={this.state.hours} />
                {this.renderWeek()}
              </Week>
            </Container>
        </Swipe>
        <CalendarNav goToCurrentWeek={this.goToCurrentWeek} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  weekEvents: getWeekEvents(state),
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  getWeekEvents: data => dispatch(onGetWeekEvents(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AngelWeek);

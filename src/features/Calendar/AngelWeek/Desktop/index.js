import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Modal } from 'semantic-ui-react';
import { SelectableGroup } from 'react-selectable-fast';
import anime from 'animejs';
import Error from 'Components/Error';
import Hammer from 'react-hammerjs';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { getWeekEvents, getWeekAvailability, getUpdatedAt } from '../selectors';
import { onGetWeekEvents } from '../../data/actions';
import Availability from '../components/Availability';
import CalendarAdd from '../../CalendarAdd/Desktop';
import Cell from '../components/Cell';
import Container from '../components/Container';
import Day from '../components/Day';
import FixedSitting from '../components/FixedSitting';
import Hours from '../components/Hours';
import Status from '../components/Status';
import Unavailable from '../components/Unavailable';
import Week from '../components/Week';
import WeekDays from '../components/WeekDays';

const CustomModal = styled(Modal)`
  &&& {
    /* top: 10% !important; */

    & > .content {
      padding: 0 1.5rem 1.5rem;
      overflow: auto !important;
    }
  }
`;

class AngelWeek extends PureComponent {
  swipeLeftOptions = { rotate: 3 };
  swipeRightOptions = { rotate: -3, translateX: [0, 150] };
  hammerOptions = {
    touchAction: 'compute',
    recognizers: {
      swipe: {
        time: 600,
        threshold: 100,
      },
    },
  };

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
        isModalOpen: false,
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
        isModalOpen: false,
        groupIndex: null,
      };
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.state !== prevProps.location.state) {
      const current_week_day = moment()
        .day('Monday')
        .week(this.props.location.state ? this.props.location.state : moment().week());


        if(current_week_day.clone().week() < moment().week()) {
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
    if (this.props.updatedAt !== prevProps.updatedAt) {
      this.getEvents();
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

  onSelectUnavailable = ({ start, end, id, parentId, wholeDay }) => () => {
    this.props.history.push('/calendar/not-available', {
      start: start.format('YYYY-MM-DDTHH:mm'),
      end: end.format('YYYY-MM-DDTHH:mm'),
      parentId,
      id,
      from: 'week',
      wholeDay,
    });
  };
  
  renderEvents = dayIndex => {
    const format = 'YYYY-MM-DD HH:mm';
    return this.props.weekEvents && this.props.weekEvents.length
      ? this.props.weekEvents.map((day, index) => {
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
                  wholeDay: day.all_day,
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
        })
      : null;
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

  renderWeek = () => {
    return [...Array(7)].map((value, i) => {
      return (
        <Day key={i}>
          <SelectableGroup
            ref={ref => (this[`selectableGroup${i}`] = ref)}
            className="main"
            clickClassName="tick"
            enableDeselected
            globalMouse
            allowClickWithoutSelected={true}
            onSelectionFinish={this.onSelectionToggle(i)}
          >
            <Fragment>
              {this.state.hours.map((hour, idx) => {
                if (
                  hour.index === 8 ||
                  hour.index === this.state.hours.length - 1
                ) {
                  return (
                    <Cell
                      available={false}
                      hour={idx - 1}
                      day={
                        i === 0
                          ? this.state.weekStart
                          : this.state.weekStart.clone().add(i, 'd')
                      }
                      key={idx}
                    />
                  );
                }
                if (hour.index === this.state.hours.length - 3) {
                  return (
                    <Cell
                      available
                      hour={idx - 1}
                      day={
                        i === 0
                          ? this.state.weekStart
                          : this.state.weekStart.clone().add(i, 'd')
                      }
                      key={idx}
                    />
                  );
                }
                return (
                  <Cell
                    available={hour.available}
                    className={
                      hour.available === false ? 'not-selectable' : null
                    }
                    hour={idx - 1}
                    day={
                      i === 0
                        ? this.state.weekStart
                        : this.state.weekStart.clone().add(i, 'd')
                    }
                    key={idx}
                  />
                );
              })}
            </Fragment>
          </SelectableGroup>
          {this.renderEvents(i)}
        </Day>
      );
    });
  };

  animateSwipe = (props, onComplete) => () => {
    return anime({
      targets: '[data-swipe-container]',
      rotate: 3,
      duration: 300,
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

  onClearSelection = i => () => {
    if (this[`selectableGroup${i}`]) {
      this[`selectableGroup${i}`].clearSelection();
    }
  };

  onSelectionToggle = i => data => {
    this.setState(state => {
      if (data && data.length) {
        return {
          ...state,
          isModalOpen: !state.isModalOpen,
          startHour: data[0].props.hour,
          endHour: data[data.length - 1].props.hour + 1,
          day: data[0].props.day,
          groupIndex: i,
          from: 'week'
        };
      }
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        groupIndex: i,
      };
    });
  };

  onModalClose = () => {
    this.setState(state => {
      return {
        ...state,
        isModalOpen: false,
      };
    });
  };

  renderAvailability = dayIndex => {
    if (this.props.availability && this.props.availability.length) {
      return this.props.availability.map((day, i) => {
        if (dayIndex === i) {
          return <Availability key={i} day={day} />;
        }
        return null;
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <CustomModal open={this.state.isModalOpen} size="mini">
          <Modal.Content>
            <CalendarAdd
              history={this.props.history}
              onClose={this.onModalClose}
              day={this.state.day}
              startHour={this.state.startHour}
              endHour={this.state.endHour}
              from={this.state.from}
              modalClose={this.onModalClose}
              onClearSelection={this.onClearSelection(this.state.groupIndex)}
            />
          </Modal.Content>
        </CustomModal>
        <Navigation
          title={
            <FormattedMessage
              id="calendar.angel.weekView.navTitle"
              values={{ week: this.state.weekStart.format('w, MMM YYYY') }}
            />
          }
          onBack={this.props.history.goBack}
        />
        <Error />
        <Segment vertical basic>
          <Hammer
            options={this.hammerOptions}
            direction="DIRECTION_HORIZONTAL"
            onSwipeLeft={this.animateSwipe(
              this.swipeLeftOptions,
              this.moveWeeks('backward')
            )}
            onSwipeRight={this.animateSwipe(
              this.swipeRightOptions,
              this.moveWeeks('forward')
            )}
          >
            <div style={{ width: '100%', padding: 0 }}>
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
            </div>
          </Hammer>
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  weekEvents: getWeekEvents(state),
  availability: getWeekAvailability(state),
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
  updatedAt: getUpdatedAt(state),
});

const mapDispatchToProps = dispatch => ({
  getWeekEvents: data => dispatch(onGetWeekEvents(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AngelWeek);

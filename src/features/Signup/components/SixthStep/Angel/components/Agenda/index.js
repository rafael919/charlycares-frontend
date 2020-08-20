import React, { Component, Fragment } from 'react';
import moment from 'moment';
import TimeTable from './components/TimeTable';
import Day from './components/Day';
import WeekDay from './components/WeekDay';
import Week from './components/Week';
import WeekControl from './components/WeekControl';
import Cell from './components/Cell';

export default class Agenda extends Component {
  static defaultProps = {
    timeslots: [],
    next: () => {},
    getNextWeek: () => {},
    getPrevWeek: () => {},
    week: '',
  };

  mapDataToDays = () => {
    let days = [];
    let times = [];

    if (this.props.timeslots) {
      this.props.timeslots.forEach((slot, i) => {
        if (i === 0) {
          times.push(slot);
        } else {
          if (
            new Date(slot.start_date).getDay() ===
            new Date(this.props.timeslots[i - 1].start_date).getDay()
          ) {
            times.push(slot);
          } else {
            if (days.length > 0) {
              times.unshift(slot);
            }

            days.push(times);
            times = [];
          }
        }
      });
      return days;
    } else {
      return [];
    }
  };

  onCellClick = id => () => {
    this.props.onTimeslotSelect(id);
    this.props.next();
  };

  render() {
    const days = this.mapDataToDays();
    return (
      <Fragment>
        <WeekControl
          date={days[0] && days[0][1].start_date}
          onLeft={this.props.getPrevWeek}
          onRight={this.props.getNextWeek}
          weekNumber={this.props.week}
        />
        <Week>
          {days.map((day, i) => {
            return <WeekDay key={i} index={i} date={day[1].start_date} />;
          })}
        </Week>
        <TimeTable>
          {days.map((day, i) => {
            return (
              <Day key={i}>
                {day.map(cell => {
                  const isDateAvailable =
                    new Date().getDate() <=
                      new Date(cell.start_date).getDate() &&
                    new Date().getMonth() <=
                      new Date(cell.start_date).getMonth();
                  return (
                    <Cell
                      onClick={
                        cell.available === 1 ? this.onCellClick(cell) : null
                      }
                      available={cell.available === 1 && isDateAvailable}
                      key={cell.id}
                    >
                      {moment(cell.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                        'HH:mm'
                      )}
                    </Cell>
                  );
                })}
              </Day>
            );
          })}
        </TimeTable>
      </Fragment>
    );
  }
}

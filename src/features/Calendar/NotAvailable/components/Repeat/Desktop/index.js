import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Header, Segment } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import Divider from 'Components/Divider';
import React, { Component, Fragment } from 'react';
import Navigation from 'Components/Navigation';

import ListItem from '../components/ListItem';
import StyledList from '../components/List';

class Repeat extends Component {
  state = {
    repeatedDays: [],
  };

  static defaultProps = {
    days: [],
  };

  componentDidMount() {
    const repeatedDays = this.generateDays();

    this.setState({
      repeatedDays,
    });
  }

  generateDays = (initialDay = { startDate: new Date() }) => {
    let futureDays = [];
    const numberOfFutureWeeks = 12;

    for (let i = 1; i <= numberOfFutureWeeks; i++) {
      let day = {
        date: moment(initialDay.startDate, 'YYYY-MM-DD').add(i, 'w'),
        checked: false,
      };
      futureDays.push(day);
    }

    return futureDays;
  };

  onAddDay = repeatedDay => () => {
    const dayId = Number(this.props.match.params.dayId);
    if (this.props.days[dayId - 1]) {
      const newDaysArr = this.props.days.map(day => {
        if (day.id === dayId) {
          let repetitions;
          if (day.repetitions.includes(repeatedDay)) {
            repetitions = day.repetitions.filter(r => r !== repeatedDay);
          } else {
            repetitions = [...day.repetitions, repeatedDay];
          }
          day.repetitions = repetitions;

          return day;
        }
        return day;
      });
      this.props.addRepeatedDay(newDaysArr);
    }
  };

  isDateChecked = (day, date) => {
    if (day && day.repetitions) {
      return day.repetitions.includes(moment(date).format('YYYY-MM-DD'));
    }
    return false;
  };

  getNumberOfSelected(day) {
    if (day && day.repetitions && day.repetitions.length) {
      return day.repetitions.length;
    }
    return 0;
  }

  render() {
    let day = this.props.days[Number(this.props.match.params.dayId) - 1];

    return (
      <Fragment>
        <Navigation
          title={day && moment(day.startDate, 'YYYY-MM-DD').format('dddd')}
          subTitle={day && `${day.startTime} - ${day.endTime}`}
          onBack={this.props.history.goBack}
        />
        <Segment basic vertical>
          <Divider />
          <Segment basic vertical floated="left">
            <Header as="h5">
              <FormattedMessage id="booking.repeat.repetitions" />
            </Header>
          </Segment>
          <Segment basic vertical floated="right">
            <InlineText primaryFont accentText>
              {this.getNumberOfSelected(day)} <FormattedMessage id="of" /> 12
            </InlineText>
          </Segment>

          <Segment basic vertical>
            <StyledList verticalAlign="middle">
              {this.state.repeatedDays.map((rDay, i) => {
                return (
                  <ListItem
                    onAdd={this.onAddDay(
                      moment(rDay.date).format('YYYY-MM-DD')
                    )}
                    key={i}
                    date={moment(rDay.date).format('MMMM DD')}
                    checked={this.isDateChecked(day, rDay.date)}
                  />
                );
              })}
            </StyledList>
          </Segment>
        </Segment>
        <Confirmation>
          <BasicButton primary fluid onClick={this.props.history.goBack}>
            <FormattedMessage id="booking.repeat.btn" />
          </BasicButton>
        </Confirmation>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Repeat);

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import Divider from 'Components/Divider';
import React, { Component, Fragment } from 'react';
import Navigation from 'Components/Navigation';

import { getDays } from '../../selectors';
import { getBooks } from '../../../../Chat/selectors';
import { addRepeatedDay, clearRepeatedDays } from '../../actions';
import { addRepeatedBook, clearRepeatedBooks } from '../../../../Chat/actions';
import ListItem from '../components/ListItem';
import StyledList from '../components/List';
import RepetitionsWrapper from './components/RepetitionsWrapper';
import RepetitionColumn from './components/RepetitionColumn';
import SelectDeselect from './components/SelectDeselect';

class Repeat extends Component {
  state = {
    repeatedDays: [],
    selectAll: false,
  };

  static defaultProps = {
    days: [],
    books: [],
  };

  componentDidMount() {
    const { dayId, bookId } = this.props.match.params;
    const { days, books, location } = this.props;

    const book_id =
      location.state && location.state.bookDay
        ? location.state.bookDay.id
        : dayId;

    const day = book_id
      ? days[Number(book_id) - 1]
      : books.find(b => b.id === Number(bookId));
    const repeatedDays = this.generateDays(day);

    this.setState({
      repeatedDays,
    });
  }

  componentDidUpdate(prevProps) {
    const { dayId, bookId } = this.props.match.params;
    const { days, books, location } = this.props;

    const book_id =
      location.state && location.state.bookDay
        ? location.state.bookDay.id
        : dayId;

    const dayIndex = book_id
      ? Number(book_id) - 1
      : books.findIndex(d => d.id === Number(bookId));

    if (book_id) {
      if (prevProps.days[dayIndex].startTime !== days[dayIndex].startTime) {
        const repeatedDays = this.generateDays(days[dayIndex]);
        this.setState({
          repeatedDays,
        });
      }
    } else {
      if (prevProps.books[dayIndex].startTime !== books[dayIndex].startTime) {
        const repeatedDays = this.generateDays(books[dayIndex]);
        this.setState({
          repeatedDays,
        });
      }
    }
  }

  generateDays = (initialDay = { starTime: new Date() }) => {
    let futureDays = [];
    const numberOfFutureWeeks = 11;

    for (let i = 0; i <= numberOfFutureWeeks; i++) {
      let day = {
        date: moment(initialDay.startTime, 'YYYY-MM-DD HH:mm').add(i, 'w'),
        checked: false,
      };
      futureDays.push(day);
    }

    return futureDays;
  };

  onAddDay = repeatedDay => () => {
    const { dayId, bookId } = this.props.match.params;
    const {
      days,
      books,
      location,
      addRepeatedDay,
      addRepeatedBook,
    } = this.props;

    const book_id =
      location.state && location.state.bookDay
        ? location.state.bookDay.id
        : dayId;

    const bookDays = book_id ? days : books;
    const newId = book_id ? Number(book_id) : Number(bookId);

    if (newId && (days[newId - 1] || books.find(d => d.id === newId))) {
      const newDaysArr = bookDays.map(day => {
        if (day.id === newId) {
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
      book_id ? addRepeatedDay(newDaysArr) : addRepeatedBook(newDaysArr);
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
      return day.repetitions.length + 1;
    }
    return 1;
  }

  onClearRepeatedDays = () => {
    const { dayId, bookId } = this.props.match.params;
    const {
      days,
      books,
      location,
      clearRepeatedDays,
      clearRepeatedBooks,
    } = this.props;

    const book_id =
      location.state && location.state.bookDay
        ? location.state.bookDay.id
        : dayId;

    const bookDays = book_id ? days : books;
    const newId = book_id ? Number(book_id) : Number(bookId);

    if (newId && (days[newId - 1] || books.find(d => d.id === newId))) {
      const newDaysArr = bookDays.map(day => {
        if (day.id === newId) {
          return {
            ...day,
            repetitions: [],
          };
        }
        return day;
      });
      book_id ? clearRepeatedDays(newDaysArr) : clearRepeatedBooks(newDaysArr);
    }
  };

  onSelectAllDays = () => {
    const { dayId, bookId } = this.props.match.params;
    const {
      days,
      books,
      location,
      addRepeatedDay,
      addRepeatedBook,
    } = this.props;

    const book_id =
      location.state && location.state.bookDay
        ? location.state.bookDay.id
        : dayId;

    const bookDays = book_id ? days : books;
    const newId = book_id ? Number(book_id) : Number(bookId);

    if (newId && (days[newId - 1] || books.find(d => d.id === newId))) {
      const newDaysArr = bookDays.map(day => {
        if (day.id === newId) {
          return {
            ...day,
            repetitions: this.state.repeatedDays
              .filter((day, index) => {
                if (index > 0) {
                  return true;
                }
              })
              .map((day, index) => {
                return moment(day.date).format('YYYY-MM-DD');
              }),
          };
        }
        return day;
      });
      book_id ? addRepeatedDay(newDaysArr) : addRepeatedBook(newDaysArr);
    }
  };

  onSelectDeselect = () => {
    if (!this.state.selectAll) {
      this.onSelectAllDays();
      this.setState({ selectAll: true });
    } else {
      this.onClearRepeatedDays();
      this.setState({ selectAll: false });
    }
  };

  resetSelection = () => {
    this.props.history.goBack();
    this.onClearRepeatedDays();
  };

  render() {
    const { dayId, bookId } = this.props.match.params;
    const { days, books, location } = this.props;

    const book_id =
      location.state && location.state.bookDay
        ? location.state.bookDay.id
        : dayId;

    const day = book_id
      ? days[Number(book_id) - 1]
      : books.find(d => d.id === Number(bookId));

    return (
      <Fragment>
        <Navigation
          title={day && moment(day.startDate, 'YYYY-MM-DD').format('dddd')}
          subTitle={
            day &&
            `${moment(day.startTime, 'YYYY-MM-DD HH:mm').format(
              'HH:mm'
            )} - ${moment(day.endTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}`
          }
          onBack={this.resetSelection}
        />
        <Divider />
        <RepetitionsWrapper>
          <RepetitionColumn />
          <RepetitionColumn>
            <InlineText primaryFont accentText>
              {this.getNumberOfSelected(day)} <FormattedMessage id="of" /> 12
            </InlineText>
          </RepetitionColumn>
          <RepetitionColumn textAlign="right">
            <SelectDeselect
              onClick={this.onSelectDeselect}
              selectedAll={day.repetitions.length === 11}
            />
          </RepetitionColumn>
        </RepetitionsWrapper>

        <Segment basic vertical>
          <StyledList verticalAlign="middle">
            {this.state.repeatedDays.map((rDay, i) => {
              return (
                <ListItem
                  onAdd={this.onAddDay(moment(rDay.date).format('YYYY-MM-DD'))}
                  key={i}
                  date={moment(rDay.date).format('MMMM DD')}
                  checked={this.isDateChecked(day, rDay.date)}
                  index={i}
                />
              );
            })}
          </StyledList>
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

const mapStateToProps = state => ({
  days: getDays(state),
  books: getBooks(state),
});

const mapDispatchToProps = dispatch => ({
  addRepeatedDay: values => dispatch(addRepeatedDay(values)),
  clearRepeatedDays: values => dispatch(clearRepeatedDays(values)),
  addRepeatedBook: values => dispatch(addRepeatedBook(values)),
  clearRepeatedBooks: values => dispatch(clearRepeatedBooks(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repeat);

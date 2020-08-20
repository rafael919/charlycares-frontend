import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { nearestMinutes } from 'Utils';
import { Bubble } from 'react-web-gifted-chat';
import { getUserId, getBooks } from '../../selectors';
import { setInitBook, changeBook } from '../../actions';
import cornerLeft from 'Assets/icons/corner-left.svg';
import cornerRight from 'Assets/icons/corner-right.svg';
import Booking from '../Booking';
import { isMobile } from 'react-device-detect';

const startTime = date =>
  nearestMinutes(15, moment(date).add(0, 'hours')).format('YYYY-MM-DD HH:mm');

const endTime = date =>
  nearestMinutes(15, moment(date).add(2, 'h')).format('YYYY-MM-DD HH:mm');

const bookingDate = currentMessage => ({
  id: currentMessage.id,
  initialDate: moment(currentMessage.proposed_date.date).format('YYYY-MM-DD'),
  initialStartTime: moment(startTime(currentMessage.proposed_date.date)).format(
    'YYYY-MM-DD HH:mm'
  ),
  initialEndTime: moment(endTime(currentMessage.proposed_date.date)).format(
    'YYYY-MM-DD HH:mm'
  ),
  startDate: moment(startTime(currentMessage.proposed_date.date)).format(
    'YYYY-MM-DD'
  ),
  startTime: startTime(currentMessage.proposed_date.date),
  endTime: endTime(currentMessage.proposed_date.date),
  repetitions: [],
});

class RenderBubble extends React.Component {
  componentDidMount() {
    const { init_props, books, setInitBook } = this.props;
    const bookStatus =
      init_props.currentMessage.proposed_date &&
      !books.find(b => b.id === init_props.currentMessage.id);

    if (bookStatus) {
      setInitBook(bookingDate(init_props.currentMessage));
    }
  }

  onDayFieldChange = dayIndex => field => (e, data) => {
    const newValues = this.props.books.map(day => {
      if (day.id === dayIndex) {
        const startTimeCopy = moment(day.startTime).format('HH:mm');
        const endTimeCopy = moment(day.endTime).format('HH:mm');
        if (field === 'startTime') {
          const start = moment(
            `${day.startDate} ${data.value}`,
            'YYYY-MM-DD HH:mm'
          );
          const end = moment(
            `${day.startDate} ${endTimeCopy}`,
            'YYYY-MM-DD HH:mm'
          );
          const diff = end.diff(start, 'h');
          if (diff < 2) {
            return {
              ...day,
              startTime: nearestMinutes(15, start.clone()).format(
                'YYYY-MM-DD HH:mm'
              ),
              endTime: nearestMinutes(15, start.clone())
                .add(2, 'hours')
                .format('YYYY-MM-DD HH:mm'),
            };
          }

          return {
            ...day,
            startTime: nearestMinutes(15, start.clone()).format(
              'YYYY-MM-DD HH:mm'
            ),
          };
        } else {
          const start = moment(
            `${day.startDate} ${startTimeCopy}`,
            'YYYY-MM-DD HH:mm'
          );
          const end = moment(
            `${day.startDate} ${data.value}`,
            'YYYY-MM-DD HH:mm'
          );

          if (end.isBefore(start)) {
            return {
              ...day,
              endTime: nearestMinutes(15, end.clone().add(1, 'day')).format(
                'YYYY-MM-DD HH:mm'
              ),
            };
          }

          return {
            ...day,
            endTime: nearestMinutes(15, end.clone()).format('YYYY-MM-DD HH:mm'),
          };
        }
      }
      return day;
    });

    this.props.changeBook(newValues);
  };

  onMobileDayFieldChange = dayIndex => data => {
    const status =
      data.startTime.clone().diff(moment(new Date()), 'week', true) > 4;
    status && this.props.alertOpen();

    const newValues = this.props.books.map(day => {
      if (day.id === dayIndex) {
        return {
          ...day,
          startTime: data.startTime.clone().format('YYYY-MM-DD HH:mm'),
          endTime: data.endTime.clone().format('YYYY-MM-DD HH:mm'),
          repetitions: [],
        };
      }
      return day;
    });
    this.props.changeBook(newValues);
  };

  onDateChange = (dayId, field) => date => {
    const status = date.diff(moment(new Date()), 'week', true) > 4;
    status && this.props.alertOpen();

    const newValues = this.props.books.map(day => {
      if (day.id === dayId) {
        const startT = moment(day.startTime, 'YYYY-MM-DD HH:mm').format(
          'HH:mm'
        );
        const endT = moment(day.endTime, 'YYYY-MM-DD HH:mm').format('HH:mm');
        return {
          ...day,
          startTime: `${date.format('YYYY-MM-DD')} ${startT}`,
          endTime: `${date.format('YYYY-MM-DD')} ${endT}`,
          startDate: `${date.format('YYYY-MM-DD')}`,
          repetitions: [],
        };
      }
      return day;
    });
    this.props.changeBook(newValues);
  };

  onBookContinue = (bookDay, role, currentMessage) => () => {
    let { history, userId } = this.props;
    if (currentMessage.booking_id === 0) {
      if (isMobile) {
        history.push(`/book/${currentMessage.role_id}`, {
          bookDay,
          role,
          user_id: Number(userId),
        });
      } else {
        role === 'family'
          ? history.push(`/favorites/booking/${currentMessage.role_id}`, {
              bookDay,
              role,
              user_id: Number(userId),
            })
          : history.push(`/families/booking/${currentMessage.role_id}`, {
              bookDay,
              role,
              user_id: Number(userId),
            });
      }
    } else {
      history.push(`/booking`);
    }
  };

  onLongPress = () => {};

  render() {
    const {
      init_props,
      userId,
      books,
      location,
      onBookCancel,
      onDatePickerChange,
    } = this.props;

    const me =
      init_props.currentMessage.user.id === Number(userId) ||
      init_props.currentMessage.user.id === undefined;

    const day =
      books.length > 0 &&
      books.find(d => d.id === init_props.currentMessage.id);

    const bookStatus =
      init_props.currentMessage.proposed_date && books.length > 0 && day;

    const wrapperLeftStyle = {
      maxWidth: '100%',
      borderRightWidth: bookStatus ? 0 : 1,
      borderColor: '#c7c7c9',
      borderRadius: 5,
      boxShadow: bookStatus
        ? '0 0 0 0 rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)'
        : '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff',
    };
    const wrapperRightStyle = {
      maxWidth: '100%',
      borderLeftWidth: bookStatus ? 0 : 1,
      borderColor: '#c7c7c9',
      borderRadius: 5,
      boxShadow: bookStatus
        ? '0 0 0 0 rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)'
        : '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#DFF1D4',
    };
    const textStyle = {
      wordWrap: 'break-word',
      fontSize: '15px',
      color: '#303036',
    };

    return (
      <ChatBaloon me={me} bookStatus={bookStatus}>
        <Bubble
          {...init_props}
          wrapperStyle={{
            left: wrapperLeftStyle,
            right: wrapperRightStyle,
          }}
          textStyle={{
            left: textStyle,
            right: textStyle,
          }}
          onLongPress={this.onLongPress}
        />
        {bookStatus && (
          <Booking
            day={day}
            onDayFieldChange={this.onDayFieldChange}
            onMobileDayFieldChange={this.onMobileDayFieldChange}
            onDateChange={this.onDateChange}
            name={location.state && location.state.name}
            onBookContinue={this.onBookContinue}
            onBookCancel={onBookCancel}
            currentMessage={init_props.currentMessage}
            userId={userId}
            onDatePickerChange={onDatePickerChange}
          />
        )}
        <CustomImage me={me} src={me ? cornerRight : cornerLeft} />
      </ChatBaloon>
    );
  }
}

const ChatBaloon = styled.div`
  max-width: 85%;
  ${props => props.bookStatus && 'width: 85%;'}
  position: relative;
  ${props => props.me && 'margin-left: auto;'}
  background-color: ${props =>
    props.bookStatus ? (props.me ? '#DFF1D4' : '#fff') : `transparent`};
  border: ${props => (props.bookStatus ? `1` : `0`)}px solid #c7c7c9;
  border-radius: ${props => (props.me ? '5px 5px 0 5px;' : '5px 5px 5px 0;')};
  box-sizing: border-box;
  box-shadow: ${props =>
    props.bookStatus
      ? `0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2)`
      : `0 0px 0px 0 rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)`};
  margin-bottom: 1rem;

  &::after {
    content: '';
    width: 15px;
    height: 5px;
    position: absolute;
    bottom: -1px;
    ${props => (props.me ? 'right: 0;' : 'left: 0;')};

    background-color: ${props => (props.me ? '#DFF1D4' : '#fff')};
    z-index: 0;
  }
`;

const CustomImage = styled.img`
  position: absolute;
  ${props => (props.me ? ` right: -5px;` : `left: -5px;`)};
  bottom: -16px;
  z-index: 0;
  width: 25px;
  height: auto;
`;

const mapStateToProps = state => ({
  userId: getUserId(state),
  books: getBooks(state),
});

const mapDispatchToProps = dispatch => ({
  setInitBook: values => dispatch(setInitBook(values)),
  changeBook: values => dispatch(changeBook(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderBubble);

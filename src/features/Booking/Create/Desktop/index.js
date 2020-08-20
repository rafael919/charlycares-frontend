import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import { Segment, Image } from 'semantic-ui-react';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import DesktopError from 'Components/DesktopError';
import Divider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import WithRole from 'Components/WithRole';
import flatten from 'ramda/es/flatten';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import PhoneModal from 'Components/PhoneModal';
import Alert from 'Components/Alert';
import React from 'react';
import { getAge } from 'Utils';

import calendar from 'Assets/icons/calendar.svg';

import { getDays } from '../selectors';
import { getErrors } from '../../../../ui/selectors';
import { getFavorites } from '../../../Favorites/selectors';
import { getFamilies } from '../../../AngelFamilies/data/selectors';
import { onAngelsSearch, clearSelectedAngels } from '../../data/actions';
import socket from '../../../../socket';
import Loader from 'Components/Loader';

import {
  onDayFieldChange,
  onAddDay,
  onClearDays,
  onDeleteDay,
} from '../actions';
import API from '../../Send/api';
import ChatAPI from '../../../Chat/api';
import { onErrorConfirm } from '../../../../ui/actions';
import AddBtnWrapper from '../components/AddBtnWrapper';
import Day from '../components/Day/Desktop';
import MaxDaysMessage from '../components/MaxDaysMessage';
import NavigateToBooking from '../components/NavigateToBooking';
import Angel from '../../../Favorites/components/components/Angel';
import FamilyContact from '../../../AngelFamilies/Families/components/FamilyContact';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';

const onAngelSelect = memoizeWith(
  id => id,
  curry((id, history, _e) => {
    history.push('/favorites/angel/' + id, { from: 'favorites' });
  })
);

class BookingCreate extends React.PureComponent {
  startDateAndTimeInput = React.createRef();
  static defaultProps = {
    days: [],
    addresses: [],
    city: '',
    children: [],
  };
  makeDays = () => {
    if (!this.props.days.length) return;
    if (this.props.days.length === 1) {
      return [
        {
          id: 1,
          startDate: this.props.days[0].startDate,
          startTime: this.props.days[0].startTime,
          endTime: this.props.days[0].endTime,
        },
      ];
    }
    return this.props.days.map((day, i) => {
      return {
        id: i + 1,
        startDate: day.startDate,
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });
  };

  state = {
    days: [],
    showPhoneModal: false,
    errors: null,
    isLoading: false,
    tooFarAheadWarning: false,
    multiTooEarlyWarning: false,
  };

  componentDidMount() {
    const {
      days,
      location,
      history,
      onAddDay,
      onClearSelectedAngels,
      onDayFieldChange,
    } = this.props;

    if (location.state && location.state.bookDay && history.action === 'PUSH') {
      const newBook = {
        ...location.state.bookDay,
        id: 1,
      };
      onDayFieldChange([newBook]);
    } else if (days.length === 0) {
      onAddDay();
    }
    onClearSelectedAngels();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.days || prevProps.days.length !== this.props.days.length) {
      this.setState(prevState => {
        return {
          ...prevState,
          days: this.makeDays(),
        };
      });
    }
    if (socket.disconnected) {
      socket.connect();
    }
  }
  onClose = () => {
    this.props.history.goBack();
  };

  onSubmitDates = () => {
    const date = moment(this.props.days[0].startDate);
    const multi =
      this.props.days.length > 1 || this.props.days[0].repetitions.length > 1;
    if (date.diff(moment(new Date()), 'week', true) > 4) {
      return this.setState({ tooFarAheadWarning: true });
    } else if (date.diff(moment(new Date()), 'week', true) <= 1 && multi) {
      return this.setState({ multiTooEarlyWarning: true });
    } else {
      this.onSearch();
    }
  };

  onSearch = () => {
    const dates = this.props.days.map(day => {
      const selectedDay = {
        start_date: moment(day.startTime, 'YYYY-MM-DD HH:mm').format('X'),
        end_date: moment(day.endTime, 'YYYY-MM-DD HH:mm').format('X'),
      };

      if (day.repetitions) {
        let startTimeFormatted = moment(
          day.startTime,
          'YYYY-MM-DD HH:mm'
        ).format('HH:mm');
        let endTimeFormatted = moment(day.endTime, 'YYYY-MM-DD HH:mm').format(
          'HH:mm'
        );

        const repeatedDays = day.repetitions.map(date => {
          // if (
          //   moment(endTimeFormatted, 'HH:mm').isBefore(
          //     moment(startTimeFormatted, 'HH:mm'),
          //     'h'
          //   )
          // ) {
          //   endDate = moment(date, 'YYYY-MM-DD')
          //     .add(1, 'd')
          //     .format('YYYY-MM-DD');
          // } else {
          //   endDate = date;
          // }
          return {
            start_date: moment(
              `${date} ${startTimeFormatted}`,
              'YYYY-MM-DD HH:mm'
            ).format('X'),
            end_date: moment(
              `${date} ${endTimeFormatted}`,
              'YYYY-MM-DD HH:mm'
            ).format('X'),
          };
        });

        return [selectedDay, ...repeatedDays];
      }

      return [selectedDay];
    });

    const data = {
      dates: flatten(dates),
    };

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSearchAngels', {
        repeatQuantity: data.dates.length,
      });
    }

    this.props.onAngelsSearch(data);
    this.props.history.push('/booking/search');
  };

  onFieldBlur = (field, setterFunc) => () => {
    setterFunc(field, this.state[field]);
  };

  onDayFieldChange = dayIndex => field => (e, data) => {
    const newValues = this.props.days.map(day => {
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

    this.props.onDayFieldChange(newValues);
  };

  onDateChange = (dayId, field) => date => {
    const newValues = this.props.days.map(day => {
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
    this.props.onDayFieldChange(newValues);
  };

  makeDatesArr = (days = []) => {
    return days.map(day => {
      const selectedDay = {
        start_date: moment(`${day.startTime}`, 'YYYY-MM-DD HH:mm').format('X'),
        end_date: moment(`${day.endTime}`, 'YYYY-MM-DD HH:mm').format('X'),
      };

      const mappedRepetitions = day.repetitions.map(rep => {
        return {
          start_date: moment(
            `${rep} ${moment(`${day.startTime}`, 'YYYY-MM-DD HH:mm').format(
              'HH:mm'
            )}`,
            'YYYY-MM-DD HH:mm'
          ).format('X'),
          end_date: moment(
            `${rep} ${moment(`${day.endTime}`, 'YYYY-MM-DD HH:mm').format(
              'HH:mm'
            )}`,
            'YYYY-MM-DD HH:mm'
          ).format('X'),
        };
      });
      return [selectedDay, ...mappedRepetitions];
    });
  };

  onSend = () => {
    this.setState({
      isLoading: true,
    });
    const { days, location, history } = this.props;
    const { id } = this.props.match.params;

    const dates = this.makeDatesArr(days);

    let data = {
      family_id: id,
      dates,
      message: '',
    };

    if (location.state.role === 'family') {
      data = {
        angel_ids: [id],
        dates,
        message: '',
      };
    }

    if (socket.connected) {
      API.createBooking(data)
        .then(({ data }) => {
          if (data.success === true) {
            if (location.state && location.state.bookDay.id === 1) {
              if(!location.state.receiver_id) {
                this.props.history.push('/booking');
              }
              let m_data = new FormData();
              m_data.append('receiver_id', location.state.receiver_id);
              m_data.append('message', '');
              m_data.append('booking_id', data.data.booking_id);
              ChatAPI.sendMessage(m_data).then(s_data => {
                if (s_data.data.success === true) {
                  ChatAPI.cancelBook(s_data.data.data.message.id, {
                    booking_id: data.data.booking_id,
                    booked_user: location.state.user_id,
                  });
                  socket.emit(
                    'CHAT_BOOK_SENT',
                    s_data.data.data,
                    location.state.user_id,
                    location.state.role
                  );

                  let new_last = {
                    id: s_data.data.data.message.id,
                    text: '',
                    createdAt: s_data.data.data.message.created_at,
                    user: {
                      id: Number(s_data.data.data.message.user_id),
                    },
                    image: '',
                    proposed_date: s_data.data.data.proposed_date,
                    read: 1,
                    show_date: 1,
                    booking_id: data.data.booking_id,
                    receiver_id: Number(s_data.data.data.message.receiver_id),
                  };

                  socket.emit(
                    'CHAT_SEND',
                    new_last,
                    location.state.conversation_id,
                    true
                  );
                  this.setState({
                    isLoading: false,
                  });
                  history.goBack();
                }
              });
            } else {
              ChatAPI.cancelBook(location.state.bookDay.id, {
                booking_id: data.data.booking_id,
                booked_user: location.state.user_id,
              });
              socket.emit(
                'CHAT_BOOK_SENT',
                location.state.bookDay.id,
                location.state.user_id,
                location.state.role
              );
              this.setState({
                isLoading: false,
              });
              history.goBack();
            }
          }
        })
        .catch(errors => {
          this.setState({ errors });
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  toggleTooFarAheadWarning = () => {
    this.setState({ tooFarAheadWarning: false });
  };

  toggleMultiTooEarlyWarning = () => {
    this.setState({ multiTooEarlyWarning: false });
  };

  renderDays = () => {
    const { days, location } = this.props;
    return days.map((day, i) => (
      <Day
        key={day.id}
        dayIndex={day.id}
        index={i}
        onValueChange={this.onDayFieldChange(day.id)}
        onDateChange={this.onDateChange(day.id, 'startDate')}
        startTime={day.startTime}
        initialDate={day.initialDate}
        initialStartTime={day.initialStartTime}
        endTime={day.endTime}
        repetitions={day.repetitions}
        onShowInCalendar={this.onShowInCalendar}
        onDeleteDay={this.deleteDay}
        chatBook={false}
        bookDay={location.state && location.state.bookDay && day}
      />
    ));
  };

  onShowInCalendar = () => {
    this.props.history.push('/booking/create/show-calendar');
  };

  addDay = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        days: [
          ...prevState.days,
          {
            id: prevState.days.length + 1,
            dateTime: '',
            endTime: '',
          },
        ],
      };
    }, this.props.onAddDay());
  };

  deleteDay = id => () => {
    this.props.onDeleteDay(id);
  };

  clearDays = () => {
    this.props.history.goBack();
    this.props.onClearDays();
  };

  onErrorConfirm = () => {
    this.setState({ errors: null });
  };

  render() {
    const { location, match, favorites, families, history } = this.props;
    const {
      showPhoneModal,
      errors,
      tooFarAheadWarning,
      multiTooEarlyWarning,
    } = this.state;
    const status = location.state && location.state.bookDay;

    const angel =
      status &&
      favorites.length > 0 &&
      favorites.find(
        f => f.user.angel && f.user.angel.id === Number(match.params.id)
      );

    const family =
      status &&
      families.length > 0 &&
      families.find(
        f => f.user.family && f.user.family.id === Number(match.params.id)
      );

    return (
      <React.Fragment>
        {this.state.isLoading && <Loader />}
        <Navigation
          onBack={this.clearDays}
          title={<FormattedMessage id="booking.create.navTitle" />}
        />
        <PhoneModal open={showPhoneModal} toggle={this.togglePhoneModal} />
        <Alert
          toggle={this.toggleTooFarAheadWarning}
          open={tooFarAheadWarning}
          desc={<FormattedMessage id="booking.create.moreThan4WeeksAhead" />}
          onPress={this.onSearch}
        />
        <Alert
          toggle={this.toggleMultiTooEarlyWarning}
          open={multiTooEarlyWarning}
          desc={<FormattedMessage id="booking.create.multiTooEarly" />}
          onPress={this.onSearch}
        />
        <DesktopError
          errors={errors || this.props.errors}
          onErrorConfirm={this.onErrorConfirm || onErrorConfirm}
        />
        {status && (
          <CustomRow
            style={{
              backgroundColor: '#F9F8F9',
              width: '110%',
              marginLeft: '-1.1rem',
            }}
            padding="1rem 0 0 0"
          >
            <WithRole>
              {role =>
                role === 'family' && angel ? (
                  <Angel
                    div
                    onAngelSelect={onAngelSelect(angel.id, history)}
                    img={angel.image}
                    name={angel.first_name}
                    age={getAge(angel.birthdate)}
                    phone={angel.phone}
                    id={angel.id}
                    userId={angel.user_id}
                    history={history}
                    wasBooked={angel.last_booking}
                    togglePhoneModal={this.togglePhoneModal}
                    angel={angel}
                    readed={true}
                  />
                ) : (
                  family && (
                    <CustomRow
                      noBorderTop
                      borderBottom
                      style={{ backgroundColor: '#fff', width: '105%' }}
                      padding="0.80625rem 1rem 0.3rem 1rem"
                    >
                      <FamilyContact
                        name={family.last_name}
                        img={family.image}
                        id={family.user_id}
                        familyId={family.id}
                        newMessage={family.new_messages}
                        phone={family.phone}
                        history={history}
                        activeSitting={true}
                        togglePhoneModal={this.togglePhoneModal}
                        family={family}
                        readed={true}
                      />
                    </CustomRow>
                  )
                )
              }
            </WithRole>
          </CustomRow>
        )}
        {this.renderDays()}
        <Divider
          both
          noBottomBorder={this.state.days && this.state.days.length === 3}
        >
          {this.state.days && this.state.days.length === 3 ? (
            <MaxDaysMessage>
              <FormattedMessage id="booking.create.maxDays" />
            </MaxDaysMessage>
          ) : (
            <div />
          )}
          <NavigateToBooking onClick={this.onShowInCalendar}>
            <FormattedMessage id="booking.create.showCalendar" />
            <Image avatar src={calendar} />
          </NavigateToBooking>
        </Divider>
        {this.props.days.length < 3 ? (
          <AddBtnWrapper>
            <AddBtn onClick={this.addDay} padding="0.6875em 1.5em 0.6875em 0">
              <FormattedMessage id="booking.create.addDay" />
            </AddBtn>
          </AddBtnWrapper>
        ) : null}
        <Segment
          basic
          vertical
          style={{
            background: 'white',
            bottom: '-4rem',
            position: '-webkit-sticky',
            margin: '-1rem',
            padding: '1rem',
          }}
        >
          <Confirmation>
            <BasicButton
              onClick={status ? this.onSend : this.onSubmitDates}
              primary
              fluid
            >
              {status ? (
                <FormattedMessage id="booking.create.chatBtn" />
              ) : (
                <FormattedMessage id="booking.create.btn" />
              )}
            </BasicButton>
          </Confirmation>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  days: getDays(state),
  errors: getErrors(state),
  favorites: getFavorites(state),
  families: getFamilies(state),
});

const mapDispatchToProps = dispatch => ({
  onAddDay: () => dispatch(onAddDay()),
  onClearDays: () => dispatch(onClearDays()),
  onDayFieldChange: values => dispatch(onDayFieldChange(values)),
  onAngelsSearch: data => dispatch(onAngelsSearch(data)),
  onDeleteDay: id => dispatch(onDeleteDay(id)),
  onClearSelectedAngels: () => dispatch(clearSelectedAngels()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCreate);

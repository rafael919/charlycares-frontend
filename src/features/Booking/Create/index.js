import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import WithRole from 'Components/WithRole';
import Error from 'Components/Error';
import flatten from 'ramda/es/flatten';
import Layout from 'Components/Layout';
import moment from 'moment';
import React from 'react';
import { getAge } from 'Utils';
import socket from '../../../socket';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';

import calendar from 'Assets/icons/calendar.svg';

import { getDays } from './selectors';
import { getFavorites } from '../../Favorites/selectors';
import { getFamilies } from '../../AngelFamilies/data/selectors';
import { onAngelsSearch } from '../data/actions';
import {
  onDayFieldChange,
  onAddDay,
  onClearDays,
  onDeleteDay,
} from './actions';
import API from '../Send/api';
import ChatAPI from '../../Chat/api';
import Angel from '../../Favorites/components/components/Angel';
import FamilyContact from '../../AngelFamilies/Families/components/FamilyContact';
import AddBtnWrapper from './components/AddBtnWrapper';
import NavigateToBooking from './components/NavigateToBooking';
import Day from './components/Day';
import MaxDaysMessage from './components/MaxDaysMessage';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';

const onAngelSelect = memoizeWith(
  id => id,
  curry((id, history, _e) => {
    history.push('/angel/' + id, { from: 'favorites' });
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

  state = {
    days: [],
    dateTime: '',
    endTime: '',
    timeError: false,
    errors: null,
    isLoading: false,
    tooFarAheadWarning: false,
    multiTooEarlyWarning: false
  };

  flag = 0;

  makeDays = () => {
    if (!this.props.days.length) return;
    if (this.props.days.length === 1) {
      const dateTime = moment(
        this.props.days[0].startTime,
        'YYYY-MM-DD HH:mm'
      ).format('YYYY-MM-DDTHH:mm');
      const endTime = moment(
        this.props.days[0].endTime,
        'YYYY-MM-DD HH:mm'
      ).format('HH:mm');
      return [
        {
          id: 1,
          dateTime,
          endTime,
        },
      ];
    }
    return this.props.days.map((day, i) => {
      const dateTime = moment(day.startTime, 'YYYY-MM-DD HH:mm').format(
        'YYYY-MM-DDTHH:mm'
      );
      const endTime = moment(day.endTime, 'YYYY-MM-DD HH:mm').format('HH:mm');
      return {
        id: i + 1,
        dateTime,
        endTime,
      };
    });
  };

  componentDidMount() {
    const { days, location, history, onAddDay, onDayFieldChange } = this.props;

    if (location.state && location.state.bookDay && history.action === 'PUSH') {
      const newBook = {
        ...location.state.bookDay,
        id: 1,
      };
      onDayFieldChange([newBook]);
    } else if (days.length === 0) {
      onAddDay();
    }
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
    const { history, location, onClearDays } = this.props;

    if (location.state && location.state.bookDay) {
      history.goBack();
    } else {
      history.push('/booking');
    }
    onClearDays();
  };

  onSearch = () => {
    const dates = this.props.days.map(day => {
      const startTime = day.startTime;
      const endTime = day.endTime;

      const selectedDay = {
        start_date: moment(startTime, 'YYYY-MM-DD HH:mm').format('X'),
        end_date: moment(endTime, 'YYYY-MM-DD HH:mm').format('X'),
      };

      if (day.repetitions) {
        let startTimeFormatted = moment(startTime, 'YYYY-MM-DD HH:mm').format(
          'HH:mm'
        );
        let endTimeFormatted = moment(endTime, 'YYYY-MM-DD HH:mm').format(
          'HH:mm'
        );
        const repeatedDays = day.repetitions.map(date => {
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

  onDayFieldChange = dayIndex => data => {
    const newValues = this.props.days.map(day => {
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
    this.props.onDayFieldChange(newValues);
  };

  onFieldChange = (dayId, field) => e => {
    const days = this.state.days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          [field]: e.target.value,
        };
      }
      return day;
    });

    this.setState(prevState => ({
      ...prevState,
      days: days,
    }));
  };

  onTimeError = ({ timeError }) => {
    this.setState({ timeError });
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

  onSubmitDates = () => {
    const date = moment(this.props.days[0].startTime);
    const multi = this.props.days.length > 1 || this.props.days[0].repetitions.length >= 1;
    if(date.diff(moment(new Date()), 'week', true) > 4) {
      return this.setState({ tooFarAheadWarning: true });
    } else if (date.diff(moment(new Date()), 'week', true) <= 1 && multi) {
      return this.setState({ multiTooEarlyWarning: true });
    } else {
      this.onSearch();
    }
  }

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
          this.setState({
            isLoading: false,
          });
          this.setState({ errors });
        });
    }
  };

  renderDays = () => {
    const { days, location } = this.props;

    if (this.flag > 0) {
      return days.map((day, i) => (
        <Day
          key={day.id}
          dayIndex={day.id}
          index={i}
          onValueChange={this.onFieldChange}
          onBlur={this.onDayFieldChange(day.id)}
          startTime={day.startTime}
          initialDate={day.initialDate}
          initialStartTime={day.initialStartTime}
          initialEndTime={day.initialEndTime}
          endTime={day.endTime}
          repetitions={day.repetitions}
          onDeleteDay={this.deleteDay}
          onTimeChange={this.onDayFieldChange(day.id)}
          onTimeError={this.onTimeError}
          chatBook={false}
          bookDay={location.state && location.state.bookDay && day}
        />
      ));
    }

    this.flag++;
  };

  onShowInCalendar = () => {
    this.props.history.push('/calendar');
  };

  addDay = () => {
    if (this.state.days.length <= 3) {
      this.setState(
        prevState => ({
          ...prevState,
          days: [
            ...prevState.days,
            {
              id: prevState.days.length + 1,
              dateTime: '',
              endTime: '',
            },
          ],
        }),
        this.props.onAddDay()
      );
    }
  };

  deleteDay = id => () => {
    this.props.onDeleteDay(id);
  };

  onErrorConfirm = () => {
    this.setState({ errors: null });
  };

  toggleTooFarAheadWarning = () => {
    this.setState({ tooFarAheadWarning: false });
  };


  toggleMultiTooEarlyWarning = () => {
    this.setState({ multiTooEarlyWarning: false });
  };

  render() {
    const { location, favorites, families, match, history } = this.props;
    const status = location.state && location.state.bookDay;
    const { tooFarAheadWarning, multiTooEarlyWarning } = this.state;

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
      <Layout
        onNavClose={this.onClose}
        navRightComponent={() => (
          <CustomLink primary to="/faq">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
        navTitle={<FormattedMessage id="booking.create.navTitle" />}
        navBorder
      >
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
        {this.state.isLoading && <Loader />}
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        {status && (
          <CustomRow
            style={{ backgroundColor: '#F9F8F9' }}
            padding="2rem 0 0 0"
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
                    angel={angel}
                    readed={true}
                  />
                ) : (
                  family && (
                    <CustomRow
                      noBorderTop
                      borderBottom
                      style={{ backgroundColor: '#fff', width: '130%' }}
                      padding="0.90625rem 1rem 0.3rem 1rem"
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
        <CustomRow padding={status ? '0' : '1rem 0 0 0'}>
          {this.renderDays()}
        </CustomRow>
        <CustomRow style={{ backgroundColor: '#F9F8F9' }} noPadding>
          <CustomColumn padding="0 0 90% 0" width={16}>
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

            {this.state.days && this.state.days.length <= 2 && (
              <CustomColumn>
                <AddBtnWrapper>
                  <AddBtn
                    onClick={this.addDay}
                    padding="0.6875em 1.5em 0.6875em 0"
                  >
                    <FormattedMessage id="booking.create.addDay" />
                  </AddBtn>
                </AddBtnWrapper>
              </CustomColumn>
            )}
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton
            disabled={this.state.timeError}
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
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  days: getDays(state),
  favorites: getFavorites(state),
  families: getFamilies(state),
});

const mapDispatchToProps = dispatch => ({
  onAddDay: () => dispatch(onAddDay()),
  onClearDays: () => dispatch(onClearDays()),
  onDayFieldChange: values => dispatch(onDayFieldChange(values)),
  onAngelsSearch: data => dispatch(onAngelsSearch(data)),
  onDeleteDay: id => dispatch(onDeleteDay(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCreate);

import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import Confirmation from 'Components/Confirmation';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import Availability from './components/Availability';
import Angel from './components/Angel';
import anime from 'animejs';
import moment from 'moment';
import React, { Component } from 'react';

import Buttons from './components/Buttons';
import Fields from './components/Fields';
import Repeat from './components/Repeat';
import API from './api';
import BookingAPI from '../api';

class EditBooking extends Component {
  constructor(props) {
    super(props);

    const start = moment(
      this.props.location.state.start_date,
      'YYYY-MM-DD HH:mm:ss'
    ).format('YYYY-MM-DDTHH:mm');
    const end = moment(
      this.props.location.state.end_date,
      'YYYY-MM-DD HH:mm:ss'
    ).format('HH:mm');

    const repeatedDays = this.props.location.state.bookingDates.map(date => {
      return {
        ...date,
        selected: true,
      };
    });    

    this.state = {
      startDate: start,
      endTime: end,
      tempStartDate: start,
      tempEndTime: end,
      isLoading: false,
      error: null,
      message: this.props.location.state.message,
      availableAngels: [],
      unavailableAngels: [],
      checked: false,
      isMessageEdited: false,
      showRepeat: false,
      repeatedDays,
      initialRepeatedDays: repeatedDays,
    };
  }

  onChange = e => {
    const field = e.currentTarget.getAttribute('name');
    this.setState({
      [field]: e.currentTarget.value,
    });

    if(field === 'startDate' || field === 'endDate') {
      this.setState({
        availableAngels: [], 
        unavailableAngels: [], 
        checked: false
      });   
    }
  };

  onBlur = e => {
    e.persist();
    const field = e.target.getAttribute('id');
    this.setState(state => {
      const time = state.tempStartDate.split('T');
      if (field === 'startDate') {
        const timeDiff = moment(
          `${time[0]} ${state.tempEndTime}`,
          'YYYY-MM-DD HH:mm'
        ).diff(moment(state.tempStartDate, 'YYYY-MM-DDTHH:mm'), 'hours');
        if (timeDiff < 2) {
          return {
            ...state,
            [field]: nearestMinutes(
              15,
              moment(e.target.value, 'YYYY-MM-DDTHH:mm')
            ).format('YYYY-MM-DDTHH:mm'),
            endTime: nearestMinutes(
              15,
              moment(state.tempStartDate, 'YYYY-MM-DDTHH:mm').add(2, 'hours')
            ).format('HH:mm'),
            availableAngels: [], 
            unavailableAngels: [], 
            checked: false
          };
        }
        return {
          [field]: e.target.value,
        };
      } else {
        const timeDiff = moment(
          `${time[0]} ${state.tempEndTime}`,
          'YYYY-MM-DD HH:mm'
        ).diff(moment(state.tempStartDate, 'YYYY-MM-DDTHH:mm'), 'hours');
        if (timeDiff < 2) {
          return {
            ...state,
            [field]: nearestMinutes(
              15,
              moment(`${time[0]} ${e.target.value}`, 'YYYY-MM-DDTHH:mm')
            ).format('HH:mm'),
            startDate: nearestMinutes(
              15,
              moment(
                `${time[0]} ${state.tempEndTime}`,
                'YYYY-MM-DD HH:mm'
              ).subtract(2, 'hours')
            ).format('YYYY-MM-DDTHH:mm'),
            availableAngels: [], 
            unavailableAngels: [], 
            checked: false
          };
        }
        return {
          ...state,
          [field]: e.target.value,
        };
      }
    });
  };

  onCheckAndConfirmBookings = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const id = this.props.location.state.bookingDateId;

        const date = moment(this.state.startDate, 'YYYY-MM-DDTHH:mm');
        const startDate = date.clone().format('YYYY-MM-DD HH:mm:ss');

        const endDate = moment(
          `${date.clone().format('YYYY-MM-DD')} ${this.state.endTime}`,
          'YYYY-MM-DD HH:mm'
        ).format('YYYY-MM-DD HH:mm:ss');

        const bookingId = this.props.match.params.bookingId;
        const message = this.state.message;

        if (this.state.checked) {
          let bookingDates;
          if (this.state.repeatedDays.length === 1) {
            bookingDates = [
              {
                id,
                start_date: startDate,
                end_date: endDate,
              },
            ];
          } else {
            bookingDates = this.state.repeatedDays.map(day => {
              return {
                id: day.id,
                start_date: `${moment(
                  day.start_date,
                  'YYYY-MM-DD HH:mm:ss'
                ).format('YYYY-MM-DD')} ${date.clone().format('HH:mm')}`,
                end_date: `${moment(day.end_date, 'YYYY-MM-DD HH:mm:ss').format(
                  'YYYY-MM-DD'
                )} ${this.state.endTime}`,
              };
            });
          }
          API.editBooking({
            booking_dates: bookingDates,
            booking_id: bookingId,
            message,
          })
            .then(res => {
              this.props.history.push('/booking');
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        } else {
          let bookingDates;
          if (this.state.repeatedDays.length === 1) {
            bookingDates = [
              {
                id,
                start_date: startDate,
                end_date: endDate,
              },
            ];
          } else {
            bookingDates = this.state.repeatedDays.map(day => {
              return {
                id: day.id,
                start_date: `${moment(
                  day.start_date,
                  'YYYY-MM-DD HH:mm:ss'
                ).format('YYYY-MM-DD')} ${this.state.startTime}`,
                end_date: `${moment(day.end_date, 'YYYY-MM-DD HH:mm:ss').format(
                  'YYYY-MM-DD'
                )} ${this.state.endTime}`,
              };
            });
          }
          API.checkBookings({
            booking_dates: bookingDates,
            booking_id: bookingId,
            message,
          })
            .then(({ data }) => {
              this.setState(
                state => {
                  return {
                    ...state,
                    isLoading: false,
                    availableAngels: data.data.available_angels,
                    unavailableAngels: data.data.unavailable_angels
                      ? data.data.unavailable_angels
                      : [],
                    checked: true,
                  };
                },
                () => {
                  this.animation = anime({
                    targets: '#angels',
                    opacity: [0, 1],
                    translateY: [-50, 0],
                    duration: 300,
                    delay: 200,
                    easing: 'linear',
                  });
                }
              );
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        }
      }
    );
  };

  onCancelBooking = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        BookingAPI.cancelBooking(this.props.match.params.bookingId)
          .then(res =>
            this.setState(
              {
                isLoading: false,
              },
              () => this.props.history.push('/booking')
            )
          )
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  renderAvailableAngels = () => {
    if (this.state.availableAngels.length > 0) {
      return this.state.availableAngels.map(angel => (
        <Angel key={angel.id} angel={angel} />
      ));
    }
    return null;
  };
  renderUnavailableAngels = () => {
    if (this.state.unavailableAngels.length > 0) {
      return this.state.unavailableAngels.map(angel => (
        <Angel key={angel.id} angel={angel} unavailable />
      ));
    }
    return null;
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  toggleRepeat = type => () => {
    if (type === 'quit') {
      this.setState(state => ({
        ...state,
        showRepeat: !state.showRepeat,
        repeatedDays: state.initialRepeatedDays,
      }));
    } else {
      this.setState(state => ({
        showRepeat: !state.showRepeat,
      }));
    }
  };

  onToggleDay = index => () => {
    this.setState(state => {
      return {
        ...state,
        repeatedDays: state.repeatedDays.map((day, i) => {
          if (index === i) {
            return {
              ...day,
              selected: !day.selected,
            };
          }
          return day;
        }),
      };
    });
  };

  render() {
    if (this.state.showRepeat) {
      return (
        <Repeat
          id={this.props.match.params.bookingId}
          bookingDates={this.state.repeatedDays}
          onGoBack={this.toggleRepeat}
          onToggleDay={this.onToggleDay}
        />
      );
    }

    return (
      <Layout
        navBorder
        onNavClose={this.props.history.goBack}
        navTitle={<FormattedMessage id="booking.edit.title" />}
        navSubTitle={
          <FormattedMessage
            id="booking.edit.subTitle"
            values={{
              id: this.props.match.params.bookingId,
            }}
          />
        }
        navRightComponent={() => (
          <CustomLink to="/faq" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        {this.state.isLoading ? <Loader isLoading /> : null}

        <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />

        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Fields
                onChange={this.onChange}
                onBlur={this.onBlur}
                startDate={this.state.startDate}
                endTime={this.state.endTime}
                tempStartDate={this.state.tempStartDate}
                tempEndTime={this.state.tempEndTime}
                message={this.state.message}
                isMessageEdited={this.state.isMessageEdited}
                bookingDates={this.state.repeatedDays}
                toggleRepeat={this.toggleRepeat()}
              />
            </CustomColumn>
            <CustomColumn noPadding id="angels">
              {this.state.availableAngels.length > 0 ||
              this.state.unavailableAngels.length > 0 ? (
                <React.Fragment>
                  <Divider />
                  <Availability>
                    {this.renderAvailableAngels()}
                    {this.renderUnavailableAngels()}
                  </Availability>
                </React.Fragment>
              ) : null}
            </CustomColumn>
          </CustomRow>
          <EmptyCell />
        </ContentWrapper>
        <Confirmation>
          <Buttons
            onCheckAndConfirm={this.onCheckAndConfirmBookings}
            onCancelBooking={this.onCancelBooking}
            onCancel={this.props.history.goBack}
            checked={this.state.checked}
            available={this.state.availableAngels.length > 0 ? true : false}
          />
        </Confirmation>
      </Layout>
    );
  }
}

export default EditBooking;

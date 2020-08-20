import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import anime from 'animejs';
import Confirmation from 'Components/Confirmation';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import {
  onGetBookings,
  onBookingEdit,
  onBookingCancel,
} from '../../data/actions';
import Angel from '../components/Angel';
import API from '../api';
import Availability from '../components/Availability';
import Buttons from '../components/Buttons';
import Fields from '../components/Fields/Desktop';
import Repeat from '../components/Repeat/Desktop';

class EditBooking extends Component {
  constructor(props) {
    super(props);

    const start = moment(
      this.props.location.state.start_date,
      'YYYY-MM-DD HH:mm:ss'
    );

    const endDate = moment(
      this.props.location.state.end_date,
      'YYYY-MM-DD HH:mm:ss'
    );

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
      endDate: endDate,
      startTime: start.format('HH:mm'),
      endTime: end,
      isLoading: false,
      error: null,
      message: '',
      availableAngels: [],
      unavailableAngels: [],
      checked: false,
      isMessageEdited: false,
      showRepeat: false,
      repeatedDays,
      initialRepeatedDays: repeatedDays,
    };
  }

  onDateChange = value => {
    let tempStartDate = moment(
      value.format('YYYY-MM-DD') + ' ' + this.state.startTime,
      'YYYY-MM-DD HH:mm'
    );
    let tempEndDate = moment(
      value.format('YYYY-MM-DD') + ' ' + this.state.endTime,
      'YYYY-MM-DD HH:mm'
    );

    if (tempStartDate > tempEndDate) {
      tempEndDate.add(1, 'day');
    }

    this.setState({
      startDate: tempStartDate,
      endDate: tempEndDate,
      endTime: tempEndDate.format('HH:mm'),
      availableAngels: [],
      unavailableAngels: [],
      checked: false,
    });
  };

  onChange = e => {
    const field = e.currentTarget.getAttribute('name');
    this.setState({
      [field]: e.currentTarget.value,
    });
  };

  onTimeChange = (e, data) => {
    this.setState(
      state => {
        return {
          ...state,
          [data.name]: data.value,
        };
      },
      () => {
        let tempStartDate = moment(
          this.state.startDate.format('YYYY-MM-DD') +
            ' ' +
            this.state.startTime,
          'YYYY-MM-DD HH:mm'
        );
        let tempEndDate = moment(
          this.state.endDate.format('YYYY-MM-DD') + ' ' + this.state.endTime,
          'YYYY-MM-DD HH:mm'
        );

        if (
          tempEndDate.diff(tempStartDate, 'hours') < 2 ||
          tempStartDate > tempEndDate
        ) {
          tempEndDate = tempStartDate.clone().add(2, 'hours');
        }

        let shouldAddDay = false;
        if (tempStartDate > tempEndDate) {
          tempEndDate.add(1, 'day');
          shouldAddDay = true;
        }

        if (this.state.repeatedDays) {
          const repeatedDays = this.state.repeatedDays.map(day => {
            let startDate = moment(
              moment(day.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                'YYYY-MM-DD'
              ) +
                ' ' +
                tempStartDate.format('HH:mm'),
              'YYYY-MM-DD HH:mm'
            );
            let endDate = moment(
              moment(day.end_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') +
                ' ' +
                tempEndDate.format('HH:mm'),
              'YYYY-MM-DD HH:mm'
            );
            shouldAddDay = shouldAddDay ? endDate.add(1, 'day') : null;
            return {
              ...day,
              start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
              end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
            };
          });

          this.setState({
            repeatedDays: repeatedDays,
          });
        }

        this.setState({
          startDate: tempStartDate,
          endDate: tempEndDate,
          endTime: tempEndDate.format('HH:mm'),
          availableAngels: [],
          unavailableAngels: [],
          checked: false,
        });
      }
    );
  };

  onCheckAndConfirmBookings = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        // const date = this.state.startDate.format('YYYY-MM-DD');
        const id = this.props.location.state.bookingDateId;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;

        const bookingId = this.props.match.params.bookingId;
        const message = this.state.message;

        if (this.state.checked) {
          let bookingDates;
          if (this.state.repeatedDays.length === 1) {
            bookingDates = [
              {
                id,
                start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
                end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
              },
            ];
          } else {
            bookingDates = this.state.repeatedDays.map(day => {
              if (day.selected) {
                return {
                  id: day.id,
                  start_date: day.start_date,
                  end_date: day.end_date,
                };
              }
            });

            bookingDates = bookingDates.filter(function(day) {
              return day && day != null;
            });
          }
          API.editBooking({
            booking_dates: bookingDates,
            booking_id: bookingId,
            message,
          })
            .then(res => {
              this.props.history.push('/booking');
              this.props.onBookingEdit(res.data.data);
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
                start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
                end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
              },
            ];
          } else {
            bookingDates = this.state.repeatedDays.map(day => {
              if (day.selected) {
                return {
                  id: day.id,
                  start_date: day.start_date,
                  end_date: day.end_date,
                };
              }
            });

            bookingDates = bookingDates.filter(function(day) {
              return day && day != null;
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
        API.cancelBooking(this.props.match.params.bookingId)
          .then(res =>
            this.setState(
              {
                isLoading: false,
              },
              () => {
                this.props.history.push('/booking');
                this.props.onBookingCancel(res.data.data);
              }
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
      <Fragment>
        <Navigation
          title={<FormattedMessage id="booking.edit.title" />}
          subTitle={
            <FormattedMessage
              id="booking.edit.subTitle"
              values={{
                id: this.props.match.params.bookingId,
              }}
            />
          }
          rightComp={() => (
            <CustomLink to="/faq" primary>
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          )}
          onClose={this.props.history.goBack}
        />

        {this.state.isLoading ? <Loader isLoading /> : null}

        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Fields
                onTimeChange={this.onTimeChange}
                onDateChange={this.onDateChange}
                onChange={this.onChange}
                startDate={this.state.startDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
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
                  <Divider fitted />
                  <Availability>
                    {this.renderAvailableAngels()}
                    {this.renderUnavailableAngels()}
                  </Availability>
                </React.Fragment>
              ) : null}
            </CustomColumn>
          </CustomRow>
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
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBookings: () => dispatch(onGetBookings()),
  onBookingEdit: payload => dispatch(onBookingEdit(payload)),
  onBookingCancel: payload => dispatch(onBookingCancel(payload)),
});

export default connect(
  null,
  mapDispatchToProps
)(EditBooking);

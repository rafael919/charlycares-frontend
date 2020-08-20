import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import anime from 'animejs';
import CustomColumn from 'Components/CustomColumn';
import CustomDivider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import PhoneModal from 'Components/PhoneModal';
import React, { Component } from 'react';
import Loader from 'Components/Loader';

import { getBookings } from '../selectors';
import { onBookingCancel } from '../../data/actions';
import AddAngelsSection from '../components/AddAngelsSection';
import Angel from '../components/Angel';
import API from '../api';
import BookingInformation from '../components/BookingInformation';
import LinksSection from '../../components/LinksSection';
import placeholder from 'Assets/images/profile-placeholder.png';

class OfferDetails extends Component {
  ref = React.createRef();
  state = {
    booking: null,
    errors: null,
    isLoading: false,
    showAllBookingInfo: false,
  };

  componentDidMount() {
    this.findBooking();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.booking && this.state.booking !== prevState.booking) {
      this.infoHeight = this.ref.current.clientHeight;
      this.ref.current.style.height = 0;
    }
  }

  animateSlideDown = () => {
    this.animation = anime.timeline();
    this.animation
      .add({
        targets: this.ref.current,
        opacity: [0, 1],
        height: [0, this.infoHeight],
        duration: 400,
        easing: 'linear',
      })
      .add({
        targets: '#arrow',
        rotate: '-180deg',
        duration: 200,
        offset: '-=100',
        easing: 'linear',
      });
  };

  onOfferLook = state => () => {
    this.props.history.push('/booking/angel-offer', state);
  };

  onAcceptOffer = (bookingId, angelId) => () => {
    this.setState(
      {
        isLoading: true,
      },
      this.acceptOffer(bookingId, angelId)
    );
  };

  onRequestAgain = (bookingId, invitationId) => () => {
    this.setState(
      {
        isLoading: true,
      },
      this.requestAgain(bookingId, invitationId)
    );
  };

  requestAgain = (bookingId, invitationId) => () => {
    API.onRequestAgain(bookingId, invitationId)
      .then(res => {
        this.setState({
          isLoading: false,
          booking: res.data.data,
        });
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  acceptOffer = (bookingId, angelId) => () => {
    API.onOfferAccept(bookingId, angelId)
      .then(res => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.props.history.push('/booking');
          }
        );
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  renderWithType = () => {
    if (
      this.state.booking &&
      this.state.booking.invitations &&
      this.state.booking.invitations.length
    ) {
      return this.state.booking.invitations
        .sort(
          (a, b) =>
            (b.current_state === 'pending_approval' ? 1 : -1) -
            (a.current_state === 'pending_approval' ? 1 : -1)
        )
        .map(
          (
            {
              angel_data,
              current_state,
              id,
              angel_id,
              booking_id,
              booking_date_responses,
              expires_at,
              has_accepted_all_dates,
              availability_type,
              invitation_id,
            },
            i
          ) => {
            const {
              first_name,
              image,
              birthdate,
              phone,
              user_id,
              last_booked,
              allowed_chat,
              new_messages,
            } = angel_data[0];
            const offerData = {
              startDate: this.state.booking.start_date,
              endDate: this.state.booking.end_date,
              totalDays: this.getTotalDays(),
              selectedDays: this.getSelectedDays(booking_date_responses),
              bookingDateResponses: booking_date_responses,
              bookingDates: this.state.booking.bookingdates,
              bookingId: this.state.booking.id,
              angelId: angel_data[0].id,
            };
            return (
              <React.Fragment key={id}>
                <PhoneModal
                  open={this.state.showPhoneModal}
                  toggle={this.togglePhoneModal}
                />
                <Angel
                  divider={
                    i === this.state.booking.invitations.length - 1
                      ? false
                      : true
                  }
                  awaiting={
                    current_state === 'pending' ||
                    current_state === 'pending_payment' ||
                    current_state === 'pending_edit'
                  }
                  declined={current_state === 'declined'}
                  declinedFamily={current_state === 'declined_family'}
                  expired={current_state === 'expired'}
                  canceled={current_state === 'canceled'}
                  invitationState={current_state}
                  notFullyAccepted={!has_accepted_all_dates}
                  angelId={angel_id}
                  userId={user_id}
                  phone={phone}
                  name={first_name}
                  availabilityType={availability_type}
                  img={image ? image : placeholder}
                  expiresAt={expires_at}
                  age={getAge(birthdate)}
                  maxDays={this.getTotalDays()}
                  // onOfferAccept={this.onAcceptOffer(
                  //   this.state.booking.id,
                  //   angel_data[0].id
                  // )}
                  onOfferAccept={this.onOfferLook(offerData)}
                  selectedDays={this.getSelectedDays(booking_date_responses)}
                  history={this.props.history}
                  onOfferLook={this.onOfferLook(offerData)}
                  onDeclineOffer={this.onDeclineOffer(
                    this.state.booking.id,
                    angel_data[0].id
                  )}
                  wasBooked={last_booked ? true : false}
                  allowedChat={allowed_chat}
                  newMessage={new_messages}
                  togglePhoneModal={this.togglePhoneModal}
                  onRequestAgain={this.onRequestAgain(
                    this.state.booking.id,
                    invitation_id
                  )}
                />
              </React.Fragment>
            );
          }
        );
    }
  };

  getSelectedDays = bookingDateResponses => {
    return bookingDateResponses.reduce((acc, curr) => {
      if (curr.current_state === 'accepted') {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  getTotalDays = () => {
    return this.state.booking.bookingdates.length;
  };

  findBooking = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.getBooking(Number(this.props.match.params.bookingId))
          .then(res => {
            this.setState({
              booking: res.data.data,
              isLoading: false,
            });
          })
          .catch(err => {
            this.setState({
              error: err,
              isLoading: false,
            });
          });
      }
    );
  };

  getAngels = () => {
    return this.state.booking.invitations.map(inv => {
      return inv.angel_data[0];
    });
  };

  onDeclineOffer = (bookingId, angelId) => () => {
    this.setState(
      {
        isLoading: true,
      },
      this.declineOffer(bookingId, angelId)
    );
  };

  declineOffer = (bookingId, angelId) => () => {
    API.declineBooking(bookingId, angelId)
      .then(res => {
        this.setState({
          isLoading: false,
          booking: res.data.data,
        });
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  onEditBooking = () => {
    const { id, start_date, end_date, booking_dates, message } = this.state.booking;
    this.props.history.push('/booking/edit/' + id, {
      start_date,
      end_date,
      bookingDateId: booking_dates[0].id,
      bookingDates: booking_dates,
      message
    });
  };

  onCancelBooking = () => {
    if (this.state.booking) {
      const data = {
        bookingId: this.state.booking.id,
        familyId: this.state.booking.family_id,
        reasons: this.state.booking.cancellation_reasons,
      };

      this.props.history.push(
        '/booking/cancellation/' + this.state.booking.id,
        data
      );
    }
  };

  isEditAllowed = () => {
    return (
      moment(this.state.booking.start_date).diff(moment(), 'hours') >= 2 &&
      !this.state.booking.all_declined &&
      !this.state.booking.has_offer
    );
  };

  showAllBookingInfo = () => {
    this.setState(
      state => ({
        showAllBookingInfo: !state.showAllBookingInfo,
      }),
      () => {
        if (this.animation) {
          this.animation.reverse();
          this.animation.play();
        } else {
          this.animateSlideDown();
        }
      }
    );
  };
  render() {
    return this.state.booking ? (
      <React.Fragment>
        <Navigation
          title="Booking"
          isWhite
          subTitle={
            <FormattedMessage
              id="booking.offers.details"
              values={{
                bookingId: this.state.booking.id,
                familyId: this.state.booking.family_id,
              }}
            />
          }
          onBack={this.props.history.goBack}
        />
        {this.state.isLoading && <Loader />}
        <CustomDivider desktopBorderBottom />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem">
                <CustomColumn noPadding width={5}>
                  <InlineText bold primaryFont>
                    <FormattedMessage id="start" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn textAlign="right" noPadding width={11}>
                  <InlineText bold primaryFont accentText>
                    {moment(this.state.booking.start_date).format(
                      'ddd DD MMMM'
                    )}
                  </InlineText>
                </CustomColumn>
              </CustomRow>

              <CustomRow padding="0 0 1rem 0">
                <CustomColumn noPadding>
                  <BookingInformation
                    borderTop
                    onClick={this.showAllBookingInfo}
                  />
                </CustomColumn>
              </CustomRow>
            </Grid>
            <div ref={this.ref} style={{ opacity: 0 }}>
              <Grid container>
                <CustomRow padding="1rem 0 1rem 0">
                  <CustomColumn noPadding width={5}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="start" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" noPadding width={11}>
                    <InlineText bold primaryFont accentText>
                      {moment(this.state.booking.start_date).format('HH:mm')}
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1rem 0">
                  <CustomColumn noPadding width={5}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="end" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" noPadding width={11}>
                    <InlineText bold primaryFont accentText>
                      {moment(this.state.booking.end_date).format('HH:mm')}
                    </InlineText>
                  </CustomColumn>
                </CustomRow>

                <CustomRow padding="0 0 1rem 0">
                  <CustomColumn noPadding width={5}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="repeat" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" noPadding width={11}>
                    <InlineText bold primaryFont accentText>
                      {this.state.booking.repeat_qty}x
                    </InlineText>
                  </CustomColumn>
                </CustomRow>

                <CustomRow padding="0 0 1rem 0">
                  <CustomColumn noPadding width={11}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="booking.angel.offers.details.personalMessage" />
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
              </Grid>
              <Paragraph light fontSize="0.9375rem">
                {this.state.booking.message}
              </Paragraph>
            </div>
            {this.state.booking.current_state !== 'canceled' &&
            this.state.booking.current_state !== 'declined' &&
            this.state.booking.booking_dates.length ? (
              <React.Fragment>
                <LinksSection
                  onCancel={this.onCancelBooking}
                  onEdit={this.onEditBooking}
                  editAllowed={this.isEditAllowed()}
                />
                <CustomDivider desktopBorderTop desktopBorderBottom />
              </React.Fragment>
            ) : null}
            {this.renderWithType()}
          </CustomColumn>
        </CustomRow>
        <CustomDivider desktopBorderTop desktopBorderBottom />
        {this.state.booking.allowed_extra_angels > 0 && (
          <AddAngelsSection
            bookingId={this.state.booking.id}
            bookingDates={this.state.booking.multibooking_dates}
            angels={this.getAngels()}
            maxAngels={this.state.booking.allowed_extra_angels}
          />
        )}
      </React.Fragment>
    ) : (
      this.state.isLoading && <Loader />
    );
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
});

export default connect(
  mapStateToProps,
  {
    onBookingCancel,
  }
)(OfferDetails);

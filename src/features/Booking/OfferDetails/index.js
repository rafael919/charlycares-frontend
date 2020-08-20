import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import { getAge } from 'Utils';
import anime from 'animejs';
import moment from 'moment';
import Confirmation from 'Components/Confirmation';
import ContentWrapper from 'Components/ContentWrapper';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import { getBookings } from './selectors';
import AddAngelsSection from './components/AddAngelsSection';
import Angel from './components/Angel';
import BookingInformation from './components/BookingInformation';
import LinksSection from '../components/LinksSection';
import API from './api';
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
              repeatQty: this.state.booking.repeat_qty,
              bookingDateResponses: booking_date_responses,
              bookingDates: this.state.booking.bookingdates,
              bookingId: this.state.booking.id,
              angelId: angel_data[0].id,
            };
            return (
              <Angel
                key={id}
                divider={
                  i === this.state.booking.invitations.length - 1 ? false : true
                }
                awaiting={
                  current_state === 'pending' ||
                  current_state === 'pending_payment'
                }
                declined={current_state === 'declined'}
                declinedFamily={current_state === 'declined_family'}
                expired={current_state === 'expired'}
                canceled={current_state === 'canceled'}
                notFullyAccepted={!has_accepted_all_dates}
                invitationState={current_state}
                angelId={angel_id}
                userId={user_id}
                phone={phone}
                name={first_name}
                img={image ? image : placeholder}
                expiresAt={expires_at}
                availabilityType={availability_type}
                age={getAge(birthdate)}
                maxDays={this.getTotalDays()}
                onOfferAccept={this.onAcceptOffer(
                  this.state.booking.id,
                  angel_data[0].id
                )}
                selectedDays={this.getSelectedDays(
                  booking_date_responses,
                  this.state.booking.bookingdates
                )}
                history={this.props.history}
                wasBooked={last_booked ? true : false}
                allowedChat={allowed_chat}
                newMessage={new_messages}
                onOfferLook={this.onOfferLook(offerData)}
                onDeclineOffer={this.onDeclineOffer(
                  this.state.booking.id,
                  angel_data[0].id
                )}
                onRequestAgain={this.onRequestAgain(
                  this.state.booking.id,
                  invitation_id
                )}
              />
            );
          }
        );
    }
    return null;
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

  isEditAllowed = () => {
    return (
      moment(this.state.booking.start_date).diff(moment(), 'hours') >= 2 &&
      !this.state.booking.all_declined &&
      !this.state.booking.has_offer
    );
  };

  onBack = () => {
    this.props.history.push('/booking');
  };

  render() {
    return this.state.booking ? (
      <Layout
        navBorder
        onNavBack={this.onBack}
        navTitle="Booking"
        navSubTitle={
          <FormattedMessage
            id="booking.offers.details"
            values={{
              bookingId: this.state.booking.id,
              familyId: this.state.booking.family_id,
            }}
          />
        }
        navRightComponent={() => (
          <CustomLink to="/faq" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading && <Loader />}
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
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

                  <CustomRow padding="0 0 1rem 0">
                    <CustomColumn noPadding width={15}>
                      <Paragraph light fontSize="0.9375rem">
                        {this.state.booking.message}
                      </Paragraph>
                    </CustomColumn>
                  </CustomRow>
                </Grid>
              </div>
              {this.state.booking.current_state !== 'canceled' &&
              this.state.booking.current_state !== 'declined' &&
              this.state.booking.booking_dates.length ? (
                <LinksSection
                  onCancel={this.onCancelBooking}
                  onEdit={this.onEditBooking}
                  editAllowed={this.state.booking.is_editable}
                />
              ) : null}
              <Divider />
              {this.renderWithType()}
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="3rem 0" />
        </ContentWrapper>
        {this.state.booking.allowed_extra_angels !== 0 ? (
          <Confirmation style={{ background: 'white' }}>
            <AddAngelsSection
              history={this.props.history}
              bookingId={this.state.booking.id}
              angels={this.getAngels()}
              maxAngels={this.state.booking.allowed_extra_angels}
            />
          </Confirmation>
        ) : null}
      </Layout>
    ) : (
      this.state.isLoading && <Loader />
    );
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
});

export default connect(mapStateToProps)(OfferDetails);

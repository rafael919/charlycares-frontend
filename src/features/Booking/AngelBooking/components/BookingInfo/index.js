import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import { isMobile } from 'react-device-detect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import addIcon from 'Assets/icons/btn-check-off.svg';
import check from 'Assets/icons/check.svg';
import arrowDownIcon from 'Assets/icons/btn-small-arrow-down.svg';
import checkIcon from 'Assets/icons/icn-check.svg';
import daySelectedIcon from 'Assets/icons/btn-check-on.svg';

class BookingInfo extends React.Component {
  showMore = (dates, dayIndex) => {
    let hideMore = this.state.hideMore;
    hideMore[dayIndex] = true;
    this.setState({
      itemsToShow: dates.length,
      hideMore: hideMore,
    });
  };

  isDayAccepted(days, dayIndex, id) {
    if (!days.length) return false;
    const day = days[dayIndex].find(d => d.booking_dates_id === id);
    if (day && day.current_state === 'accepted') {
      return true;
    }
    return false;
  }

  state = {
    itemsToShow: 2,
    onMore: true,
    hideMore: [],
  };

  renderDaysList = (
    dates,
    bookingState,
    dayIndex,
    invitationState,
    responses,
    booking,
    repeatQty
  ) => {
    if (bookingState === 'pending_edit') {
      return (
        <div>
          <DayListContainer>
            <List>
              {dates.map(day => {
                return (
                  <Day key={booking.id}>
                    <div>
                      {moment(booking.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                        'DD MMMM'
                      )}
                    </div>
                    <Image src={check} />
                  </Day>
                );
              })}
            </List>
          </DayListContainer>
          <DayTimeRow style={{ opacity: 0.4 }}>
            <div>
              <InlineText primaryFont fontSize="1.25rem">
                {moment(booking.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                  'dddd'
                )}
              </InlineText>
            </div>
            <div>
              <InlineText primaryFont>
                {moment(
                  booking.old_start_date.date,
                  'YYYY-MM-DD HH:mm:ss'
                ).format('HH:mm')}{' '}
                -{' '}
                {moment(
                  booking.old_end_date.date,
                  'YYYY-MM-DD HH:mm:ss'
                ).format('HH:mm')}
              </InlineText>
            </div>
          </DayTimeRow>
          <DayListContainer style={{ opacity: 0.4 }}>
            <List>
              <Day>
                <div>
                  {moment(
                    booking.old_start_date.date,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('DD MMMM')}
                </div>
                <Image src={check} />
              </Day>
            </List>
          </DayListContainer>
        </div>
      );
    }
    if (dates.length === 1 && Number(repeatQty) === 1) {
      return (
        <DayListContainer>
          <List>
            {dates.map(day => {
              return (
                <Day key={day.id}>
                  <div>
                    {moment(day.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                      'DD MMMM'
                    )}
                  </div>
                  <Image src={check} />
                </Day>
              );
            })}
          </List>
        </DayListContainer>
      );
    }
    if (
      bookingState === 'accepted' ||
      bookingState === 'ended' ||
      invitationState === 'pending_approval' ||
      invitationState === 'declined' ||
      invitationState === 'canceled' ||
      invitationState === 'given'
    ) {
      if (invitationState === 'pending_approval') {
        dates = responses;
      }
      return (
        <DayListContainer>
          <React.Fragment>
            <List>
              <TransitionGroup component={null}>
                {dates.slice(0, this.state.itemsToShow).map((day, i) => {
                  return (
                    <CSSTransition
                      key={day.id}
                      timeout={300}
                      classNames="desktop"
                    >
                      <Day>
                        <div>
                          {moment(day.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                            'DD MMMM'
                          )}
                        </div>
                        {bookingState === 'accepted' ||
                        (bookingState === 'pending' && day.current_state === 'accepted') ||
                        bookingState === 'ended' ? (
                          <Image src={check} />
                        ) : null}
                      </Day>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </List>
            {!this.state.hideMore[dayIndex] &&
            dates.length > this.state.itemsToShow ? (
              <ShowAllContainer>
                <ShowAllBtn onClick={() => this.showMore(dates, dayIndex)}>
                  <FormattedMessage id="booking.angel.offers.details.showMore" />
                  <ArrowDownIcon showAll={false} src={arrowDownIcon} />
                </ShowAllBtn>
              </ShowAllContainer>
            ) : null}
          </React.Fragment>
        </DayListContainer>
      );
    }

    return (
      <DayListContainer>
        <React.Fragment>
          <List>
            <TransitionGroup component={null}>
              {dates.slice(0, this.state.itemsToShow).map((day, i) => {
                return (
                  <CSSTransition
                    key={day.id}
                    timeout={300}
                    classNames="desktop"
                  >
                    <Day>
                      <div>
                        {moment(day.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                          'DD MMMM'
                        )}
                      </div>
                      <DayButton
                        onClick={
                          invitationState !== 'accepted'
                            ? this.props.onDayPress(dayIndex, day.id)
                            : null
                        }
                      >
                        {(invitationState === 'pending' || invitationState === 'pending_approval' || invitationState === 'accepted') && <Image
                          src={
                            this.isDayAccepted(
                              this.props.selectedDays,
                              dayIndex,
                              day.id
                            )
                              ? daySelectedIcon
                              : addIcon
                          }
                        />}
                      </DayButton>
                    </Day>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </List>
          {!this.state.hideMore[dayIndex] &&
          dates.length > this.state.itemsToShow ? (
            <ShowAllContainer>
              <ShowAllBtn onClick={() => this.showMore(dates, dayIndex)}>
                <FormattedMessage id="booking.angel.offers.details.showMore" />
                <ArrowDownIcon showAll={false} src={arrowDownIcon} />
              </ShowAllBtn>
            </ShowAllContainer>
          ) : null}
        </React.Fragment>
      </DayListContainer>
    );
  };

  getNumberOfSelectedDays(days = [], dayIndex) {
    if (!days.length) return 0;
    return days[dayIndex].reduce((count, day) => {
      if (day.current_state === 'accepted') {
        return count + 1;
      }
      return count;
    }, 0);
  }

  getNumberOfSelectedDaysResponse(responses = []) {
    return responses.reduce((count, day) => {
      if (day.current_state === 'accepted') {
        return count + 1;
      }
      return count;
    }, 0);
  }

  shouldShowRepetions(state) {
    const shouldShow = ['pending', 'pending_approval']; 
    return shouldShow.includes(state);
  }

  render() {
    const {
      deselected,
      selectedDays,
      onSelectAndDeselectAll,
      booking: { bookings },
      invitationState,
    } = this.props;
    if (Array.isArray(bookings)) {
      return bookings.map((book, i) => {
        const mStartDate = moment(book.start_date, 'YYYY-MM-DD HH:mm:ss');
        const mEndDate = moment(book.end_date, 'YYYY-MM-DD HH:mm:ss');
        const isStartDateValid = mStartDate.isValid();
        const isEndDateValid = mEndDate.isValid();
        return (
          <div key={i}>
            <Divider>
              {bookings.length > 1 && (
                <FormattedMessage id="day" values={{ count: i + 1 }} />
              )}
            </Divider>
            {book.current_state === 'pending_edit' && (
              <PendingEditContainer>
                <ChangesDescriptionTitle>
                  <FormattedMessage id="booking.angel.offers.details.changedBookingTitle" />
                </ChangesDescriptionTitle>
                <ChangesDescriptionBody>
                  <FormattedMessage id="booking.angel.offers.details.changedBookingBody" />
                </ChangesDescriptionBody>
              </PendingEditContainer>
            )}
            <Container>
              {book.bookingdates ? (
                <div>
                  <DayTimeRow>
                    <div>
                      <InlineText primaryFont fontSize="1.25rem">
                        {isStartDateValid && mStartDate.clone().format('dddd')}
                      </InlineText>
                    </div>
                    <div>
                      <InlineText primaryFont>
                        {isStartDateValid && mStartDate.clone().format('HH:mm')}{' '}
                        - {isEndDateValid && mEndDate.clone().format('HH:mm')}
                      </InlineText>
                    </div>
                  </DayTimeRow>
                  {book.bookingdates.length > 1  && this.shouldShowRepetions(invitationState) ? (
                    invitationState === 'pending_approval' ? (
                      <RepetitionsRow>
                        <div>
                          <SelectedDays>
                            {this.getNumberOfSelectedDaysResponse(
                              book.booking_date_responses,
                              i
                            )}
                          </SelectedDays>{' '}
                          / {book.repeat_qty} days
                        </div>
                      </RepetitionsRow>
                    ) : (
                      <RepetitionsRow>
                        <div>
                          <SelectedDays>
                            {this.getNumberOfSelectedDays(selectedDays, i)}
                          </SelectedDays>{' '}
                          / {book.repeat_qty} days
                        </div>
                        <DeselectAllBtn onClick={onSelectAndDeselectAll(i)}>
                          {deselected && deselected[i].state ? (
                            <FormattedMessage id="booking.angel.offers.details.selectAll" />
                          ) : (
                            <FormattedMessage id="booking.angel.offers.details.deselectAll" />
                          )}
                        </DeselectAllBtn>
                      </RepetitionsRow>
                    )
                  ) : null}
                </div>
              ) : (
                <Row>
                  <div>
                    <InlineText primaryFont fontSize="1.25rem">
                      {isStartDateValid && mStartDate.clone().format('dddd')}
                    </InlineText>
                  </div>
                  <div>
                    <InlineText primaryFont>
                      {isStartDateValid && mStartDate.clone().format('HH:mm')} -{' '}
                      {isEndDateValid && mEndDate.clone().format('HH:mm')}
                    </InlineText>
                  </div>
                </Row>
              )}
              {book.bookingdates ? (
                this.renderDaysList(
                  book.bookingdates,
                  book.current_state,
                  i,
                  invitationState,
                  book.booking_date_responses,
                  book,
                  this.props.booking.repeat_qty
                )
              ) : (
                <Row>
                  <div>
                    <InlineText fontSize="0.9375rem">
                      {mStartDate.clone().format('DD MMMM')}
                    </InlineText>
                  </div>
                  <div>
                    <Image src={checkIcon} />
                  </div>
                </Row>
              )}
            </Container>
          </div>
        );
      });
    }
    const mStartDate = moment(
      this.props.booking.bookings.start_date,
      'YYYY-MM-DD HH:mm:ss'
    );
    const mEndDate = moment(
      this.props.booking.bookings.end_date,
      'YYYY-MM-DD HH:mm:ss'
    );
    const isStartDateValid = mStartDate.isValid();
    const isEndDateValid = mEndDate.isValid();
    return (
      <div>
        {isMobile && (
          <Divider>
            <FormattedMessage id="day" values={{ count: 1 }} />
          </Divider>
        )}
        <Container>
          <Row>
            <div>
              <InlineText primaryFont fontSize="1.25rem">
                {isStartDateValid && mStartDate.clone().format('dddd')}
              </InlineText>
            </div>
            <div>
              <InlineText primaryFont>
                {isStartDateValid && mStartDate.clone().format('HH:mm')} -{' '}
                {isEndDateValid && mEndDate.clone().format('HH:mm')}
              </InlineText>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  width: 100%;
  padding: ${isMobile ? '0.5rem 1rem 2rem' : '0rem 0rem 2rem'};
`;

const Row = styled.div`
  display: flex;
  padding: 1rem 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    border-bottom: 1px solid #e6e6e6;
  }
`;

const DayTimeRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  padding-top: 1rem;
`;

const RepetitionsRow = DayTimeRow.extend`
  padding-bottom: 0.75rem;
  padding-top: 0;
  border-bottom: 1px solid #e6e6e6;
`;

const SelectedDays = styled.span`
  display: inline-block;
  background-color: #d9d9d9;
  border-radius: 0.125em;
  padding: 0.2em 0.7em;
`;

const DeselectAllBtn = styled.button`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  padding: 0.4rem 0 0.1rem;
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

const DayListContainer = styled.div`
  position: relative;
`;

const PendingEditContainer = styled.div`
  background-color: #faf9e3;
  margin-left: -1rem;
  width: calc(100% + 2rem);
  padding: 1rem;
  padding-left: ${isMobile ? '2rem' : '1rem'};
`;

const ChangesDescriptionTitle = styled.div`
  font-size: 1.15rem;
`;

const ChangesDescriptionBody = styled.div`
  font-size: 0.85rem;
  margin-top: 0.875rem;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Day = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
`;

const ShowAllContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  width: 100%;
  height: 5rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.4) 5%,
    rgba(255, 255, 255, 1)
  );
`;

const ShowAllBtn = styled.button`
  color: ${props => props.theme.lightGrey};
  font-family: ${props => props.theme.secondaryFont};
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  background: transparent;
  border: 0;
  margin-top: 4.5rem; 
  &:focus {
    outline: 0;
  }
`;

const ArrowDownIcon = styled.img`
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform 0.2s ease-in-out;
  ${props =>
    props.showAll &&
    `
    transform: rotate(-180deg);
    `};
`;

const DayButton = styled.button`
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

export default BookingInfo;

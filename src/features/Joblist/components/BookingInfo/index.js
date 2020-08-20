import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import { isMobile } from 'react-device-detect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import check from 'Assets/icons/check.svg';
import arrowDownIcon from 'Assets/icons/btn-small-arrow-down.svg';
import checkIcon from 'Assets/icons/icn-check.svg';

class BookingInfo extends React.Component {
  showMore = (dates, dayIndex) => {
    let hideMore = this.state.hideMore; 
    hideMore[dayIndex] = true; 
    this.setState({
      itemsToShow: dates.length,
      hideMore: hideMore
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
    hideMore: []
  }; 

  renderDaysList = (dates, bookingState, dayIndex) => {
    if (dates.length === 1) {
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
                        {moment(
                          day.start_date,
                          'YYYY-MM-DD HH:mm:ss'
                        ).format('DD MMMM')}
                      </div>
                      <Image src={check} /> 
                    </Day>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </List>
          {!this.state.hideMore[dayIndex] ? (
            <ShowAllContainer>
              <ShowAllBtn onClick={() => this.showMore(dates, dayIndex)}>
                show more{' '}
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

  render() {
    const {
      selectedDays,
      booking: { bookings },
    } = this.props;
    if (Array.isArray(bookings)) {
      return bookings.map((book, i) => {
        const mStartDate = moment(book.bookingdates[0].start_date, 'YYYY-MM-DD HH:mm:ss');
        const mEndDate = moment(book.bookingdates[0].end_date, 'YYYY-MM-DD HH:mm:ss');
        const isStartDateValid = mStartDate.isValid();
        const isEndDateValid = mEndDate.isValid();
        return (
          <div key={i}>
            {isMobile && (
              <Divider>
                <FormattedMessage id="day" values={{ count: i + 1 }} />
              </Divider>
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
                  {book.bookingdates.length > 1 ? (
                    <RepetitionsRow>
                      <div>
                        <SelectedDays>
                          {this.getNumberOfSelectedDays(selectedDays, i)}
                        </SelectedDays>{' '}
                        / {book.repeat_qty} days
                      </div>
                    </RepetitionsRow>
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
                this.renderDaysList(book.bookingdates, null, i)
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
      this.props.booking.bookings.bookingdates[0].start_date,
      'YYYY-MM-DD HH:mm:ss'
    );
    const mEndDate = moment(
      this.props.booking.bookings.bookingdates[0].end_date,
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
  padding: ${isMobile ? '0.5rem 1rem' : 0};
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

const DayListContainer = styled.div`
  position: relative;
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
  z-index: 999;
`;

const ShowAllBtn = styled.button`
  color: ${props => props.theme.lightGrey};
  font-family: ${props => props.theme.secondaryFont};
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  background: transparent;
  border: 0;

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

export default BookingInfo;

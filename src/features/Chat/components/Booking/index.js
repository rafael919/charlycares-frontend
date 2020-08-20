import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import WithRole from 'Components/WithRole';
import calendarAddIcon from 'Assets/icons/icn-calendar-add.svg';
import calendarAcceptIcon from 'Assets/icons/icn-calendar-accepted.svg';
import calendarCancelIcon from 'Assets/icons/icn-calendar-canceled.svg';
import trashIcon from 'Assets/icons/trash.svg';
import Day from '../../../Booking/Create/components/Day/Desktop';
import MobileDay from '../../../Booking/Create/components/Day';

const Booking = ({
  day,
  onDayFieldChange,
  onMobileDayFieldChange,
  onDateChange,
  name,
  onBookContinue,
  onBookCancel,
  currentMessage,
  userId,
  onDatePickerChange,
}) => {
  return (
    <Container>
      <Content booking={currentMessage.booking}>
        <FirstLine>
          <Image
            src={
              currentMessage.show_date === 0
                ? trashIcon
                : currentMessage.booking &&
                  (currentMessage.booking.current_state === 'declined' ||
                    currentMessage.booking.current_state === 'canceled')
                ? calendarCancelIcon
                : currentMessage.booking &&
                  currentMessage.booking.current_state === 'accepted'
                ? calendarAcceptIcon
                : calendarAddIcon
            }
          />
          <Title>
            <WithRole>
              {role => (
                <FormattedMessage
                  id={
                    currentMessage.show_date === 0
                      ? 'chat.book.bookCancel'
                      : currentMessage.booking_id === 0
                      ? 'chat.book.question'
                      : currentMessage.booking
                      ? 'chat.book.bookingIs'
                      : currentMessage.booked_user === userId
                      ? 'chat.book.sent'
                      : 'chat.book.receive'
                  }
                  values={{
                    name:
                      currentMessage.booking_id === 0
                        ? name
                        : currentMessage.booking
                        ? currentMessage.booking.current_state
                        : currentMessage.booked_user !== userId &&
                          `${currentMessage.role
                            .charAt(0)
                            .toUpperCase()}${currentMessage.role.slice(1)}`,
                  }}
                />
              )}
            </WithRole>
          </Title>
        </FirstLine>
        {currentMessage.show_date === 1 && currentMessage.booking_id === 0 ? (
          isMobile ? (
            <div style={{ marginLeft: -12, marginRight: 18 }}>
              <MobileDay
                dayIndex={day.id}
                startTime={day.startTime}
                initialDate={day.initialDate}
                initialStartTime={day.initialStartTime}
                initialEndTime={day.initialEndTime}
                endTime={day.endTime}
                repetitions={day.repetitions}
                onTimeChange={onMobileDayFieldChange(day.id)}
                chatBook={true}
              />
            </div>
          ) : (
            <Day
              dayIndex={day.id}
              onValueChange={onDayFieldChange(day.id)}
              onDateChange={onDateChange(day.id, 'startDate')}
              startTime={day.startTime}
              initialDate={day.initialDate}
              initialStartTime={day.initialStartTime}
              endTime={day.endTime}
              repetitions={day.repetitions}
              chatBook={true}
              onDatePickerChange={onDatePickerChange}
            />
          )
        ) : (
          currentMessage.show_date === 1 &&
          currentMessage.booking && (
            <div>
              <DateDiv>
                <DateText>
                  <FormattedMessage id="booking.create.day.start" />
                </DateText>
                <DateText>
                  {moment(
                    currentMessage.booking.start_date
                      ? currentMessage.booking.start_date
                      : new Date()
                  ).format('dd. DD MMMM HH:mm')}
                </DateText>
              </DateDiv>
              <DateDiv>
                <DateText>
                  <FormattedMessage id="booking.create.day.end" />
                </DateText>
                <DateText>
                  {moment(
                    currentMessage.booking.end_date
                      ? currentMessage.booking.end_date
                      : new Date()
                  ).format('HH:mm')}
                </DateText>
              </DateDiv>
              {currentMessage.booking.repeat_qty > 1 && (
                <DateDiv>
                  <DateText>
                    <FormattedMessage id="booking.create.day.repeat" />?
                  </DateText>
                  <DateText>{currentMessage.booking.repeat_qty}x</DateText>
                </DateDiv>
              )}
            </div>
          )
        )}
        {currentMessage.show_date === 1 &&
        ((currentMessage.booking &&
          (currentMessage.booking.current_state !== 'declined' &&
            currentMessage.booking.current_state !== 'canceled')) ||
          !currentMessage.booking) ? (
          <WithRole>
            {role => (
              <BtnDiv booking_id={currentMessage.booking_id}>
                {currentMessage.booking_id === 0 && (
                  <BasicButton
                    onClick={onBookCancel(day)}
                    outline
                    color="#F56B87"
                  >
                    <FormattedMessage id="booking.edit.cancel" />
                  </BasicButton>
                )}
                <BasicButton
                  onClick={onBookContinue(day, role, currentMessage)}
                  primary
                >
                  <FormattedMessage
                    id={
                      currentMessage.booking_id === 0
                        ? 'membership.button'
                        : 'chat.book.goToRequest'
                    }
                  />
                </BasicButton>
              </BtnDiv>
            )}
          </WithRole>
        ) : null}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 10px 10px 10px;
`;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  border-left: 4px solid
    ${props =>
      !props.booking
        ? '#68aebf'
        : props.booking.current_state === 'declined' ||
          props.booking.current_state === 'canceled'
        ? '#DD0000'
        : props.booking.current_state === 'pending'
        ? '#FFBA59'
        : '#68aebf'};
  background-color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Image = styled.img`
  margin-right: 8px;
`;

const Title = styled.span`
  font-size: 16px;
  color: #303036;
`;

const FirstLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 0px 8px;
`;

const DateText = styled.span`
  font-size: 15px;
  color: #303036;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.booking_id === 0 ? 'center' : 'flex-end')};
  margin-top: 15px;
  padding: 0 8px;
`;

export default Booking;

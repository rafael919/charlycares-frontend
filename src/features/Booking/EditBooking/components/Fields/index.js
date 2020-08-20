import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import editIcon from 'Assets/icons/btn-edit.svg';
import arrowRight from 'Assets/icons/btn-small-forward.svg';

const Container = styled.div`
  padding: 2.125rem 1rem;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;
  }
`;
const Desc = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  font-weight: 600;
`;
const DateAndTimeWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;
const Time = Desc.extend`
  color: ${props => props.theme.secondaryColor};
`;
const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 70%;
  height: 50%;
  right: 0;
  top: 0;
  caret-color: #000;
`;

const EditButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  position: absolute;
  right: 0;
  top: 35%;
  transform: translateY(-50%);

  &:focus {
    outline: 0;
  }
`;

const Image = styled.img``;

const Repeat = styled.span`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
`;
const RepeatContainer = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const Message = styled.textarea.attrs({
  rows: 2,
})`
  width: 100%;
  font-size: 0.9375rem;
  line-height: 1.47;
  font-weight: 300;

  &:focus {
    outline: 0;
  }

  &::placeholder {
    font-weight: 300;
    font-style: italic;
    font-size: 0.9375rem;
    line-height: 1.47;
  }
`;

class Fields extends React.Component {
  messageInput = React.createRef();
  state = {
    isMessageEdited: false,
  };

  onMessageEdit = () => {
    this.setState(
      {
        isMessageEdited: true,
      },
      () => {
        this.messageInput.current.focus();
      }
    );
  };

  onMessageEditFinish = () => {
    this.setState({
      isMessageEdited: false,
    });
  };

  getNumberOfSelected() {
    if (this.props.bookingDates.length) {
      return this.props.bookingDates.reduce((acc, curr) => {
        if (curr.selected) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }
  }

  render() {
    const {
      startDate,
      endTime,
      onChange,
      onBlur,
      tempStartDate,
      tempEndTime,
      message,
      intl,
      bookingDates,
      toggleRepeat,
    } = this.props;

    return (
      <Container>
        <Row>
          <Desc>
            <FormattedMessage id="start" />
          </Desc>
          <DateAndTimeWrapper>
            <Time>
              {moment(startDate, 'YYYY-MM-DDTHH:mm').format('dd. DD MMMM')}
            </Time>
            <Time>{moment(startDate, 'YYYY-MM-DDTHH:mm').format('HH:mm')}</Time>
          </DateAndTimeWrapper>
          <HiddenInput
            onChange={onChange}
            onBlur={onBlur}
            name="tempStartDate"
            id="startDate"
            type="datetime-local"
            value={tempStartDate}
          />
        </Row>
        <Row>
          <Desc>
            <FormattedMessage id="end" />
          </Desc>
          <Time>{endTime}</Time>
          <HiddenInput
            onChange={onChange}
            onBlur={onBlur}
            name="tempEndTime"
            id="endTime"
            type="time"
            value={tempEndTime}
          />
        </Row>
        {bookingDates && bookingDates.length && bookingDates.length > 1 ? (
          <Row>
            <Desc>
              <FormattedMessage id="repeat" />
            </Desc>
            <RepeatContainer onClick={toggleRepeat}>
              <Repeat>{this.getNumberOfSelected()}</Repeat>
              <Image src={arrowRight} />
            </RepeatContainer>
          </Row>
        ) : null}

        <Row>
          <Desc>
            <FormattedMessage id="booking.edit.personalMessage" />
          </Desc>
          <EditButton onClick={this.onMessageEdit}>
            <Image src={editIcon} />
          </EditButton>
        </Row>
        <Row>
          <Message
            disabled={!this.state.isMessageEdited}
            innerRef={this.messageInput}
            value={message}
            onChange={onChange}
            onBlur={this.onMessageEditFinish}
            name="message"
            placeholder={intl.formatMessage({
              id: 'booking.edit.personalMessageDesc',
            })}
          />
        </Row>
      </Container>
    );
  }
}

export default injectIntl(Fields);

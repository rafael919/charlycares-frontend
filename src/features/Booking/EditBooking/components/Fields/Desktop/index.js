import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import DateTimeWrapper from '../../../../Create/components/Day/components/DateTimeWrapper';
import { InlineText } from 'Components/Text';

import CardGrid from '../../../../Create/components/CardGrid';
import DesktopTime from 'Components/DesktopTime';

import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';

import editIcon from 'Assets/icons/btn-edit.svg';
import arrowRight from 'Assets/icons/btn-small-forward.svg';

const Desc = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-bottom: 1.667rem;
  padding-top: 0.8335rem;
  padding-left: 0 !important;
  padding-right: 0 !important;

  &:last-child {
    padding-bottom: 0;
  }
`;

const EditButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

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
  justify-content: flex-end;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const Message = styled.textarea.attrs({
  rows: 2,
})`
  width: 100%;
  border: 0;
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

const DateEdit = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
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
      message,
      intl,
      startTime,
      bookingDates,
      toggleRepeat,
      onTimeChange,
    } = this.props;

    return (
      <React.Fragment>
        <CustomColumn noPadding width={16}>
          <CardGrid>
            <CustomRow padding="1.667rem 0 0.8335rem 0">
              <CustomColumn padding="0" verticalAlign="middle" width={4}>
                <InlineText primaryFont>
                  <FormattedMessage id="start" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                verticalAlign="middle"
                padding="0"
                textAlign="right"
                width={8}
              >
                <DateTimeWrapper>
                  <DateEdit>{startDate.format('dd. DD MMMM')}</DateEdit>
                </DateTimeWrapper>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={4}
              >
                <DesktopTime
                  date={startDate.format('YYYY-MM-DD')}
                  startTime={startTime}
                  value={startTime}
                  type="start"
                  name="startTime"
                  id="startTime"
                  onChange={onTimeChange}
                  minHoursFromNow={2}
                  startDate={moment(startDate).format('YYYY-MM-DD')}
                  difference={120}
                />
              </CustomColumn>
            </CustomRow>

            <CustomRow padding="0.8335rem 0">
              <CustomColumn padding="0" verticalAlign="middle" width={12}>
                <InlineText primaryFont>
                  <FormattedMessage id="end" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={4}
              >
                <DesktopTime
                  date={startDate.format('YYYY-MM-DD')}
                  id="endTime"
                  type="end"
                  startTime={startTime}
                  value={endTime}
                  name="endTime"
                  onChange={onTimeChange}
                  startDate={moment(startDate).format('YYYY-MM-DD')}
                  difference={120}
                />
              </CustomColumn>
            </CustomRow>
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
            <CustomRow padding="0.8335rem 0">
              <Desc>
                <FormattedMessage id="booking.edit.personalMessage" />
              </Desc>
              <EditButton onClick={this.onMessageEdit}>
                <Image src={editIcon} />
              </EditButton>
            </CustomRow>
            <CustomRow padding="0.8335rem 0">
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
            </CustomRow>
          </CardGrid>
        </CustomColumn>
      </React.Fragment>
    );
  }
}

export default injectIntl(Fields);

import { FormattedMessage } from 'react-intl';
import { InlineText } from 'Components/Text';
import styled from 'styled-components';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import DateTime from 'react-datetime';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

import rightArrow from 'Assets/icons/btn-large-arrow-right.svg';

import CardGrid from '../../CardGrid';
import DateTimeWrapper from '../components/DateTimeWrapper';
import DayIndex from '../components/DayIndex';
import DesktopInput from 'Components/DesktopInput';
import DesktopTime from 'Components/DesktopTime';
import WithRole from 'Components/WithRole';
import CustomImage from '../components/Image';
import RepeatContainer from '../components/RepeatContainer';
import RepeatValue from '../components/RepeatValue';

import deleteIcon from 'Assets/icons/btn-cancel.svg';

const StyledImage = styled.img`
  &&& {
    display: block;
    height: 40px;
    position: relative;
    float: right;
    top: 15px;
  }
`;

const DeleteButton = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

class Day extends React.Component {
  render() {
    const {
      initialDate,
      dayIndex,
      initialStartTime,
      onValueChange,
      onDateChange,
      repetitions,
      startTime,
      endTime,
      index,
      onDeleteDay,
      chatBook,
      bookDay,
      onDatePickerChange,
    } = this.props;

    const formatedStartTime = moment(startTime, 'YYYY-MM-DD HH:mm').format(
      'HH:mm'
    );
    const formatedEndTime = moment(endTime, 'YYYY-MM-DD HH:mm').format('HH:mm');

    const startDate = moment(startTime, 'YYYY-MM-DD HH:mm').format(
      'YYYY-MM-DD'
    );

    const isValidDate = current => {
      return current.isAfter(moment().subtract(1, 'day'));
    };

    return (
      <React.Fragment>
        <CustomColumn noPadding width={16}>
          {!chatBook && (
            <Divider>
              <FormattedMessage id="booking.create.day" />
              <DayIndex>{dayIndex}</DayIndex>
              {index + 1 > 1 && (
                <DeleteButton onClick={onDeleteDay(dayIndex)}>
                  <StyledImage src={deleteIcon} />
                </DeleteButton>
              )}
            </Divider>
          )}
          <CardGrid>
            <CustomRow
              padding={chatBook ? '8px 5px 0 5px' : '1.667rem 0 0.8335rem 0'}
            >
              <CustomColumn padding="0" verticalAlign="middle" width={4}>
                <InlineText primaryFont>
                  <FormattedMessage id="booking.create.day.start" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                verticalAlign="middle"
                padding="0"
                textAlign="right"
                width={8}
              >
                <DateTimeWrapper>
                  {startTime ? (
                    <DateTime
                      dateFormat="dd. DD MMMM"
                      timeFormat={false}
                      closeOnSelect
                      isValidDate={isValidDate}
                      onChange={onDateChange}
                      renderInput={props => <DesktopInput {...props} />}
                      value={moment(startTime, 'YYYY-MM-DD')}
                      inputProps={{
                        name: 'startDate',
                        min: `${initialDate}T${initialStartTime}`,
                      }}
                      onFocus={onDatePickerChange(true)}
                      onBlur={onDatePickerChange(false)}
                    />
                  ) : null}
                </DateTimeWrapper>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={4}
              >
                <DesktopTime
                  date={startDate}
                  startTime={initialStartTime}
                  value={formatedStartTime}
                  type="start"
                  name="startTime"
                  onChange={onValueChange('startTime')}
                  startDate={startDate}
                  difference={120}
                  onOpen={onDatePickerChange(true)}
                  onClose={onDatePickerChange(false)}
                />
              </CustomColumn>
            </CustomRow>
            <CustomRow padding={chatBook ? '7px 5px 0 5px' : '0.8335rem 0'}>
              <CustomColumn padding="0" verticalAlign="middle" width={12}>
                <InlineText primaryFont>
                  <FormattedMessage id="booking.create.day.end" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={4}
              >
                <DesktopTime
                  date={startDate}
                  type="end"
                  startTime={formatedStartTime}
                  value={formatedEndTime}
                  name="endTime"
                  onChange={onValueChange('endTime')}
                  startDate={startDate}
                  difference={120}
                  onOpen={onDatePickerChange(true)}
                  onClose={onDatePickerChange(false)}
                />
              </CustomColumn>
            </CustomRow>
            <CustomRow padding={chatBook ? '8px 5px 0 5px' : '0.8335rem 0'}>
              <CustomColumn padding="0" verticalAlign="middle" width={11}>
                <InlineText primaryFont>
                  <FormattedMessage id="booking.create.day.repeat" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={5}
              >
                <RepeatContainer>
                  <RepeatValue>
                    <WithRole>
                      {role => (
                        <CustomLink
                          primary
                          to={{
                            pathname:
                              !chatBook && !bookDay
                                ? `/booking/repeat/${dayIndex}`
                                : role === 'family'
                                ? `/favorites/repeat/${dayIndex}`
                                : `/families/repeat/${dayIndex}`,
                            state: {
                              bookDay,
                            },
                          }}
                        >
                          {repetitions &&
                          repetitions.length &&
                          repetitions.length > 0 ? (
                            `${repetitions.length} x`
                          ) : (
                            <FormattedMessage id="booking.repeat.never" />
                          )}
                        </CustomLink>
                      )}
                    </WithRole>
                  </RepeatValue>
                  <CustomImage src={rightArrow} />
                </RepeatContainer>
              </CustomColumn>
            </CustomRow>
          </CardGrid>
        </CustomColumn>
      </React.Fragment>
    );
  }
}

Day.propTypes = {
  onDatePickerChange: PropTypes.func.isRequired,
};

Day.defaultProps = {
  onDatePickerChange: () => {},
};

export default Day;

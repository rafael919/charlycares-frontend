import { FormattedMessage } from 'react-intl';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import CustomLink from 'Components/CustomLink';
import MobileTimeSelection from 'Components/MobileTimeSelection';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';

import deleteIcon from 'Assets/icons/btn-cancel.svg';

import ArrowDown from 'Assets/icons/btn-small-arrow-down.svg';

import CardGrid from '../CardGrid';
import DayIndex from './components/DayIndex';
import RepeatContainer from './components/RepeatContainer';
import RepeatValue from './components/RepeatValue';

import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledImage = styled(Image)`
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
`;


const ArrowDownImage = styled.img`
  width: 12px;
  transform: rotate(270deg);
`;

class Day extends React.Component {
  render() {
    const {
      startTime,
      endTime,
      dayIndex,
      repetitions,
      onTimeError,
      onDeleteDay,
      index,
      initialStartTime,
      initialEndTime,
      onTimeChange,
      chatBook,
      bookDay,
    } = this.props;

    return (
      <React.Fragment>
        {!chatBook && (
          <Divider
            height="2.625rem"
            style={{ borderTopWidth: bookDay && index === 0 ? 0 : 1 }}
          >
            <FormattedMessage id="booking.create.day" />
            <DayIndex>{index + 1}</DayIndex>
            {index + 1 > 1 && (
              <DeleteButton onClick={onDeleteDay(dayIndex)}>
                <StyledImage src={deleteIcon} />
              </DeleteButton>
            )}
          </Divider>
        )}
        <CardGrid>
          <MobileTimeSelection
            startTime={moment(startTime, 'YYYY-MM-DD HH:mm')}
            endTime={moment(endTime, 'YYYY-MM-DD HH:mm')}
            initialStartTime={initialStartTime}
            initialEndTime={initialEndTime}
            onTimeChange={onTimeChange}
            onTimeError={onTimeError}
            minTimeDifference={120}
            chatBook={chatBook}
          />
          <CustomRow padding={chatBook ? '4px 0 0 0' : '0.8335rem 0'}>
            <CustomColumn width={11}>
              <InlineText primaryFont>
                <FormattedMessage id="booking.create.day.repeat" />
              </InlineText>
            </CustomColumn>
            <CustomColumn verticalAlign="bottom" textAlign="right" width={5}>
              <RepeatContainer>
                <RepeatValue>
                  <CustomLink
                    primary
                    to={{
                      pathname:
                        !chatBook && !bookDay
                          ? `/booking/repeat/${dayIndex}`
                          : `/repeat/${dayIndex}`,
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
                </RepeatValue>
                <ArrowDownImage src={ArrowDown} />
              </RepeatContainer>
            </CustomColumn>
          </CustomRow>
        </CardGrid>
      </React.Fragment>
    );
  }
}

export default Day;

import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import Toggle from 'Components/Toggle';
import DateTime from 'react-datetime';
import DesktopInput from 'Components/DesktopInput';
import DesktopTime from 'Components/DesktopTime';
import CustomRepeat from './components/CustomRepeat';

const Config = ({
  startDate,
  onRepeatDateBlur,
  endDate,
  year,
  repeatEndDate,
  onValueChange,
  intl,
  existingEvent,
  wholeDay,
  recurringTypes = [],
  selectedRecurringType,
  onRemoveEvent,
  startTime,
  endTime,
  onSelectChange,
  onTimeChange,
  initialStartTime,
  initialEndTime,
}) => {
  console.log(startDate, year);
  const start = moment(`${startDate} ${year}`, 'dd. DD MMMM YYYY');
  console.log(start);
  return (
    <Container>
      <Row>
        <Text>
          <FormattedMessage id="calendar.angel.notAvailable.wholeDay" />
        </Text>
        <Toggle
          name="wholeDay"
          value={wholeDay}
          checked={wholeDay}
          onChange={onSelectChange}
        />
      </Row>
      <Row>
        <Text>
          <FormattedMessage id="start" />
        </Text>
        <InputsWrapper>
          <DateTime
            dateFormat="dd. DD MMMM"
            timeFormat={false}
            closeOnSelect
            onChange={onValueChange('startDate')}
            renderInput={props => <DesktopInput {...props} />}
            className="rdt-relative"
            value={start}
            inputProps={{
              name: 'startDate',
            }}
          />
          {!wholeDay && (
            <DesktopTime
              name="startTime"
              type="start"
              date={start.format('YYYY-MM-DD')}
              startTime={initialStartTime}
              startDate={start.format('YYYY-MM-DD')}
              value={startTime}
              onChange={onTimeChange}
            />
          )}
        </InputsWrapper>
      </Row>
      {!wholeDay && (
        <Row>
          <Text>
            <FormattedMessage id="end" />
          </Text>
          <InputsWrapper>
            <ValuesWrapper>
              <DesktopTime
                name="endTime"
                type="start"
                date={start.format('YYYY-MM-DD')}
                startTime={initialEndTime}
                startDate={start.format('YYYY-MM-DD')}
                value={endTime}
                onChange={onTimeChange}
              />
            </ValuesWrapper>
          </InputsWrapper>
        </Row>
      )}
      {!existingEvent ? (
        <React.Fragment>
          <Row>
            <Text>
              <FormattedMessage id="repeat" />
            </Text>
            <ValuesWrapper>
              <CustomRepeat
                onChange={onSelectChange}
                value={selectedRecurringType}
                name="selectedRecurringType"
                options={recurringTypes.map((item, i) => {
                  return {
                    value: item,
                    text: intl.formatMessage({
                      id: item,
                    }),
                    key: item,
                  };
                })}
              />
            </ValuesWrapper>
          </Row>
          {selectedRecurringType !== 'never' ? (
            <Row>
              <Text>
                <FormattedMessage id="endDate" />
              </Text>
              <InputsWrapper>
                <ValuesWrapper>
                    <DateTime
                      dateFormat="dd. DD MMMM YYYY"
                      timeFormat={false}
                      closeOnSelect
                      onChange={onValueChange('repeatEndDate')}
                      renderInput={props => <DesktopInput {...props} />}
                      className="rdt-relative"
                      value={`${repeatEndDate}`}
                      inputProps={{
                        name: 'repeatEndDate',
                        placeholder: intl.formatMessage({ id: 'none' }),
                      }}
                    />
                </ValuesWrapper>
              </InputsWrapper>
            </Row>
          ) : null}
        </React.Fragment>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.75rem 0;
  align-items: center;

  ${props => props.border && 'border-bottom: 1px solid #e6e6e6;'};
`;

const Text = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
`;

const InputsWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const ValuesWrapper = styled.div`
  position: relative;
  display: flex;
`;

export default injectIntl(Config);

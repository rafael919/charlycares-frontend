import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import Toggle from 'Components/Toggle';

const format = 'YYYY-MM-DDTHH:mm';

const Config = ({
  startDate,
  endDate,
  tempEndDate,
  tempStartDate,
  repeatEndDate,
  momentEnd,
  onValueChange,
  onDateBlur,
  intl,
  selectedRepeatEndDate,
  onRepeatDateBlur,
  existingEvent,
  wholeDay,
  recurringTypes = [],
  selectedRecurringType,
  onRemoveEvent,
}) => {
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
          onChange={onValueChange}
        />
      </Row>
      <Row>
        <Text>
          <FormattedMessage id="start" />
        </Text>
        {!wholeDay ? (
          <InputsWrapper>
            <HiddenInput
              id="startDate"
              name="tempStartDate"
              type="datetime-local"
              onChange={onValueChange}
              value={tempStartDate}
              onBlur={onDateBlur}
            />
            <ValuesWrapper>
              <Values>{moment(startDate, format).format('dd. DD MMMM')}</Values>
              <Values>{moment(startDate, format).format('HH:mm')}</Values>
            </ValuesWrapper>
          </InputsWrapper>
        ) : (
          <InputsWrapper>
            <HiddenInput
              id="startDate"
              name="tempStartDate"
              type="date"
              onChange={onValueChange}
              value={tempStartDate}
              onBlur={onDateBlur}
            />
            <ValuesWrapper>
              <Values>{moment(startDate, format).format('dd. DD MMMM')}</Values>
            </ValuesWrapper>
          </InputsWrapper>
        )}
      </Row>
      {!wholeDay && (
        <Row border>
          <Text>
            <FormattedMessage id="end" />
          </Text>
          <InputsWrapper>
            <ValuesWrapper>
              <Values>{endDate}</Values>
            </ValuesWrapper>
            <HiddenInput
              id="endDate"
              name="tempEndDate"
              type="time"
              value={momentEnd.clone().format('HH:mm')}
              onChange={onValueChange}
              onBlur={onDateBlur}
            />
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
              <Select onChange={onValueChange} name="selectedRecurringType">
                {recurringTypes.map((item, i) => {
                  return (
                    <option key={i} value={i}>
                      {intl.formatMessage({
                        id: item,
                      })}
                    </option>
                  );
                })}
              </Select>
            </ValuesWrapper>
          </Row>
          {selectedRecurringType !== 0 ? (
            <Row>
              <Text>
                <FormattedMessage id="endDate" />
              </Text>
              <InputsWrapper>
                <ValuesWrapper>
                  {!selectedRepeatEndDate ? (
                    <Placeholder>
                      <FormattedMessage id="none" />
                    </Placeholder>
                  ) : (
                    <Values>
                      {moment(selectedRepeatEndDate, 'YYYY-MM-DD').format(
                        'dd. DD MMMM'
                      )}
                    </Values>
                  )}
                </ValuesWrapper>
                <HiddenInput
                  id="repeatEndDate"
                  name="tempRepeatEndDate"
                  type="date"
                  value={repeatEndDate}
                  onChange={onValueChange}
                  onBlur={onRepeatDateBlur}
                />
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

  ${props => props.border && 'border-bottom: 1px solid #e6e6e6;'};
`;

const Text = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
`;

const HiddenInput = styled.input`
  width: 100%;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  opacity: 0;
  z-index: 999;
  caret-color: #000;
`;

const InputsWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
`;

const ValuesWrapper = styled.div`
  display: flex;
`;

const Values = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  margin-right: 0.5rem;

  &:last-child {
    margin-right: 0;
  }
`;

const Placeholder = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
`;

const Select = styled.select`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  direction: rtl;
  margin-right: -0.4rem;
  border: 0;
  background: transparent;
`;

export default injectIntl(Config);

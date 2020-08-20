import { FormattedMessage } from 'react-intl';
import CustomDivider from 'Components/Divider';
import { Grid, Divider } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import React from 'react';

import DateTimeValues from './components/DateTimeValues';
import Repeat from './components/Repeat';

const Days = ({ days = [] }) =>
  days.map((day, i) => (
    <div key={day.id}>
      {days.length && days.length > 1 ? (
        <CustomDivider>Request {i + 1}</CustomDivider>
      ) : (
        <Divider fitted />
      )}
      <Grid container>
        <CustomRow padding="2.125rem 0 1.125rem 0">
          <CustomColumn textAlign="left" noPadding width={4}>
            <InlineText primaryFont>
              <FormattedMessage id="start" />
            </InlineText>
          </CustomColumn>
          <CustomColumn textAlign="right" width={10}>
            <DateTimeValues>
              {moment(day.startTime, 'YYYY-MM-DD HH:mm').format('ddd DD MMMM')}
            </DateTimeValues>
          </CustomColumn>
          <CustomColumn noPadding textAlign="right" width={2}>
            <DateTimeValues>
              {moment(day.startTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}
            </DateTimeValues>
          </CustomColumn>
        </CustomRow>
        <CustomRow noPadding>
          <CustomColumn textAlign="left" noPadding width={4}>
            <InlineText primaryFont>
              <FormattedMessage id="end" />
            </InlineText>
          </CustomColumn>
          <CustomColumn padding="0 0 1.125rem 0" textAlign="right" width={12}>
            <DateTimeValues>
              {moment(day.endTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}
            </DateTimeValues>
          </CustomColumn>
        </CustomRow>
        <CustomRow padding="0 0 2.125rem 0">
          {day.repetitions.length > 0 && (
            <Repeat dayId={day.id} repeats={day.repetitions.length + 1} />
          )}
        </CustomRow>
      </Grid>
      {(days.length && days.length === 1) || i === days.length - 1 ? (
        <Divider fitted />
      ) : null}
    </div>
  ));

export default Days;

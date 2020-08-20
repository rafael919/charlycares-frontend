import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showDuration } from 'Utils';

function FormatedTime({ time }) {
  const timeObj = showDuration(time);

  if (!timeObj) return null;
  return (
    <FormattedMessage
      id="time"
      values={{
        hours: timeObj.hours,
        minutes: timeObj.minutes,
      }}
    />
  );
}

export default FormatedTime;

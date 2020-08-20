import moment from 'moment';
import React from 'react';
import DateTime from 'react-datetime';


const DatePicker = ({ viewMode, onChange, pickerOpen }: Props) => {
	return(<DateTime
      dateFormat="dd. DD MMMM"
      timeFormat={false}
      viewMode={"years"}
      onChange={onChange}
      value={moment()}
      open={pickerOpen}
      input={false}
      closeOnSelect
    />)
}

export default DatePicker; 
import React from 'react';
import { Day } from 'react-web-gifted-chat';

const RenderDay = ({ props }) => {
  return (
    <Day
      {...props}
      containerStyle={{
        backgroundColor: '#BFBFBF',
        width: '6.4rem',
        padding: 2,
        borderRadius: 15,
        alignSelf: 'center',
      }}
      textStyle={{ color: 'black', fontWeight: '200' }}
    />
  );
};

export default RenderDay;

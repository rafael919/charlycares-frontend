import { isMobile } from 'react-device-detect';

import React from 'react';

import SupportHomeDesktop from '../../../../Explanation';

const Bookings = ({ faqs = [] }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        marginTop: `${isMobile ? '0vw' : '2vw'}`,
      }}
    >
      <SupportHomeDesktop bookings={faqs} title="Support" />
    </div>
  );
};

export default Bookings;

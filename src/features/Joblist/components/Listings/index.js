import React from 'react';
import styled from 'styled-components';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import { isMobile } from 'react-device-detect';
import Listing from '../Listing';
import EmptyList from 'Components/EmptyList';

const Container = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const onOfferSelect = memoizeWith(
  id => id,
  curry((id, history, _e) => {
    console.log(id); 
    if(isMobile) {
      history.push('/joblist/booking/' + id, { from: 'joblist' });
    } else {
      history.push('/joblist/joblist-details/' + id, { from: 'joblist' });
    }
    
  })
);

const Listings = ({ listings = [], history }) => {
  return (
    <Container>
      {listings.map(booking => (
        <Listing 
          familyData={booking.family_data && booking.family_data[0]}
          onBookingSelect={onOfferSelect(booking.id, history)}
          key={booking.id}
          startDate={booking.start_date}
          endDate={booking.end_date}
          repeatQty={booking.repeat_qty}
          status={booking.current_state}
          bookings={booking.bookings}
        />
      ))}
      {listings.length === 0 && <EmptyList id="joblist.noJobs" />}
    </Container>
  );
};

export default Listings;

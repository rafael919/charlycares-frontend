import { Image, Header } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';

import calendarIcon from 'Assets/icons/icon-tabbar-today.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 1.375rem 0;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomHeader = styled(Header)`
  &&& {
    margin: 0;
  }
`;

const navigateToCalendar = ( angelId, history, location ) => {
  if(!isMobile && location.pathname.includes('/booking/search')) {
    history.push(`/booking/search/availability/${angelId}`)
  } else {
    history.push(`/calendar/availability/${angelId}`)
  }
}

const Availability = ({ angelId, history, location}) => {
  return (
    <Container>
      <CustomHeader as="h5"><FormattedMessage id="booking.angel.availability" /></CustomHeader>
      <LinkContainer onClick={() => navigateToCalendar(angelId, history, location)}>
        <FormattedMessage id="booking.angel.viewCalendar" />
        <Image avatar src={calendarIcon} />
      </LinkContainer>
    </Container>
  );
};

export default Availability;

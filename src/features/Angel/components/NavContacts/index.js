import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';

import NavIcons from './components/NavIcons';

const NavIconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 100%;
`;

const onNavigate = (history, path, id, state) => () => {
  history.push(path + id, state);
  if (
    path === '/calendar/availability/' &&
    process.env.NODE_ENV === 'production'
  ) {
    window.analytics.track('FViewCalendar', {
      angelID: id,
    });
  }
  if (
    (path === '/chat/' || path === '/booking/chat/') &&
    process.env.NODE_ENV === 'production'
  ) {
    window.analytics.track('FViewChat', {
      angelID: id,
    });
  }
};

const setLocation = (location, history, angelId, angelData) => {
  if (location.pathname.includes('/favorites/')) {
    return onNavigate(history, '/favorites/chat/', angelId, angelData);
  }

  if (location.pathname.includes('/payments/')) {
    return onNavigate(history, '/payments/chat/', angelId, angelData);
  }

  if (location.pathname.includes('/booking/search')) {
    return onNavigate(history, '/booking/search/chat/', angelId, angelData);
  }

  if (location.pathname.includes('/booking/')) {
    return onNavigate(history, '/booking/chat/', angelId, angelData);
  }

  return onNavigate(history, '/chat/', angelId, angelData);
};

const setLocationCalendar = (location, history, angelId, angelData) => {
  if (location.pathname.includes('/favorites/')) {
    return onNavigate(history, '/favorites/availability/', angelId, angelData);
  }

  if (location.pathname.includes('/payments/')) {
    return onNavigate(history, '/payments/availability/', angelId, angelData);
  }

  if (location.pathname.includes('/booking/search')) {
    return onNavigate(
      history,
      '/booking/search/availability/',
      angelId,
      angelData
    );
  }

  if (location.pathname.includes('/booking/')) {
    return onNavigate(history, '/booking/availability/', angelId, angelData);
  }

  return onNavigate(history, '/availability/', angelId, angelData);
};

const NavContacts = ({
  phone,
  angelId,
  history,
  name,
  img,
  location,
  wasBooked,
  newMessage,
  togglePhoneModal,
  userId,
}) => {
  const angelData = {
    phone,
    name,
    img,
  };
  return (
    <NavIconsWrapper>
      <NavIcons
        onClick={
          isMobile
            ? onNavigate(history, '/chat/', userId, angelData)
            : setLocation(location, history, userId, angelData)
        }
        newMessage={newMessage}
        disabled={!wasBooked}
        activeIcon={chatIcon}
        disabledIcon={chatIconDisabled}
      />
      <NavIcons
        phone={phone}
        disabled={!wasBooked}
        activeIcon={phoneIcon}
        disabledIcon={phoneIconDisabled}
        togglePhoneModal={togglePhoneModal}
      />
      <NavIcons
        onClick={
          isMobile
            ? onNavigate(history, '/calendar/availability/', angelId, {
                from: history.location.pathname,
              })
            : setLocationCalendar(location, history, angelId, angelData)
        }
        disabled={false}
        activeIcon={btnCalendar}
        disabledIcon={btnCalendarDisabled}
      />
    </NavIconsWrapper>
  );
};

export default NavContacts;

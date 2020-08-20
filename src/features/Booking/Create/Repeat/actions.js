export const ON_ADD_DAY = 'booking/create/addDay';
export const ON_RESERVATION_CHANGE = 'booking/create/reservationChange';
export const ON_ADDRESS_SELECT = 'booking/create/addressSelect';

export const onAddDay = () => ({
  type: ON_ADD_DAY,
});

export const onDayFieldChange = changedValues => ({
  type: ON_RESERVATION_CHANGE,
  payload: changedValues,
});

export const onSelectedAddressChange = id => ({
  type: ON_ADDRESS_SELECT,
  payload: id,
});

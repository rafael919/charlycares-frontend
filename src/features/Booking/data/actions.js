import {
  isValueBetween,
  isFilterActive,
  isValueTrue,
  actionCreatorGenerator,
} from 'Utils';

export const ANGELS_SEARCH_PENDING = 'booking/data/angelSearchPending';
export const ANGELS_SEARCH_SUCCESS = 'booking/data/angelSearchSuccess';
export const ANGELS_CLEAR = 'booking/data/angelsClear';
export const ANGELS_SEARCH_ERROR = 'booking/data/angelSearchError';
export const GET_BOOKINGS_SUCCESS = 'booking/data/getBookingsSuccess';
export const GET_BOOKINGS_PENDING = 'booking/data/getBookingsPending';
export const GET_BOOKINGS_ERROR = 'booking/data/getBookingsError';
export const ON_ANGEL_SELECT = 'booking/data/selectAngel';
export const ON_ANGELS_FILTER = 'booking/data/angelsFilter';
export const SELECTED_ANGELS_RESET = 'booking/data/selectedAngelsReset';
export const SET_SELECTED_ANGELS = 'booking/data/setSelectedAngels';
export const ON_ANGEL_LIKE = 'booking/data/angelLike';
export const ON_BOOKING_EDIT = 'booking/data/edit';
export const ON_BOOKING_CANCEL = 'booking/data/cancel';
export const EDITED_BOOKING_CLEAR = 'booking/data/clearEdited';
export const CANCELED_BOOKING_CLEAR = 'booking/data/clearCanceled';

export const GET_ANGELS_FOR_BOOKING_PENDING =
  'booking/data/getAngelsForBookingPending';
export const GET_ANGELS_FOR_BOOKING_SUCCESS =
  'booking/data/getAngelsForBookingSuccess';
export const GET_ANGELS_FOR_BOOKING_ERROR =
  'booking/data/getAngelsForBookingError';

export const ADD_ANGELS_TO_BOOKING_PENDING =
  'booking/data/addAngelsToBookingPending';
export const ADD_ANGELS_TO_BOOKING_SUCCESS =
  'booking/data/addAngelsToBookingSuccess';
export const ADD_ANGELS_TO_BOOKING_ERROR =
  'booking/data/addAngelsToBookingError';

export const DECLINE_BOOKING_PENDING = 'booking/data/declineBookingPending';
export const DECLINE_BOOKING_SUCCESS = 'booking/data/declineBookingSuccess';
export const DECLINE_BOOKING_ERROR = 'booking/data/declineBookingError';

export const ANGEL_BOOKING_ACCEPT_PENDING =
  'booking/data/angelBookingAcceptPending';
export const ANGEL_CHANGES_DECLINE_PENDING =
  'booking/data/angelChangesDeclinePending';
export const ANGEL_CHANGES_DECLINE_SUCCESS =
  'booking/data/angelChangesDeclineSuccess';
export const ANGEL_CHANGES_DECLINE_ERROR =
  'booking/data/angelChangesDeclineError';
export const ANGEL_CHANGES_ACCEPT_PENDING =
  'booking/data/angelChangesAcceptPending';
export const ANGEL_CHANGES_ACCEPT_SUCCESS =
  'booking/data/angelChangesAcceptSuccess';
export const ANGEL_CHANGES_ACCEPT_ERROR =
  'booking/data/angelChangesAcceptError';
export const ANGEL_BOOKING_ACCEPT_SUCCESS =
  'booking/data/angelBookingAcceptSuccess';
export const ANGEL_BOOKING_ACCEPT_ERROR =
  'booking/data/angelBookingAcceptError';
export const ANGEL_BOOKING_DECLINE_PENDING =
  'booking/data/angelBookingDeclinePending';
export const ANGEL_BOOKING_DECLINE_SUCCESS =
  'booking/data/angelBookingDeclineSuccess';
export const ANGEL_BOOKING_DECLINE_ERROR =
  'booking/data/angelBookingDeclineError';
export const ANGEL_BOOKING_ADD_SELECTED_DAY =
  'booking/data/angelBooking/addSelectedDay';
export const ANGEL_BOOKING_SET_SELECTED_AND_DESELECTED_DAYS =
  'booking/data/angelBooking/setSelectedAndDeselectedDays';

export const onAngelsSearch = payload => ({
  type: ANGELS_SEARCH_PENDING,
  payload,
});
export const onAngelsSearchSuccess = payload => ({
  type: ANGELS_SEARCH_SUCCESS,
  payload,
});
export const onAngelsSearchError = errors => ({
  type: ANGELS_SEARCH_ERROR,
  errors,
});

export const onAngelSelect = (selectedAngels, angel, position) => {
  let payload;

  if (angel && selectedAngels) {
    const selectedAngelInArr = selectedAngels.find(
      selectedAngel => selectedAngel.id === angel.id
    );

    if (!selectedAngelInArr) {
      payload = [...selectedAngels, angel];

      if (process.env.NODE_ENV === 'production') {
        window.analytics.track('FSelectAngel', {
          angelID: angel.user_id,
          position,
        });
      }
    } else {
      if (process.env.NODE_ENV === 'production') {
        window.analytics.track('FRemoveAngel', {
          angelID: angel.user_id,
        });
      }

      const selectedAngelsWithoutSelected = selectedAngels.filter(
        selectedAngels => selectedAngels.id !== angel.id
      );
      payload = selectedAngelsWithoutSelected;
    }
  }

  return {
    type: ON_ANGEL_SELECT,
    payload,
  };
};

export const clearSelectedAngels = actionCreatorGenerator(
  SELECTED_ANGELS_RESET
);

export const onGetBookings = () => ({
  type: GET_BOOKINGS_PENDING,
});

export const onGetBookingsSuccess = payload => ({
  type: GET_BOOKINGS_SUCCESS,
  payload,
});

export const onGetBookingsError = errors => ({
  type: GET_BOOKINGS_ERROR,
  errors,
});

export const filterAngels = (angels, defaultFilter, filters) => {
  let filterPredicates = [];
  let matchFilters = [];
  let notMatchFilters = [];

  let isPriceFilterActive = isFilterActive(defaultFilter, filters, 'price');
  let isAgeFilterActive = isFilterActive(defaultFilter, filters, 'age');
  let isDistanceFilterActive = isFilterActive(
    defaultFilter,
    filters,
    'distance'
  );
  let isProFilterActive = isFilterActive(defaultFilter, filters, 'pro');
  let isEhboFilterActive = isFilterActive(defaultFilter, filters, 'ehbo');
  let isBabyFilterActive = isFilterActive(defaultFilter, filters, 'baby');
  let isDriverFilterActive = isFilterActive(defaultFilter, filters, 'driver');

  if (isPriceFilterActive) {
    filterPredicates.push(
      isValueBetween('normal_rate', filters.price.min, filters.price.max)
    );
  }
  if (isAgeFilterActive) {
    filterPredicates.push(
      isValueBetween('birthdate', filters.age.min, filters.age.max)
    );
  }
  if (isDistanceFilterActive) {
    filterPredicates.push(
      isValueBetween('distance', filters.distance.min, filters.distance.max)
    );
  }
  if (isProFilterActive) {
    filterPredicates.push(isValueTrue('babysit_expertise'));
  }
  if (isEhboFilterActive) {
    filterPredicates.push(isValueTrue('first_aid'));
  }
  if (isBabyFilterActive) {
    filterPredicates.push(isValueTrue('small_child_expertise'));
  }
  if (isDriverFilterActive) {
    filterPredicates.push(isValueTrue('driving_license'));
  }

  for (let i = 0; i < angels.length; i++) {
    const predicateResults = filterPredicates.map(f => f(angels[i]));
    const isMatchFilters = predicateResults.reduce((acc, curr) => {
      return acc && curr;
    }, true);

    if (isMatchFilters) {
      matchFilters.push(angels[i]);
    } else {
      notMatchFilters.push(angels[i]);
    }
  }

  return {
    type: ON_ANGELS_FILTER,
    payload: {
      match: matchFilters,
      notMatch: notMatchFilters,
      numberOfActiveFilters: filterPredicates.length,
    },
  };
};

export const onGetAngelsForBooking = actionCreatorGenerator(
  GET_ANGELS_FOR_BOOKING_PENDING,
  'payload'
);
export const onClearAngels = actionCreatorGenerator(ANGELS_CLEAR);
export const onGetAngelsForBookingSuccess = actionCreatorGenerator(
  GET_ANGELS_FOR_BOOKING_SUCCESS,
  'payload'
);
export const onGetAngelsForBookingError = actionCreatorGenerator(
  GET_ANGELS_FOR_BOOKING_ERROR,
  'errors'
);
export const onSetSelectedAngels = actionCreatorGenerator(
  SET_SELECTED_ANGELS,
  'payload'
);

export const onAddAngelsToBooking = actionCreatorGenerator(
  ADD_ANGELS_TO_BOOKING_PENDING,
  'history',
  'bookingId',
  'payload'
);
export const onAddAngelsToBookingError = actionCreatorGenerator(
  ADD_ANGELS_TO_BOOKING_ERROR,
  'errors'
);
export const onDeclineBooking = actionCreatorGenerator(
  DECLINE_BOOKING_PENDING,
  'payload'
);
export const onDeclineBookingSuccess = actionCreatorGenerator(
  DECLINE_BOOKING_SUCCESS
);

export const onDeclineBookingError = actionCreatorGenerator(
  DECLINE_BOOKING_ERROR,
  'errors'
);
export const onAngelAcceptBooking = actionCreatorGenerator(
  ANGEL_BOOKING_ACCEPT_PENDING,
  'id',
  'payload',
  'history'
);

export const onAngelDeclineChanges = actionCreatorGenerator(
  ANGEL_CHANGES_DECLINE_PENDING,
  'id',
  'history'
);

export const onAngelAcceptChanges = actionCreatorGenerator(
  ANGEL_CHANGES_ACCEPT_PENDING,
  'id',
  'history'
);

export const onAngelAcceptBookingSuccess = actionCreatorGenerator(
  ANGEL_BOOKING_ACCEPT_SUCCESS
);

export const onAngelDeclineChangesSuccess = actionCreatorGenerator(
  ANGEL_CHANGES_DECLINE_SUCCESS
);

export const onAngelAcceptChangesSuccess = actionCreatorGenerator(
  ANGEL_CHANGES_ACCEPT_SUCCESS
);

export const onAngelAcceptChangesError = actionCreatorGenerator(
  ANGEL_CHANGES_ACCEPT_ERROR,
  'errors'
);

export const onAngelDeclineChangesError = actionCreatorGenerator(
  ANGEL_CHANGES_DECLINE_ERROR,
  'errors'
);
export const onAngelAcceptBookingError = actionCreatorGenerator(
  ANGEL_BOOKING_ACCEPT_ERROR,
  'errors'
);

export const onAngelDeclineBooking = actionCreatorGenerator(
  ANGEL_BOOKING_DECLINE_PENDING,
  'id',
  'history',
  'payload'
);
export const onAngelDeclineBookingSuccess = actionCreatorGenerator(
  ANGEL_BOOKING_DECLINE_SUCCESS
);
export const onAngelDeclineBookingError = actionCreatorGenerator(
  ANGEL_BOOKING_DECLINE_ERROR,
  'errors'
);

export const onAngelLike = actionCreatorGenerator(ON_ANGEL_LIKE, 'payload');
export const onBookingEdit = actionCreatorGenerator(ON_BOOKING_EDIT, 'payload');
export const onEditedBookingClear = actionCreatorGenerator(
  EDITED_BOOKING_CLEAR
);
export const onBookingCancel = actionCreatorGenerator(
  ON_BOOKING_CANCEL,
  'payload'
);
export const onCanceledBookingClear = actionCreatorGenerator(
  CANCELED_BOOKING_CLEAR
);
export const angelBookingAddSelectedDay = actionCreatorGenerator(
  ANGEL_BOOKING_ADD_SELECTED_DAY
);
export const angelBookingSetSelectedAndDeselectedDays = actionCreatorGenerator(
  ANGEL_BOOKING_SET_SELECTED_AND_DESELECTED_DAYS,
  'payload'
);

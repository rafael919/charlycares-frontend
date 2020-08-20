export const GET_ANGEL_PENDING = 'booking/angel/getAngelPending';
export const GET_ANGEL_FAILURE = 'booking/angel/getAngelFailure';
export const GET_ANGEL_SUCCESS = 'booking/angel/getAngelSuccess';
export const ON_ANGEL_SWIPE_RIGHT = 'booking/angel/angelSwipeRightSuccess';
export const ON_ANGEL_SWIPE_RIGHT_PENDING =
  'booking/angel/angelSwipeRightPending';
export const ON_ANGEL_SWIPE_LEFT = 'booking/angel/angelSwipeLeftSuccess';
export const ON_ANGEL_SWIPE_LEFT_PENDING =
  'booking/angel/angelSwipeLeftPending';

export const getAngel = payload => ({
  type: GET_ANGEL_PENDING,
  payload,
});

export const onGetAngelFailure = errors => ({
  type: GET_ANGEL_FAILURE,
  errors,
});

export const onGetAngelSuccess = payload => ({
  type: GET_ANGEL_SUCCESS,
  payload,
});

export const onAngelSwipeRightSuccess = payload => ({
  type: ON_ANGEL_SWIPE_RIGHT,
  payload,
});
export const onAngelSwipeLeftSuccess = payload => ({
  type: ON_ANGEL_SWIPE_LEFT,
  payload,
});
export const onAngelSwipeRight = (payload, callback) => ({
  type: ON_ANGEL_SWIPE_RIGHT_PENDING,
  payload,
  callback,
});

export const onAngelSwipeLeft = (payload, callback) => ({
  type: ON_ANGEL_SWIPE_LEFT_PENDING,
  payload,
  callback,
});

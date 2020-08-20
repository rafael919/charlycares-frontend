
export const GET_FAQs_SUCCESS = 'support/data/getBookingsSuccess';
export const GET_FAQs_PENDING = 'support/data/getFAQsPending';
export const GET_FAQs_Error = 'support/data/getBookingsError';


export const onGetFAQs = token => ({
  type: GET_FAQs_PENDING,
  token,
});

export const onGetFAQsSuccess = payload => ({
  type: GET_FAQs_SUCCESS,
  payload,
});

export const onGetFAQsError = errors => ({
  type: GET_FAQs_Error,
  errors,
});



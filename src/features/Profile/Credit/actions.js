import { actionCreatorGenerator } from 'Utils';

export const ADD_PROMO_CODE_PENDING = 'profile/credit/addPromoCodePending';
export const ADD_PROMO_CODE_SUCCESS = 'profile/credit/addPromoCodeSuccess';
export const ADD_PROMO_CODE_ERROR = 'profile/credit/addPromoCodeError';
export const PROMO_CODE_RESET = 'profile/credit/promoCodeReset';

export const onAddPromoCode = actionCreatorGenerator(
  ADD_PROMO_CODE_PENDING,
  'payload'
);
export const onAddPromoCodeSuccess = actionCreatorGenerator(
  ADD_PROMO_CODE_SUCCESS,
  'payload'
);
export const onAddPromoCodeError = actionCreatorGenerator(
  ADD_PROMO_CODE_ERROR,
  'errors'
);
export const onPromoCodeReset = actionCreatorGenerator(PROMO_CODE_RESET);

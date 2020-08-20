import { fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  ADD_PROMO_CODE_PENDING,
  onAddPromoCodeSuccess,
  onAddPromoCodeError,
} from './actions';

import {
  onUserAddCredit
} from '../../../data/user/actions'; 

import API from './api';

function* addPromoCode(action) {
  try {
    const addPromoCodeRes = yield call(API.addPromoCode, action.payload);
    yield put(
      onAddPromoCodeSuccess({
        message: addPromoCodeRes.data.data,
        type: addPromoCodeRes.data.message,
      })
    );
    yield put(
      onUserAddCredit(addPromoCodeRes.data.data)
    )
  } catch (error) {
    yield put(onAddPromoCodeError(error));
  }
}

function* addPromoCodeWatcher() {
  yield takeLatest(ADD_PROMO_CODE_PENDING, addPromoCode);
}

export default [fork(addPromoCodeWatcher)];

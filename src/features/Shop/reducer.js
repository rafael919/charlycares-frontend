import {
  GET_GIFTS_PENDING,
  GET_GIFTS_SUCCESS,
  GET_TRANSACTIONS_PENDING,
  GET_TRANSACTIONS_SUCCESS,
  GET_GIFTS_ERROR,
  GET_TRANSACTIONS_ERROR,
  BUY_GIFT_PENDING,
  BUY_GIFT_SUCCESS,
  BUY_GIFT_ERROR,
} from './actions';

const initalState = {
  gifts: [],
  availablePoints: 0,
  purchaseCount: 0,
  transactions: [],
  errors: null,
  buySuccess: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case BUY_GIFT_PENDING:
    case GET_GIFTS_PENDING:
    case GET_TRANSACTIONS_PENDING:
      return {
        ...state,
        buySuccess: false,
      };
    case GET_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: action.payload.gifts,
        availablePoints: action.payload.availablePoints,
        purchaseCount: action.payload.purchaseCount,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload.transactions,
      };
    case BUY_GIFT_SUCCESS:
      return {
        ...state,
        buySuccess: true,
      };
    case GET_GIFTS_ERROR:
    case GET_TRANSACTIONS_ERROR:
    case BUY_GIFT_ERROR:
      return {
        ...state,
        errors: action.errors,
        buySuccess: false,
      };
    default:
      return state;
  }
};

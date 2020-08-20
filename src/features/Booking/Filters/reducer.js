import {
  FILTER_AGE,
  FILTER_DISTANCE,
  FILTER_PRICE,
  FILTER_BABY,
  FILTER_DRIVER,
  FILTER_EHBO,
  FILTER_PRO,
  FILTERS_RESET,
} from './actions';
const intialState = {
  default: {
    age: {
      min: 16,
      max: 40,
    },
    distance: {
      min: 0,
      max: 10,
    },
    price: {
      min: 4,
      max: 11,
    },
    pro: false,
    ehbo: false,
    baby: false,
    driver: false,
  },
  selected: {
    age: {
      min: 16,
      max: 40,
    },
    distance: {
      min: 0,
      max: 10,
    },
    price: {
      min: 4,
      max: 11,
    },
    pro: false,
    ehbo: false,
    baby: false,
    driver: false,
  },
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FILTER_AGE:
      return {
        ...state,
        selected: {
          ...state.selected,
          age: action.payload,
        },
      };
    case FILTER_DISTANCE:
      return {
        ...state,
        selected: {
          ...state.selected,
          distance: {
            min: Number(action.payload.min.toFixed(1)),
            max:
              Number(action.payload.max.toFixed(1)) > state.default.distance.max
                ? 10
                : Number(action.payload.max.toFixed(1)),
          },
        },
      };
    case FILTER_PRICE:
      return {
        ...state,
        selected: {
          ...state.selected,
          price: action.payload,
        },
      };
    case FILTER_PRO:
      return {
        ...state,
        selected: {
          ...state.selected,
          pro: !state.selected.pro,
        },
      };
    case FILTER_EHBO:
      return {
        ...state,
        selected: {
          ...state.selected,
          ehbo: !state.selected.ehbo,
        },
      };
    case FILTER_BABY:
      return {
        ...state,
        selected: {
          ...state.selected,
          baby: !state.selected.baby,
        },
      };
    case FILTER_DRIVER:
      return {
        ...state,
        selected: {
          ...state.selected,
          driver: !state.selected.driver,
        },
      };
    case FILTERS_RESET:
      return {
        ...state,
        selected: {
          ...state.default,
        },
      };

    default:
      return state;
  }
};

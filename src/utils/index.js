import { delay } from 'redux-saga';
import { call, race, put, all } from 'redux-saga/effects';
import { TIMEOUT } from '../axios';
import { onTimeout } from '../ui/actions';
import moment from 'moment';
import path from 'ramda/es/path';

export const apiErrorHandler = ({ response, request }) => {
  if (response) {
    if (response.data && response.data.message) {
      return {
        err: response.data.message,
      };
    } else {
      return {
        err: 'Oops! Something went wrong, please try again.',
      };
    }
  } else if (request) {
    return {
      err: 'Oops! Something went wrong, please try again.',
    };
  } else {
    return {
      err: 'Oops! Something went wrong, please try again.',
    };
  }
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const apiResponseHandler = res => ({
  res: res.data,
});

export const callAPI = (apiFunc, ...params) => {
  return race({
    //api {res, err}
    api: call(apiFunc, ...params),
    timeout: delay(TIMEOUT),
  });
};

export const getFormattedChildrenAge = dob => {
  let dobMoment = moment(dob);
  const years = moment().diff(dobMoment, 'years');
  dobMoment.add(years, 'years');
  const months = moment().diff(dobMoment, 'months');
  return { years: years, months: months };
};

export const getLocale = () => {
  const allowed = ['nl', 'en'];
  const defaultLocale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'nl';

  if (allowed.includes(defaultLocale)) {
    return defaultLocale;
  } else if (defaultLocale === 'nl-NL') {
    return 'nl';
  } else {
    return 'en';
  }
};

export const actionHandler = ({
  apiRes,
  prop,
  customProp,
  success,
  dataHandler,
  error,
}) => {
  if (apiRes) {
    const { res, err } = apiRes;
    if (res) {
      if (!success) return;
      if (Array.isArray(success)) return all(success);
      if (!prop && !customProp) return res;
      if (customProp) return put(success(customProp));
      if (dataHandler) {
        return all([put(dataHandler(res.data[prop])), put(success())]);
      }
      return put(success(res.data[prop]));
    } else {
      return put(error(err));
    }
  } else {
    return put(onTimeout('Timeout'));
  }
};

export const getAge = birthDate => {
  return moment().diff(birthDate, 'years');
};

export const padNumber = number => {
  return ('0' + number).slice(-2);
};
export const renderDistanceInKilometers = distance => {
  if (distance === undefined || distance === null) return '0 m';
  if (distance < 1) {
    return `${distance.toFixed(2) * 1000}m`;
  }
  return `${distance.toFixed(2)}km`;
};

export const roundMonetaryValue = amount => {
  amount = parseFloat(amount);
  if (amount % 1 === 0) {
    amount = Math.round(amount) + ',-';
  } else {
    amount = amount.toFixed(2);
    amount = amount.replace('.', ',');
  }
  return amount;
};

export const renderTimeInHours = time => {
  const hours = time / 60;
  if (hours <= 1) {
    return `${time}min`;
  }
  const roundedHours = Math.floor(hours);
  const minutes = time % 60;

  return `${roundedHours}h ${minutes}min`;
};

export function actionCreatorGenerator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const isAngelSelected = (selectedAngels, id) => {
  if (selectedAngels && selectedAngels.length > 0) {
    const result = selectedAngels.find(angel => {
      return angel.angel_id === id || angel.id === id;
    });
    if (result) return true;
    return false;
  }
  return false;
};

export const isValueBetween = (prop, min, max) => value => {
  const propValue = value[prop];
  if (prop === 'birthdate') {
    return min <= getAge(propValue) && getAge(propValue) <= max;
  }
  return min <= Number(propValue) && Number(propValue) <= max;
};
export const isValueTrue = prop => value => (value[prop] === 1 ? true : false);
export const isFilterActive = (defaultFilter, filters, type) => {
  if (filters[type].min !== undefined && filters[type].max !== undefined) {
    return (
      defaultFilter[type].min !== filters[type].min ||
      defaultFilter[type].max !== filters[type].max
    );
  }
  return filters[type] !== defaultFilter[type];
};

/**
 * Function to generate common sagas
 * @param  {Object} api - API calls function
 * @param  {Function} successAction - Action on succesful res
 * @param  {Function} errorAction - Action on unsuccesful res
 */
export function generateCommonSaga(api, successAction, errorAction, props) {
  return function* commonApiSaga(action) {
    try {
      const { data } = yield call(api, action.payload, action.role);
      if (props) {
        yield put(successAction(path(props, data)));
      } else {
        yield put(successAction(data));
      }
    } catch (error) {
      yield put(errorAction(error));
    }
  };
}

export function showDuration(time = '') {
  const { 0: hours, 1: minutes } = time.split(':');
  const hourNum = Number(hours);
  const minNum = Number(minutes);
  if (hourNum === 0 && minNum === 0) return null;

  const numOfMinutes = moment.duration(minNum, 'minutes').asMinutes();

  const numOfHours = moment.duration(hourNum, 'hours').asHours();

  return {
    hours: numOfHours,
    minutes: numOfMinutes,
  };
}

export function nearestMinutes(interval, someMoment) {
  const roundedMinutes =
    Math.ceil(someMoment.clone().minute() / interval) * interval;
  return someMoment
    .clone()
    .minute(roundedMinutes)
    .second(0);
}

export function isValidIBAN(accountNum) {
  //This function check if the checksum is correct
  accountNum = accountNum.toUpperCase();

  accountNum = accountNum.replace(/^(.{4})(.*)$/, '$2$1'); //Move the first 4 chars from left to the right
  accountNum = accountNum.replace(/[A-Z]/g, function($e) {
    return $e.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }); //Convert A-Z to 10-25
  var $sum = 0;
  var $ei = 1; //First exponent
  for (var $i = accountNum.length - 1; $i >= 0; $i--) {
    $sum += $ei * parseInt(accountNum.charAt($i), 10); //multiply the digit by it's exponent
    $ei = ($ei * 10) % 97; //compute next base 10 exponent  in modulus 97
  }
  return $sum % 97 === 1;
}

export const isAngel = role => role === 'angel';
export const isFamily = role => role === 'family';

export function getChildrenAge(children = []) {
  const today = moment();

  return children.reduce(
    (acc, curr) => {
      const months = today.diff(moment(curr, 'YYYY-MM-DD'), 'months');
      if (months <= 6) {
        acc.baby = true;
      }
      if (months > 6 && months <= 12) {
        acc.toddler = true;
      }
      if (months > 12 && months <= 24) {
        acc.smallChild = true;
      }

      return acc;
    },
    {
      baby: false,
      toddler: false,
      smallChild: false,
    }
  );
}

export function generateLink(s) {
  if (typeof s !== 'string' || !s) return '';
  var e = {},
    i,
    b = 0,
    c,
    x,
    l = 0,
    a,
    r = '',
    w = String.fromCharCode,
    L = s.length;
  var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (i = 0; i < 64; i++) {
    e[A.charAt(i)] = i;
  }
  for (x = 0; x < L; x++) {
    c = e[s.charAt(x)];
    b = (b << 6) + c;
    l += 6;
    while (l >= 8) {
      ((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
    }
  }
  return r;
}

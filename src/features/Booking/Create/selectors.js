import { createSelector } from 'reselect';
import moment from 'moment';

const userData = state => state.data.user;
const booking = state => state.features.booking;

const bookingCreate = createSelector(booking, booking => booking.bookingCreate);

export const getLoadingStatus = createSelector(
  [bookingCreate],
  create => create.isLoading
);
export const getErrors = createSelector(
  [bookingCreate],
  create => create.errors
);

export const getAddresses = createSelector([userData], user => {
  const address = `${user.street_name} ${user.street_number}`;
  return {
    title: address,
    desc: user.city,
    'data-value': address,
  };
});

export const getKids = createSelector([userData], user => {
  const currentDate = moment();
  let kidsArr = [];
  for (let kid in user.kids) {
    let kidBirthDate = moment(user.kids[kid]);
    kidsArr.push({
      id: kid,
      monthsOld: currentDate.diff(kidBirthDate, 'months'),
    });
  }
  return kidsArr;
});

export const getCity = createSelector(userData, user => user.city);
export const getDays = createSelector(bookingCreate, create => create.days);
export const getSelectedAddress = createSelector(
  bookingCreate,
  create => create.selectedAddress
);
export const getSelectedChildren = createSelector(
  bookingCreate,
  create => create.selectedChildren
);

export const getRepetitions = createSelector(
  [bookingCreate],
  create => create.repetitions
);

import { createSelector } from 'reselect';

const signup = state => state.features.signup;
const userData = state => state.data.user;

export const getLoadingStatus = createSelector(
  signup,
  signup => signup.isLoading
);
export const getErrors = createSelector(signup, signup => signup.errors);

export const getWithEmail = createSelector(signup, signup => signup.withEmail);
export const getFacebookData = createSelector(
  signup,
  signup => signup.facebookData
);

export const getFlowStatus = createSelector(
  signup,
  signup => signup.isSignupFlowFinished
);

export const getAgendas = createSelector([signup], signup => signup.agendas);

export const getSelectedAgenda = createSelector(
  [signup],
  signup => signup.selectedAgenda
);

export const getTimeslots = createSelector(
  [signup],
  signup => signup.week
);

export const getReferralSettings = createSelector(
  [userData],
  user => user.referralSettings
);

export const getSelectedTimeslot = createSelector(
  [signup],
  signup => signup.selectedTimeslot
);

export const getConfirmedTimeslot = createSelector(
  [signup],
  signup => signup.confirmedTimeslot
);

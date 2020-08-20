import { actionCreatorGenerator } from 'Utils';

export const CANCEL_MEMBERSHIP_PENDING = 'profile/membership/cancelPending';
export const CANCEL_MEMBERSHIP_SUCCESS = 'profile/membership/cancelSuccess';
export const CANCEL_MEMBERSHIP_ERROR = 'profile/membership/cancelError';
export const CANCEL_MEMBERSHIP_RESET = 'profile/membership/cancelReset';
export const SAVE_MEMBERSHIP_PENDING =
  'profile/membership/saveMembershipPending';
export const SAVE_MEMBERSHIP_SUCCESS =
  'profile/membership/saveMembershipPSuccess';
export const SAVE_MEMBERSHIP_ERROR = 'profile/membership/saveMembershipError';
export const SAVE_MEMBERSHIP_RESET = 'profile/membership/saveReset';

export const onCancelMembership = actionCreatorGenerator(
  CANCEL_MEMBERSHIP_PENDING,
  'payload'
);
export const onCancelMembershipSuccess = actionCreatorGenerator(
  CANCEL_MEMBERSHIP_SUCCESS
);
export const onCancelMembershipError = actionCreatorGenerator(
  CANCEL_MEMBERSHIP_ERROR,
  'errors'
);
export const onCancelMembershipReset = actionCreatorGenerator(
  CANCEL_MEMBERSHIP_RESET
);

export const onSaveMembership = actionCreatorGenerator(
  SAVE_MEMBERSHIP_PENDING,
  'payload'
);
export const onSaveMembershipSuccess = actionCreatorGenerator(
  SAVE_MEMBERSHIP_SUCCESS
);
export const onSaveMembershipError = actionCreatorGenerator(
  SAVE_MEMBERSHIP_ERROR,
  'errors'
);

export const onSaveMembershipReset = actionCreatorGenerator(
  SAVE_MEMBERSHIP_RESET
);

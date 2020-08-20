import { createSelector } from 'reselect';

const inviteData = state => state.features.referrals.invite;
export const userState = state => state.data.user;

export const getInviteData = createSelector(
  [inviteData],
  invitationData => {
    return invitationData.inviteData;
  }
);


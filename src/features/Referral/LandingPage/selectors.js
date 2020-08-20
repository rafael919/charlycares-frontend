import { createSelector } from 'reselect';

const shareData = state => state.features.referrals.share;;
export const userState = state => state.data.user;

export const getLandingPageData = createSelector(
  [shareData],
  share => {
    return share.shareData;
  }
);


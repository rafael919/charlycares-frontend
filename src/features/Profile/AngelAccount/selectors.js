import { createSelector } from 'reselect';

const userState = state => state.data.user;

export const getUserProfile = createSelector([userState], user => {
  return user.profile;
});
export const getInitialNormalRate = createSelector([userState], user => {
  return user.initial_normal_rate;
});
export const getInitialExtraRate = createSelector([userState], user => {
  return user.initial_extra_rate;
});
export const getVideoUploadUrl = createSelector([userState], user => {
  return user.video_upload_url;
});

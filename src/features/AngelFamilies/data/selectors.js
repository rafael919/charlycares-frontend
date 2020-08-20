import { createSelector } from 'reselect';

const familiesState = state => state.features.families;

export const getFamilies = createSelector(
  [familiesState],
  families => {
    return [...families.data.families].sort((a, b) => {
      if (a.last_name > b.last_name) {
        return 1;
      }
      return -1;
    });
  }
);

export const getFamilyProfile = createSelector(
  familiesState,
  families => families.data.familyProfile
);

import { actionCreatorGenerator } from 'Utils';

export const FILTER_AGE = 'filters/age';
export const FILTER_PRICE = 'filters/price';
export const FILTER_DISTANCE = 'filters/distance';
export const FILTER_PRO = 'filters/pro';
export const FILTER_EHBO = 'filters/ehbo';
export const FILTER_BABY = 'filters/baby';
export const FILTER_DRIVER = 'filters/driver';
export const FILTERS_RESET = 'filters/reset';

export const onAgeFilterChange = actionCreatorGenerator(FILTER_AGE, 'payload');
export const onPriceFilterChange = actionCreatorGenerator(
  FILTER_PRICE,
  'payload'
);
export const onDistanceFilterChange = actionCreatorGenerator(
  FILTER_DISTANCE,
  'payload'
);
export const onProFilterChange = actionCreatorGenerator(FILTER_PRO);
export const onEhboFilterChange = actionCreatorGenerator(FILTER_EHBO);
export const onBabyFilterChange = actionCreatorGenerator(FILTER_BABY);
export const onDriverFilterChange = actionCreatorGenerator(FILTER_DRIVER);

export const onFiltersReset = actionCreatorGenerator(FILTERS_RESET);

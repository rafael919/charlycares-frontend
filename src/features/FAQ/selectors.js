import { createSelector } from 'reselect';

const faqState = state => state.features.faq;

export const getFAQs = createSelector(
  [faqState],
  data => data.faqs
);

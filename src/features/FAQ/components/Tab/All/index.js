//@flow
import React from 'react';

import FAQs from '../components/FAQs';
import WithoutFAQs from '../components/WithoutFAQs';

type Props = {
  history: Object,
  intl: Object,
  location: Object,
  match: Object,
  faqs: Array<Object>,
  isLoading: boolean,
  all: boolean,
};

const AllTab = ({ history, faqs = [] }: Props) => {
  if (faqs && !faqs.length) {
    return <WithoutFAQs />;
  }

  return <FAQs faqs={faqs} />;
};

export default AllTab;

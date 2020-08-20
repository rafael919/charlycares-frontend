import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import HelpBtn from './components/HelpBtn';
import AgendaLegenda from './components/AgendaLegenda';

const Support = ({ history }) => {
  return (
    <Layout
      navBorder
      onNavBack={history.goBack}
      navTitle={<FormattedMessage id="support.navTitle" />}
      navRightComponent={() => <HelpBtn />}
    >
      <CustomRow noPadding>
        <CustomColumn noPadding>
          <AgendaLegenda />
        </CustomColumn>
      </CustomRow>
    </Layout>
  );
};

export default Support;

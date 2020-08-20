import { AngelTabBar, FamilyTabBar } from 'Components/NavigationTabs';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import WithRole from 'Components/WithRole'; 
import ConfigList from './components/ConfigList';
import ConfigItem from './components/ConfigItem';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Layout
        navBorder
        longTitle
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="profile.family.help.navTitle" />}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <ConfigList>
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li1" />}
                to="https://www.charlycares.com/support"
                />
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li2" />}
                to="whatsapp://send?phone=31202102323"
                />
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li3" />}
                to="https://www.charlycares.com/"
                />
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li4" />}
                value="020 - 210 23 23"
                to="tel:+31202102323"
                />
          </ConfigList>
          </CustomColumn>
        </CustomRow>
        <WithRole>
              {role => role === 'family' 
                ? <FamilyTabBar /> : <AngelTabBar />}
        </WithRole>
      </Layout>
    );
  }
}
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import List from './components/List';
import ListItem from './components/ListItem';
import { FormattedMessage } from 'react-intl';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        longTitle
        navTitle={<FormattedMessage id="profile.family.termsAndConditions" />}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <List>
              <ListItem
                option={<FormattedMessage id="profile.generalConditions.userAgreement" />}
                to="https://www.charlycares.com/gebruikersovereenkomst"
              />
              <ListItem
                option={<FormattedMessage id="profile.generalConditions.babysittingAgreement" />}
                to="https://www.charlycares.com/oppasovereenkomst"
              />
              <ListItem
                option={<FormattedMessage id="profile.generalConditions.privacyStatement" />}
                to="https://www.charlycares.com/privacy"
              />
              <ListItem
                option={<FormattedMessage id="profile.generalConditions.explanationService" />}
                to="https://www.charlycares.com/regeling-dienstverlening-aan-huis"
              />
            </List>
          </CustomColumn>
        </CustomRow>
        {this.props.role === 'family' ? <FamilyTabBar /> : <AngelTabBar />}
      </Layout>
    );
  }
}
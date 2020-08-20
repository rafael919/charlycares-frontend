import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import Instructions from './components/Instructions';

const navigateBack = (history) => {
  history.replace('/profile/settings', {from: 'push-settings'});
}
export default class PushSettings extends Component {
  
  render() {
    return (
      <Layout
        navBorder
        longTitle
        onNavBack={() => {navigateBack(this.props.history)}}
        navTitle={
          <FormattedMessage id="profile.family.pushSettings.title" />
        }
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <CustomRow padding={"1rem"}> 
              <Instructions />
            </CustomRow>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

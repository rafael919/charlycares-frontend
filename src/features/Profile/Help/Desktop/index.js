import { Segment } from 'semantic-ui-react';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import ConfigList from '../components/ConfigList';
import ConfigItem from '../components/ConfigItem';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.family.help.navTitle" />}
        />
        <Segment basic vertical>
          <ConfigList>
            <ConfigItem
              name={<FormattedMessage id="profile.family.help.li1" />}
              to="https://www.charlycares.com/support"
            />
            <ConfigItem
              name={<FormattedMessage id="profile.family.help.li2" />}
              value="06 40 59 22 93"
              to="https://api.whatsapp.com/send?phone=31202102323"
            />
            <ConfigItem
              name={<FormattedMessage id="profile.family.help.li3" />}
              to="https://www.charlycares.com/"
            />
            <ConfigItem
              name={<FormattedMessage id="profile.family.help.li4" />}
              value="020 - 210 23 23"
            />
          </ConfigList>
        </Segment>
      </Fragment>
    );
  }
} 
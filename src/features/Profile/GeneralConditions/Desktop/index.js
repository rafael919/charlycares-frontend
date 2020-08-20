import { Segment } from 'semantic-ui-react';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import List from '../components/List';
import ListItem from '../components/ListItem';
import { FormattedMessage } from 'react-intl';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Fragment>
        <Navigation
          onBack={this.props.history.goBack}
          longTitle
          title={<FormattedMessage id="profile.family.termsAndConditions" />}

        />
        <Segment basic vertical>
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
        </Segment>
      </Fragment>
    );
  }
}

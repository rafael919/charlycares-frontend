import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { withRouter } from 'react-router-dom';
import CustomLink from 'Components/CustomLink';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';

import EmailSent from './components/EmailSent';

class SuccessfulEmail extends Component {
  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="password.recovery.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <EmailSent />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left" columns={1}>
          <Grid.Column textAlign="left" computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'password.recovery.followInstructions',
              })}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center" computer={8} mobile={16} tablet={16}>
            <CustomLink to="/login">
              <FormattedMessage id="password.recovery.backToLoginLink" />
            </CustomLink>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default withRouter(injectIntl(SuccessfulEmail));

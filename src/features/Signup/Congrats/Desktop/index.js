import { Header, Grid } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';

class Congrats extends Component {
  navigateToHowItWorks = () => {
    this.props.history.push('/how-it-works');
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Header as="h3">
              {this.props.intl.formatMessage({
                id: 'signup.family.congrats.header',
              })}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="left">
            <Paragraph light>
              {this.props.intl.formatMessage({
                id: 'signup.family.congrats.successful',
              })}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="left">
            <Paragraph light>
              {this.props.intl.formatMessage({
                id: 'signup.family.congrats.searching',
              })}
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="left">
            <BasicButton onClick={this.navigateToHowItWorks} primary fluid>
              {this.props.intl.formatMessage({
                id: 'signup.family.congrats.btn',
              })}
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(Congrats);

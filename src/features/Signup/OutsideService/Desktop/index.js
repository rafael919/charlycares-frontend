import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';

class OutsideService extends Component {
  state = {
    errors: null,
    isLoading: false,
    postalCode: '',
    streetNumber: '',
  };

  onLookForCities = () => {
    window.open('http://www.charlycares.com/', '_blank');
  };

  onCheckCity = () => {};

  onInputChange = e => {
    const input = e.currentTarget.getAttribute('name');
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <InlineText bold primaryFont fontSize="20px" lineHeight="30px">
              <FormattedMessage
                id="errors.outservice.header"
                values={{ city: this.props.city }}
              />
            </InlineText>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="15px">
              <FormattedMessage
                id="errors.outservice.descriptionFirst"
                values={{ city: this.props.city }}
              />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton primary fluid onClick={this.onLookForCities}>
              <FormattedMessage id="errors.outservice.buttonTextFirst" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default OutsideService;

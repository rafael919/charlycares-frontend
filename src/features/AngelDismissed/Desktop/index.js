import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2rem;
`

const Title = styled.h3`

`

class AngelDismissed extends Component {
  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Title>
                <FormattedMessage id="dismissed.header" />
            </Title>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Container>
                <FormattedMessage id="dismissed.body" />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default AngelDismissed;

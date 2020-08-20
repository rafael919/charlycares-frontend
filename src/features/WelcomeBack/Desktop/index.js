import { FormattedMessage } from 'react-intl';
import { Grid, Container } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import Heading from 'Components/Heading';
import FullHeight from 'Components/FullHeight';
import Logo from './components/Logo';
import React, { Component } from 'react';

import backgroundImg from 'Assets/images/website-frontpage.jpg';
import logo2 from 'Assets/images/logo2.png';

export default class Welcome extends Component {
  onGoToMembership = () => {
    this.props.history.push('/how-it-works');
  };

  render() {
    return (
      <Container as={FullHeight} fluid>
        <Grid padded as={FullHeight}>
          <Grid.Column
            only="computer"
            stretched
            computer={5}
            largeScreen={6}
            widescreen={7}
          >
            <Background src={backgroundImg} />
          </Grid.Column>
          <Grid.Column
            verticalAlign="middle"
            computer={11}
            tablet={16}
            mobile={16}
            largeScreen={10}
            widescreen={9}
          >
            <Grid centered verticalAlign="middle">
              <Grid.Row>
                <Grid.Column
                  computer={8}
                  tablet={16}
                  mobile={16}
                  largeScreen={8}
                  textAlign="center"
                >
                  <Logo src={logo2} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  computer={8}
                  tablet={16}
                  mobile={16}
                  largeScreen={8}
                  textAlign="center"
                >
                <Heading primary as="h3">
                  <FormattedMessage id="welcomeBack.header" />
                </Heading>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column computer={8} mobile={16} textAlign="center">
                  <Paragraph light textAlign="center" fontSize="0.9375rem">
                    <FormattedMessage id="welcomeBack.description1" />
                  </Paragraph>
                  <Paragraph light textAlign="center" fontSize="0.9375rem">
                    <FormattedMessage id="welcomeBack.description2" />
                  </Paragraph>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  computer={8}
                  mobile={16}
                  largeScreen={8}
                  textAlign="center"
                >
                  <BasicButton primary onClick={this.onGoToMembership} fluid>
                    <FormattedMessage id="welcomeBack.completeMembership" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

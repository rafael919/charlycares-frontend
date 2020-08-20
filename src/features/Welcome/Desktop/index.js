import { FormattedMessage } from 'react-intl';
import { Grid, Container, Button, Responsive } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import { Redirect } from 'react-router-dom';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import CustomLink from 'Components/CustomLink';
import Heading from 'Components/Heading';
import FullHeight from 'Components/FullHeight';
import NoPadding from 'Components/NoPadding';
import Logo from './components/Logo';
import React, { Component } from 'react';

import backgroundImg from 'Assets/images/website-frontpage.jpg';
import logo2 from 'Assets/images/logo2.png';

export default class Welcome extends Component {
  static defaultProps = {
    allowedRoles: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.props.preloadLogin();
  }
  onSignupFamily = () => {
    this.props.history.push('/signup/family');
  };

  onSignupAngel = () => {
    this.props.history.push('/signup/angel');
  };
  OnPostMessage = () => {};
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/booking" />;
    }
    return (
      <Container as={FullHeight} fluid>
        <Responsive maxWidth={990}>
          <Background src={backgroundImg} />
        </Responsive>
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
              <Responsive minWidth={990}>
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
              </Responsive>
              <Grid.Row>
                <Grid.Column
                  computer={8}
                  tablet={16}
                  mobile={16}
                  largeScreen={8}
                  textAlign="center"
                >
                  <Responsive maxWidth={990}>
                    <Heading secondary as="h3">
                      <FormattedMessage id="welcome.header" />
                    </Heading>
                  </Responsive>
                  <Responsive minWidth={990}>
                    <Heading primary as="h3">
                      <FormattedMessage id="welcome.header" />
                    </Heading>
                  </Responsive>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column computer={8} mobile={16} textAlign="center">
                  <Responsive minWidth={990}>
                    <Paragraph light textAlign="center" fontSize="0.9375rem">
                      <FormattedMessage id="welcome.description" />
                    </Paragraph>
                  </Responsive>
                  <Responsive maxWidth={990}>
                    <Paragraph
                      secondary
                      textAlign="center"
                      fontSize="0.9375rem"
                    >
                      <FormattedMessage id="welcome.description" />
                    </Paragraph>
                  </Responsive>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column
                  computer={8}
                  mobile={16}
                  largeScreen={8}
                  textAlign="center"
                >
                  <BasicButton primary onClick={this.onSignupFamily} fluid>
                    <FormattedMessage id="welcome.parentsBtn" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only="computer" as={NoPadding}>
                <Paragraph fontSize="0.9375rem" light>
                  <FormattedMessage id="welcome.or" />
                </Paragraph>
              </Grid.Row>
              <Responsive maxWidth={990}>
                <Grid.Row as={NoPadding}>
                  <Paragraph fontSize="0.9375rem" secondary>
                    <FormattedMessage id="welcome.or" />
                  </Paragraph>
                </Grid.Row>
              </Responsive>
              <Grid.Row>
                <Grid.Column
                  computer={8}
                  mobile={16}
                  largeScreen={8}
                  textAlign="center"
                >
                  <Responsive minWidth={990}>
                    <Button onClick={this.onSignupAngel} basic fluid primary>
                      <FormattedMessage id="welcome.babysiterBtn" />
                    </Button>
                  </Responsive>
                  <Responsive maxWidth={990}>
                    <BasicButton
                      onClick={this.onSignupAngel}
                      outline="rgba(255,255,255,0.75)"
                      fluid
                    >
                      <FormattedMessage id="welcome.babysiterBtn" />
                    </BasicButton>
                  </Responsive>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Responsive maxWidth={990}>
                  <Grid.Column mobile={16} textAlign="center">
                    <InlineText fontSize="0.9375rem" secondary>
                      <FormattedMessage id="welcome.haveAcc" />
                    </InlineText>
                    <CustomLink fontSize="0.9375rem" to="/login">
                      <FormattedMessage id="welcome.logIn" />
                    </CustomLink>
                  </Grid.Column>
                </Responsive>
                <Grid.Column
                  only="computer"
                  computer={8}
                  largeScreen={8}
                  textAlign="center"
                >
                  <InlineText fontSize="0.9375rem" light>
                    <FormattedMessage id="welcome.haveAcc" />
                  </InlineText>
                  <CustomLink fontSize="0.9375rem" to="/login">
                    <FormattedMessage id="welcome.logIn" />
                  </CustomLink>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

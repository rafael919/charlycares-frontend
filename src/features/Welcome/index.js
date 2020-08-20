import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import { Redirect } from 'react-router-dom';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import LogoImage from 'Assets/images/logo2.png';
import backgroundImg from 'Assets/images/website-frontpage.jpg';
import styled from 'styled-components';

const Logo = styled.img.attrs({
  alt: 'Charly Cares',
})`
  &&& {
    height: 3rem;
  }
  position: absolute;
  top: 1.5rem;
  left: 0rem;
  z-index: 3;
`;

export default class Welcome extends Component {
  static defaultProps = {
    allowedRoles: [],
  };

  componentDidMount() {
    this.props.preloadLogin();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      return true;
    }
    return false;
  }

  onSignupFamily = () => {
    this.props.history.push('/signup/family');
  };

  onSignupAngel = () => {
    this.props.history.push('/signup/angel');
  };

  render() {
    if (this.props.isAuthenticated) {
      try {
        var parameters = {
          isLoggedIn: true,
          sessionToken: this.props.token,
        };
        window.webkit.messageHandlers.iOS.postMessage(parameters);
      } catch (err) {
        if (typeof window.Android !== 'undefined') {
          window.Android.isLoggedIn(this.props.token);
        }
      }
      return <Redirect to="/booking" />;
    }

    return (
      <Layout noNav>
        <Logo src={LogoImage} />
        <Background src={backgroundImg} />
        <CustomRow verticalAlign="middle">
          <CustomColumn verticalAlign="bottom">
            <Grid centered>
              <Grid.Row style={{paddingBottom: '0.5rem'}}>
                <Grid.Column textAlign="center">
                  <BasicButton primary onClick={this.onSignupFamily} fluid>
                    <FormattedMessage id="welcome.parentsBtn" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
              <CustomRow noPadding textAlign="center">
                <Paragraph secondary>
                  <FormattedMessage id="welcome.or" />
                </Paragraph>
              </CustomRow>
              <Grid.Row style={{paddingTop: '0.5rem'}}>
                <Grid.Column textAlign="center">
                  <BasicButton
                    onClick={this.onSignupAngel}
                    fluid
                    color={props => props.theme.primaryColor}
                    background={props => props.theme.white}
                  >
                    <FormattedMessage id="welcome.babysiterBtn" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <InlineText secondary>
                    <FormattedMessage id="welcome.haveAcc" />
                  </InlineText>
                  <CustomLink to="/login">
                    <FormattedMessage id="welcome.logIn" />
                  </CustomLink>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

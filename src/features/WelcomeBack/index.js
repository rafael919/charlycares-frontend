import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import React, { Component } from 'react';

import backgroundImg from 'Assets/images/website-frontpage.jpg';

import { Paragraph } from 'Components/Text';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Heading from 'Components/Heading';
import Layout from 'Components/Layout';

export default class Welcome extends Component {
  static defaultProps = {
    allowedRoles: [],
  };

  componentDidMount() {
    this.props.preloadLogin();
  }

  onGoToMembership = () => {
    this.props.history.push('/how-it-works');
  }; 
  
  render() {
    return (
      <Layout noNav>
        <Background src={backgroundImg} />
        <CustomRow>
          <CustomColumn verticalAlign="bottom" style={{marginBottom: '4rem'}}>
            <Grid centered>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Heading secondary as="h1" fontSize="1.275em">
                    <FormattedMessage id="welcomeBack.header" />
                  </Heading>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <CustomColumn>
                  <Paragraph textAlign="center" fontSize="0.875em" secondary>
                    <FormattedMessage id="welcomeBack.description1" />
                  </Paragraph>
                  <Paragraph textAlign="center" fontSize="0.875em" secondary>
                    <FormattedMessage id="welcomeBack.description2" />
                  </Paragraph>
                </CustomColumn>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <BasicButton primary onClick={this.onGoToMembership} fluid>
                    <FormattedMessage id="welcomeBack.completeMembership" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

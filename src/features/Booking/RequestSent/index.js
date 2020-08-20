import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import ReferalDesc from './components/ReferalDesc';
import Buttons from './components/Buttons';

export default class RequestSent extends Component {
  state = {};
  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle="Request sent"
        navRightComponent={() => (
          <CustomLink to="/support" primary>
            Ready
          </CustomLink>
        )}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.0675rem 0 0 0">
                <CustomColumn noPadding>
                  <Header as="h5">
                    The request has been sent to the Angel(s)
                  </Header>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                <CustomColumn noPadding>
                  <Paragraph light>
                    Je krijgt van ons een bevestiging wanneer de aanvraag is
                    geaccepteerd of afgewezen
                  </Paragraph>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 3rem 0">
                <CustomColumn noPadding>
                  <Paragraph light>
                    Je krijgt van ons een bevestiging wanneer de aanvraag is
                    geaccepteerd of afgewezen door de Angel(s). De
                    boekingsaanvraag kun je terugvinden in het boekingsoverzicht
                  </Paragraph>
                </CustomColumn>
              </CustomRow>
            </Grid>
            <Divider />
            <Grid container>
              <CustomRow padding="2.0675rem 0 0 0">
                <CustomColumn noPadding>
                  <Header as="h5">
                    Earn babysitting credit by referring friends
                  </Header>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                <CustomColumn noPadding>
                  <ReferalDesc />
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="1.25rem 0 0 0">
                <CustomColumn noPadding>
                  <Buttons />
                </CustomColumn>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

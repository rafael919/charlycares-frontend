import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Layout from 'Components/Layout';
import Divider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import CustomColumn from 'Components/CustomColumn';

import Section from './components/Section';

export default class FeaturesInfo extends Component {
  render() {
    return (
      <Layout
        navBorder
        onNavClose={this.props.history.goBack}
        navTitle="Features explanation"
        longTitle
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem 0">
                <Section border heading="Pro Angel" feature="pro">
                  De Angels heeft op het moment van de screening een
                  aansprakelijkheidsverzekering
                </Section>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <Section border heading="EHBO" feature="ehbo">
                  Angels is in bezit van een EHBO
                </Section>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <Section border heading="Baby ervaring" feature="baby">
                  Heeft ervaring met babies van onder de 5 maanden
                </Section>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <Section border heading="Kan autorijden" feature="car">
                  Is in bezit van rijbewijs en durft om met kinderen te rijden
                </Section>
              </CustomRow>
              <CustomRow padding="0 0 5rem 0">
                <Section
                  heading="Aansprakelijkheidsverzekering"
                  feature="insurance"
                >
                  Angel heeft op het moment van de screening een
                  aansprakelijkheidsverzekering
                </Section>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

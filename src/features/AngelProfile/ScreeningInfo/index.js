import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Layout from 'Components/Layout';
import Divider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import CustomColumn from 'Components/CustomColumn';

import ScreenHeader from './components/ScreenHeader';
import Section from './components/Section';

export default class ScreeningInfo extends Component {
  render() {
    return (
      <Layout
        navBorder
        onNavClose={this.props.history.goBack}
        navTitle="Screening information"
        longTitle
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem 0">
                <ScreenHeader>
                  Wanneer is het een geslaagde screening?
                </ScreenHeader>
              </CustomRow>
              <Section title="CV & achtergrondinformatie">
                Tijdens een persoonlijk gesprek op één van onze locaties checken
                we het CV en vragen we door over de (studie)achtergrond,
                oppaservaring en motivatie.
              </Section>
              <Section title="Persoonlijkheid en motivatie">
                Alle achtergronden en persoonlijkheden zijn welkom binnen Charly
                Cares, echter zijn wij streng met de selectie aan de poort. Als
                Oppas Angel ben je integer, verantwoordelijk, proactief, sociaal
                en representatief.
              </Section>
              <Section title="Referentie check">
                Na elke screening bellen we minimaal een gezin op om de
                referentie te checken. Bij specifieke ervaring wordt een extra
                referentie gecheckt.
              </Section>
              <Section title="Intensieve oppaservaring">
                Een dagdienst en avonddienst kunnen flink van elkaar
                verschillen. Daarom moet een Oppas Angel in staat zijn om
                overdag op te kunnen passen en daar minimaal 2 jaar ervaring in
                hebben opgedaan.
              </Section>
              <Section title="Baby ervaring">
                Charly Cares heeft gezinnen met kinderen van verschillende
                leeftijden in haar systeem. Een oppas kan zichzelf daar op
                aanpassen en inspelen.
              </Section>
              <Section title="PRO">
                Tijdens het gesprek checken wij of de oppas in opleiding of
                werkzaam is binnen de kinderopvang, het basisonderwijs of
                geneeskunde.
              </Section>
              <CustomRow padding="0 0 7rem 0" />
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

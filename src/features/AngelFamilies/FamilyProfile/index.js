import { connect } from 'react-redux';
import { onGetFamilyProfile } from '../data/actions';
import { AngelTabBar } from 'Components/NavigationTabs';
import { Grid } from 'semantic-ui-react';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import Description from './components/Description';
import Location from './components/Location';
import Languages from './components/Languages';
import Kids from './components/Kids'; 
import { getFamilyProfile } from '../data/selectors';
import { FormattedMessage } from 'react-intl';

class FamiliesProfile extends Component {
  componentDidMount() {
    const { familyId } = this.props.match.params;
    this.props.onGetFamilyProfile(Number(familyId));
  }

  render() {
    console.log(this.props); 
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="families.profile.navTitle" />}
      >
        {this.props.profile ? (
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow>
                  <Description
                    bio={this.props.profile.short_bio}
                    img={this.props.profile.image}
                    name={this.props.profile.last_name}
                  />
                </CustomRow>
              </Grid>
              <Divider />
              <Grid container>
                <CustomRow>
                  <Location
                    lon={this.props.profile.lon}
                    lat={this.props.profile.lat}
                    address={`${this.props.profile.street_name} ${
                      this.props.profile.street_number
                    }`}
                    city={this.props.profile.city}
                  />
                </CustomRow>
              </Grid>
              <Divider />
              <Grid container>
                <CustomRow>
                  <Kids kids={this.props.profile.kids} />
                </CustomRow>
              </Grid>
              <Divider />
              <Grid container>
                <CustomRow padding="1rem 0 10rem 0">
                  <Languages languages={this.props.profile.user.languages[0]} />
                </CustomRow>
              </Grid>
            </CustomColumn>
          </CustomRow>
        ) : null}

        <AngelTabBar />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    profile: getFamilyProfile(state),
  }),
  {
    onGetFamilyProfile,
  }
)(FamiliesProfile);

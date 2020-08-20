import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Divider, Segment } from 'semantic-ui-react';
import Navigation from 'Components/Navigation';
import React from 'react';

import { getFamilyProfile } from '../../data/selectors';
import { onGetFamilyProfile } from '../../data/actions';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Description from '../components/Description';
import Languages from '../components/Languages';
import Kids from '../components/Kids';

import Location from '../components/Location';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';

class FamiliesProfile extends React.Component {
  componentDidMount() {
    const { familyId } = this.props.match.params;
    this.props.onGetFamilyProfile(Number(familyId));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.match.params.familyId !== prevProps.match.params.familyId) {
  //     const { familyId } = this.props.match.params;
  //     this.props.onGetFamilyProfile(Number(familyId));
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <Navigation
          onBack={this.props.history.goBack}
          title={<FormattedMessage id="families.profile.navTitle" />}
        />
        {this.props.isLoading && <Loader />}
        {this.props.errors && (
          <Error
            errors={this.props.errors}
            onErrorConfirm={this.props.onErrorConfirm}
          />
        )}
        {this.props.profile && (
          <div>
            <Segment basic vertical>
              <Description
                bio={this.props.profile.short_bio}
                img={this.props.profile.image}
                name={this.props.profile.last_name}
              />
            </Segment>
            <Divider fitted />
            <Segment basic vertical>
              <Location
                lon={this.props.profile.lon}
                lat={this.props.profile.lat}
                address={`${this.props.profile.street_name} ${
                  this.props.profile.street_number
                }`}
                city={this.props.profile.city}
              />
            </Segment>
            <Divider fitted />
            <Segment basic vertical>
              <Kids kids={this.props.profile.kids} />
            </Segment>
            <Divider fitted />
            <Segment basic vertical>
              <Languages languages={this.props.profile.user.languages[0]} />
            </Segment>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    profile: getFamilyProfile(state),
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
  }),
  {
    onGetFamilyProfile,
    onErrorConfirm,
  }
)(FamiliesProfile);

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment } from 'semantic-ui-react';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React, { PureComponent, Fragment } from 'react';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { getPreferences, getUserProfile } from '../selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetPreferences, onUpdatePreferences } from '../actions';
import Preferences from '../components/Preferences';
import RdyButton from '../../components/RdyButton';
import cloneDeep from 'lodash/cloneDeep';

class AngelPreferences extends PureComponent {
  state = {
    arePreferencesChanged: false,
  };
  componentDidMount() {
    this.props.onGetPreferences();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.preferences !== this.props.preferences) {
      this.setState(
        {
          preferences: this.props.preferences,
        },
        () => {
          this.initialState = this.props.preferences;
        }
      );
    }
  }

  onPreferenceChange = (preference, type) => e => {
    let preferences = cloneDeep(this.state.preferences);
    if (type === 'bool') {
      preferences[preference].pivot.value = !this.state.preferences[preference]
        .pivot.value;
    }

    if (preference === 'kids_age') {
      preferences['min_kids_age'].pivot.value = e.min;
      preferences['max_kids_age'].pivot.value = e.max;
    } else if (type === 'slider') {
      preferences[preference].pivot.value = e;
    }
    this.setState(
      {
        preferences: preferences,
      },
      () => {
        this.setState({ arePreferencesChanged: this.arePreferencesChanged() });
      }
    );
  };

  onPreferencesUpdate = () => {
    let preferences = cloneDeep(this.state.preferences);
    let data = [];
    Object.keys(preferences).map(key => {
      data.push({ key: key, value: preferences[key].pivot.value });
    });
    this.setState(
      {
        arePreferencesChanged: false,
      },
      () => {
        this.props.onUpdatePreferences(data);
      }
    );
  };

  arePreferencesChanged = () => {
    if (!this.initialState) return false;
    let changed = false;
    for (let prop in this.state.preferences) {
      if (this.initialState[prop] !== this.state.preferences[prop]) {
        return (changed = true);
      }
    }
    return changed;
  };

  render() {
    return (
      <Fragment>
        {this.props.isLoading ? <Loader /> : null}
        <Navigation
          title={<FormattedMessage id="profile.angel.preferences.navTitle" />}
          onBack={this.props.history.goBack}
          rightComp={
            <RdyButton
              disabled={!this.state.arePreferencesChanged}
              onClick={this.onPreferencesUpdate}
            >
              <FormattedMessage id="profile.family.rdy" />
            </RdyButton>
          }
        />
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />

        <Segment basic vertical>
          {this.state.preferences && !this.props.isLoading && (
            <Preferences
              onPreferenceChange={this.onPreferenceChange}
              preferences={this.state.preferences}
              minAgeChildren={
                this.props.profile
                  ? this.props.profile.angel.min_age_children
                  : 48
              }
            />
          )}
        </Segment>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    preferences: getPreferences(state),
    profile: getUserProfile(state),
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onGetPreferences,
    onUpdatePreferences,
    onErrorConfirm,
  }
)(AngelPreferences);

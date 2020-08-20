import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import curry from 'ramda/es/curry';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { Component } from 'react';
import API from '../api';

import MembershipPeriodSelect from '../components/MembershipPeriodSelect';
import MembershipTypes from '../components/MembershipTypes';
import Prices from '../components/Prices';

class Membership extends Component {
  setCurrentTypeInitialIndex = () => {
    if (this.props.membership && this.props.membership.current_state) {
      switch (this.props.membership.current_state) {
        case 'basic':
          return 0;
        case 'premium':
          return 2;
        default:
          return 1;
      }
    }
  };

  state = {
    currentType: 'Flexible',
    currentPeriod: '_MONTHLY_',
    touched: false,
    typeInitialIndex: 1,
    error: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onPeriodSelect = period => () => {
    this.setState({
      currentPeriod: period,
    });
  };

  onTypeSelect = memoizeWith(
    (type, _) => {
      return type;
    },
    curry((type, index, _) => {
      this.setState({
        currentType: type,
        touched: true,
        typeInitialIndex: index,
      });
    })
  );

  onSaveMembership = () => {
    this.setState({ isLoading: true }, () => {
      API.saveMembership({
        membership: this.state.currentType.toLowerCase(),
        terms: this.state.currentPeriod.replace(/_/g, '').toLowerCase(),
      })
        .then(res => {
          this.setState({ isLoading: false }, () => {
            this.props.history.push('/connect-payment');
          });
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
        });
    });
  };

  onErrorConfirm = () => {
    this.setState({ error: null, isLoading: false });
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          error={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader /> : null}
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Header as="h3">
              {this.props.intl.formatMessage({
                id: 'membership.title',
              })}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <MembershipPeriodSelect
              selectedPeriod={this.state.currentPeriod}
              onPeriodSelect={this.onPeriodSelect}
            />
            <MembershipTypes
              onTypeSelect={this.onTypeSelect}
              activeType={this.state.currentType}
            />
            <Prices
              typeIndex={this.state.typeInitialIndex}
              period={this.state.currentPeriod}
              selectedType={this.state.currentType}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <BasicButton primary fluid onClick={this.onSaveMembership}>
              <FormattedMessage id="membership.button" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(Membership);

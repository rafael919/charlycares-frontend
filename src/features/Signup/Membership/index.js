import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import curry from 'ramda/es/curry';
import CustomColumn from 'Components/CustomColumn';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { Component } from 'react';
import API from './api';

import MembershipPeriodSelect from './components/MembershipPeriodSelect';
import MembershipTypes from './components/MembershipTypes';
import Prices from './components/Prices';

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
    currentType: 'flexible',
    currentPeriod: '_MONTHLY_',
    touched: false,
    typeInitialIndex: 1,
    error: null,
    isLoading: false,
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

  onCancelMembership = e => {
    const data = {
      reasons: [
        {
          name: 'not_enough_usage',
          text: "I don't use the service enough.",
        },
      ],
    };

    this.props.onCancelMembership(data);
  };

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
    this.setState({ error: null });
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="membership.title" />}
      >
        <Divider />
        <Error error={this.state.error} onErrorConfirm={this.onErrorConfirm} />
        {this.state.isLoading ? <Loader /> : null}
        <CustomRow noPadding>
          <CustomColumn>
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
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid onClick={this.onSaveMembership}>
            <FormattedMessage id="membership.button" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

export default Membership;

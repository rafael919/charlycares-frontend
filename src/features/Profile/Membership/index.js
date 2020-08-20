import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import curry from 'ramda/es/curry';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import React, { Component } from 'react';
import Success from 'Components/Success';
import { getLoadingStatus } from '../../../ui/selectors';
import Loader from 'Components/Loader';

import {
  getMembershipData,
  getMembershipStatus,
  getMembershipUpdateStatus,
} from './selectors';
import {
  onCancelMembership,
  onCancelMembershipReset,
  onSaveMembership,
  onSaveMembershipReset,
} from './actions';
import CancelMembership from './components/CancelMembership';
import MembershipPeriodSelect from './components/MembershipPeriodSelect';
import MembershipTypes from './components/MembershipTypes';
import Prices from './components/Prices';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  align-self: flex-end;
`;

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
    currentType:
      this.props.membership.current_state === 'canceled' ||
      this.props.membership.current_state === 'trial'
        ? 'flexible'
        : this.props.membership.current_state,
    currentPeriod: '_MONTHLY_',
    touched: false,
    typeInitialIndex: this.setCurrentTypeInitialIndex(),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    if (this.props.isMembershipCanceled) {
      this.props.onCancelMembershipReset();
    }
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
    this.props.history.push('/profile/membership/cancel');
  };

  onMembershipUpdate = () => {
    const data = {
      membership: this.state.currentType.toLowerCase(),
      terms: this.state.currentPeriod.replace(/_/g, '').toLowerCase(),
    };

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FChoosePlan', {
        plan: this.state.currentType.toLowerCase(),
        terms:
          this.state.currentPeriod.replace(/_/g, '').toLowerCase() === 'annual'
            ? 'yearly'
            : this.state.currentPeriod.replace(/_/g, '').toLowerCase(),
      });
    }

    this.props.onSaveMembership(data);
    this.props.membership.current_state = data.membership;
  };

  rederCancelButton() {
    if (this.props.membership.current_state)
      return <CancelMembership onCancelMembership={this.onCancelMembership} />;

    const style = {
      paddingTop: '1.5rem',
    };

    return <div style={style} />;
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />;
    }
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="profile.family.membership.navTitle" />}
        navSubTitle={
          this.props.membership.current_state !== 'canceled' ? (
            <FormattedMessage
              id="profile.family.membership.subtitle"
              values={{
                date: moment(
                  this.props.membership.valid_until,
                  'YYYY-MM-DD'
                ).format('DD-MM-YYYY'),
              }}
            />
          ) : null
        }
      >
        <Success
          isVisible={
            this.props.isMembershipUpdated || this.props.isMembershipUpdated
          }
          onConfirm={
            this.props.isMembershipUpdated
              ? this.props.onSaveMembershipReset
              : this.props.onCancelMembershipReset
          }
        >
          {this.props.isMembershipUpdated ? (
            <FormattedMessage id="profile.family.membership.succesfullUpdateMessage" />
          ) : (
            <FormattedMessage id="profile.family.membership.succesfullCancelMessage" />
          )}
        </Success>
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
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
            {this.props.membership.current_state !== 'canceled' && (
                <Divider fitted />
              ) &&
              this.rederCancelButton()}
          </CustomColumn>
        </CustomRow>
        <InputContainer>
          <Confirmation>
            <BasicButton
              primary={
                this.props.membership.current_state === 'canceled'
                  ? true
                  : this.state.touched
              }
              fluid
              disabled={
                this.props.membership.current_state === 'canceled'
                  ? false
                  : !this.state.touched
              }
              onClick={this.onMembershipUpdate}
            >
              {this.props.membership.current_state === 'canceled' ? (
                <FormattedMessage id="profile.family.membership.saveBtnCanceled" />
              ) : (
                <FormattedMessage id="profile.family.membership.saveBtn" />
              )}
            </BasicButton>
          </Confirmation>
        </InputContainer>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  membership: getMembershipData(state),
  isLoading: getLoadingStatus(state),
  isMembershipCanceled: getMembershipStatus(state),
  isMembershipUpdated: getMembershipUpdateStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onCancelMembership: data => dispatch(onCancelMembership(data)),
  onCancelMembershipReset: () => dispatch(onCancelMembershipReset()),
  onSaveMembership: data => dispatch(onSaveMembership(data)),
  onSaveMembershipReset: () => dispatch(onSaveMembershipReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Membership);

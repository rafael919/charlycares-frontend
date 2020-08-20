import { AngelPromoDashboard } from 'Components/Progressive';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Divider } from 'semantic-ui-react';
import Error from 'Components/Error';
import Navigation from 'Components/Navigation';
import React, { PureComponent, Fragment } from 'react';

import debounce from 'lodash.debounce';

import { getAngelData, getMessages, getCredit } from '../selectors';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetDashboardData, onRateUpdate } from '../actions';
import EarningsAndCredit from '../components/EarningsAndCredit';
import Messages from '../../components/Messages';
import Rate from '../components/Rate';
import Score from '../components/Score';

class AngelDashboard extends PureComponent {
  state = {
    normal: null,
    extra: null,
    initialNormal: null,
    initialExtra: null,
    normalMax: null,
    extraMax: null,
    minRate: 2,
    numOfMessages: 2,
  };

  componentDidMount = () => {
    this.props.onGetDashboardData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.angelData !== prevProps.angelData) {
      console.log(this.props.angelData);
      this.setState(() => {
        return {
          normal: this.props.angelData.normal_rate,
          extra: this.props.angelData.extra_rate,
          initialNormal: this.props.angelData.initial_normal_rate,
          initialExtra: this.props.angelData.initial_extra_rate,
          normalMax: this.props.angelData.max_rates.max_normal_rate,
          extraMax: this.props.angelData.max_rates.max_extra_rate,
        };
      });
    }
    if (this.props.messages.length > 0) {
      this.setState(prevState => {
        return {
          ...prevState,
          numOfMessages: 10,
        };
      });
    }
  }

  onRateIncrease = type => () => {
    this.setState(
      prevState => {
        if (prevState[type] + 0.25 > prevState[`${type}Max`]) {
          return null;
        }
        return {
          ...prevState,
          [type]: prevState[type] + 0.25,
        };
      },
      () => {
        this.onRateUpdate();
      }
    );
  };

  onRateDecrease = type => () => {
    this.setState(
      prevState => {
        if (prevState[type] - 0.25 < prevState.minRate) {
          return null;
        }
        return {
          ...prevState,
          [type]: prevState[type] - 0.25,
        };
      },
      () => {
        this.onRateUpdate();
      }
    );
  };

  onRateUpdate = debounce(() => {
    this.props.onRateUpdate({
      normal_rate: this.state.normal,
      extra_rate: this.state.extra,
    });
  }, 1500);

  render() {
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.angel.dashboard.navTitle" />}
          onBack={this.props.history.goBack}
        />
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />

        {Object.keys(this.props.angelData).length > 0 ? (
          <EarningsAndCredit
            avgRating={this.props.angelData.average_rating}
            totalEarnings={this.props.angelData.total_earnings}
            referrals={this.props.angelData.referrals}
            credit={this.props.credit}
            history={this.props.history}
          />
        ) : (
          <AngelPromoDashboard isLoading={this.props.isLoading} />
        )}
        <Messages
          isLoading={!this.props.messages}
          messages={this.props.messages}
          numOfMessages={this.state.numOfMessages}
          showTitle={true}
        />
        <Divider fitted />
        <Rate
          onRateDecrease={this.onRateDecrease}
          onRateIncrease={this.onRateIncrease}
          rates={this.state}
        />
        {Object.keys(this.props.angelData).length > 0 && (
          <Score scores={this.props.angelData.price_levels} />
        )}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    messages: getMessages(state),
    angelData: getAngelData(state),
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
    credit: getCredit(state),
  }),
  {
    onErrorConfirm,
    onGetDashboardData,
    onRateUpdate,
  }
)(AngelDashboard);

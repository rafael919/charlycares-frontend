import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import { connect } from 'react-redux';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React from 'react';
import { getLoadingStatus } from '../../../../../ui/selectors';
import Error from 'Components/Error';
import { Redirect } from 'react-router-dom';

import ActionButtons from '../components/ActionButtons';
import Header from '../components/Header';
import List from '../components/List';
import Message from '../components/Message';
import Reason from '../components/Reason';

import { 
  onCancelMembership 
} from '../../actions';

import {
  getMembershipData,
} from '../../selectors';

class Cancellation extends React.Component {
  state = {
    isLoading: false,
    error: null,
    message: '',
    selectedReasons: [],
  };

  onMessageChange = e => {
    this.setState({
      message: e.target.value,
    });
  };

  cancelMembership = () => {
    this.props.onCancelMembership({reasons: this.state.selectedReasons, add_reason: this.state.message});
  }

  componentDidUpdate() {
    if(this.props.membership && this.props.membership.current_state === 'canceled') {
      return this.props.history.push('/profile/membership');
    }
  }

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  isReasonSelected = id => {
    if (this.state.selectedReasons && this.state.selectedReasons.length) {
      return Boolean(
        this.state.selectedReasons.find(
          selectedReason => selectedReason.id === id
        )
      );
    }
  };

  onReasonSelect = reason => () => {
    const isInList = this.state.selectedReasons.find(
      selectedReason => selectedReason.id === reason.id
    );
    if (Boolean(isInList)) {
      this.setState(state => {
        return {
          selectedReasons: state.selectedReasons.filter(
            selectedReason => selectedReason.id !== reason.id
          ),
        };
      });
    } else {
      this.setState(state => ({
        selectedReasons: [...state.selectedReasons, reason],
      }));
    }
  };

  render() {
    if(this.props.membership && this.props.membership.current_state === 'canceled') {
      return <Redirect to="/profile/membership" />;
    }
    return (
      <React.Fragment>
        <Navigation
          title={<FormattedMessage id="profile.family.membership.cancel.navTitle" />}
          isWhite
          onBack={this.props.history.goBack}
        />
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <CustomRow padding="1rem 0 0 0">
          <CustomColumn>
            {this.props.isLoading ? <Loader /> : null}
            <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />
                
                <Header>
                  <FormattedMessage id="profile.family.membership.cancel.title" />
                </Header>
                <Paragraph light fontSize="0.9375rem">
                  <FormattedMessage id="profile.family.membership.cancel.desc" />
                </Paragraph>
                <List>
                  {this.props.membership && this.props.membership.cancellation_reasons
                    ? this.props.membership.cancellation_reasons.map(reason => (
                        <Reason
                          key={reason.id}
                          data={reason}
                          onReasonSelect={this.onReasonSelect}
                          selected={this.isReasonSelected(reason.id)}
                        />
                      ))
                    : null}
                </List>
                <Message
                  message={this.state.message}
                  onMessageChange={this.onMessageChange}
                />
              </CustomColumn>
            </CustomRow>
            <Confirmation>
              <ActionButtons
                onCancel={this.props.history.goBack}
                onCancelMembership={this.cancelMembership}
                disabled={this.state.selectedReasons.length === 0}
              />
            </Confirmation>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  membership: getMembershipData(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onCancelMembership: data => dispatch(onCancelMembership(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cancellation);

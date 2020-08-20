import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Divider } from 'semantic-ui-react';
import Error from 'Components/Error';
import Navigation from 'Components/Navigation';
import React, { PureComponent, Fragment } from 'react';

import { getMessages } from '../selectors';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { onGetDashboardData } from '../actions';
import { onErrorConfirm } from '../../../../ui/actions';
import Messages from '../../components/Messages';

class FamilyDashboard extends PureComponent {
  state = {
    numOfMessages: 2,
  };

  componentDidMount = () => {
    this.props.onGetDashboardData();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length > 0) {
      this.setState(prevState => {
        return {
          ...prevState,
          numOfMessages: 10,
        };
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.family.messages.navTitle" />}
          onBack={this.props.history.goBack}
        />
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <Messages
          isLoading={this.props.isLoading}
          messages={this.props.messages}
          numOfMessages={this.state.numOfMessages}
          showTitle={false}
        />
        <Divider fitted />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    messages: getMessages(state),
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
  }),
  {
    onErrorConfirm,
    onGetDashboardData
  }
)(FamilyDashboard);



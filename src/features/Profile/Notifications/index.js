
import { FamilyTabBar } from 'Components/NavigationTabs';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import EmptyCell from 'Components/EmptyCell';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import React, { PureComponent } from 'react';

import { getMessages } from './selectors';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetDashboardData } from './actions';

import Messages from '../components/Messages';

class FamilyNotifications extends PureComponent {
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
      <Layout
        navBorder
        navTitle={<FormattedMessage id="profile.family.messages.navTitle" />}
        onNavBack={this.props.history.goBack}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Messages
                isLoading={this.props.isLoading}
                messages={this.props.messages}
                numOfMessages={this.state.numOfMessages}
                showTitle={false}
              />
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="3.5rem 0" />
        </ContentWrapper>
        <FamilyTabBar />
      </Layout>
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
    onGetDashboardData,
  }
)(FamilyNotifications);

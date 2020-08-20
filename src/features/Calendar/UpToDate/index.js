import { injectIntl, FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import API from '../data/api';
import Header from './components/Header';

class UpToDate extends Component {
  state = {
    isLoading: false,
    error: null,
  };

  onEventUpdate = () => {
    this.setState({ isLoading: true }, () => {
      API.upToDate()
        .then(res => {
          this.setState({ isLoading: false }, () => {
            this.props.history.push('/calendar/add');
          });
        })
        .catch(err => {
          this.setState({ isLoading: false, error: err });
        });
    });
  };

  onErrorConfirm = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="calendar.angel.upToDate.title" />}
      >
        {this.state.isLoading ? <Loader isLoading /> : null}
        {this.state.error ? (
          <Error
            errors={this.state.error}
            onErrorConfirm={this.onErrorConfirm}
          />
        ) : null}
        <CustomRow noPadding>
          <CustomColumn padding="0 1rem 7rem">
            <Divider inner />
            <Header>
              {this.props.intl.formatMessage({
                id: 'calendar.angel.upToDate.header',
              })}
            </Header>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'calendar.angel.upToDate.desc1',
              })}
            </Paragraph>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'calendar.angel.upToDate.desc2',
              })}
            </Paragraph>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid onClick={this.onEventUpdate}>
            <FormattedMessage id="calendar.angel.upToDate.btn" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

export default injectIntl(UpToDate);

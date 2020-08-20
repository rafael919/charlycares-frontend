import { injectIntl, FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React from 'react';
import API from '../../data/api';

import Header from '../components/Header';

class UpToDate extends React.Component {
  state = {
    error: null,
    isLoading: false,
  };

  onAvailabilityUpdate = () => {
    this.setState({ isLoading: true }, () => {
      API.upToDate()
        .then(res => {
          this.setState({ isLoading: false }, () => {
            this.props.handleModalClose();
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
      <React.Fragment>
        <Navigation
          title={<FormattedMessage id="calendar.angel.upToDate.title" />}
          isWhite
          onBack={
            this.props.history
              ? this.props.history.goBack
              : this.props.handleUpToDate
          }
        />
        {this.state.isLoading ? <Loader /> : null}
        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <CustomRow padding="1rem 0 1rem 0">
          <CustomColumn>
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
          <BasicButton onClick={this.onAvailabilityUpdate} fluid primary>
            <FormattedMessage id="calendar.angel.upToDate.btn" />
          </BasicButton>
        </Confirmation>
      </React.Fragment>
    );
  }
}

export default injectIntl(UpToDate);

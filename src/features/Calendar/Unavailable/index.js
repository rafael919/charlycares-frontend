import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import curry from 'ramda/es/curry';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { PureComponent } from 'react';
import AnimationWrapper from 'Components/AnimationWrapper';

import { getActiveStatusAndInactiveEnd } from './selectors';
import { slideIn, slideOut } from '../../../themes/animations';
import API from './api';
import Hours from './components/Hours';
import Timer from './components/Timer';

class Unavailable extends PureComponent {
  layoutRef = React.createRef();
  state = {
    isActive: 0,
    inactiveEnd: null,
    inactiveStart: null,
    errors: null,
    isLoading: false,
  };

  componentDidMount() {
    this.onGetStatus();
    slideIn(this.layoutRef.current);
  }

  fetchStatus = () => {
    API.getStatus()
      .then(({ data }) => {
        this.setState({
          isActive: data.data.is_active,
          inactiveEnd: data.data.inactive_end,
          isLoading: false,
          inactiveStart: data.data.updated_at,
        });
      })
      .catch(errors => {
        this.this.setState({
          errors,
          isLoading: false,
        });
      });
  };

  updateInactive = hours => () => {
    API.updateInactiveStatus({ hours })
      .then(res => {
        this.fetchStatus();
      })
      .catch(errors => {
        this.setState({
          errors,
          isLoading: false,
        });
      });
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  onGetStatus = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.fetchStatus
    );
  };

  onSetInactive = memoizeWith(
    hours => hours,
    curry((hours, _ev) => {
      this.setState(
        {
          isLoading: true,
        },
        this.updateInactive(hours)
      );
    })
  );

  onStopTimer = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.stopTimer()
          .then(() => {
            this.setState({
              isActive: 0,
              inactiveEnd: null,
              inactiveStart: null,
              isLoading: false,
            });
          })
          .catch(errors => {
            this.setState({
              errors,
              isLoading: false,
            });
          });
      }
    );
  };

  onClose = () => {
    slideOut(this.layoutRef.current, this.props.history.goBack);
  };

  render() {
    const { isActive, inactiveEnd } = this.state;
    return (
      <AnimationWrapper innerRef={this.layoutRef}>
        <Layout
          navBorder
          noBPadding
          navTitle={
            <FormattedMessage id="calendar.angel.unavailable.navTitle" />
          }
          onNavClose={this.onClose}
          navRightComponent={() => (
            <CustomLink to="/faq">
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          )}
        >
          <Error
            errors={this.state.errors}
            onErrorConfirm={this.onErrorConfirm}
          />
          {this.state.isLoading ? <Loader isLoading /> : null}
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow padding="2rem 0 0">
                  <Hours onSetInactive={this.onSetInactive} />
                </CustomRow>
                <CustomRow>
                  {isActive === 0 && inactiveEnd ? (
                    <Timer
                      onStopTimer={this.onStopTimer}
                      startTime={this.state.inactiveStart}
                      endTime={this.state.inactiveEnd}
                    />
                  ) : null}
                </CustomRow>
              </Grid>
            </CustomColumn>
          </CustomRow>
        </Layout>
      </AnimationWrapper>
    );
  }
}

export default connect(state => ({
  status: getActiveStatusAndInactiveEnd(state),
}))(Unavailable);

import { connect } from 'react-redux';
import { ProgressiveFacebook } from 'Components/Progressive';
import { Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Explanation from 'Components/Explanation/Custom/Joblist';
import React, { Component, Fragment } from 'react';

import { getListings } from '../selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onGetListings } from '../actions';
import { LoadableJoblistDetails, LoadableJoblistConfirmation } from '../routes';
import Chat from '../../Chat/Desktop';
import Listings from '../components/Listings';

class Joblist extends Component {
  state = {
    listings: [],
  };

  componentDidMount() {
    this.props.onGetListings();
  }

  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn withScroll>
          <Fragment>
            {this.props.isLoading &&
            this.props.location.pathname === '/joblist' &&
            !this.state.listings.length ? (
              <Segment basic vertical>
                <ProgressiveFacebook isLoading={true} />
              </Segment>
            ) : (
              <React.Fragment>
                <Listings
                  history={this.props.history}
                  listings={this.props.listings}
                />
              </React.Fragment>
            )}
          </Fragment>
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn withScroll>
          <TransitionGroup>
            <CSSTransition
              classNames="desktop"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 600 }}
              key={this.props.location.key || this.props.location.pathname}
            >
              <Switch>
                <Route
                  path="/joblist/joblist-details/chat/:userId"
                  component={Chat}
                />
                <Route
                  path="/joblist/joblist-details/:bookingId"
                  component={LoadableJoblistDetails}
                />
                <Route
                  path="/joblist/confirmation"
                  component={LoadableJoblistConfirmation}
                />
                <Route component={Explanation} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  listings: getListings(state),
});

const mapDispatchToProps = dispatch => ({
  onGetListings: () => dispatch(onGetListings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Joblist);

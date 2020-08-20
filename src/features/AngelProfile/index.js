import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../themes/default';
import Loader from 'Components/Loader';

const LoadableProfile = Loadable({
  loader: () => import(/* webpackChunkName: "booking-create" */ './Angel'),
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableScreeningInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "booking-repeat" */ './ScreeningInfo'),
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableFeaturesInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "booking-repeat" */ './FeaturesInfo'),
  loading: () => {
    return <Loader isLoading />;
  },
});

export default class AngelProfile extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Fragment>
          <Route
            exact
            path={`${this.props.match.path}`}
            component={LoadableProfile}
          />
          <Route
            path={`${this.props.match.path}/screening`}
            component={LoadableScreeningInfo}
          />
          <Route
            path={`${this.props.match.path}/features-info`}
            component={LoadableFeaturesInfo}
          />
        </Fragment>
      </ThemeProvider>
    );
  }
}

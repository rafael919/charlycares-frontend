import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Explanation from 'Components/Explanation/Custom/Shop';

import {
  LoadableShopHome,
  LoadableShopGetPointsHelp,
  LoadableShopPurchases,
  LoadableShopHistory,
  LoadableShopPurchase,
} from '../routes';

export default class Shops extends React.PureComponent {
  render() {
    const { location } = this.props;
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn withScroll>
          <Route path="/shop" component={LoadableShopHome} />
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn withScroll>
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="desktop"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 600 }}
              key={location.key || location.pathname}
            >
              <Switch>
                <Route
                  path="/shop/help"
                  component={LoadableShopGetPointsHelp}
                />
                <Route
                  path="/shop/purchases"
                  component={LoadableShopPurchases}
                />
                <Route path="/shop/history" component={LoadableShopHistory} />
                <Route
                  path="/shop/purchase/:giftId"
                  component={LoadableShopPurchase}
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

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Header, Segment } from 'semantic-ui-react';
import Navigation from 'Components/Navigation';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';

import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import {
  getGifts,
  getAvailablePoints,
  getUserId,
  getPurchaseCount,
  getTransactions,
} from '../../selectors';

import Gift from '../../components/components/Gift';

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 1rem;
`;

const DescContainer = styled.div`
  justify-content: flex-start;
  width: 100%;
  padding: 0 1rem;
  font-size: 0.9rem;
  color: ${props => props.warning && props.theme.warning};
  text-align: left;
`;

class Purchase extends React.Component {
  state = {
    availablePoints: 0,
    purchaseCount: 0,
    gifts: [],
    transactions: [],
    gift: null,
  };

  componentDidMount() {
    const { location } = this.props;
    if (location.state.gift) {
      this.setState({ gift: location.state.gift });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.availablePoints)
      this.setState({ availablePoints: nextProps.availablePoints });

    if (nextProps.purchaseCount)
      this.setState({ purchaseCount: nextProps.purchaseCount });
  }

  render() {
    const { isLoading, location, history } = this.props;
    const { availablePoints, gift } = this.state;

    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="shop.menu.purchases" />}
          onBack={history.goBack}
        />
        {(isLoading && location.pathname.includes('/shop/purchase/')) ||
        !gift ? (
          <Segment basic vertical>
            <TimerLoader isLoading={true} />
            <ProgressiveFacebook isLoading={true} />
          </Segment>
        ) : (
          <Fragment>
            <TitleContainer>
              <Header as="h4">
                <FormattedMessage id="shop.purchase.congrats.txt" />
              </Header>
            </TitleContainer>
            <Gift
              showType={'detail'}
              availablePoints={availablePoints}
              gift={gift}
              history={history}
            />
            <TitleContainer>
              <Header as="h4">
                <FormattedMessage id="shop.purchase.howToUse.txt" />
              </Header>
            </TitleContainer>
            <DescContainer>
              <FormattedMessage
                id="shop.purchase.howToUse.desc.line1"
                values={{ url: gift.url }}
              />
            </DescContainer>
            <DescContainer>
              <FormattedMessage
                id="shop.purchase.howToUse.desc.line2"
                values={{ code: gift.code ? gift.code : '' }}
              />
            </DescContainer>
            <DescContainer>{gift.usageDescription}</DescContainer>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  userId: getUserId(state),
  gifts: getGifts(state),
  transactions: getTransactions(state),
  availablePoints: getAvailablePoints(state),
  purchaseCount: getPurchaseCount(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchase);

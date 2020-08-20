import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import { ProgressiveConversations } from 'Components/Progressive';

import Points from '../components/PointBar';

import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import {
  getGifts,
  getAvailablePoints,
  getUserId,
  getPurchaseCount,
  getTransactions,
} from '../selectors';

import Gift from '../components/components/Gift';

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

class Purchase extends Component {
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
    const { isLoading, history } = this.props;
    const { availablePoints, gift } = this.state;
    console.log(isLoading, gift);
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="shop.menu.purchases" />}
        onNavBack={history.goBack}
      >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              {isLoading || !gift ? (
                <CustomColumn>
                  <ProgressiveConversations isLoading={true} />
                </CustomColumn>
              ) : (
                <CustomColumn>
                  <Points value={`${availablePoints}`} />

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
                    isLoading={false}
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
                </CustomColumn>
              )}
            </CustomColumn>
          </CustomRow>
        </ContentWrapper>
      </Layout>
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

import { Divider, Grid, Header } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { generateLink } from 'Utils';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';

import API from '../api';
import ConnectToAccount from '../components/ConnectToAccount';
import PromotionalCode from '../components/PromotionalCode';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';

class ConnectPayment extends Component {
  state = {
    coupon: '',
    isLoading: false,
    type: null,
    message: null,
    errors: null,
    paymentLink: null,
  };

  componentDidMount() {
    if (!this.props.paymentLink) {
      this.setState({ isLoading: true }, () => {
        API.getMembership()
          .then(({ data }) => {
            this.setState({
              paymentLink: generateLink(data.data.payment_link),
              isLoading: false,
            });
          })
          .catch(err => this.setState({ errors: err, isLoading: false }));
      });
    }
  }

  addPromoCode = () => {
    this.setState({ isLoading: true }, () => {
      API.addPromoCode(this.state.coupon)
        .then(res => {
          this.setState({
            isLoading: false,
            type: res.data.message,
            message: res.data.data.description,
            isCodeValid:
              res.data.data.message === 'not_found' ||
              res.data.data.message === 'invalid'
                ? false
                : true,
          });
        })
        .catch(err => {
          this.setState({ errors: err, isLoading: false });
        });
    });
  };

  onCouponChange = e => {
    this.setState({
      coupon: e.target.value,
    });
  };

  onErrorConfirm = () => {
    this.setState({ errors: null });
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader /> : null}
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Header as="h3">
              {this.props.intl.formatMessage({
                id: 'connectPayment.title',
              })}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="left">
            <PromotionalCode
              onPromoCodeChange={this.onCouponChange}
              promoCode={this.state.coupon}
              onApply={this.addPromoCode}
              type={this.state.type}
              message={this.state.message}
              isCodeValid={this.state.isCodeValid}
            />
            <Divider />
            <ConnectToAccount
              link={this.props.paymentLink || this.state.paymentLink}
            />
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(ConnectPayment);

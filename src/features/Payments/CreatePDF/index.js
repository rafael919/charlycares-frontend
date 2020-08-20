import { connect } from 'react-redux';

import CustomColumn from 'Components/CustomColumn';
import ContentWrapper from 'Components/ContentWrapper';
import EmptyCell from 'Components/EmptyCell';
import CustomLink from 'Components/CustomLink';
import Confirmation from 'Components/Confirmation';
import Divider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import Loader from 'Components/Loader';
import { getErrors } from '../../../ui/selectors';
import Error from 'Components/Error';

import PaymentsList from './components/PaymentsList';
import ListItem from './components/ListItem';
import ConfirmationSection from './components/ConfirmationSection';
import {
  getPaidPayments,
  getChargeBackPayments,
  getCredit,
} from '../Home/selectors';
import { onGetPayments } from '../Home/action';
import API from './api';

class PaymentsCreatePDF extends Component {
  state = {
    selectedPayments: [],
  };

  componentDidMount() {
    this.props.getPayments();
  }

  onSelectPayment = payment => {
    if (!this.isPaymentSelected(payment)) {
      this.setState(
        {
          selectedPayments: [...this.state.selectedPayments, payment],
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      this.setState({
        selectedPayments: this.state.selectedPayments.filter(
          selectedPayment => selectedPayment.id === payment.id
        ),
      });
    }
  };

  sendExport = () => {
    let data = [];
    this.setState({
      isLoading: true,
    });
    this.state.selectedPayments.map(payment => {
      data.push(payment.id);
    });
    API.exportPayments({ payment_ids: data })
      .then(resp => {
        this.setState({
          isLoading: false,
        });
        this.props.history.push('/payments');
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  isPaymentSelected = payment => {
    return this.state.selectedPayments.find(selectedPayment => {
      return selectedPayment.id === payment.id;
    });
  };

  render() {
    return (
      <Layout
        navBorder
        navTitle="Create PDF"
        onNavClose={this.props.history.goBack}
        navRightComponent={() => (
          <CustomLink fontSize="0.9375rem" to="/support">
            Support
          </CustomLink>
        )}
      >
        {this.state.isLoading && <Loader />}
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <PaymentsList>
                {this.props.paidPayments &&
                  this.props.paidPayments.map(payment => {
                    return (
                      <ListItem
                        sum={payment.total_amount}
                        paymentDesc={payment.current_state}
                        description="tuesday"
                        date="November 14, 2017"
                        onSelect={this.onSelectPayment}
                        selected={this.isPaymentSelected(payment)}
                        payment={payment}
                      />
                    );
                  })}
              </PaymentsList>
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="0 0 10rem" />
        </ContentWrapper>

        <Confirmation>
          <ConfirmationSection sendExport={this.sendExport} />
        </Confirmation>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrors(state),
  paidPayments: getPaidPayments(state),
  chargeBackPayments: getChargeBackPayments(state),
  credit: getCredit(state),
});

const mapDispatchToProps = dispatch => ({
  getPayments: () => dispatch(onGetPayments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsCreatePDF);

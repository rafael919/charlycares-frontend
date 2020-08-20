import { injectIntl } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import image from 'Assets/images/security-final.svg';
import card from 'Assets/icons/icn-feature-payment-card.svg';
import check from 'Assets/icons/icn-check-blue.svg';

import Image from './components/Image';
import Heading from './components/Heading';
import Desc from './components/Desc';
import RetainInfo from './components/RetainInfo';

class NoValidMembership extends Component {
  onButtonClick = () => {
    this.props.history.push({pathname: '/how-it-works', from: 'no-membership'});
  };

  render() {
    return (
      <Layout
        navTitle={this.props.intl.formatMessage({
          id: 'noValidMembership.title',
        })}
        onNavBack={this.props.history.goBack}
        navBorder
      >
        <CustomRow padding="2.5rem 0 0 0">
          <CustomColumn>
            <Image src={image} />
            <Heading>
              {this.props.intl.formatMessage({
                id: 'noValidMembership.heading',
              })}
            </Heading>
            <Desc
              icon={card}
              text={this.props.intl.formatMessage({
                id: 'noValidMembership.desc1',
              })}
            />
            <Desc
              icon={check}
              text={this.props.intl.formatMessage({
                id: 'noValidMembership.desc2',
              })}
            />
            <BasicButton onClick={this.onButtonClick} fluid primary>
              {this.props.intl.formatMessage({
                id: 'noValidMembership.btn',
              })}
            </BasicButton>
            <RetainInfo>
              {this.props.intl.formatMessage({
                id: 'noValidMembership.retainInfo',
              })}
            </RetainInfo>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(NoValidMembership);

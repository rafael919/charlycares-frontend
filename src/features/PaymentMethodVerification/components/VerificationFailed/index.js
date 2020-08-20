import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';
import React, { Component } from 'react';

import { getMembershipData } from '../../../Profile/AccountSettings/selectors';

import closeButton from 'Assets/icons/btn-large-close.svg';

const Icon = styled.img``;

const Wraper = styled.div`

    display: flex;
    align-items: center;

`;

function generateLink(s) {
    if (typeof s !== 'string' || !s) return '';
    var e = {},
      i,
      b = 0,
      c,
      x,
      l = 0,
      a,
      r = '',
      w = String.fromCharCode,
      L = s.length;
    var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (i = 0; i < 64; i++) {
      e[A.charAt(i)] = i;
    }
    for (x = 0; x < L; x++) {
      c = e[s.charAt(x)];
      b = (b << 6) + c;
      l += 6;
      while (l >= 8) {
        ((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
      }
    }
    return r;
  }

class VerificationFailed extends Component {

    constructor(props){
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
        this.goToPayment = this.goToPayment.bind(this);
    }

    goToProfile()
    {
        this.props.history.push('/profile/settings');
    }

    goToPayment(payment_link)
    {
        const link = generateLink(this.props.membershipData.payment_link);

        window.open(link, '_blank');
    }

    render() {

        return (
            <Grid style={{height: '100%'}}>
            <CustomRow>
                <CustomColumn padding={'0px 20px'} width={16}>

                    {this.props.desktop && 
                                    
                        <CustomColumn marginbottom="2.4375rem" mobile={16}>
                            <InlineText bold fontSize='22px' fontFamily="Martel">
                                <FormattedMessage id="paymentMethodVerification.failed.desktopTitle" />
                            </InlineText>
                        </CustomColumn>
                    }

                    <CustomColumn mobile={16}>
                        <Wraper>
                            <Icon src={closeButton} onClick={this.goToProfile} />
                            <InlineText fontSize='15px'>
                                <FormattedMessage id="paymentMethodVerification.failed.title" />
                            </InlineText>
                        </Wraper>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'23px 0px 0px 0px'}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="paymentMethodVerification.failed.text" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                        <InlineText fontSize='15px'>
                            <FormattedMessage id="paymentMethodVerification.failed.platformName" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="paymentMethodVerification.failed.phone" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="paymentMethodVerification.failed.whatsapp" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                        <InlineText light fontSize='15px'>
                            <FormattedMessage id="paymentMethodVerification.failed.footerText" />
                        </InlineText>
                    </CustomColumn>

                    <CustomColumn mobile={16} padding={'20px 0px 0px 0px'}>
                        <BasicButton primary fluid onClick={this.goToPayment}>
                            <FormattedMessage id="paymentMethodVerification.failed.buttonText" />
                        </BasicButton>
                    </CustomColumn>
                </CustomColumn>
            </CustomRow>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    membershipData: getMembershipData(state)
  });
  
  export default connect(
    mapStateToProps
  )(VerificationFailed);

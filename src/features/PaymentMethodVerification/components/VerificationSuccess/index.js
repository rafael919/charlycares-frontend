import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';
import React, { Component } from 'react';

import checkButton from 'Assets/icons/icn-check-blue.svg';

const Icon = styled.img`
    padding-right: 10px;
`;

const Wraper = styled.div`
    display: flex;
    align-items: center;
`;

class VerificationSuccess extends Component {
    render() {
        return (
            <Grid style={{height: '100%'}}>
            <CustomRow>
                <CustomColumn padding={'0px 20px'} width={16}>

                    {this.props.desktop && 
                    
                    <CustomColumn marginBottom="2.4375rem" mobile={16}>
                        <InlineText bold fontSize='22px' fontFamily="Martel">
                            <FormattedMessage id="paymentMethodVerification.success.desktopTitle" />
                        </InlineText>
                    </CustomColumn>
                    }

                    {this.props.hadPandingBooking ?
                        <React.Fragment> 
                            <CustomColumn mobile={16}>
                                <Wraper>
                                    <Icon src={checkButton} />
                                    <InlineText fontSize='15px'>
                                        <FormattedMessage id="paymentMethodVerification.success.firstTitle" />
                                    </InlineText>
                                </Wraper>
                            </CustomColumn>

                            <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                                <Wraper>
                                    <Icon src={checkButton} />
                                    <InlineText fontSize='15px'>
                                        <FormattedMessage id="paymentMethodVerification.success.secondTitle" />
                                    </InlineText>
                                </Wraper>
                            </CustomColumn>
                            <CustomColumn mobile={16} padding={'15px 0px 0px 0px'}>
                                <InlineText light fontSize='15px'>
                                    <FormattedMessage id="paymentMethodVerification.success.textBooking" />
                                </InlineText>
                            </CustomColumn>

                            <CustomColumn mobile={16} padding={'16px 0px 0px 0px'}>
                                <InlineText light fontSize='15px'>
                                    <FormattedMessage id="paymentMethodVerification.success.footerTextBooking" />
                                </InlineText>
                            </CustomColumn>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <CustomColumn mobile={16}>
                                <Wraper>
                                    <Icon src={checkButton} />
                                    <InlineText fontSize='15px'>
                                        <FormattedMessage id="paymentMethodVerification.success.firstTitle" />
                                    </InlineText>
                                </Wraper>
                            </CustomColumn>

                            <CustomColumn mobile={16} padding={'15px 0px 0px 0px'}>
                                <InlineText light fontSize='15px'>
                                    <FormattedMessage id="paymentMethodVerification.success.textNoBooking" />
                                </InlineText>
                            </CustomColumn>
                            

                        </React.Fragment> 
                    }

                    <CustomColumn mobile={16} padding={'20px 0px 0px 0px'}>
                        <BasicButton primary fluid onClick={() => this.props.history.push('/booking')}>
                            <FormattedMessage id="paymentMethodVerification.success.buttonText" />
                        </BasicButton>
                    </CustomColumn>
                </CustomColumn>
            </CustomRow>
            </Grid>
        );
    }
}

export default VerificationSuccess;

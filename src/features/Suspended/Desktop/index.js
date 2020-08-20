import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider'; 

import React, { Component } from 'react';
import Container from '../components/Container'; 
import HeaderSmall from '../components/HeaderSmall'; 
import Timer from '../components/Timer'; 
import Redirect from '../components/Redirect'; 
import { getLoadingStatus } from '../../../ui/selectors';
import {getUser} from '../selectors'; 
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';


import { onGetUserProfileData } from '../../../data/user/actions';

class Suspended extends Component {
  navigateToAgenda = () => {
    this.props.history.push('/calendar/add');
  };
  navigateToPreferences = () => {
    this.props.history.push('/profile/preferences');
  };

  onClose = () => {
    this.props.history.push('/booking'); 
  }
  componentDidMount() {
    this.props.getUserProfileData();
  }

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        {this.props.user.suspended_end && <CustomRow noPadding>
          <Grid.Column computer={12} textAlign="left">
            <Divider />
            <Container> 
              <Header>
                {this.props.intl.formatMessage({
                  id: 'suspended.subtitle',
                })}
              </Header>
              <Paragraph light fontSize="0.9375rem">
                {this.props.intl.formatMessage({
                  id: 'suspended.description',
                })}
              </Paragraph>
              <Paragraph light fontSize="0.9375rem">
                {this.props.intl.formatMessage({
                  id: 'suspended.secondDescription',
                })}
              </Paragraph>
              <Timer 
                suspendedUntil={this.props.user.suspended_end} /> 
            </Container>
            <Divider />
            <Container>
              <HeaderSmall>
                {this.props.intl.formatMessage({
                  id: 'suspended.advice',
                })}
              </HeaderSmall>
              <Redirect
              title={this.props.intl.formatMessage({
                  id: 'suspended.preferencesTitle',
                })}
              description={this.props.intl.formatMessage({
                  id: 'suspended.preferencesDescription',
                })}
              linkText={this.props.intl.formatMessage({
                  id: 'suspended.goToPreferences',
                })}
              onLinkClick={this.navigateToPreferences}
              />
              <Redirect
              title={this.props.intl.formatMessage({
                  id: 'suspended.agendaTitle',
                })}
              description={this.props.intl.formatMessage({
                  id: 'suspended.agendaDescription',
                })}
              linkText={this.props.intl.formatMessage({
                  id: 'suspended.goToAgenda',
                })}
              onLinkClick={this.navigateToAgenda}
              />
            </Container> 
          </Grid.Column>
        </CustomRow>}
      </DesktopWelcomeLayout>
    );
  }
}

Suspended.propTypes  = {
  intl: intlShape.isRequired
}; 

Suspended = injectIntl(Suspended); 


const mapStateToProps = state => ({
  user: getUser(state), 
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  getUserProfileData: () => dispatch(onGetUserProfileData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suspended);

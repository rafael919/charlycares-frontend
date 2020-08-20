import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import React, { Component } from 'react';
import styled from 'styled-components';

import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import BasicButton from 'Components/Buttons/Basic';
import Heading from 'Components/Heading';

import USPs from '../components/USPs';
import { getUserProfile } from '../../selectors';

const ButtonContainer = styled.div`
  width: fit-content;
  margin: auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
`

class Reactivate extends Component {
  onGoToNextStep = () => {
    this.props.history.push('/booking/create');
  }
  
  render() {
    return (
      <DesktopWelcomeLayout withLogo>
         <Grid.Row textAlign="center" columns={1}>
            <Grid.Column textAlign="center" computer={10} mobile={16} tablet={16}>
              <Heading as="h1" fontSize="1.275em">
                <FormattedMessage 
                  id="reactivate.header" 
                  values={{
                        name: this.props.profile.first_name
                  }}
                />
              </Heading>

              <ButtonContainer>
                <BasicButton primary onClick={this.onGoToNextStep} fluid>
                  <FormattedMessage id="reactivate.connect" />
                </BasicButton>
              </ButtonContainer>

              <USPs />
            </Grid.Column>
          </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

const mapStateToProps = state => ({
  profile: getUserProfile(state),
});


export default connect(
  mapStateToProps,
)(Reactivate);


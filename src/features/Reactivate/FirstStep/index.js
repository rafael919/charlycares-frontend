import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import styled from 'styled-components';

import { getUserProfile } from '../selectors';
import Logo from './components/Logo';
import USPs from './components/USPs';

import logo2 from 'Assets/images/logo2.png';

import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Heading from 'Components/Heading';
import Layout from 'Components/Layout';
import Divider from 'Components/Divider';

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const ButtonContainer = styled.div`
  width: 65%;
  margin: auto;
  margin-bottom: 2rem;
  margin-top: 1.25rem;
`

class Reactivate extends Component {

  onGoToNextStep = () => {
    this.props.history.push('/booking/create');
  }
  render() {
    return (
      <Layout noNav>
        <CustomRow>
          <CustomColumn noPadding>
            <Container>
              <Logo src={logo2} />

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

              <Divider />
              <USPs />
            </Container>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}


const mapStateToProps = state => ({
  profile: getUserProfile(state),
});


export default connect(
  mapStateToProps,
)(Reactivate);


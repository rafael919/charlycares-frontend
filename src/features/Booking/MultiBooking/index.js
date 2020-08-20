import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import Description from './components/Description';
import AngelsList from './components/AngelsList';
import Angel from './components/Angel';
import Request from './components/Request';
import Message from './components/Message';

class MultiBooking extends Component {
  state = {};
  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle="Booking request"
        navRightComponent={() => (
          <CustomLink to="/faq" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem 0">
                <CustomColumn>
                  <Header as="h5">Direct acceptance</Header>
                </CustomColumn>
              </CustomRow>
              <CustomRow noPadding>
                <CustomColumn>
                  <Description>
                    For this multi-day application, after your response from the
                    Angel, your acceptance is required. Indicate which Angels
                    you accept immediately when they are available all of the
                    days.
                  </Description>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="1rem 0 2rem 0">
                <CustomColumn>
                  <AngelsList>
                    <Angel />
                    <Angel liked />
                  </AngelsList>
                </CustomColumn>
              </CustomRow>
            </Grid>
            <Request />
            <Request />
            <Divider />
            <Grid container>
              <CustomRow padding="2rem 0 1rem 0">
                <Header as="h5">Personal message</Header>
              </CustomRow>
              <CustomRow padding="0 0 7rem 0">
                <Message placeholder="Add a personal message, this ensures that your booking will be accepted faster!" />
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid>
            Send
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

export default connect()(MultiBooking);

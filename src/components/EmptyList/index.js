import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import CustomRow from 'Components/CustomRow';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components'; 

const WithoutBookings = ({ id }) => (
  isMobile ? 
    <MobileContainer> 
      <FormattedMessage id={id} />
    </MobileContainer> 
    : <Grid container style={{marginTop: '0rem'}}>
      <CustomRow padding="3.5em 0 1rem">
        <Grid.Column>
          <Header as="h3">
            <FormattedMessage id={id} />
          </Header>
        </Grid.Column>
      </CustomRow>
    </Grid>
);

const MobileContainer = styled.div`
  padding: 0.5rem; 
  padding-left: 1rem; 
`

export default WithoutBookings;

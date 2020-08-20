import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import React from 'react';

const onFirstBooking = (history, role) => {
  if(role === 'family') {
    return history.push('booking/create'); 
  } 
  return history.push('calendar/add'); 
}

const WithoutBookings = ({ history, role }) => (
  <Grid container style={{marginTop: '0rem'}}>
    <CustomRow padding="5.5em 0 1rem">
      <Grid.Column>
        <Header as="h3">
          {role === 'family' ? <FormattedMessage id="booking.home.all.header" /> : <FormattedMessage id="booking.home.angel.all.header" />}
        </Header>
      </Grid.Column>
    </CustomRow>
    <CustomRow padding="0 0 1rem">
      <Grid.Column>
        {role === 'family' ? <FormattedMessage id="booking.home.all.paragraph1" /> : <FormattedMessage id="booking.home.angel.all.paragraph1" />}
      </Grid.Column>
    </CustomRow>
    <CustomRow padding="0 0 1rem">
      <Grid.Column>
        {role === 'family' ? <FormattedMessage id="booking.home.all.paragraph2" /> : <FormattedMessage id="booking.home.angel.all.paragraph2" />}
      </Grid.Column>
    </CustomRow>
    <CustomRow>
      <BasicButton primary fluid onClick={() => onFirstBooking(history, role)}>
        {role === 'family' ? <FormattedMessage id="booking.home.all.btn" /> : <FormattedMessage id="booking.home.angel.all.btn" />}
      </BasicButton>
    </CustomRow>
  </Grid>
);

export default WithoutBookings;

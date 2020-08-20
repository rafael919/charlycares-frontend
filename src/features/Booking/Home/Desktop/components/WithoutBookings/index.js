import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import React from 'react';

const onFirstBooking = (history): Function => (): void =>
  history.push('/booking/create');

const WithoutBookings = ({ history }) => (
  <Grid container>
    <CustomRow padding="5.5em 0 1rem">
      <Grid.Column>
        <Header as="h3">
          <FormattedMessage id="booking.home.all.header" />
        </Header>
      </Grid.Column>
    </CustomRow>
    <CustomRow padding="0 0 1rem">
      <Grid.Column>
        <FormattedMessage id="booking.home.all.paragraph1" />
      </Grid.Column>
    </CustomRow>
    <CustomRow padding="0 0 1rem">
      <Grid.Column>
        <FormattedMessage id="booking.home.all.paragraph2" />
      </Grid.Column>
    </CustomRow>
    <CustomRow>
      <BasicButton primary fluid onClick={onFirstBooking(history)}>
        <FormattedMessage id="booking.home.all.btn" />
      </BasicButton>
    </CustomRow>
  </Grid>
);

export default WithoutBookings;

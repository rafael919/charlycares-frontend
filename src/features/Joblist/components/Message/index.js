import React from 'react';
import { Paragraph } from 'Components/Text';
import { Header } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const Message = ({ message }) => {
  return (
    <div>
      <Header as="h5">
        <FormattedMessage id="booking.angel.offers.details.personalMessage" />
      </Header>
      {message && (
        <Paragraph light fontSize="0.9375rem">
          {message}
        </Paragraph>
      )}
    </div>
  );
};

export default Message;

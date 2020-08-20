import { FormattedMessage } from 'react-intl';
import { Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import Wrapper from './components/Wrapper';
import Container from './components/Container';
import React from 'react';
import Title from './components/Title';

class BookingHomeDesktop extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Title>
          <FormattedMessage id="booking.home.whatToDo.title" />
        </Title>
        <Container>
          <Header as="h4">
            <FormattedMessage id="booking.home.whatToDo.heading" />
          </Header>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.home.whatToDo.desc" />
          </Paragraph>
        </Container>
      </Wrapper>
    );
  }
}

export default BookingHomeDesktop;

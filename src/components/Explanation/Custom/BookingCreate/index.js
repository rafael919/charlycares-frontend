import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import React from 'react';
import Title from '../../components/Title';

class BookingHomeDesktop extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Title>
          <FormattedMessage id="booking.create.whatToDo.title" />
        </Title>
        <Container>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.create.whatToDo.desc1" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.create.whatToDo.desc2" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.create.whatToDo.desc3" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.create.whatToDo.desc4" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.create.whatToDo.desc5" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="booking.create.whatToDo.desc6" />
          </Paragraph>
        </Container>
      </Wrapper>
    );
  }
}

export default BookingHomeDesktop;

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
          <FormattedMessage id="favorites.home.whatToDo.title" />
        </Title>
        <Container>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="favorites.home.whatToDo.desc1" />
          </Paragraph>
        </Container>
      </Wrapper>
    );
  }
}

export default BookingHomeDesktop;

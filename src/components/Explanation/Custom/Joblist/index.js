import { FormattedMessage } from 'react-intl';
import { Header } from 'semantic-ui-react';
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
          <FormattedMessage id="joblist.home.whatToDo.title" />
        </Title>
        <Container>
          <Header as="h4">
            <FormattedMessage id="joblist.home.whatToDo.heading" />
          </Header>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="joblist.home.whatToDo.desc1" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="joblist.home.whatToDo.desc2" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="joblist.home.whatToDo.desc3" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="joblist.home.whatToDo.desc4" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="joblist.home.whatToDo.desc5" />
          </Paragraph>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="joblist.home.whatToDo.desc6" />
          </Paragraph>
        </Container>
      </Wrapper>
    );
  }
}

export default BookingHomeDesktop;

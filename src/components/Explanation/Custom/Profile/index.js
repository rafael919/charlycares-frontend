import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'Components/Text';
import LanguageSwitcher from 'Components/LanguageSwitcher';
import Navigation from 'Components/Navigation';
import React from 'react';

import { AppContext } from '../../../../features/App';
import Container from '../../components/Container';
import Wrapper from '../../components/Wrapper';

class BookingHomeDesktop extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Navigation
          title={<FormattedMessage id="profile.home.whatToDo.title" />}
          rightComp={() => (
            <AppContext.Consumer>
              {({ setLocale, locale }) => (
                <LanguageSwitcher setLocale={setLocale} locale={locale} />
              )}
            </AppContext.Consumer>
          )}
        />
        <Container>
          <Paragraph secondaryText fontSize="0.9375rem" light>
            <FormattedMessage id="profile.home.whatToDo.desc1" />
          </Paragraph>
        </Container>
      </Wrapper>
    );
  }
}

export default BookingHomeDesktop;

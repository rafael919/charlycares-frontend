import { FormattedMessage, injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import Language from './components/Language';

const renderLanguages = (languages = [], intl, onLanguageSelect) => {
  const entries = Object.entries(languages);
  return entries.map(lang => {
    return (
      <Language
        key={lang[0]}
        onSelect={onLanguageSelect(lang[0])}
        name={intl.formatMessage({ id: `languages.${lang[0]}` })}
        selected={lang[1]}
      />
    );
  });
};

const Languages = ({ languages, intl, onLanguageSelect }) => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.edit.languagesTitle" />
      </Heading>
      <Desc>
        <FormattedMessage id="profile.family.edit.languagesDesc" />
      </Desc>
      <List>{renderLanguages(languages, intl, onLanguageSelect)}</List>
    </Container>
  );
};

const Container = styled.div`
  padding: ${isMobile ? '1.25rem 1rem 4rem' : '1.25rem 0rem 1rem'};
  width: 100%;
`;

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export default injectIntl(Languages);

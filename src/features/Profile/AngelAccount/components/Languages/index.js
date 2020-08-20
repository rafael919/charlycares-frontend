import React from 'react';
import styled from 'styled-components';

import Language from './components/Language';
import { FormattedMessage } from 'react-intl';

const renderLanguages = (languages, onLanguageSelect) => {
  return Object.entries(languages).map((lang, i) => {
    return (
      <Language
        onSelect={onLanguageSelect(lang[0])}
        key={i}
        name={lang[0]}
        selected={lang[1]}
      />
    );
  });
};

const Languages = ({ languages, onLanguageSelect }) => {
  return (
    <Container>
      <Heading><FormattedMessage id="profile.angel.edit.languagesTitle" /></Heading>
      <Desc><FormattedMessage id="profile.angel.edit.languagesDesc" /></Desc>
      <List>{renderLanguages(languages, onLanguageSelect)}</List>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25rem 1rem 10rem;
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

export default Languages;

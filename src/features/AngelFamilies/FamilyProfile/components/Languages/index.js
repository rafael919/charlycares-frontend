import { FormattedMessage } from 'react-intl';
import pick from 'ramda/es/pick';
import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/icn-check.svg';

const langList = ['dutch', 'english', 'german', 'french', 'italian', 'spanish'];

const renderLanguages = languages => {
  const filteredLangObj = pick(langList, languages);
  return Object.entries(filteredLangObj).map((lang, i) => {
    if (lang[1]) {
      return (
        <ListItem key={i}>
          <Language>
            <FormattedMessage id={`languages.${lang[0]}`} />
          </Language>
          <CheckIcon src={checkIcon} />
        </ListItem>
      );
    }
    return null;
  });
};

const Description = ({ languages }) => {
  return (
    <Container>
      <div>
        <Header>
          <FormattedMessage id="families.languages" />
        </Header>
        <SectionDesc>
          <FormattedMessage id="families.languagesDesc" />
        </SectionDesc>
      </div>
      <LanguagesList>{renderLanguages(languages)}</LanguagesList>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const SectionDesc = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

const LanguagesList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  padding: 1rem 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

const CheckIcon = styled.img``;

const Language = styled.div`
  font-size: 0.9375rem;
`;

export default Description;

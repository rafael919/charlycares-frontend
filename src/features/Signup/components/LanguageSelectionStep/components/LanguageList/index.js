import React from 'react';
import styled from 'styled-components';
import checkedIcon from 'Assets/icons/btn-check.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';
import { injectIntl } from 'react-intl';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const Language = styled.span`
  font-size: 0.9375rem;
`;
const AddButton = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  background: transparent;
  width: 2.75rem;
  height: 2.75rem;
  text-align: center;

  &:focus {
    outline: 0;
  }
`;
const CheckIcon = styled.img``;

const AddIcon = styled.img``;

const availableLanguages = [
  'dutch',
  'english',
  'french',
  'german',
  'spanish',
  'italian',
];

const LanguageList = ({ intl, selectedLanguages, onLanguageSelect }) => (
  <List>
    {availableLanguages.map(lang => {
      return (
        <ListItem key={lang}>
          <Language selected={selectedLanguages && selectedLanguages[lang]}>
            {intl.formatMessage({
              id: `languages.${lang}`,
            })}
          </Language>
          <AddButton onClick={onLanguageSelect(lang)}>
            {selectedLanguages && selectedLanguages[lang] ? (
              <CheckIcon src={checkedIcon} />
            ) : (
              <AddIcon src={addIcon} />
            )}
          </AddButton>
        </ListItem>
      );
    })}
  </List>
);

export default injectIntl(LanguageList);

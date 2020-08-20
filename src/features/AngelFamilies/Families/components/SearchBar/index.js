import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import searchIcon from 'Assets/icons/search.svg';

const SearchBar = ({ intl, onSearchChange, searchValue, angel }) => {
  return (
    <Container>
      <SearchIcon src={searchIcon} />
      <Input
        onChange={onSearchChange}
        placeholder={intl.formatMessage({
          id: angel
            ? 'favorites.search.placeholder'
            : 'angel.families.search.placeholder',
        })}
        value={searchValue}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.defaultGrey};
  border-radius: 29px;
  width: 100%;
  padding: ${isMobile ? '0.4' : '0.6'}rem 0.8rem;
`;
const SearchIcon = styled.img`
  background: transparent;

  &:focus {
    outline: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 0.9375rem;
  font-weight: 300;
  border: 0px solid ${props => props.theme.defaultGrey};
  background: transparent;
  margin-left: 0.5rem;
  caret-color: #000;

  ::placeholder {
    color: ${props => props.theme.grey};
  }

  &:focus {
    outline: 0;
  }
`;

export default injectIntl(SearchBar);

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  &:after {
    content: '';
    width: 1px;
    height: 1rem;
    position: absolute;
    background: #000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Button = styled.button`
  flex: 1;
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${({ theme, selected }) =>
    selected ? theme.secondaryColor : 'inherit'};
  background: transparent;
  border: 0;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

class LanguageSwitcher extends React.Component {
  onLanguageSelect = locale => () => {
    this.props.setLocale(locale, true);
  };

  render() {
    return (
      <Container>
        <Button
          onClick={this.onLanguageSelect('nl')}
          selected={this.props.locale === 'nl'}
        >
          nl
        </Button>
        <Button
          onClick={this.onLanguageSelect('en')}
          selected={this.props.locale === 'en'}
        >
          en
        </Button>
      </Container>
    );
  }
}

export default LanguageSwitcher;

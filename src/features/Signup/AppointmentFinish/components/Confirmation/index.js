import React, { Component } from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { InlineText } from 'Components/Text';

const ButtonWrapper = styled.div`
  &&& {
    position: relative;
    width: 100%;
    padding: 0.6875rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
`;

const Button = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
`;

class Confirmation extends Component {
  static LeftButton = ({ children, onClick }) => {
    return (
      <Button onClick={onClick}>
        <InlineText primaryFont accentText fontSize="0.875rem">
          {children}
        </InlineText>
      </Button>
    );
  };

  static RightButton = ({ children, onClick }) => {
    return (
      <Button>
        <BasicButton fluid onClick={onClick} primary>
          {children}
        </BasicButton>
      </Button>
    );
  };

  render() {
    return <ButtonWrapper>{this.props.children}</ButtonWrapper>;
  }
}

export default Confirmation;

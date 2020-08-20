import React, { Component } from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import { InlineText } from 'Components/Text';

const ButtonWrapper = styled.div`
  &&& {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.6875rem;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    background-color: rgba(250, 250, 250, 0.9);
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
        <InlineText primaryFont accentText>
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

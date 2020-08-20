import React from 'react';
import BasicButton from '../Basic';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const IconContainer = styled.span`
  float: left;
`;

const TextContainer = styled.span`
  line-height: 1.5;
  margin-left: -1em;
`;

const FacebookButton = ({ children, callback, onFailure, ...props }) => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      callback={callback}
      onFailure={onFailure}
      scope="public_profile,email,user_friends,user_birthday"
      fields="first_name,last_name,email,birthday,address,context,gender,locale"
      render={renderProps => (
        <BasicButton facebook fluid onClick={renderProps.onClick} {...props}>
          <IconContainer>
            <Icon size="large" corner name="facebook f" />
          </IconContainer>
          <TextContainer>{children}</TextContainer>
        </BasicButton>
      )}
    />
  );
};

export default FacebookButton;

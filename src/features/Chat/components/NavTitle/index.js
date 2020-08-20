import React from 'react';
import styled from 'styled-components';
import WithRole from 'Components/WithRole';
import { FormattedMessage } from 'react-intl';

const NavTitle = ({ name, img, typing, online }) => {
  return (
    <Container img={img}>
      {img && <CustomImage src={img} />}
      <WithRole>
        {role => (
          <div>
            <Name>
              {role === 'angel' ? (
                <FormattedMessage
                  id="chat.angel.familyName"
                  values={{ name }}
                />
              ) : (
                name
              )}
            </Name>
            {typing ? (
              <Typing>Typing......</Typing>
            ) : (
              online && <Typing>Online</Typing>
            )}
          </div>
        )}
      </WithRole>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CustomImage = styled.img`
  width: 2.5625rem;
  height: 2.5625rem;
  border: 1px solid ${props => props.theme.defaultGrey};
  border-radius: 50%;
`;

const Name = styled.div`
  max-width: 16.45rem;
  font-size: 1rem;
  margin-left: 0.6rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Typing = styled.div`
  font-size: 0.64rem;
  font-weight: 300;
  color: #4d4d4d;
  text-align: left;
  line-height: 1;
  margin-left: 0.6rem;
  -webkit-animation: blinker 1s linear infinite;
  animation: blinker 1s linear infinite;

  @-webkit-keyframes blinker {
    50% {
      opacity: 1;
    }
  }

  @keyframes blinker {
    50% {
      opacity: 1;
    }
  }
`;

export default NavTitle;

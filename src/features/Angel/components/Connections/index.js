import { Image, Header } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const ConnectionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
`;

const Connection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  margin-right: 1rem;
`;

const Avatar = styled(Image)`
  &&& {
    width: 40px;
    height: 40px;
  }
`;

const Wrapper = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 0;
`;

const Connections = ({ connections = [] }) => {
  return (
    <Wrapper>
      <Header textAlign="left" as="h5">
        <FormattedMessage
          id="booking.angel.commonConnections"
          values={{ connections }}
        />
      </Header>
      <ConnectionsContainer>
        {connections.map(connection => (
          <Connection>
            <Avatar src={connection.picture.url} />
            {connection.name}
          </Connection>
        ))}
      </ConnectionsContainer>
    </Wrapper>
  );
};

export default Connections;

import React from 'react';
import styled from 'styled-components';
import { InlineText } from 'Components/Text';
import { Image } from 'semantic-ui-react';
import Maps from 'Components/Map';

import homeIcon from 'Assets/icons/icn-feature-house.svg';

const Location = ({ city, address, streetNumber, lat, lon }) => {
  return (
    <Container>
      <AddressContainer>
        <Image src={homeIcon} />
        <Address>
          <div>
            <InlineText fontSize="0.9375rem">
              {address} {streetNumber}
            </InlineText>
          </div>
          <div>
            <InlineText light fontSize="0.875rem">
              {city}
            </InlineText>
          </div>
        </Address>
      </AddressContainer>

      <MapContainer>
        <Maps center={[lat, lon]} height={165} />
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  padding-top: 0.5rem;
  display: flex;
  justify-content: center;
`;

const Address = styled.div`
  margin-left: 0.75rem;
`;

export default Location;

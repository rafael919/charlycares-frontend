import Maps from 'Components/Map';
import React from 'react';
import styled from 'styled-components';

import homeIcon from 'Assets/icons/icn-feature-house.svg';

const Location = ({ lat, lon, city, address }) => {
  return (
    <Container>
      <AddressRow>
        <HomeIcon src={homeIcon} />
        <Address>
          <Street>{address}</Street>
          <Place>{city}</Place>
        </Address>
      </AddressRow>
      <Maps center={[lat, lon]} height={165} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Address = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;
const Street = styled.div`
  font-size: 0.9375rem;
`;
const Place = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
`;

const HomeIcon = styled.img``;

export default Location;

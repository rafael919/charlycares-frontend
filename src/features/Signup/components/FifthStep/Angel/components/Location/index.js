import { InlineText } from 'Components/Text';
import { List, Image } from 'semantic-ui-react';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import defaultTheme from '../../../../../../../themes/default';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const ListItem = styled.div`
  &&& {
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
    padding-bottom: 0.75em;
  }
`;

const LocationDataContainer = styled.div`
  display: flex;
  width: 5rem;
  alignitems: center;
  justifycontent: space-between;
`;

const ArrowContainer = styled.div`
  margin-right: -1rem;
`;
const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Location = ({
  address = '',
  postalCode = '',
  distance = 0,
  city = '',
}) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ListItem>
        <List.Content floated="right">
          <LocationDataContainer>
            <ImageContainer>
              <Image avatar src={locationIcon} />
              <p>{Math.floor(distance)} km</p>
            </ImageContainer>
            <ArrowContainer>
              <Image avatar src={arrowRight} />
            </ArrowContainer>
          </LocationDataContainer>
        </List.Content>
        <List.Content>
          <List.Header>
            <InlineText accentText>{city}</InlineText>
          </List.Header>
          <List.Description>
            <InlineText primary fontSize="0.875rem">
              {address}
            </InlineText>
          </List.Description>
          <List.Description>
            <InlineText primary fontSize="0.875rem">
              {postalCode}
            </InlineText>
          </List.Description>
        </List.Content>
      </ListItem>
    </ThemeProvider>
  );
};

export default Location;

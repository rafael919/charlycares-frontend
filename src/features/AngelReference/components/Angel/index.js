import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';

const Item = styled.div`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.3125rem;
  padding: 0rem 1.5rem 0rem 0rem;
  padding-left: ${isMobile ? '1rem' : null};
  &:last-child {
    margin-bottom: 0;
  }
`;

const Header = styled.span`
  font-size: 1.175rem;
  font-weight: 400;
  font-family: ${props => props.theme.primaryFont};
`;

const AngelWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  border-radius: 50%;
  margin-top: 1rem; 
  border: 1px solid ${props => props.theme.defaultGrey};
  width: 5rem;
  height: 5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
`;

const Angel = ({ firstName, image }) => (
  <Item>
    <Header><FormattedMessage id="angelReference.howDoYouReview" /> {`${firstName}`}?</Header>
    <AngelWrapper>
      <Image src={image} />
    </AngelWrapper>
  </Item>
);

export default Angel;

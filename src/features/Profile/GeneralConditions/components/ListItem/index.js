import React from 'react';
import styled from 'styled-components';

import arrowRightIcon from 'Assets/icons/btn-large-arrow-right.svg';

const ListItem = ({ option, to, path }) => (
  <Container href={to} target="_blank">
    <Name>{option}</Name>
    <Icon src={arrowRightIcon} />
  </Container>
);

const Container = styled.a`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 1rem 1rem 1rem 0;
  color: ${props => props.theme.primaryText};
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  :hover, :active, :visited, :focus {
    text-decoration: none; 
    color: ${props => props.theme.primaryText};
  }
`;

const Icon = styled.img``;

const Name = styled.div`
  font-weight: 300;
  font-size: 1.0625rem;
`;

export default ListItem;

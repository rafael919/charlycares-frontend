import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

const renderTypes = (activeType, onTypeSelect) => {

  if (!process.env.REACT_APP_SUBSCRIPTION_TYPES) return null;
  const types = String(process.env.REACT_APP_SUBSCRIPTION_TYPES);

  const typesArr = types.split(',').map(type => {
    let typeWithTitleCase = type[0].toUpperCase() + type.substr(1);
    return typeWithTitleCase;
  });

  return typesArr.map((type, i) => {
    if (activeType && activeType.toLowerCase() === type.toLowerCase()) {
      return (
        <Type onClick={onTypeSelect(type, i)} key={i} active>
          {type}
        </Type>
      );
    }
    return (
      <Type onClick={onTypeSelect(type, i)} key={i}>
        {type}
      </Type>
    );
  });
};

const MembershipTypes = ({ activeType, onTypeSelect }) => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.membership.heading" />
      </Heading>
      <Desc>
        <FormattedMessage id="profile.family.membership.desc" />
      </Desc>
      <TypesContainer>{renderTypes(activeType, onTypeSelect)}</TypesContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem 1rem 0;
  width: 100%;
`;

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  font-weight: 300;
  font-size: 0.9375rem;
`;

const TypesContainer = styled.div`
  display: flex;
  padding: 1.5625rem 0 1rem;
`;

const Type = styled.div`
  background-color: ${props =>
    props.active ? props.theme.primaryColor : props.theme.lightPrimaryColor};
  padding: 0.875rem 0 1.0625rem;
  flex: 1;
  text-align: center;
  margin-right: 0.1875rem;
  border-radius: 2px;
  font-size: 0.9375rem;
  position: relative;
  z-index: 5;
  color: ${props => props.active && '#fff'};

  ${props =>
    props.active &&
    `
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    z-index: -1;
    width: 40px;
    height: 40px;
    transform: translateX(-50%) rotate(-45deg) skew(15deg, 15deg);
    background-color: ${props.theme.primaryColor};
  }
  `};

  &:last-child {
    margin-right: 0;
  }
`;

export default MembershipTypes;

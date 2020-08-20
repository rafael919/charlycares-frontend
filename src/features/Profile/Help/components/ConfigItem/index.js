import { withRouter } from 'react-router-dom';
import ArrowRightButton from 'Components/Buttons/ArrowRight';
import React from 'react';
import styled from 'styled-components';

const ConfigItem = ({ name, value, to, history }) => {
  return (
    <Container href={to} target="_blank">
      <ConfigName>{name}</ConfigName>
      {value && <ConfigValue>{value}</ConfigValue>}

      <ArrowRightButton to={to} />
    </Container>
  );
};

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

const ConfigName = styled.div`
  font-weight: 300;
  font-size: 1.0625rem;
`;

const ConfigValue = ConfigName.extend`
  color: ${props => props.theme.grey};
`;

export default withRouter(ConfigItem);

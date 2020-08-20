import React from 'react';
import styled from 'styled-components';

import logo from 'Assets/icons/logo.svg';

const SubscriptionDetails = ({ sum }) => {
  return (
    <Container>
      <ImageContainer>
        <Logo src={logo} />
      </ImageContainer>
      <DetailsList>
        <Detail>
          <div>
            <DetailName>Subscription</DetailName>
            <Desc>Monthly</Desc>
          </div>
          <DetailValue>Standaard (€ 6,-)</DetailValue>
        </Detail>
        <Detail>
          <DetailName>Period</DetailName>
          <DetailValue>21 nov 2017 - 20 dec 2017</DetailValue>
        </Detail>
        <Detail>
          <div>
            <DetailName>Outstanding payment</DetailName>
            <Desc>Reason of refusal</Desc>
          </div>
          <div>
            <Total>€ 6,-</Total>
            <Desc warning right>
              Blocked account
            </Desc>
          </div>
        </Detail>
      </DetailsList>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  width: 100%;
`;

const ImageContainer = styled.div`
  text-align: center;
  padding-bottom: 1.25rem;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const DetailsList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const DetailName = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
`;

const DetailValue = styled.div`
  font-family: ${props => props.theme.primaryFont};
  color: ${props =>
    props.warning ? props.theme.warning : props.theme.lightGrey};
  text-align: right;
`;

const Total = DetailValue.extend`
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.warning};
  font-size: 1.875rem;
`;

const Desc = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
  text-align: ${props => props.right && 'right'};
  color: ${props => props.warning && props.theme.warning};
`;

const Detail = styled.li`
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: 0;
  }
`;

export default SubscriptionDetails;

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const MembershipPeriodSelect = ({ onPeriodSelect, selectedPeriod }) => {
  return (
    <Container>
      <ButtonWrapper>
        <Button
          onClick={onPeriodSelect('_MONTHLY_')}
          active={selectedPeriod === '_MONTHLY_' ? true : false}
        >
          <div><FormattedMessage id="profile.family.membership.monthly" /></div>
          <BtnPromo />
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          onClick={onPeriodSelect('_ANNUAL_')}
          active={selectedPeriod === '_ANNUAL_' ? true : false}
        >
          <div><FormattedMessage id="profile.family.membership.yearly" /></div>
          <BtnPromo><FormattedMessage id="profile.family.membership.yearlyDiscount" /></BtnPromo>
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem 1.25rem;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    border-right: 1px solid ${props => props.theme.defaultGrey};
  }
`;

const Button = styled.button`
  margin: 0;
  background: transparent;
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  border: 0;
  padding: 1rem 2rem;
  border-bottom: ${props =>
    props.active && `3px solid ${props.theme.secondaryColor}`};
  height: 5.25rem;
  &:focus {
    outline: 0;
  }
`;

const BtnPromo = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
  font-family: ${props => props.theme.secondaryFont};
`;

export default MembershipPeriodSelect;

import { FormattedMessage, FormattedNumber } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import presentIcon from 'Assets/icons/icn-present.svg';
import startIcon from 'Assets/icons/star-large-full.svg';

const navigateOnCredit = history => () => {
  history.push('/profile/referrals/angel');
};

const EarningsAndCredit = ({
  referrals,
  totalEarnings,
  avgRating,
  credit,
  history,
}) => (
  <Container>
    <HeadingContainer>
      <Heading>
        <FormattedMessage id="profile.angel.dashboard.promoHeading" />
      </Heading>
      <Credit>
        <FormattedNumber
          style="currency"
          currency="EUR"
          value={Number(credit)}
        />
      </Credit>
    </HeadingContainer>
    <InvitationContainer>
      <IconAndDescContainer>
        <IconContainer>
          <Icon src={presentIcon} />
        </IconContainer>
        <Desc>{referrals.content}</Desc>
        <Button onClick={navigateOnCredit(history)}>
          <FormattedMessage id="profile.angel.dashboard.inviteButton" />
        </Button>
      </IconAndDescContainer>
    </InvitationContainer>
    <BoxContainer>
      <Box>
        <BoxTitle>
          <FormattedMessage id="profile.angel.dashboard.totalEarnings" />
        </BoxTitle>
        <BoxValue>
          <FormattedNumber
            style="currency"
            currency="EUR"
            value={Number(totalEarnings)}
          />
        </BoxValue>
      </Box>
      <Box>
        <BoxTitle>
          <FormattedMessage id="profile.angel.dashboard.avgRating" />
        </BoxTitle>
        <BoxValue>
          <StartIcon src={startIcon} />
          {avgRating}
        </BoxValue>
      </Box>
    </BoxContainer>
  </Container>
);

const Container = styled.div`
  padding: 1.25rem 1rem;
  margin: ${isMobile ? 0 : '0 -1rem'};
  background: ${props => props.theme.lightGreen};
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;
const Heading = styled.h2`
  font-size: 1.1875rem;
  margin-bottom: 0;
  font-family: ${props => props.theme.secondaryFont};
  font-weight: 400;
`;

const Credit = styled.div`
  font-weight: 300;
  font-size: 1.5rem;
`;

const InvitationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;
const IconAndDescContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 0.5rem;
  align-self: flex-start;
`;

const Icon = styled.img`
  width: 38px;
  height: 38px;
  margin-top: 0.5rem; 
`;

const StartIcon = Icon.extend`
  width: 28px;
  height: 28px;
  margin-left: -0.5rem;
`;

const Desc = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.36;
  padding-right: 1rem;
`;
const Button = styled.button`
  padding: 0.3rem 0.7rem;
  border: 0;
  border-radius: 29px;
  background: ${props => props.theme.primaryColor};
  font-family: ${props => props.theme.secondaryFont};
  color: #fff;
  font-size: 0.8125rem;
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  border-radius: 5px;
  background: #fff;
  border: 1px solid ${props => props.theme.defaultGrey};
  padding: 1rem 0.3125rem;
  align-self: stretch;
  flex: 1;

  &:first-child {
    margin-right: 0.625rem;
  }
`;

const BoxTitle = styled.div`
  font-weight: 0.9375rem;
  padding-bottom: 1rem;
  text-align: center;
  ${'' /* min-height: 6.25rem; */};
`;

const BoxValue = styled.div`
  font-size: 1.25rem;
  text-align: center;
  font-family: ${props => props.theme.primaryFont};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EarningsAndCredit;

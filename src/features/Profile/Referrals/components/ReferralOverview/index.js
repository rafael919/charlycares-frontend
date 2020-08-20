import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { roundMonetaryValue, capitalizeFirstLetter } from 'Utils';
import checkedIcon from 'Assets/icons/icn-check-blue.svg';
import dashIcon from 'Assets/icons/icn-dash.svg';

const Table = styled.table`
  width: 100%;
`;

const Container = styled.div`
  padding: 1.5rem;
`;

const TableHeader = styled.tr`
  margin-top: 1rem;
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.td`
  padding: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.theme.darkGrey};
`;

const TableBody = styled.tbody``;

const Name = styled.td`
  padding: 0.5rem;
  padding-left: 0rem;
  font-size: 0.875rem;
  font-weight: bold;
`;

const Title = styled.h4`
  margin-top: 1rem;
  margin-bottom: 0rem;
`;

const CheckIcon = styled.img`
  width: 2rem;
`;

const DashIcon = styled.img`
  width: 1rem;
  margin-bottom: 0.25rem;
`;

const IconContainer = styled.td`
  text-align: center;
`;

const AmountSender = styled.td`
  color: ${props =>
    props.used ? props.theme.darkGrey : props.theme.lightPrimaryColor};
`;

const Explanation = styled.p`
  margin-top: 2rem;
  font-weight: 100;
`;

const ReferralOverview = ({ referrals, amountSender, role }) => {
  return (
    <Container>
      <Title>
        <FormattedMessage 
          id="profile.referral.overviewTitle" 
          values={{role: capitalizeFirstLetter(role)}}
        />
      </Title>
      <Table>
        <TableBody>
          <TableHeader>
            <TableHeaderCell />
            <TableHeaderCell>
              <FormattedMessage id="profile.referral.signup" />
            </TableHeaderCell>
            <TableHeaderCell>
              <FormattedMessage id="profile.referral.booked" />
            </TableHeaderCell>
            <TableHeaderCell>
              <FormattedMessage id="profile.referral.credit" />
            </TableHeaderCell>
          </TableHeader>
          {referrals.length > 0 ? (
            referrals.map(referral => {
              return (
                <TableRow>
                  <Name>{`${referral.first_name} ${referral.last_name}`}</Name>
                  <IconContainer>
                    {' '}
                    <CheckIcon src={checkedIcon} />{' '}
                  </IconContainer>
                  <IconContainer>
                    {referral.is_used ? (
                      <CheckIcon src={checkedIcon} />
                    ) : (
                      <DashIcon src={dashIcon} />
                    )}
                  </IconContainer>
                  <AmountSender used={referral.is_used}>
                    € {roundMonetaryValue(referral.amount_sender)}
                  </AmountSender>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <Name>
                <FormattedMessage 
                  id="profile.referral.noFriendsInvited"
                  values={{role: role}}
                />
              </Name>
              <IconContainer>
                {' '}
                <DashIcon src={dashIcon} />{' '}
              </IconContainer>
              <IconContainer>
                <DashIcon src={dashIcon} />
              </IconContainer>
              <AmountSender used={false}>
                € {roundMonetaryValue(amountSender)}
              </AmountSender>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Explanation>
        {referrals.length > 0 ? (
          <FormattedMessage id="profile.referral.explanation" />
        ) : (
          <FormattedMessage 
            id="profile.referral.explanationNoFriendsInvited" 
            values={{role: role}}
          />
        )}
      </Explanation>
    </Container>
  );
};

export default withRouter(ReferralOverview);

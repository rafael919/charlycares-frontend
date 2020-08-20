import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import CheckedIcon from 'Assets/icons/icn-check-blue.svg';
import { roundMonetaryValue } from 'Utils';

const Container = styled.div`
	padding: 1.5rem;
`

const Header = styled.div`
	font-size: 1rem;
	display: flex;
`

const HeaderText = styled.span`
	padding-top: 0.25rem;
`
const Icon = styled.img`
	width: 2rem;
	margin-right: 1rem;
`

const Explanation = styled.p`
	margin-top: 0.75rem;
	font-weight: 100
`


const LastAction = ({ referral }) => {
	return (
	<Container>
	<Header>
		<Icon src={CheckedIcon} />
	    {referral.is_used ? <HeaderText>
	    		    <FormattedMessage
	    		      id="profile.referral.lastActionBooked"
	    		      values={{
	    		        name: `${referral.first_name} ${referral.last_name}`,
	    		      }}
	    		    />
	    		</HeaderText> : 
	    		<HeaderText>
	    		    <FormattedMessage
	    		      id="profile.referral.lastActionSignup"
	    		      values={{
	    		        name: `${referral.first_name} ${referral.last_name}`,
	    		      }}
	    		    />
	    		</HeaderText>}
	</Header>
	<Explanation>
		{referral.is_used ?
			<FormattedMessage 
				id="profile.referral.lastActionExplanationSignup"
				values={{
					amount: `${roundMonetaryValue(referral.amount_sender)}`,
					name: `${referral.first_name}`
				}}
			/> :
			<FormattedMessage 
				id="profile.referral.lastActionExplanationSignup"
				values={{
					amount: `${roundMonetaryValue(referral.amount_sender)}`,
					name: `${referral.first_name}`
				}}
			/>
		}
	</Explanation>
  </Container>)
};

export default withRouter(LastAction);

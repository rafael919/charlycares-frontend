import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import Heading from 'Components/Heading';

import CheckIcon from 'Assets/icons/icn-check-blue.svg';

const Container = styled.div`
	padding: 2rem;
	text-align: left;
`

const USP = styled.div`
	display: inline-flex;
	width: 95%;
`

const USPIcon = styled.img`
	width: 2rem;
`

const USPText = styled.p`
	font-size: 0.875rem;
	margin-left: 0.875rem;
	font-weight: 300;
	font-family: ${props => props.theme.secondaryFont};
`

const Subtext = styled.h3`
	font-size: 0.875rem;
	text-align: left;
	font-weight: 300;
	font-family: ${props => props.theme.secondaryFont};
	margin-top: 0.5rem;
`

const USPs = () => {
	return (
		<Container>
	          <Heading as="h1" fontSize="1.275em">
	            <FormattedMessage id="reactivate.step2.uspHeader" />
	          </Heading>
	          <Subtext>
	          	<FormattedMessage id="reactivate.step2.explanation" />
	          </Subtext>
	          <USP>
	          	<USPIcon src={CheckIcon} />
	          	<USPText>
	          		<FormattedMessage id="reactivate.step2.usp1" />
	          	</USPText>
	          </USP>
	          <USP>
	          	<USPIcon src={CheckIcon} />
	          	<USPText>
	          		<FormattedMessage id="reactivate.step2.usp2" />
	          	</USPText>
	          </USP>
	          <USP>
	          	<USPIcon src={CheckIcon} />
	          	<USPText>
	          		<FormattedMessage id="reactivate.step2.usp3" />
	          	</USPText>
	          </USP>
		</Container>
	)
}

export default USPs;
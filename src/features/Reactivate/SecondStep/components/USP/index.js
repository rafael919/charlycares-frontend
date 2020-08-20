import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import CheckIcon from 'Assets/icons/icn-check-blue.svg';

const Container = styled.div`
	text-align: center;
	display: inline-flex;
	margin-top: 1rem;
`

const USPIcon = styled.img`
	width: 2.25rem;
`

const USPText = styled.p`
	font-size: 1.15rem;
	margin-left: 0.875rem;
	line-height: 2.25rem;
`

const USP = () => {
	return (
		<Container>
			<USPIcon src={CheckIcon} />
			<USPText>
				<FormattedMessage id="reactivate.step2.mainUSP" />
			</USPText>
		</Container>
	)
}

export default USP;
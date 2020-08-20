import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import Heading from 'Components/Heading';

import CheckIcon from 'Assets/icons/icn-check-blue.svg';
import Image from 'Assets/images/cropped-share-family.jpg';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
	padding: 2rem;
	text-align: left;
	${!isMobile ? 'width: 75%;' : null};
    ${!isMobile ? 'margin: auto' : null};
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
	line-height: 2rem;
	font-family: ${props => props.theme.secondaryFont};
`

const Subtext = styled.h3`
	font-size: 0.875rem;
	text-align: left;
	font-family: ${props => props.theme.secondaryFont};
	font-weight: 300;
	margin-top: 1rem;
`

const CoverImage = styled.img`
	width: 100%;
`

const USPContainer = styled.div`
	margin: auto;
	width: 90%;
`

const USPs = () => {
	return (
		<Container>
	          {isMobile && <CoverImage src={Image} />}
	          <Heading as="h1" fontSize="1.275em">
	            <FormattedMessage id="reactivate.uspHeader" />
	          </Heading>
	          <USPContainer>
		          <USP>
		          	<USPIcon src={CheckIcon} />
		          	<USPText>
		          		<FormattedMessage id="reactivate.usp1" />
		          	</USPText>
		          </USP>
		          <USP>
		          	<USPIcon src={CheckIcon} />
		          	<USPText>
		          		<FormattedMessage id="reactivate.usp2" />
		          	</USPText>
		          </USP>
		          <USP>
		          	<USPIcon src={CheckIcon} />
		          	<USPText>
		          		<FormattedMessage id="reactivate.usp3" />
		          	</USPText>
		          </USP>
		          <USP>
		          	<USPIcon src={CheckIcon} />
		          	<USPText>
		          		<FormattedMessage id="reactivate.usp4" />
		          	</USPText>
		          </USP>
		        </USPContainer>
				<Subtext>
					<FormattedMessage id="reactivate.uspExplanation" />
				</Subtext>
		</Container>
	)
}

export default USPs;
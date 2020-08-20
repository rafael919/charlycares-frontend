import React from 'react';
import styled from 'styled-components';
import { getAge } from 'Utils';
import CalenderIcon from 'Assets/icons/btn-calendar-pressed.svg';
import { FormattedMessage } from 'react-intl';

const AngelUnavailable = ({
  name,
  age,
  navigateToCalendar,
}) => {
	return (<Wrapper>
	      <CustomHeader>
	        {name} ({getAge(age)})
	      </CustomHeader>
		<Title>
			<FormattedMessage id="booking.search.unavailableTitle" />
		</Title>
		<Explanation>
		 <FormattedMessage id="booking.search.unavailableDescription" />
		</Explanation>
		<Navigation>
			<IconContainer onClick={navigateToCalendar}>
				<Icon src={CalenderIcon} />
				<FormattedMessage id="booking.search.calendar" />
			</IconContainer>
		</Navigation>
	</Wrapper>)
}

const Navigation = styled.div`
	display: inline-flex;
`

const Icon = styled.img`
	height: 2rem;
	margin-right: 0.375rem;
`

const IconContainer = styled.div`
	display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  color: ${props => props.theme.secondaryColor};
  font-size: 0.8rem;
  font-weight: 300;
`

const Wrapper = styled.div`
  cursor: pointer;
`;

const Title = styled.p`
	font-size: 0.875rem;
	font-style: italic;
	margin-bottom: 0.2rem;
	margin-top: 0.450rem;
`

const Explanation = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`

const CustomHeader = styled.h5`
  margin: 0;
`;

export default AngelUnavailable;
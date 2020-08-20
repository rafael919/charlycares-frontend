import React from 'react';
import styled from 'styled-components';

import check from 'Assets/icons/icn-check-blue.svg';


const Redirect = ({ title, description, linkText, onLinkClick }) => {

  return (
  	<RedirectContainer> 
	    <Container>
	      <Icon src={check} />
	      <InnerContainer> 
		      <Title> 
		      	{title}
		      </Title>
		      <Description> 
		      	{description}
		      </Description> 
		  	</InnerContainer>
	    </Container>
			<Link onClick={onLinkClick}> 
      	{linkText}
      </Link>
	  </RedirectContainer> 
  );
};

const Icon = styled.img`
  position: absolute; 
  top: -0.4rem; 
`;

const RedirectContainer = styled.div`
	margin-bottom: 1.5rem; 
`; 

const InnerContainer = styled.div`
	width: 80%; 
	margin-left: 3rem; 
`; 

const Container = styled.div`
	display: inline-flex; 
	position: relative; 
`

const Title = styled.div`

`

const Link = styled.div`
	text-align: center; 
	color: ${props => props.theme.secondaryColor}; 
	margin-top: 1rem; 
	font-size: 0.875rem;
	font-weight: 100; 
`

const Description = styled.div`
	font-size: 0.875rem;
	font-weight: 100; 

`

export default Redirect; 

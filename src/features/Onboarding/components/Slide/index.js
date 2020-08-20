import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 100%;
    position: relative;
    width: 100%;
    background-color: white;
`;

const Image = styled.img`
	margin-top: 15%;
	width: 100%;
`;

const Title = styled.h3`
	font-size: 1rem;
`;

const Description = styled.h4`
	font-size: 0.875rem;
`;

const Slide = ({image, title, description}) => {
	return (
		<Container> 
			<Image src={image} />
			<Title>
				{title}
			</Title>
			<Description>
				{description}
			</Description>
		</Container>
	);
}

export default Slide;
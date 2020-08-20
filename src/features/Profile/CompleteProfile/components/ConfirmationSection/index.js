import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import BasicButton from 'Components/Buttons/Basic';
import TextButton from 'Components/Buttons/Text';

const Container = styled.div`

`;

const ButtonContainer = styled.div`
	width: ${props => props.width};
	display: inline-block;
`

class ConfirmationSection extends React.PureComponent {
	
	render() {
		const { onNextStep, onSkipStep } = this.props;
		return(
			<Container> 
				<ButtonContainer width={'45%'}>
					<TextButton onClick={onSkipStep}>
						<FormattedMessage id="profile.family.complete.skip" />
					</TextButton>
				</ButtonContainer>
				<ButtonContainer width={'55%'}>
					<BasicButton onClick={onNextStep} active primary fluid>
						<FormattedMessage id="profile.family.complete.next" />
					</BasicButton>
				</ButtonContainer>
			</Container>
		);	
	};
};

export default ConfirmationSection;

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Header } from 'semantic-ui-react';

import gif from 'Assets/gifs/complete-profile.gif';
import BasicButton from 'Components/Buttons/Basic';

const Container = styled.div`

`;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 4rem;
		width: 100%;
		left: 0;
    text-align: center;
`

const Image = styled.img`
  width: 100%;
`;

class FirstStep extends React.PureComponent {
	render() {
		const { onNextStep, firstName } = this.props;
		return(
			<Container> 
				<Header>
					<FormattedMessage 
						id="profile.family.complete.thirdStep.desc" 
						values={{name: firstName}}
					/>
				</Header>
				<Image src={gif} />
		          <ButtonContainer>
		            <BasicButton onClick={onNextStep} primary>
		                <FormattedMessage id="profile.family.complete.thirdStep.btn" />
		            </BasicButton>
		          </ButtonContainer>
			</Container>
		);	
	};
};

export default injectIntl(FirstStep);

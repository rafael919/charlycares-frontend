import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Header } from 'semantic-ui-react';

import placeholder from 'Assets/images/familyProfileImagePlaceholder2.png';
import cameraIcon from 'Assets/icons/icn-camera-inverse.svg';
import BasicButton from 'Components/Buttons/Basic';

const Container = styled.div`

`;

const PhotoContainer = styled.div`
	position: relative;
	margin-top: 3.5rem;
	margin-bottom: 1.5rem;
	text-align: center;
`;

const ProfileImage = styled.img`
	width: 90%;
	height: auto;
`;

const ButtonContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -1rem;
	width: 70%;
`;

const ButtonInnerContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Icon = styled.img`
	width: 32px;
	height: 32px;
	display: inline-block;
	margin-right: 0.4rem;
`;

const ImageInput = styled.input.attrs({
	type: 'file',
	accept: 'image/*',
})`
	display: none;
`;


class SecondStep extends React.PureComponent {
	imageInput = React.createRef();

	onAddImageBtnClick = () => {
		this.imageInput.current.click();
	};

		onImageChange = e => {
		if (this.imageInput.current.files && this.imageInput.current.files[0]) {
			const reader = new FileReader();
			const formData = new FormData();
			reader.onload = e => {
			formData.append('file', this.imageInput.current.files[0]);
			this.props.onImageChange(e.target.result, formData);
			};

			reader.readAsDataURL(this.imageInput.current.files[0]);
		}
		};

	render() {
		return(
			<Container> 
				<Header>
					<FormattedMessage id="profile.family.complete.secondStep.desc" />
				</Header>
				<PhotoContainer>
					<ProfileImage
					src={this.props.image ? this.props.image : placeholder}
					/>
					<ButtonContainer>
					<BasicButton onClick={this.onAddImageBtnClick} primary compact>
						<ImageInput
						onChange={this.onImageChange}
						innerRef={this.imageInput}
						/>
						<ButtonInnerContainer>
						<Icon src={cameraIcon} />
						<FormattedMessage id="profile.family.edit.addPhoto" />
						</ButtonInnerContainer>
					</BasicButton>
					</ButtonContainer>
				</PhotoContainer>
			</Container>
		);	
	};
};

export default SecondStep;

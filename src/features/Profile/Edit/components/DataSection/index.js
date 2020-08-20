import { FormattedMessage, injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import BasicButton from 'Components/Buttons/Basic';
import React from 'react';
import styled from 'styled-components';

import cameraIcon from 'Assets/icons/icn-camera-inverse.svg';
import placeholder from 'Assets/images/familyProfileImagePlaceholder2.png';

import EditButton from '../../../components/EditButton';

class DataSection extends React.PureComponent {
  state = {
    isDescEdited: false,
  };

  imageInput = React.createRef();
  textArea = React.createRef();

  onAddImageBtnClick = () => {
    this.imageInput.current.click();
  };

  onDescEdit = () => {
    this.setState(
      {
        isDescEdited: true,
      },
      () => {
        this.textArea.current.focus();
      }
    );
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

  onDescBlur = () => {
    this.setState({
      isDescEdited: false,
    });
  };

  render() {
    const { firstName, surname, desc, intl, onDescChange } = this.props;
    return (
      <Container>
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
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.family.edit.firstName" />
          </Name>
          <Value>{firstName}</Value>
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.family.edit.surname" />
          </Name>
          <Value>{surname}</Value>
        </NamesContainer>
        <DescContainer>
          <DescHeadingContainer>
            <Name>
              <FormattedMessage id="profile.family.edit.desc" />
            </Name>
            <EditButton onClick={this.onDescEdit} />
          </DescHeadingContainer>
          <Desc
            onBlur={this.onDescBlur}
            disabled={!this.state.isDescEdited}
            innerRef={this.textArea}
            onChange={onDescChange}
            placeholder={intl.formatMessage({
              id: 'profile.family.edit.descPlaceholder',
            })}
            value={desc}
          />
        </DescContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  text-align: center;
  width: 100%;
  padding: ${isMobile ? '1.25rem 1rem 1rem' : '1.25rem 0 1rem'};
`;

const PhotoContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 80%;
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

const NamesContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
`;

const Name = styled.div`
  font-size: 0.9375rem;
  flex: 1;
  text-align: left;
`;

const Value = styled.div`
  font-size: 1rem;
  flex: 1;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  line-height: 1.6;
`;

const DescHeadingContainer = styled.div`
  position: relative;
  padding-bottom: 1rem;
`;

const DescContainer = styled.div`
  padding: 1rem 0;
`;

const Desc = styled.textarea.attrs({
  rows: 3,
})`
  width: 100%;
  font-size: 0.9375rem;
  line-height: 1.6;
  border: 0;
  background: white; 

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-weight: 300;
    color: ${props => props.theme.lightGrey};
    font-style: italic;
  }
`;

const ImageInput = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`;

export default injectIntl(DataSection);

import { injectIntl, FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import infoIcon from 'Assets/icons/btn-info.svg';
import videoIcon from 'Assets/icons/camera.svg';
import EditButton from '../../../components/EditButton';
import Video from './components/Video';
import VideoPlayButton from './components/VideoPlayButton';
import placeholder from 'Assets/images/profile-placeholder.png';

class DataSection extends React.PureComponent {
  educationValues = ['MBO', 'HBO', 'WO', 'Other'];

  state = {
    isBioDisabled: true,
    isPlayingVideo: false,
  };

  descRef = React.createRef();
  exampleVideo = React.createRef();

  video = React.createRef();

  componentDidMount() {
    document.addEventListener('fullscreenchange', this.stopOnExitFullScreen);
    document.addEventListener(
      'webkitfullscreenchange',
      this.stopOnExitFullScreen
    );
    document.addEventListener('mozfullscreenchange', this.stopOnExitFullScreen);
    document.addEventListener('MSFullscreenChange', this.stopOnExitFullScreen);
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.stopOnExitFullScreen);
    document.removeEventListener(
      'webkitfullscreenchange',
      this.stopOnExitFullScreen
    );
    document.removeEventListener(
      'mozfullscreenchange',
      this.stopOnExitFullScreen
    );
    document.removeEventListener(
      'MSFullscreenChange',
      this.stopOnExitFullScreen
    );
  }

  onEditBio = () => {
    this.setState(
      prevState => {
        return {
          isBioDisabled: false,
        };
      },
      () => {
        this.descRef.current.focus();
      }
    );
  };

  onFocusOut = () => {
    this.setState(prevState => ({
      isBioDisabled: true,
    }));
  };

  addFullScreenListener = type => () => {
    if (this[type].current.webkitRequestFullscreen) {
      this[type].current.addEventListener(
        'webkitfullscreenchange',
        this.onFullScreenChange
      );
    }
    if (this[type].current.mozRequestFullScreen) {
      this[type].current.addEventListener(
        'onmozfullscreenchange',
        this.onFullScreenChange
      );
    }
  };

  onVideoPlay = type => () => {
    if (this[type].current.webkitRequestFullscreen) {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.addFullScreenListener();

          if (type === 'exampleVideo') {
            this[type].current.src =
              'https://s3.eu-central-1.amazonaws.com/charlycares-videos/Mijn+film.mp4';
          } else {
            this[type].current.src = this.props.video;
          }

          this[type].current.webkitRequestFullscreen();
          this[type].current.play();
        }
      );
    } else if (this[type].current.mozRequestFullScreen) {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.addFullScreenListener();
          if (type === 'exampleVideo') {
            this[type].current.src =
              'https://s3.eu-central-1.amazonaws.com/charlycares-videos/Mijn+film.mp4';
          } else {
            this[type].current.src = this.props.video;
          }

          this[type].current.mozRequestFullScreen();
          this[type].current.play();
        }
      );
    } else {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          if (type === 'exampleVideo') {
            this[type].current.src =
              'https://s3.eu-central-1.amazonaws.com/charlycares-videos/Mijn+film.mp4';
          } else {
            this[type].current.src = this.props.video;
          }

          this[type].current.play();
        }
      );
    }
  };

  onVideoEnd = type => () => {
    this.setState(
      {
        isPlayingVideo: false,
      },
      () => {
        this[type].current.removeAttribute('src');
        this[type].current.load();
      }
    );
    if (this[type].current.webkitRequestFullscreen) {
      this[type].current.webkitExitFullscreen();
    }
    if (this[type].current.mozRequestFullScreen) {
      this[type].current.mozCancelFullScreen();
    }
  };

  stopOnExitFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.video.current.pause();
      this.exampleVideo.current.pause();
    }
  };

  render() {
    const { image } = this.props.profile;
    return (
      <Container>
        <ExampleVideo
          preload="yes"
          playsinline
          controls
          onEnded={this.onVideoEnd('exampleVideo')}
          onPause={this.onVideoEnd('exampleVideo')}
          active={this.state.isPlayingVideo}
          innerRef={this.exampleVideo}
        />
        <Video
          preload="yes"
          playsinline
          controls
          onEnded={this.onVideoEnd('video')}
          onPause={this.onVideoEnd('video')}
          active={this.state.isPlayingVideo}
          innerRef={this.video}
        />
        <PhotoContainer>
          {this.props.video ? (
            <VideoPlayButton onClick={this.onVideoPlay('video')} />
          ) : null}

          <ProfileImage src={image ? image : placeholder} />
          <PhotoAndVideoWrapper>
            <VideoContainer>
              <VideoIcon src={videoIcon} />
              <VideoText>
                <FormattedMessage id="profile.angel.edit.promoVideo" />
                {this.state.test}
              </VideoText>
              <InfoIcon onClick={this.props.onOverlayOpen} src={infoIcon} />
            </VideoContainer>
            <VideoContainer>
              {!this.props.video ? (
                <React.Fragment>
                  <UploadBtn>
                    <VideoInput
                      type="file"
                      accept="video/mp4, video/quicktime"
                      size="60000000"
                      onChange={this.props.onVideoUpload}
                    />
                    <FormattedMessage id="profile.angel.edit.upload" />
                  </UploadBtn>
                  <ExampleVideoBtn onClick={this.onVideoPlay('exampleVideo')}>
                    <FormattedMessage id="profile.angel.edit.exampleVideo" />
                  </ExampleVideoBtn>
                </React.Fragment>
              ) : (
                <ExampleVideoBtn onClick={this.props.onVideoRemove}>
                  <FormattedMessage id="profile.angel.edit.remove" />
                </ExampleVideoBtn>
              )}
            </VideoContainer>
          </PhotoAndVideoWrapper>
        </PhotoContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.firstName" />
          </Name>
          <Names>{this.props.firstName}</Names>
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.surname" />
          </Name>
          <Names>{this.props.lastName}</Names>
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.dateOfBirth" />
          </Name>
          <Names>{this.props.birthdate}</Names>
        </NamesContainer>
        <DescContainer>
          <DescHeadingContainer>
            <Name>
              <FormattedMessage id="profile.angel.edit.personalDesc" />
            </Name>
            <EditButton onClick={this.onEditBio} />
          </DescHeadingContainer>
          <Desc
            onBlur={this.onFocusOut}
            disabled={this.state.isBioDisabled}
            innerRef={this.descRef}
            onChange={this.props.onBioChange}
            value={this.props.bio}
            placeholder={this.props.intl.formatMessage({
              id: 'profile.angel.edit.personalDescPlaceholder',
            })}
          />
        </DescContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.education" />
          </Name>
          <EducationSelect
            onChange={this.props.onInputChange}
            value={this.props.education}
            name="education"
          >
            {this.educationValues.map(val => {
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </EducationSelect>
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.areaOfInterest" />
          </Name>
          <CustomInput
            onChange={this.props.onInputChange}
            value={this.props.fieldOfStudy}
            name="fieldOfStudy"
          />
        </NamesContainer>
      </Container>
    );
  }
}

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
  padding: 1.25rem 1rem 1rem;
`;

const PhotoContainer = styled.div`
  display: flex;
  position: relative;
`;

const PhotoAndVideoWrapper = styled.div`
  flex: 1;
`;

const VideoIcon = styled.img`
  width: 1.1875rem;
  height: 0.9475rem;
`;
const InfoIcon = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const VideoText = styled.div`
  font-weight: 600;
  font-family: ${({ theme }) => theme.primaryFont};
  margin: 0 0.625rem;
  font-size: inherit;
  line-height: 1.5;
`;

const ProfileImage = styled.img`
  width: 5.0625rem;
  height: 5.0625rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  margin-right: 1.25rem;
`;

const NamesContainer = styled.div`
  border-bottom: ${props =>
    isMobile ? `1px solid ${props.theme.defaultGrey}` : 0};
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  align-items: center;
  position: relative;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

const CustomInput = styled.input`
  font-size: 1rem;
  flex: 1;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  line-height: 1.375;
  border: 0;
  border-bottom: ${props =>
    !isMobile ? `1px solid ${props.theme.defaultGrey}` : 0};
  caret-color: #000;

  &:focus {
    outline: 0;
  }
`;

const Name = styled.div`
  font-size: 0.9375rem;
  flex: 0.7;
  text-align: left;
`;

const Names = styled.div`
  font-size: 1rem;
  flex: 1;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  line-height: 1.375;
  border: 0;
  border-bottom: ${props =>
    !isMobile ? `1px solid ${props.theme.defaultGrey}` : 0};

  &:focus {
    outline: 0;
  }
`;

const EducationSelect = styled.select`
  font-size: 1rem;
  flex: 1;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  line-height: 1.375;
  -webkit-appearance: none;
  background: transparent;
  &:focus {
    outline: 0;
  }
  border: none;
`;

const DescHeadingContainer = styled.div`
  position: relative;
  padding-bottom: 1rem;
`;

const DescContainer = styled.div`
  padding: 1rem 0 0;
`;

const Desc = styled.textarea.attrs({
  rows: 7,
})`
  width: 100%;
  font-size: 0.9375rem;
  line-height: 1.6;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  font-weight: 300;
  padding-bottom: 1rem;
  background: transparent;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-weight: 300;
    color: ${props => props.theme.lightGrey};
    font-style: italic;
  }
`;

const UploadBtn = styled.div`
  width: 5.5625rem;
  height: 1.5rem;
  background: ${({ theme }) => theme.primaryColor};
  border-radius: 1.8125rem;
  color: #fff;
  font-size: 0.8125rem;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.38;
  padding: 0;
  margin-right: 1.25rem;
  position: relative;

  &:focus {
    outline: 0;
  }
`;

const VideoInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const ExampleVideoBtn = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.75rem;
  line-height: 1.41667;
  display: flex;
  align-items: center;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const ExampleVideo = styled.video`
  display: ${props => (props.active ? 'block' : 'none')};

  &:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
`;

export default injectIntl(DataSection);

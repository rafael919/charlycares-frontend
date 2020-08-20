import { Grid, Header, Image, Rating } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import Confirmation from 'Components/Confirmation';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import Hammer from 'react-hammerjs';
import Layout from 'Components/Layout';
import React, { PureComponent } from 'react';

import angel from 'Assets/images/angel.png';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import connectionsIcon from 'Assets/icons/icn-feature-connections.svg';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import heartActive from 'Assets/icons/btn-heart-active.svg';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';

import Availability from './components/Availability';
import Video from './components/Video';
import VideoPlayButton from './components/VideoPlayButton';
import StandByFlag from './components/StandByFlag';
import FixedFlag from './components/FixedFlag';
import NavIconsWrapper from './components/NavIconsWrapper';
import Connections from './components/Connections';
import Feature from './components/Feature';
import FeatureDesc from './components/FeatureDesc';
import Features from './components/Features';
import ImageContainer from './components/ImageContainer';
import NavIcons from './components/NavIcons';
import NextAngel from './components/NextAngel';
import PrevAngel from './components/PrevAngel';
import Reviews from './components/Reviews';
import SelectedAngel from './components/SelectedAngel';
import SelectedButton from './components/SelectedButton';
import SelectedButtonContainer from './components/SelectedButtonContainer';
import Skills from './components/Skills';
import SelectedAngels from './components/SelectedAngels';

export default class Angel extends PureComponent {
  video = React.createRef();
  state = {
    left: null,
    right: null,
  };

  onSend = () => {
    this.props.history.push('/booking/send');
  };

  addFullScreenListener = () => {
    if (this.video.current.webkitRequestFullscreen) {
      this.video.current.addEventListener(
        'webkitfullscreenchange',
        this.onFullScreenChange
      );
    }
    if (this.video.current.mozRequestFullScreen) {
      this.video.current.addEventListener(
        'onmozfullscreenchange',
        this.onFullScreenChange
      );
    }
  };

  onFullScreenChange = () => {
    if (!document.webkitFullscreenElement) {
      this.video.current.pause();
      this.video.current.webkitExitFullscreen();
      this.setState({
        isPlayingVideo: false,
      });
    }
  };

  onVideoPlay = src => () => {
    if (this.video.current.webkitRequestFullscreen) {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.addFullScreenListener();
          this.video.current.src = src;
          this.video.current.webkitRequestFullscreen();
          this.video.current.play();
        }
      );
    } else if (this.video.current.mozRequestFullScreen) {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.addFullScreenListener();
          this.video.current.src = src;
          this.video.current.mozRequestFullScreen();
          this.video.current.play();
        }
      );
    } else {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.video.current.src = src;
          this.video.current.play();
        }
      );
    }
  };

  onVideoEnd = () => {
    this.setState(
      {
        isPlayingVideo: false,
      },
      () => {
        this.video.current.removeAttribute('src');
        this.video.current.load();
      }
    );
    if (this.video.current.webkitRequestFullscreen) {
      this.video.current.webkitExitFullscreen();
    }
    if (this.video.current.mozRequestFullScreen) {
      this.video.current.mozCancelFullScreen();
    }
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navRightComponent={() => {
          return (
            <NavIconsWrapper>
              <NavIcons
                active
                activeIcon={chatIcon}
                disabledIcon={chatIconDisabled}
              />
              <NavIcons
                active
                activeIcon={phoneIcon}
                disabledIcon={phoneIconDisabled}
              />
              <NavIcons
                active
                activeIcon={btnCalendar}
                disabledIcon={btnCalendarDisabled}
              />
            </NavIconsWrapper>
          );
        }}
      >
        <Video
          preload="yes"
          autoplay="autoplay"
          playsinline
          loop
          controls
          onEnded={this.onVideoEnd}
          active={this.state.isPlayingVideo}
          innerRef={this.video}
          onPause={this.onVideoEnd}
        />
        <CustomRow>
          <CustomColumn textAlign="center">
            <Hammer
              onSwipeLeft={() => {
                this.setState(
                  {
                    left: true,
                  },
                  () => {
                    setTimeout(() => {
                      this.setState({
                        left: false,
                      });
                    }, 400);
                    setTimeout(() => {
                      this.setState({
                        left: null,
                      });
                    }, 600);
                  }
                );
              }}
              onSwipeRight={() => {
                this.setState(
                  {
                    right: true,
                  },
                  () => {
                    setTimeout(() => {
                      this.setState({
                        right: false,
                      });
                    }, 400);
                    setTimeout(() => {
                      this.setState({
                        right: null,
                      });
                    }, 600);
                  }
                );
              }}
            >
              <div
                style={{
                  width: '100%',
                  userSelect: 'none',
                }}
              >
                <ImageContainer>
                  <PrevAngel>
                    <Image
                      style={{ maxHeight: 120, maxWidth: 120 }}
                      src={angel}
                    />
                  </PrevAngel>
                  <SelectedAngel
                    pose={
                      this.state.left === true
                        ? 'left'
                        : this.state.left === false
                        ? 'resetLeft'
                        : this.state.right === true
                        ? 'right'
                        : this.state.right === false
                        ? 'resetRight'
                        : 'pause'
                    }
                  >
                    {this.props.angel && this.props.angel.standby ? (
                      <StandByFlag />
                    ) : null}
                    {this.props.angel && this.props.angel.available ? (
                      <FixedFlag />
                    ) : null}
                    {this.props.angel && this.props.angel.video ? (
                      <VideoPlayButton
                        onClick={this.onVideoPlay(this.props.angel.video)}
                      />
                    ) : null}
                    <Image
                      style={{ maxHeight: 151, maxWidth: 151 }}
                      src={angel}
                    />
                    <Image
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 44,
                      }}
                      src={heartActive}
                    />
                  </SelectedAngel>

                  <NextAngel>
                    <Image
                      style={{ maxHeight: 120, maxWidth: 120 }}
                      src={angel}
                    />
                  </NextAngel>
                </ImageContainer>
              </div>
            </Hammer>
            <CustomRow>
              <SelectedButtonContainer>
                <SelectedButton selected />
              </SelectedButtonContainer>
            </CustomRow>
            <Grid>
              <CustomRow textAlign="center">
                <CustomColumn padding="1rem 0 0 0">
                  <Header style={{ marginBottom: '0.5rem' }}>
                    Dominique (21)
                  </Header>
                  <Rating
                    size="small"
                    defaultRating={3}
                    maxRating={5}
                    disabled
                  />{' '}
                  <CustomLink to="/booking/angel">36 reviews</CustomLink>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <Grid.Column textAlign="left">
                  <Paragraph light fontSize="0.9375rem">
                    Hi ik ben Dominique van Veen, ik ben 21 jaar en net klaar
                    met mijn vmbo diploma/koksopleiding. Ik pas al 2 jaar op
                    samen met mijn zus bij verschillende vaste gezinnen… Read
                    more
                  </Paragraph>
                </Grid.Column>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <CustomColumn>
                  <Features>
                    <Feature>
                      <Image src={dayIcon} />> € 9,-
                    </Feature>
                    <Feature>
                      <Image src={nightIcon} />€ 7,50
                    </Feature>
                    <Feature>
                      <Image src={locationIcon} />
                      800m
                    </Feature>
                    <Feature>
                      <Image src={connectionsIcon} />4 connections
                    </Feature>
                  </Features>
                </CustomColumn>
              </CustomRow>
              <FeatureDesc
                info="/booking/info"
                feature="Screening"
                desc="Persoonlijk op kantoor"
              />
              <FeatureDesc
                feature="Response time"
                desc="Persoonlijk op kantoor"
              />
              <FeatureDesc feature="Languages" desc="Persoonlijk op kantoor" />
              <FeatureDesc feature="Languages" desc="WO" />
              <FeatureDesc
                feature="Area of Interest"
                desc="Communicatiewetenschappen"
              />
              <CustomRow noPadding>
                <CustomColumn>
                  <Skills />
                </CustomColumn>
              </CustomRow>
              <CustomRow noPadding>
                <CustomColumn>
                  <Availability />
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <CustomColumn>
                  <Connections />
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 10rem 0">
                <CustomColumn>
                  <Reviews />
                </CustomColumn>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <SelectedAngels selectedAngels={[{ img: angel }, { img: angel }]} />
          <div>
            <BasicButton onClick={this.onSend} fluid primary>
              Send booking request
            </BasicButton>
          </div>
        </Confirmation>
      </Layout>
    );
  }
}

import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Header, Image, Rating, Modal } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import styled from 'styled-components';
import moment from 'moment';
import flatten from 'lodash.flatten';

import {
  getAngelData,
  getPrevAngelData,
  getNextAngelData,
  getDays,
} from './selectors';
import { getErrors, getLoadingStatus } from '../../ui/selectors';
import API from './api';

import {
  getAvailableAngels,
  getSelectedAngels,
} from '../Booking/data/selectors';
import { renderDistanceInKilometers, getAge } from 'Utils';
import { getAngel, onAngelSwipeRight, onAngelSwipeLeft } from './actions';
import { onAngelSelect, onAngelLike } from '../Booking/data/actions';
import CustomColumn from 'Components/CustomColumn';
import Confirmation from 'Components/Confirmation';
import { AngelLoader } from 'Components/Progressive';
import { isIOS } from 'react-device-detect';
import CustomRow from 'Components/CustomRow';
import Swipe from 'react-easy-swipe';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import anime from 'animejs';

import placeholder from 'Assets/images/profile-placeholder.png';
import connectionsIcon from 'Assets/icons/icn-feature-connections.svg';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import heartActive from 'Assets/icons/btn-heart-active.svg';
import heartInactive from 'Assets/icons/btn-heart-inactive.svg';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';
import StandByFlag from './components/StandByFlag';
import Availability from './components/Availability';
import FixedFlag from './components/FixedFlag';
import Video from './components/Video';
import VideoPlayButton from './components/VideoPlayButton';
import NavContacts from './components/NavContacts';
import Connections from './components/Connections';
import Feature from './components/Feature';
import FeaturesSection from './components/FeaturesSection';
import Features from './components/Features';
import ImageContainer from './components/ImageContainer';
import NextAngel from './components/NextAngel';
import PrevAngel from './components/PrevAngel';
import Reviews from './components/Reviews';
import SelectedAngel from './components/SelectedAngel';
import Skills from './components/Skills';
import SelectedAngels from './components/SelectedAngels';
import CustomImage from './components/Image';
import Heart from './components/Heart';
import ReviewsText from './components/ReviewsText';
import SelectedButton from './components/SelectedButton';
import SelectedButtonContainer from './components/SelectedButtonContainer';
import ScreeningExplanation from './components/ScreeningExplanation';
import CloseIcon from 'Assets/icons/close.svg';

const CustomModal = styled(Modal)`
  margin-top: 8rem !important;
  top: 10% !important;
  &&& {
    & > .content {
      padding: 0 1.5rem 1.5rem;
    }
  }
`;

const CloseImage = styled(Image)`
  position: absolute !important;
  top: 0.5rem;
  right: 1rem;
`;

class Angel extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.onClickHeart = this.onClickHeart.bind(this);

    const angelIds = this.getAngelIds();

    this.state = {
      prevAngel:
        angelIds[angelIds.indexOf(Number(this.props.match.params.id)) - 1],
      nextAngel:
        angelIds[angelIds.indexOf(Number(this.props.match.params.id)) + 1],
      currentAngel: Number(this.props.match.params.id),
      distance: null,
      liked: null,
      selected: null,
      connections: null,
      isAngelSelected: false,
      angelIds,
      fetchedAngels: [],
      isLoading: true,
      from:
        this.props.location.state && this.props.location.state.from
          ? this.props.location.state.from
          : null,
      bookingDates: this.makeDatesArr(props.days),
    };
  }

  initialAngelLoad = async () => {
    const { currentAngel, bookingDates } = this.state;
    let currPromise, currRatingsPromise;

    if (currentAngel) {
      currPromise = API.getNewAngel(currentAngel, {
        booking_dates: bookingDates,
      });
      currRatingsPromise = API.getRatings(currentAngel);
    }

    try {
      let curr, currRatings;

      if (currPromise) {
        curr = await currPromise;
        currRatings = await currRatingsPromise;
      }

      this.setState(state => {
        return {
          isLoading: false,
          angel: { ...curr.data.data, ratings: currRatings.data.data },
        };
      });
    } catch (e) {
      this.setState({ error: e, isLoading: false });
    }
  };

  getAngels = async index => {
    const { angelIds, bookingDates } = this.state;
    let firstPromise;
    let firstRatingsPromise;

    if (index !== -1 && angelIds[index]) {
      firstPromise = await API.getNewAngel(angelIds[index], {
        booking_dates: bookingDates,
      });
      firstRatingsPromise = await API.getRatings(angelIds[index]);
    }

    try {
      let first, firstRatings;

      if (firstPromise) {
        first = await firstPromise;
        firstRatings = await firstRatingsPromise;
      }

      this.setState(state => {
        if (first && firstRatings) {
          return {
            angel: { ...first.data.data, ratings: firstRatings.data.data },
            isLoading: false,
          };
        }
        return null;
      });
    } catch (e) {
      this.setState({ error: e, isLoading: false });
    }
  };

  onClickHeart() {
    this.setState(
      state => ({
        ...state,
        liked: !state.liked,
      }),
      () => {
        this.state.liked ? this.likeAngel() : this.unLikeAngel();
      }
    );
  }

  likeAngel() {
    API.angelLike(this.state.currentAngel)
      .then(res => {
        this.props.onAngelLike(this.state.currentAngel);
      })
      .catch(err => {
        this.setState(state => ({
          errors: err,
          liked: !state.liked,
        }));
      });
  }

  unLikeAngel() {
    API.angelUnLike(this.state.currentAngel)
      .then(res => {
        this.props.onAngelLike(this.state.currentAngel);
      })
      .catch(err => {
        this.setState(state => ({
          errors: err,
          liked: !state.liked,
        }));
      });
  }

  toggleScreeningModal = () => {
    this.setState({
      showScreeningModal: !this.state.showScreeningModal,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.initialAngelLoad();

    document.addEventListener('fullscreenchange', this.stopOnExitFullScreen);
    document.addEventListener(
      'webkitfullscreenchange',
      this.stopOnExitFullScreen
    );
    document.addEventListener('mozfullscreenchange', this.stopOnExitFullScreen);
    document.addEventListener('MSFullscreenChange', this.stopOnExitFullScreen);
    document.addEventListener('pause', this.pauseChange, true);
    document.addEventListener('play', this.playChange, true);
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
    document.removeEventListener('pause', this.pauseChange, true);
    document.removeEventListener('play', this.playChange, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.currentAngel !== prevState.currentAngel ||
      (this.state.fetchedAngels !== prevState.fetchedAngels &&
        this.state.fetchedAngels[
          this.state.angelIds.indexOf(this.state.currentAngel)
        ])
    ) {
      this.setState(state => {
        if (state.fetchedAngels[state.angelIds.indexOf(state.currentAngel)]) {
          return {
            liked:
              state.fetchedAngels[state.angelIds.indexOf(state.currentAngel)]
                .is_liked,
          };
        }
        return null;
      });
    }
  }

  makeDatesArr = (days = []) => {
    return flatten(
      days.map(day => {
        const selectedDay = {
          start_date: moment(`${day.startTime}`, 'YYYY-MM-DD HH:mm').format(
            'YYYY-MM-DD HH:mm'
          ),
          end_date: moment(`${day.endTime}`, 'YYYY-MM-DD HH:mm').format(
            'YYYY-MM-DD HH:mm'
          ),
        };

        const mappedRepetitions = day.repetitions.map(rep => {
          return {
            start_date: moment(
              `${rep} ${moment(day.startTime, 'YYYY-MM-DD HH:mm').format(
                'HH:mm'
              )}`,
              'YYYY-MM-DD HH:mm'
            ).format('YYYY-MM-DD HH:mm'),
            end_date: moment(
              `${rep} ${moment(day.endTime, 'YYYY-MM-DD HH:mm').format(
                'HH:mm'
              )}`,
              'YYYY-MM-DD HH:mm'
            ).format('YYYY-MM-DD HH:mm'),
          };
        });
        return [selectedDay, ...mappedRepetitions];
      })
    );
  };

  onSend = () => {
    this.props.history.push('/booking/send');
  };

  getStatus(prop) {
    return prop === 1 ? true : false;
  }

  getDistanceLikedAndConnections = () => {
    if (this.props.availableAngels && this.state.angel) {
      const result = this.props.availableAngels.find(
        angel => angel.angel_id === this.state.angel.id
      );
      if (result) {
        this.setState({
          distance: result.distance,
          liked: result.is_liked,
          connections: result.mutual_friends
            ? result.mutual_friends.context
            : null,
        });
      }
    }
  };

  getAngelIds = () => {
    return this.props.availableAngels.map(angel => {
      return angel.id;
    });
  };

  onSwipeLeft = () => {
    this.setState(
      state => {
        if (!state.angelIds[state.angelIds.indexOf(state.currentAngel) + 1]) {
          return null;
        }
        return {
          currentAngel:
            state.angelIds[state.angelIds.indexOf(state.currentAngel) + 1],
          isLoading: true,
        };
      },
      () => {
        const index = this.state.angelIds.indexOf(this.state.currentAngel);
        if (!isIOS) {
          anime({
            targets: '#swipe-container',
            rotate: 3,
            duration: 200,
            transformOrigin: '50% 50%',
            opacity: [1, 0],
            translateX: [0, -150],
            easing: 'linear',
            complete: function(anim) {
              anim.reset();
            },
          });
        }
        this.getAngels(index);
      }
    );
  };

  onSwipeRight = () => {
    this.setState(
      state => {
        if (!state.angelIds[state.angelIds.indexOf(state.currentAngel) - 1]) {
          return null;
        }
        return {
          currentAngel:
            state.angelIds[state.angelIds.indexOf(state.currentAngel) - 1],
          isLoading: true,
        };
      },
      () => {
        const index = this.state.angelIds.indexOf(this.state.currentAngel);
        if (!isIOS) {
          anime({
            targets: '#swipe-container',
            rotate: -3,
            duration: 200,
            transformOrigin: '50% 50%',
            opacity: [1, 0],
            translateX: [0, 150],
            easing: 'linear',
            complete: function(anim) {
              anim.reset();
            },
          });
        }
        this.getAngels(index);
      }
    );
  };

  onAngelSelect = (selectedAngels, angel, isSelected) => () => {
    if (selectedAngels.length < 5 || isSelected) {
      const position = this.props.availableAngels.reduce((acc, curr, index) => {
        if (curr.user_id === angel.user_id) {
          acc = index;
        }

        return acc;
      }, -1);

      const angelData = angel.profile ? angel.profile : angel;

      this.props.onAngelSelect(selectedAngels, angelData, position);
    }
  };

  scrollToReviews() {
    const reviews = document.querySelector('#reviews');
    if (reviews && reviews.getBoundingClientRect) {
      const topPosition = document
        .querySelector('#reviews')
        .getBoundingClientRect();
      anime({
        targets: '#grid',
        duration: 350,
        easing: 'easeInOutCubic',
        scrollTop: [topPosition.y],
      });
    }
  }

  isAngelSelected = () => {
    const angel = this.props.selectedAngels.find(
      angel => angel.id === this.state.currentAngel
    );
    if (angel) {
      return true;
    }
    return false;
  };

  isAngelAvailable = () => {
    const angel = this.props.availableAngels.find(
      angel => angel.id === this.state.currentAngel
    );

    return angel.available;
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
    if (this.video.current.webkitRequestFullscreen) {
      this.video.current.webkitExitFullscreen();
      this.video.current.src = '';
    }
    if (this.video.current.mozRequestFullScreen) {
      this.video.current.mozCancelFullScreen();
      this.video.current.src = '';
    }
    this.setState({
      isPlayingVideo: false,
    });
  };

  stopOnExitFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.video.current.pause();
    }
  };

  pauseChange = () => {
    this.setState({ isPlayingVideo: false });
  };

  playChange = () => {
    this.setState({ isPlayingVideo: true });
  };

  onSend = () => {
    this.props.history.push('/booking/send');
  };

  onBack = () => {
    if (
      (this.props.history.location &&
        this.props.history.location.state &&
        this.props.history.location.state.from === 'search') ||
      this.props.history.location.state.from === 'calendar'
    ) {
      const { currentAngel } = this.state;

      return this.props.history.replace('/booking/search', {
        from: 'angel',
        lastAngel: currentAngel,
        bookingId: this.props.history.location.state.bookingId,
      });
    }
    if (
      this.props.location.state &&
      this.props.location.state.from &&
      (this.props.location.state.from === 'bookingDetails' ||
        this.props.location.state.from === 'calendar')
    ) {
      this.props.history.replace('/booking/search');
    } else {
      this.props.history.goBack();
    }
  };

  getPrevAndNextAngelsImg = () => {
    if (this.props.availableAngels && this.state.angel) {
      let currentImgIndex, nextAngelIndex, prevAngelIndex;
      for (let i = 0; i < this.props.availableAngels.length; i++) {
        if (this.props.availableAngels[i].angel_id === this.state.angel.id) {
          currentImgIndex = i;
        }
      }
      prevAngelIndex = currentImgIndex - 1;
      nextAngelIndex = currentImgIndex + 1;

      if (prevAngelIndex < 0) {
        prevAngelIndex = null;
      }
      if (nextAngelIndex > this.props.availableAngels.length) {
        nextAngelIndex = null;
      }

      return {
        pAngel: this.props.availableAngels[prevAngelIndex],
        nAngel: this.props.availableAngels[nextAngelIndex],
      };
    }
    return {};
  };

  render() {
    const { angel } = this.state;
    const comesFromPaymentsOrFavorites =
      this.props.location.state &&
      (this.props.location.state.from === 'favorites' ||
        this.props.location.state.from === 'bookingDetails' ||
        this.props.location.state.from === 'offerDetails' ||
        this.props.location.state.from === 'payments');

    const { pAngel, nAngel } = this.getPrevAndNextAngelsImg();

    return (
      <React.Fragment>
        <Layout
          flexcenteritem="0"
          onNavBack={this.onBack}
          navRightComponent={() => (
            <NavContacts
              name={angel && angel.profile ? angel.profile.first_name : null}
              img={angel && angel.profile ? angel.profile.image : null}
              angelId={angel ? angel.id : null}
              phone={angel && angel.profile ? angel.profile.phone : null}
              history={this.props.history}
              wasBooked={angel ? angel.was_booked : null}
              newMessage={angel ? angel.new_messages : null}
              userId={angel ? angel.user_id : null}
            />
          )}
        >
          <Video
            onEnded={this.onVideoEnd}
            active={this.state.isPlayingVideo}
            innerRef={this.video}
          />
          <CustomModal
            open={this.state.showScreeningModal}
            onClose={this.toggleScreeningModal}
          >
            <CloseImage src={CloseIcon} onClick={this.toggleScreeningModal} />
            <Modal.Content>
              <ScreeningExplanation />
            </Modal.Content>
          </CustomModal>
          <Swipe
                  onSwipeRight={
                    !comesFromPaymentsOrFavorites ? this.onSwipeRight : null
                  }
                  onSwipeLeft={
                    !comesFromPaymentsOrFavorites ? this.onSwipeLeft : null
                  }
                  style={{width: '100%'}}
                  tolerance = { 60 }
                >
                  <div>
          <CustomRow padding="1.5rem 0 0 0" id="swipe-container">
            {this.state.isLoading ? (
              <CustomColumn>
                <AngelLoader isLoading />
              </CustomColumn>
            ) : (
              <CustomColumn noPadding textAlign="center">
                    <ImageContainer>
                      {pAngel && !comesFromPaymentsOrFavorites ? (
                        <PrevAngel>
                          <Image
                            circular
                            style={{ height: 120, width: 120 }}
                            src={
                              pAngel && pAngel.image
                                ? pAngel.image
                                : placeholder
                            }
                          />
                        </PrevAngel>
                      ) : null}
                      <SelectedAngel>
                        <CustomImage
                          src={
                            angel && angel.profile && angel.profile.image
                              ? angel.profile.image
                              : placeholder
                          }
                        />
                        {angel && angel.standby ? <StandByFlag /> : null}
                        {angel && angel.available ? <FixedFlag /> : null}
                        {angel && angel.video ? (
                          <VideoPlayButton
                            onClick={this.onVideoPlay(angel.video)}
                          />
                        ) : null}

                        <Heart
                          onClick={this.onClickHeart}
                          src={this.state.liked ? heartActive : heartInactive}
                        />
                      </SelectedAngel>

                      {nAngel && !comesFromPaymentsOrFavorites ? (
                        <NextAngel>
                          <Image
                            circular
                            style={{ height: 120, width: 120 }}
                            src={
                              nAngel && nAngel.image
                                ? nAngel.image
                                : placeholder
                            }
                          />
                        </NextAngel>
                      ) : null}
                    </ImageContainer>

                <CustomRow>
                  {!comesFromPaymentsOrFavorites && this.isAngelAvailable() ? (
                    <SelectedButtonContainer>
                      <SelectedButton
                        maxNumberSelected={
                          this.props.selectedAngels.length >= 5
                        }
                        selected={this.isAngelSelected()}
                        onClick={this.onAngelSelect(
                          this.props.selectedAngels,
                          angel,
                          this.isAngelSelected()
                        )}
                      />
                    </SelectedButtonContainer>
                  ) : null}
                </CustomRow>

                <Grid container>
                  <CustomRow textAlign="center">
                    <CustomColumn padding="1rem 0 0 0">
                      <Header style={{ marginBottom: '0.5rem' }}>
                        {angel && angel.profile
                          ? angel.profile.first_name
                          : null}{' '}
                        (
                        {getAge(
                          angel && angel.profile
                            ? angel.profile.birthdate
                            : null
                        )}
                        )
                      </Header>
                      <Rating
                        size="small"
                        rating={Math.round(
                          angel && angel.average_rating
                            ? angel.average_rating
                            : null
                        )}
                        maxRating={5}
                        disabled
                      />{' '}
                      <ReviewsText onClick={this.scrollToReviews}>
                        {this.props.intl.formatMessage(
                          {
                            id: 'booking.angel.reviewsLink',
                          },
                          {
                            reviews:
                              angel && angel.ratings ? angel.ratings.length : 0,
                          }
                        )}
                      </ReviewsText>
                    </CustomColumn>
                  </CustomRow>
                  <CustomRow padding="0 0 1rem 0">
                    <CustomColumn noPadding textAlign="left">
                      <Paragraph light fontSize="0.9375rem">
                        {angel && angel.short_bio ? angel.short_bio : null}
                      </Paragraph>
                    </CustomColumn>
                  </CustomRow>
                  <CustomRow padding="0 0 1rem 0">
                    <CustomColumn noPadding>
                      <Features>
                        <Feature>
                          <Image src={dayIcon} />€{' '}
                          {angel && angel.normal_rate
                            ? angel.normal_rate
                            : null}
                        </Feature>
                        <Feature>
                          <Image src={nightIcon} />€{' '}
                          {angel && angel.extra_rate ? angel.extra_rate : null}
                        </Feature>
                        <Feature>
                          <Image src={locationIcon} />
                          {renderDistanceInKilometers(angel.profile.distance)}
                        </Feature>
                        {this.state.connections && (
                          <Feature>
                            <Image src={connectionsIcon} />
                            <FormattedMessage
                              id="booking.angel.connections"
                              values={{
                                connections: this.state.connections
                                  .all_mutual_friends.length,
                              }}
                            />
                          </Feature>
                        )}
                      </Features>
                    </CustomColumn>
                  </CustomRow>
                  <FeaturesSection
                    languages={angel ? angel.languages : null}
                    responseTime={angel ? angel.response_time : null}
                    education={angel ? angel.education : null}
                    areaOfInterest={angel ? angel.field_of_study : null}
                    openInfoScreeningModal={this.toggleScreeningModal}
                  />
                  <CustomRow noPadding>
                    <CustomColumn noPadding>
                      <Skills
                        workingWithKids={angel ? angel.works_with_kids : null}
                        baby={angel ? angel.min_age_children : null}
                        pro={angel ? angel.babysit_expertise : null}
                        firstAid={angel ? angel.first_aid : null}
                        driver={angel ? angel.driving_license : null}
                        insurance={angel ? angel.liability_insurance : null}
                      />
                    </CustomColumn>
                  </CustomRow>
                  <CustomRow noPadding>
                    <CustomColumn noPadding>
                      <Availability
                        angelId={angel ? angel.id : null}
                        history={this.props.history}
                        location={this.props.location}
                      />
                    </CustomColumn>
                  </CustomRow>
                  <CustomRow padding="0 0 1rem 0">
                    {this.state.connections && (
                      <CustomColumn noPadding>
                        <Connections connections={this.state.connections} />
                      </CustomColumn>
                    )}
                  </CustomRow>

                  <CustomRow padding="0 0 10rem 0">
                    <CustomColumn noPadding>
                      <Reviews
                        ratings={angel ? angel.ratings : null}
                        name={angel ? angel.profile.first_name : null}
                      />
                    </CustomColumn>
                  </CustomRow>
                </Grid>
              </CustomColumn>
            )}
          </CustomRow>
          </div>
                </Swipe>
        </Layout>

        {!comesFromPaymentsOrFavorites ? (
          <Confirmation>
            <SelectedAngels selectedAngels={this.props.selectedAngels} />
          </Confirmation>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  angel: getAngelData(state),
  prevAngel: getPrevAngelData(state),
  nextAngel: getNextAngelData(state),
  availableAngels: getAvailableAngels(state),
  selectedAngels: getSelectedAngels(state),
  days: getDays(state),
});

const mapDispatchToProps = dispatch => ({
  onAngelSelect: (selectedAngels, angel, position) =>
    dispatch(onAngelSelect(selectedAngels, angel, position)),
  getAngel: id => dispatch(getAngel(id)),
  onAngelLike: id => dispatch(onAngelLike(id)),
  onSwipeRight: (id, callback) => dispatch(onAngelSwipeRight(id, callback)),
  onSwipeLeft: (id, callback) => dispatch(onAngelSwipeLeft(id, callback)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Angel)
);

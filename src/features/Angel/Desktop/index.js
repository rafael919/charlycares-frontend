import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Header, Image, Rating, Segment, Modal } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import moment from 'moment';
import flatten from 'lodash.flatten';

import API from '../api';

import { getAngelData, getDays } from '../selectors';
import { getLikedAngels } from '../../Booking/data/selectors';
import { onAngelLike } from '../../Booking/data/actions';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';

import {
  getAvailableAngels,
  getSelectedAngels,
} from '../../Booking/data/selectors';
import { renderDistanceInKilometers, getAge } from 'Utils';
import { getAngel } from '../actions';
import { onAngelSelect } from '../../Booking/data/actions';
import Confirmation from 'Components/Confirmation';
import { AngelLoader } from 'Components/Progressive';
import BasicButton from 'Components/Buttons/Basic';
import Hammer from 'react-hammerjs';
import React, { Fragment } from 'react';
import anime from 'animejs';

import connectionsIcon from 'Assets/icons/icn-feature-connections.svg';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import heartActive from 'Assets/icons/btn-heart-active.svg';
import heartInactive from 'Assets/icons/btn-heart-inactive.svg';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';

import Availability from '../components/Availability';
import StandByFlag from '../components/StandByFlag';
import VideoPlayButton from '../components/VideoPlayButton';
import Video from '../components/Video';
import FixedFlag from '../components/FixedFlag';
import NavContacts from '../components/NavContacts';
import Connections from '../components/Connections';
import Feature from '../components/Feature';
import FeaturesSection from '../components/FeaturesSection';
import Features from '../components/Features';
import ImageContainer from '../components/ImageContainer';
import NextAngel from '../components/NextAngel';
import PrevAngel from '../components/PrevAngel';
import Reviews from '../components/Reviews';
import SelectedAngel from '../components/SelectedAngel';
import SelectedButton from '../components/SelectedButton';
import SelectedButtonContainer from '../components/SelectedButtonContainer';
import Skills from '../components/Skills';
import SelectedAngels from '../components/SelectedAngels';
import CustomImage from '../components/Image';
import Heart from '../components/Heart';
import ReviewsText from '../components/ReviewsText';
import Navigation from 'Components/Navigation';
import ScreeningExplanation from '../components/ScreeningExplanation';
import CloseIcon from 'Assets/icons/close.svg';
import PhoneModal from 'Components/PhoneModal';

const CustomModal = styled(Modal)`
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

class Angel extends React.PureComponent {
  video = React.createRef();
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
  state = {
    prevAngel: null,
    nextAngel: null,
    distance: null,
    liked: null,
    selected: null,
    connections: null,
    bookingDates: this.makeDatesArr(this.props.days),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAngel({
      currentId: this.props.match.params.id,
      bookingDates: this.state.bookingDates,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.location.state &&
      (!this.props.location.state.from === 'favorites' ||
        !this.props.location.state.from === 'payments')
    ) {
      if (prevProps.angel === null) {
        this.getPrevAndNextAngelsImg();
        this.getDistanceLikedAndConnections();
        return;
      }
      if (
        prevProps.angel &&
        this.props.angel &&
        this.props.angel.id !== prevProps.angel.id
      ) {
        this.getPrevAndNextAngelsImg();
        this.getDistanceLikedAndConnections();
      }
    }

    if (
      (this.props.angel &&
        prevProps.angel &&
        this.props.angel.is_liked &&
        this.props.angel.id !== prevProps.angel.id) ||
      (this.props.angel &&
        prevProps.angel &&
        this.props.angel.id !== prevProps.angel.id &&
        this.state.liked === null)
    ) {
      this.setState({
        liked: this.props.angel.is_liked,
      });
    }
    if (this.props.likedAngels !== prevProps.likedAngels) {
      const isAngelInList = this.props.likedAngels.find(
        id => id === this.props.angel.id
      );

      this.setState(state => {
        if (isAngelInList) {
          return {
            ...state,
            liked: true,
          };
        }
        return {
          ...state,
          liked: false,
        };
      });
    }
  }

  onClickHeart = () => {
    this.setState(
      {
        liked: !this.state.liked,
      },
      () => {
        this.state.liked ? this.likeAngel() : this.unLikeAngel();
      }
    );
  };

  likeAngel = () => {
    API.angelLike(this.props.angel.id)
      .then(() => {
        this.props.onAngelLike(this.props.angel.id);
      })
      .catch(err => {
        this.setState(state => ({
          errors: err,
          liked: !state.liked,
        }));
      });
  };

  unLikeAngel = () => {
    API.angelUnLike(this.props.angel.id)
      .then(() => {
        this.props.onAngelLike(this.props.angel.id);
      })
      .catch(err => {
        this.setState(state => ({
          errors: err,
          liked: !state.liked,
        }));
      });
  };

  onSend = () => {
    this.props.history.push('/booking/send');
  };

  getStatus(prop) {
    return prop === 1 ? true : false;
  }

  getDistanceLikedAndConnections = () => {
    if (this.props.availableAngels && this.props.angel) {
      const result = this.props.availableAngels.find(
        angel => angel.angel_id === this.props.angel.id
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

  toggleScreeningModal = () => {
    this.setState({
      showScreeningModal: !this.state.showScreeningModal,
    });
  };

  getPrevAndNextAngelsImg = () => {
    if (this.props.availableAngels && this.props.angel) {
      let currentImgIndex, nextAngelIndex, prevAngelIndex;
      for (let i = 0; i < this.props.availableAngels.length; i++) {
        if (this.props.availableAngels[i].angel_id === this.props.angel.id) {
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

      this.setState({
        prevAngel: this.props.availableAngels[prevAngelIndex],
        nextAngel: this.props.availableAngels[nextAngelIndex],
      });
    }
  };

  onSwipeLeft = () => {
    if (this.state.nextAngel) {
      this.props.getAngel({
        currentId: this.state.nextAngel.id,
        bookingDates: this.state.bookingDates,
      });
    }
  };
  onSwipeRight = () => {
    if (this.state.prevAngel) {
      this.props.getAngel({
        currentId: this.state.prevAngel.id,
        bookingDates: this.state.bookingDates,
      });
    }
  };

  onAngelSelect = (selectedAngels, angel) => () => {
    const position = this.props.availableAngels.reduce((acc, curr, index) => {
      if (curr.user_id === angel.user_id) {
        acc = index;
      }
      return acc;
    }, -1);

    const angelData = angel.profile ? angel.profile : angel;

    this.props.onAngelSelect(selectedAngels, angelData, position);
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  scrollToReviews() {
    const topPosition = document
      .querySelector('#reviews')
      .getBoundingClientRect();
    anime({
      targets: '#rightColumn',
      duration: 350,
      easing: 'easeInOutCubic',
      scrollTop: [topPosition.y],
    });
  }

  isAngelSelected = () => {
    const angel = this.props.selectedAngels.find(
      angel => angel.id === Number(this.props.match.params.id)
    );
    if (angel) {
      return true;
    }
    return false;
  };

  isAngelAvailable = () => {
    const angel = this.props.availableAngels.find(
      angel => angel.id === this.props.angel.id
    );
    if (angel) {
      return true;
    } else {
      return false;
    }
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

  render() {
    const comesFromPaymentsOrFavorites =
      this.props.location.state &&
      (this.props.location.state.from === 'favorites' ||
        this.props.location.state.from === 'bookingDetails' ||
        this.props.location.state.from === 'payments');
    return (
      <Fragment>
        <PhoneModal
          open={this.state.showPhoneModal}
          toggle={this.togglePhoneModal}
        />
        <Video
          onEnded={this.onVideoEnd}
          active={this.state.isPlayingVideo}
          innerRef={this.video}
        />
        <CustomModal
          open={this.state.showScreeningModal}
          onClose={this.toggleScreeningModal}
          size="mini"
        >
          <CloseImage src={CloseIcon} onClick={this.toggleScreeningModal} />
          <Modal.Content>
            <ScreeningExplanation />
          </Modal.Content>
        </CustomModal>

        <Navigation
          onBack={this.props.history.goBack}
          rightComp={() => (
            <NavContacts
              name={this.props.angel && this.props.angel.profile.first_name}
              img={this.props.angel && this.props.angel.profile.image}
              angelId={this.props.angel && this.props.angel.id}
              userId={this.props.angel && this.props.angel.user_id}
              phone={this.props.angel && this.props.angel.profile.phone}
              history={this.props.history}
              location={this.props.location}
              wasBooked={this.props.angel && this.props.angel.was_booked}
              newMessage={this.props.angel && this.props.angel.new_messages}
              togglePhoneModal={this.togglePhoneModal}
            />
          )}
        />

        {this.props.isLoading && !this.props.angel ? (
          <Segment basic vertical>
            <AngelLoader isLoading />
          </Segment>
        ) : null}
        {!this.props.isLoading && this.props.angel && (
          <Segment basic vertical>
            <Hammer
              onSwipeRight={this.onSwipeRight}
              onSwipeLeft={this.onSwipeLeft}
            >
              <div>
                <ImageContainer>
                  <PrevAngel>
                    <Image
                      circular
                      style={{ maxHeight: 120, maxWidth: 120 }}
                      src={this.state.prevAngel && this.state.prevAngel.image}
                    />
                  </PrevAngel>
                  <SelectedAngel>
                    <CustomImage src={this.props.angel.profile.image} />
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
                    <Heart
                      onClick={this.onClickHeart}
                      src={this.state.liked ? heartActive : heartInactive}
                    />
                  </SelectedAngel>

                  <NextAngel>
                    <Image
                      circular
                      style={{ maxHeight: 120, maxWidth: 120 }}
                      src={this.state.nextAngel && this.state.nextAngel.image}
                    />
                  </NextAngel>
                </ImageContainer>
              </div>
            </Hammer>
            {!comesFromPaymentsOrFavorites && this.isAngelAvailable() ? (
              <SelectedButtonContainer>
                <SelectedButton
                  maxNumberSelected={this.props.selectedAngels.length >= 5}
                  selected={this.isAngelSelected()}
                  onClick={this.onAngelSelect(
                    this.props.selectedAngels,
                    this.props.angel.profile,
                    this.isAngelSelected()
                  )}
                />
              </SelectedButtonContainer>
            ) : null}
            <Segment basic vertical textAlign="center">
              <Header style={{ marginBottom: '0.5rem' }}>
                {this.props.angel.profile.first_name} (
                {getAge(this.props.angel.profile.birthdate)})
              </Header>
              <Rating
                size="small"
                rating={Math.round(this.props.angel.average_rating)}
                maxRating={5}
                disabled
              />{' '}
              <ReviewsText onClick={this.scrollToReviews}>
                {this.props.intl.formatMessage(
                  {
                    id: 'booking.angel.reviewsLink',
                  },
                  { reviews: this.props.angel.ratings.length }
                )}
              </ReviewsText>
            </Segment>
            <Segment basic vertical>
              <Paragraph light fontSize="0.9375rem">
                {this.props.angel.short_bio}
              </Paragraph>
            </Segment>
            <Segment basic vertical>
              <Features>
                <Feature>
                  <Image src={dayIcon} />€ {this.props.angel.normal_rate}
                </Feature>
                <Feature>
                  <Image src={nightIcon} />€ {this.props.angel.extra_rate}
                </Feature>
                <Feature>
                  <Image src={locationIcon} />
                  {renderDistanceInKilometers(
                    this.props.angel.profile
                      ? this.props.angel.profile.distance
                      : 0
                  )}
                </Feature>
                {this.state.connections && (
                  <Feature>
                    <Image src={connectionsIcon} />
                    <FormattedMessage
                      id="booking.angel.connections"
                      values={{
                        connections: this.state.connections.all_mutual_friends
                          .length,
                      }}
                    />
                  </Feature>
                )}
              </Features>
            </Segment>
            <FeaturesSection
              languages={this.props.angel.languages}
              responseTime={this.props.angel.response_time}
              education={this.props.angel.education}
              areaOfInterest={this.props.angel.field_of_study}
              openInfoScreeningModal={this.toggleScreeningModal}
            />

            <Skills
              baby={this.props.angel.works_with_kids}
              pro={this.props.angel.babysit_expertise}
              firstAid={this.props.angel.first_aid}
              driver={this.props.angel.driver_license}
              insurance={this.props.angel.liability_insurance}
            />

            <Availability
              angelId={this.props.angel.id}
              history={this.props.history}
              location={this.props.location}
            />

            {this.state.connections && (
              <Connections connections={this.state.connections} />
            )}

            <Segment basic vertical>
              <Reviews
                ratings={this.props.angel.ratings}
                name={this.props.angel.profile.first_name}
              />
            </Segment>
          </Segment>
        )}

        {!comesFromPaymentsOrFavorites && isMobile ? (
          <Confirmation>
            <SelectedAngels selectedAngels={this.props.selectedAngels} />
            <div>
              <BasicButton onClick={this.onSend} fluid primary>
                <FormattedMessage id="booking.angel.bookingRequestBtn" />
              </BasicButton>
            </div>
          </Confirmation>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  angel: getAngelData(state),
  availableAngels: getAvailableAngels(state),
  selectedAngels: getSelectedAngels(state),
  likedAngels: getLikedAngels(state),
  days: getDays(state),
});

const mapDispatchToProps = dispatch => ({
  onAngelSelect: (selectedAngels, angel, position) =>
    dispatch(onAngelSelect(selectedAngels, angel, position)),
  getAngel: data => dispatch(getAngel(data)),
  onAngelLike: id => dispatch(onAngelLike(id)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Angel)
);

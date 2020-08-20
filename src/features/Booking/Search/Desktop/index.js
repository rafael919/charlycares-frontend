import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Image, Segment, Modal } from 'semantic-ui-react';

import {
  getAvailableAngels,
  getSelectedAngels,
  getNotMatched,
  getMatched,
  getNumberOfActiveFilters,
} from '../../data/selectors.js';
import {
  onAngelSelect,
  clearSelectedAngels,
  onGetAngelsForBooking,
  onSetSelectedAngels,
  onAddAngelsToBooking,
  onClearAngels,
} from '../../data/actions';
import { isAngelSelected } from 'Utils';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onClearDays } from '../../Create/actions';
import { onErrorConfirm } from '../../../../ui/actions';
import InfiniteScroll from 'react-infinite-scroller';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from './components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import Divider from 'Components/Divider';
import DesktopError from 'Components/DesktopError';
import Alert from 'Components/Alert';
import { ProgressiveFacebook } from 'Components/Progressive';
import Navigation from 'Components/Navigation';
import anime from 'animejs';

import btnAddIcon from 'Assets/icons/btn-check-off.svg';
import checkedIcon from 'Assets/icons/btn-check-on.svg';
import filterIcon from 'Assets/icons/btn-filter.svg';

import AddBtn from '../components/AddBtn';
import AngelFeatures from '../components/AngelFeatures';
import AngelUnavailable from '../components/AngelUnavailable';
import AngelImage from '../components/AngelImage';
import AngelsListItem from '../components/AngelsListItem';
import FilterContainer from '../components/FilterContainer';
import FilterCounter from '../components/FilterCounter';
import SelectedAngels from '../components/SelectedAngels';
import Filters from '../../Filters/Desktop';
import VideoPlayButton from '../components/VideoPlayButton';
import Video from '../components/Video';
import NoAngelsInfo from '../components/NoAngelsInfo';
import ListWrapper from '../components/ListWrapper';
import { isMobile } from 'react-device-detect';

class BookingSearch extends Component {
  confirmationRef = React.createRef();
  video = React.createRef();

  static defaultProps = {
    availableAngels: [],
    selectedAngels: [],
  };

  initialState = {
    showFilters: false,
    availableAngels: {
      items: [],
      start: 0,
      end: 5,
      hasMore: true,
    },
    match: {
      items: [],
      start: 0,
      end: 5,
      hasMore: true,
    },
    notMatch: {
      items: [],
      start: 0,
      end: 5,
      hasMore: true,
    },
    isPlayingVideo: false,
    locationState: this.props.location.state,
    open: false,
  };

  state = this.initialState;

  componentDidMount() {
    const { location, onGetAngelsForBooking } = this.props;

    if (location.state && location.state.from === 'bookingDetails') {
      this.setState(this.initialState);
      onGetAngelsForBooking(location.state.bookingId);
    }

    this.animation = anime({
      targets: this.confirmationRef.current,
      translateY: [127, 0],
      opacity: [0.3, 1],
      easing: 'linear',
      duration: 600,
      autoplay: false,
    });

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

  componentDidUpdate(prevProps, prevState) {
    const { availableAngels } = this.state;
    if (
      availableAngels &&
      (availableAngels.items.length &&
        prevState.availableAngels.items.length === 0)
    ) {
      this.animation.play();
    }
  }

  onAngelClick = angelId => () => {
    const { history } = this.props;

    if (isMobile) {
      history.push(`angel/${angelId}`);
    } else {
      history.push(`/booking/search/angel/${angelId}`);
    }

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FViewProfile', {
        angelID: angelId,
      });
    }
  };

  renderListOfAngels = () => {
    const { availableAngels, selectedAngels } = this.props;

    if (availableAngels.length > 0) {
      return availableAngels.map(angel => (
        <AngelsListItem
          onClick={this.onAngelClick(angel.angel_id)}
          key={angel.angel_id}
        >
          <AngelImage
            id={angel.angel_id}
            liked={angel.is_liked}
            image={angel.image}
            fixed={angel.fixed}
            standBy={angel.standBy}
          />
          {angel.video && (
            <VideoPlayButton onClick={this.onVideoPlay(angel.video)} />
          )}
          {angel.available ? (
            <AngelFeatures
              name={angel.first_name}
              age={angel.birthdate}
              rating={angel.average_rating}
              avgResponse={angel.response_time}
              distance={angel.distance}
              dailyPrice={angel.normal_rate}
              nightlyPrice={angel.extra_rate}
              connections={angel.connections}
              baby={angel.min_age_children < 24}
            />
          ) : (
            <AngelUnavailable
              name={angel.first_name}
              age={angel.birthdate}
              navigateToChat={e => {
                this.navigateToChat(angel.user_id, e);
              }}
              navigateToCalendar={e => {
                this.navigateToCalendar(angel.angel_id, e);
              }}
            />
          )}
          {angel.available ? (
            <AddBtn
              onClick={this.onAngelSelect(
                selectedAngels,
                angel,
                isAngelSelected(selectedAngels, angel.angel_id)
              )}
            >
              <Image
                src={
                  isAngelSelected(selectedAngels, angel.angel_id)
                    ? checkedIcon
                    : btnAddIcon
                }
              />
            </AddBtn>
          ) : null}
        </AngelsListItem>
      ));
    }
  };

  renderListOfMatched = () => {
    const { match, selectedAngels } = this.props;

    if (match.length > 0) {
      return this.state.match.items.map(angel => (
        <AngelsListItem
          onClick={this.onAngelClick(angel.angel_id)}
          key={angel.angel_id}
        >
          <AngelImage
            id={angel.angel_id}
            liked={angel.is_liked}
            image={angel.image}
            fixed={angel.fixed}
            standBy={angel.standBy}
          />
          {angel.video && (
            <VideoPlayButton onClick={this.onVideoPlay(angel.video)} />
          )}
          {angel.available ? (
            <AngelFeatures
              name={angel.first_name}
              age={angel.birthdate}
              rating={angel.average_rating}
              avgResponse={angel.response_time}
              distance={angel.distance}
              dailyPrice={angel.normal_rate}
              nightlyPrice={angel.extra_rate}
              connections={angel.connections}
              baby={angel.min_age_children < 24}
            />
          ) : (
            <AngelUnavailable
              name={angel.first_name}
              age={angel.birthdate}
              navigateToChat={e => {
                this.navigateToChat(angel.user_id, e);
              }}
              navigateToCalendar={e => {
                this.navigateToCalendar(angel.angel_id, e);
              }}
            />
          )}
          {angel.available ? (
            <AddBtn
              onClick={this.onAngelSelect(
                selectedAngels,
                angel,
                isAngelSelected(selectedAngels, angel.angel_id)
              )}
            >
              <Image
                src={
                  isAngelSelected(selectedAngels, angel.angel_id)
                    ? checkedIcon
                    : btnAddIcon
                }
              />
            </AddBtn>
          ) : null}
        </AngelsListItem>
      ));
    }
  };

  renderListOfNotMatched = () => {
    const { notMatch, selectedAngels } = this.props;

    if (notMatch.length > 0) {
      return this.state.notMatch.items.map(angel => (
        <AngelsListItem
          onClick={this.onAngelClick(angel.angel_id)}
          key={angel.angel_id}
        >
          <AngelImage
            id={angel.angel_id}
            liked={angel.is_liked}
            image={angel.image}
            available={angel.available}
            standBy={angel.standBy}
          />
          {angel.video && (
            <VideoPlayButton onClick={this.onVideoPlay(angel.video)} />
          )}
          <AngelFeatures
            name={angel.first_name}
            age={angel.birthdate}
            rating={angel.average_rating}
            avgResponse={angel.response_time}
            distance={angel.distance}
            dailyPrice={angel.normal_rate}
            nightlyPrice={angel.extra_rate}
            connections={angel.connections}
            baby={angel.min_age_children < 24}
          />
          {angel.available ? (
            <AddBtn
              onClick={this.onAngelSelect(
                selectedAngels,
                angel,
                isAngelSelected(selectedAngels, angel.angel_id)
              )}
            >
              <Image
                src={
                  isAngelSelected(selectedAngels, angel.angel_id)
                    ? checkedIcon
                    : btnAddIcon
                }
              />
            </AddBtn>
          ) : null}
        </AngelsListItem>
      ));
    }
  };

  fetchMoreAngels = list => page => {
    if (this.state[list].items.length + 5 >= this.props[list].length) {
      this.setState(prevState => {
        return {
          ...prevState,
          [list]: {
            ...prevState[list],
            hasMore: false,
            start: prevState[list].end,
            end:
              prevState[list].end +
              (this.props[list].length - prevState[list].end),
          },
        };
      });
      this.setState(prevState => ({
        ...prevState,
        [list]: {
          ...prevState[list],
          items: prevState[list].items.concat(
            this.props[list].slice(this.state[list].start, this.state[list].end)
          ),
        },
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        [list]: {
          ...prevState[list],
          start: prevState[list].end,
          end: prevState[list].end + 5,
        },
      }));
      this.setState(prevState => ({
        ...prevState,
        [list]: {
          ...prevState[list],
          items: prevState[list].items.concat(
            this.props[list].slice(this.state[list].start, this.state[list].end)
          ),
        },
      }));
    }
  };

  onSend = () => {
    const { history } = this.props;
    history.push('/booking/send');
  };

  onAngelConfirm = () => {
    const { selectedAngels } = this.props;
    const { locationState } = this.state;

    const addAngels = locationState && locationState.bookingId;
    if (selectedAngels.length === 1 && !addAngels) {
      this.setState({ open: true });
    } else {
      this.onAddAngels();
    }
  };

  toggle = () => {
    this.setState({ open: false });
  };

  onContinuePress = () => {
    this.setState({ open: false }, () => this.onAddAngels());
  };

  onAddAngels = () => {
    const { locationState } = this.state;
    const {
      onAddAngelsToBooking,
      history,
      selectedAngels,
      onClearSelectedAngels,
    } = this.props;

    if (locationState && locationState.bookingId) {
      const payload = {
        booking_id: locationState.bookingId,
        dates: locationState.bookingDates,
        angel_ids: selectedAngels.map(angel => {
          return angel.id;
        }),
      };
      onClearSelectedAngels();
      onAddAngelsToBooking(history, locationState.bookingId, payload);
    } else {
      this.onSend();
    }
  };

  onMoreInfo = id => () => {
    const { history } = this.props;
    history.push(`/booking/angel/${id}`);
  };

  navigateToChat = (userId, e) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push('/booking/search/chat/' + userId);
  };

  navigateToCalendar = (angelId, e) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push('/booking/search/availability/' + angelId);
  };

  onAngelSelect = (selectedAngels, angel, isSelected) => e => {
    e.stopPropagation();
    const { location, availableAngels, onAngelSelect } = this.props;

    if (location.state && location.state.maxAngels) {
      if (selectedAngels.length < location.state.maxAngels || isSelected) {
        const position = availableAngels.reduce((acc, curr, index) => {
          if (curr.user_id === angel.user_id) {
            acc = index;
          }

          return acc;
        }, -1);

        const data = angel.profile ? angel.profile : angel;

        onAngelSelect(selectedAngels, data, position);
      }
    } else {
      if (selectedAngels.length < 5 || isSelected) {
        const position = availableAngels.reduce((acc, curr, index) => {
          if (curr.user_id === angel.user_id) {
            acc = index;
          }

          return acc;
        }, -1);

        const data = angel.profile ? angel.profile : angel;

        onAngelSelect(selectedAngels, data, position);
      }
    }
  };

  onNavBack = () => {
    const { history, onClearSelectedAngels, onClearDays } = this.props;
    history.goBack();
    onClearSelectedAngels();
    onClearDays();
  };

  toggleFilters = () => {
    this.setState(state => {
      return {
        ...state,
        showFilters: !state.showFilters,
      };
    });
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

  onVideoPlay = src => e => {
    e.stopPropagation();
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

  render() {
    const { isPlayingVideo, showFilters, open } = this.state;
    const {
      numberOfActiveFilters,
      errors,
      onErrorConfirm,
      history,
      isLoading,
      availableAngels,
      location,
      match,
      notMatch,
      selectedAngels,
    } = this.props;

    return (
      <React.Fragment>
        <Video
          onEnded={this.onVideoEnd}
          active={isPlayingVideo}
          innerRef={this.video}
          onPause={this.onVideoEnd}
        />
        <Modal open={showFilters} size="mini">
          <Filters toggleFilters={this.toggleFilters} />
        </Modal>
        <Navigation
          isWhite
          withBorder
          title={<FormattedMessage id="booking.search.navTitle" />}
          onBack={this.onNavBack}
          rightComp={() => (
            <FilterContainer onClick={this.toggleFilters}>
              <FilterCounter>{numberOfActiveFilters}</FilterCounter>
              <div>
                <FormattedMessage id="booking.search.filter" />
              </div>
              <div>
                <Image avatar src={filterIcon} />
              </div>
            </FilterContainer>
          )}
        />
        <Alert
          toggle={this.toggle}
          open={open}
          desc={<FormattedMessage id="booking.search.alertOneSelectedAngel" />}
          onPress={this.onContinuePress}
        />
        <DesktopError
          errors={errors}
          onErrorConfirm={onErrorConfirm(history)}
        />
        {isLoading &&
          !availableAngels.length &&
          location.pathname === '/booking/search' && (
            <Grid container>
              <Grid.Row>
                <CustomColumn padding="2rem 0 0 0">
                  <ProgressiveFacebook
                    isLoading={isLoading}
                    width={310}
                    height={150}
                  />
                </CustomColumn>
              </Grid.Row>
            </Grid>
          )}
        {!availableAngels.length && (
          <Grid.Row>
            <CustomColumn verticalAlign="middle">
              <NoAngelsInfo />
            </CustomColumn>
          </Grid.Row>
        )}
        {availableAngels.length > 0 && numberOfActiveFilters === 0 && (
          <ListWrapper>
            <InfiniteScroll
              useWindow={false}
              element="div"
              style={{ width: '100%' }}
              pageStart={0}
              loadMore={this.fetchMoreAngels('availableAngels')}
              hasMore={this.state.availableAngels.hasMore}
            >
              {this.renderListOfAngels()}
            </InfiniteScroll>
          </ListWrapper>
        )}
        {match.length > 0 && numberOfActiveFilters > 0 && (
          <div style={{ overflowY: 'auto' }} ref={this.scrollerParentMatched}>
            <Divider margin="0" padding="0">
              <FormattedMessage id="booking.search.matched" />
            </Divider>
            <InfiniteScroll
              useWindow={false}
              pageStart={0}
              loadMore={this.fetchMoreAngels('match')}
              hasMore={this.state.match.hasMore}
            >
              {this.renderListOfMatched()}
            </InfiniteScroll>
          </div>
        )}
        {notMatch.length > 0 && numberOfActiveFilters > 0 && (
          <Segment basic vertical>
            <div style={{ overflowY: 'auto' }}>
              <Divider margin="0" padding="0">
                <FormattedMessage id="booking.search.notMatched" />
              </Divider>
              <InfiniteScroll
                useWindow={false}
                pageStart={0}
                loadMore={this.fetchMoreAngels('notMatch')}
                hasMore={this.state.notMatch.hasMore}
              >
                {this.renderListOfNotMatched()}
              </InfiniteScroll>
            </div>
          </Segment>
        )}
        {!errors && (
          <Confirmation style={{ zIndex: 999 }}>
            <SelectedAngels selectedAngels={selectedAngels} />
            <BasicButton
              onClick={this.onAngelConfirm}
              fluid
              primary
              disabled={selectedAngels.length === 0}
            >
              <FormattedMessage id="booking.search.btn" />
            </BasicButton>
          </Confirmation>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  availableAngels: getAvailableAngels(state),
  selectedAngels: getSelectedAngels(state),
  match: getMatched(state),
  notMatch: getNotMatched(state),
  numberOfActiveFilters: getNumberOfActiveFilters(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  onClearDays: () => dispatch(onClearDays()),
  onClearAngels: () => dispatch(onClearAngels()),
  onAngelSelect: (selectedAngels, angel, position) =>
    dispatch(onAngelSelect(selectedAngels, angel, position)),
  onErrorConfirm: history => () => {
    history.goBack();
    dispatch(onErrorConfirm());
  },
  onClearSelectedAngels: () => dispatch(clearSelectedAngels()),
  onGetAngelsForBooking: bookingId =>
    dispatch(onGetAngelsForBooking(bookingId)),
  onSetSelectedAngels: angels => dispatch(onSetSelectedAngels(angels)),
  onAddAngelsToBooking: (history, bookingId, payload) =>
    dispatch(onAddAngelsToBooking(history, bookingId, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingSearch);

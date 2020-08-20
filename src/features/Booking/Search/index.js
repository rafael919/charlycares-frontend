import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Image, Modal } from 'semantic-ui-react';
import { isAndroid, isMobile } from 'react-device-detect';

import {
  getSelectedAngels,
  getNotMatched,
  getMatched,
  getNumberOfActiveFilters,
  getLikedAngels,
  getAvailableAngels,
} from '../data/selectors';
import {
  onAngelSelect,
  clearSelectedAngels,
  onGetAngelsForBooking,
  onSetSelectedAngels,
  onAddAngelsToBooking,
} from '../data/actions';
import { isAngelSelected } from 'Utils';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onClearDays } from '../Create/actions';
import { onErrorConfirm } from '../../../ui/actions';
import InfiniteScroll from 'react-infinite-scroller';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Alert from 'Components/Alert';
import Layout from 'Components/Layout';
import anime from 'animejs';
import { ProgressiveAngels } from 'Components/Progressive';

import btnAddIcon from 'Assets/icons/btn-check-off.svg';
import checkedIcon from 'Assets/icons/btn-check-on.svg';
import filterIcon from 'Assets/icons/btn-filter.svg';

import AddBtn from './components/AddBtn';
import AngelFeatures from './components/AngelFeatures';
import AngelUnavailable from './components/AngelUnavailable';
import AngelImage from './components/AngelImage';
import AngelsListItem from './components/AngelsListItem';
import FilterContainer from './components/FilterContainer';
import FilterCounter from './components/FilterCounter';
import SelectedAngels from './components/SelectedAngels';
import VideoPlayButton from './components/VideoPlayButton';
import NoAngelsInfo from './components/NoAngelsInfo';
import Video from './components/Video';

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
    open: false,
  };

  state = this.initialState;

  componentDidMount() {
    const { location, history, onGetAngelsForBooking } = this.props;

    if (location.state && location.state.from === 'bookingDetails') {
      this.setState(this.initialState);
      onGetAngelsForBooking(location.state.bookingId);
    }

    document.addEventListener('fullscreenchange', this.stopOnExitFullScreen);
    document.addEventListener(
      'webkitfullscreenchange',
      this.stopOnExitFullScreen
    );
    document.addEventListener('mozfullscreenchange', this.stopOnExitFullScreen);
    document.addEventListener('MSFullscreenChange', this.stopOnExitFullScreen);
    if (
      history.location &&
      history.location.state &&
      history.location.state.from === 'angel'
    ) {
      this.scrollToAngel();
    }
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

  isAngelLiked = id => {
    const { likedAngels } = this.props;

    if (likedAngels) {
      if (likedAngels.includes(id)) {
        return true;
      }
      return false;
    }
  };

  onAngelClick = angelId => () => {
    const { history } = this.props;

    if (isMobile) {
      if (history.location.state) {
        const { from, ...rest } = history.location.state;
        history.push(`angel/${angelId}`, {
          from: 'search',
          ...rest,
        });
      } else {
        history.push(`angel/${angelId}`, {
          from: 'search',
        });
      }
    } else {
      history.push(`/booking/search/angel/${angelId}`);
    }

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FViewProfile', {
        angelID: angelId,
      });
    }
  };

  scrollToAngel = () => {
    const { history } = this.props;

    if (
      history.location &&
      history.location.state &&
      history.location.state.from === 'angel'
    ) {
      const id = history.location.state.lastAngel;

      this.interval = setInterval(() => {
        const topPosition = document.querySelector(`li[data-id="${id}"]`);
        if (topPosition) {
          anime({
            targets: '#grid',
            duration: 350,
            easing: 'easeInOutCubic',
            scrollTop: [topPosition.getBoundingClientRect().y - 63],
          });
        }
        clearInterval(this.interval);
      }, 200);
    }
  };

  renderListOfAngels = () => {
    const { history, selectedAngels, availableAngels } = this.props;

    if (availableAngels.length > 0) {
      return availableAngels.map((angel, i) => (
        <li key={angel.angel_id} data-id={`${angel.angel_id}`}>
          <AngelsListItem
            onClick={this.onAngelClick(angel.angel_id)}
            key={angel.angel_id}
          >
            <AngelImage
              id={angel.angel_id}
              liked={this.isAngelLiked(angel.id)}
              image={angel.image}
              history={history}
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
            {angel.available && (
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
            )}
          </AngelsListItem>
          {availableAngels &&
            availableAngels.length &&
            availableAngels.length - 1 !== i && <Divider minheight="0.5rem" />}
        </li>
      ));
    }
  };

  renderListOfMatched = () => {
    const { match } = this.state;
    const { history, selectedAngels } = this.props;

    if (this.props.match.length > 0) {
      return match.items.map((angel, i) => (
        <li key={angel.angel_id} data-id={`${angel.angel_id}`}>
          <AngelsListItem
            onClick={this.onAngelClick(angel.angel_id)}
            key={angel.angel_id}
          >
            <AngelImage
              id={angel.angel_id}
              liked={this.isAngelLiked(angel.id)}
              image={angel.image}
              history={history}
              fixed={angel.fixed}
              standBy={angel.standBy}
            />
            {angel.video && (
              <VideoPlayButton onClick={this.onVideoPlay(angel.video)} />
            )}
            <AngelFeatures
              angelId={angel.angel_id}
              name={angel.first_name}
              age={angel.birthdate}
              rating={angel.average_rating}
              avgResponse={angel.response_time}
              distance={angel.distance}
              dailyPrice={angel.normal_rate}
              nightlyPrice={angel.extra_rate}
              connections={angel.connections}
              baby={angel.min_age_children < 24}
              history={history}
            />
            {angel.available && (
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
            )}
          </AngelsListItem>
          {match.items &&
            match.items.length &&
            match.items.length - 1 !== i && <Divider minheight="0.5rem" />}
        </li>
      ));
    }
  };

  renderListOfNotMatched = () => {
    const { notMatch } = this.state;
    const { history, selectedAngels } = this.props;

    if (this.props.notMatch.length > 0) {
      return notMatch.items.map((angel, i) => (
        <li key={angel.angel_id} data-id={`${angel.angel_id}`}>
          <AngelsListItem
            onClick={this.onAngelClick(angel.angel_id)}
            key={angel.angel_id}
          >
            <AngelImage
              id={angel.angel_id}
              liked={this.isAngelLiked(angel.id)}
              image={angel.image}
              history={history}
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
            {angel.available && (
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
            )}
          </AngelsListItem>
          {notMatch.items &&
            notMatch.items.length &&
            notMatch.items.length - 1 !== i && <Divider minheight="0.5rem" />}
        </li>
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

  navigateToChat = (userId, e) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push('/chat/' + userId);
  };

  navigateToCalendar = (angelId, e) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push('/calendar/availability/' + angelId, {
      from: '/booking/angel/',
    });
  };

  onAngelConfirm = () => {
    const { selectedAngels } = this.props;
    const { locationState } = this.props;
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
    const {
      location,
      onAddAngelsToBooking,
      history,
      selectedAngels,
      onClearSelectedAngels,
    } = this.props;

    if (location.state && location.state.bookingId) {
      const payload = {
        booking_id: location.state.bookingId,
        angel_ids: selectedAngels.map(angel => {
          return angel.id;
        }),
      };
      onClearSelectedAngels();
      onAddAngelsToBooking(history, location.state.bookingId, payload);
    } else {
      this.onSend();
    }
  };

  onMoreInfo = id => () => {
    const { history } = this.props;
    history.push(`/booking/angel/${id}`);
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
        onAngelSelect(selectedAngels, angel, position);
      }
    } else {
      if (selectedAngels.length < 5 || isSelected) {
        const position = availableAngels.reduce((acc, curr, index) => {
          if (curr.user_id === angel.user_id) {
            acc = index;
          }

          return acc;
        }, -1);
        onAngelSelect(selectedAngels, angel, position);
      }
    }
  };

  onNavBack = () => {
    const { location, history, onClearSelectedAngels } = this.props;

    if (
      location.state &&
      location.state.from &&
      location.state.from === 'bookingDetails'
    ) {
      history.goBack();
    } else {
      history.push('/booking/create');
    }
    onClearSelectedAngels();
    // this.props.onClearDays();
  };

  addFullScreenListener = () => {
    const video = document.querySelector('#video');
    if (video && video.webkitRequestFullscreen) {
      video.addEventListener('webkitfullscreenchange', this.onFullScreenChange);
    }
    if (video && video.mozRequestFullScreen) {
      video.addEventListener('onmozfullscreenchange', this.onFullScreenChange);
    }
  };

  onFullScreenChange = () => {
    const video = document.querySelector('#video');
    if (
      video &&
      video.webkitExitFullscreen &&
      !document.webkitFullscreenElement
    ) {
      video.pause();
      video.webkitExitFullscreen();
      this.setState({
        isPlayingVideo: false,
      });
    }
  };

  onVideoPlay = src => e => {
    e.stopPropagation();
    this.setState(
      {
        isPlayingVideo: true,
      },
      () => {
        let interval = setInterval(() => {
          const video = document.querySelector('#video');
          if (video && video.webkitRequestFullscreen) {
            this.addFullScreenListener();
            video.src = src;
            video.webkitRequestFullscreen();
            video.play();
            clearInterval(interval);
          } else if (video && video.mozRequestFullScreen) {
            this.addFullScreenListener();
            video.src = src;
            video.mozRequestFullScreen();
            video.play();
            clearInterval(interval);
          } else {
            if (video) {
              video.src = src;
              video.play();
              clearInterval(interval);
            }
          }
        }, 200);
      }
    );
  };

  onVideoEnd = () => {
    const video = document.querySelector('#video');
    this.setState(
      {
        isPlayingVideo: false,
      },
      () => {
        if (video) {
          video.removeAttribute('src');
          video.load();
        }
      }
    );
    if (video && video.webkitRequestFullscreen) {
      video.webkitExitFullscreen();
    }
    if (video && video.mozRequestFullScreen) {
      video.mozCancelFullScreen();
    }
  };

  stopOnExitFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      const video = document.querySelector('#video');
      if (video) {
        video.pause();
      }
    }
  };

  render() {
    const { isPlayingVideo, open } = this.state;
    const {
      numberOfActiveFilters,
      errors,
      onErrorConfirm,
      history,
      isLoading,
      selectedAngels,
      availableAngels,
      match,
      notMatch,
      location,
    } = this.props;

    return (
      <React.Fragment>
        <Layout
          navTitle={<FormattedMessage id="booking.search.navTitle" />}
          navBorder
          onNavBack={this.onNavBack}
          navRightComponent={() => (
            <CustomLink fontSize="1rem" primary to="/booking/filters">
              <FilterContainer>
                <FilterCounter>{numberOfActiveFilters}</FilterCounter>
                <div>
                  <FormattedMessage id="booking.search.filter" />
                </div>
                <div>
                  <Image avatar src={filterIcon} />
                </div>
              </FilterContainer>
            </CustomLink>
          )}
        >
          <Alert
            toggle={this.toggle}
            open={open}
            desc={<FormattedMessage id="booking.search.alertOneSelectedAngel" />}
            onPress={this.onContinuePress}
          />
          <Error errors={errors} onErrorConfirm={onErrorConfirm(history)} />
          {isAndroid ? (
            <Modal
              open={isPlayingVideo}
              onClose={this.onVideoEnd}
              onMount={this.onVideoPlay}
            >
              <Modal.Content>
                <Video
                  id="video"
                  playsinline
                  controls
                  onEnded={this.onVideoEnd}
                  active={isPlayingVideo}
                  innerRef={this.video}
                  onPause={this.onVideoEnd}
                />
              </Modal.Content>
            </Modal>
          ) : (
            <Video
              id="video"
              playsinline
              controls
              onEnded={this.onVideoEnd}
              active={isPlayingVideo}
              innerRef={this.video}
              onPause={this.onVideoEnd}
            />
          )}
          {isLoading && selectedAngels.length ? <Loader /> : null}
          {!isLoading && !availableAngels.length && (
            <CustomRow>
              <CustomColumn verticalAlign="middle">
                <NoAngelsInfo />
              </CustomColumn>
            </CustomRow>
          )}
          {isLoading && !selectedAngels.length && (
            <CustomRow padding={isLoading ? '0' : '1.5rem 0 0 0'}>
              <CustomColumn noPadding>
                <Grid container>
                  <Grid.Row>
                    <CustomColumn padding="0">
                      <ProgressiveAngels
                        isLoading={isLoading}
                        width={310}
                        height={150}
                      />
                    </CustomColumn>
                  </Grid.Row>
                </Grid>
              </CustomColumn>
            </CustomRow>
          )}
          {!isLoading &&
            availableAngels.length > 0 &&
            numberOfActiveFilters === 0 && (
              <InfiniteScroll
                element="ul"
                useWindow={false}
                style={{
                  width: '100%',
                  padding: '0.8rem 0 6.9rem 0',
                  margin: 0,
                  listStyle: 'none',
                }}
                pageStart={0}
                loadMore={this.fetchMoreAngels('availableAngels')}
                hasMore={this.state.availableAngels.hasMore}
                threshold={300}
              >
                {this.renderListOfAngels()}
              </InfiniteScroll>
            )}
          {!isLoading && match.length > 0 && numberOfActiveFilters > 0 && (
            <React.Fragment>
              <div style={{ width: '100%', padding: '0.8rem 0 0 0' }}>
                <Divider>
                  <FormattedMessage id="booking.search.matched" />
                </Divider>
              </div>
              <InfiniteScroll
                element="ul"
                useWindow={false}
                style={{
                  width: '100%',
                  padding: 0,
                  margin: 0,
                  listStyle: 'none',
                }}
                pageStart={0}
                loadMore={this.fetchMoreAngels('match')}
                hasMore={this.state.match.hasMore}
                threshold={300}
              >
                {this.renderListOfMatched()}
              </InfiniteScroll>
            </React.Fragment>
          )}
          {!isLoading && notMatch.length > 0 && numberOfActiveFilters > 0 && (
            <React.Fragment>
              <div style={{ width: '100%', padding: '0.8rem 0 0 0' }}>
                <Divider>
                  <FormattedMessage id="booking.search.notMatched" />
                </Divider>
              </div>
              <InfiniteScroll
                element="ul"
                useWindow={false}
                style={{
                  width: '100%',
                  padding: '0 0 6.9rem 0',
                  margin: 0,
                  listStyle: 'none',
                }}
                pageStart={0}
                loadMore={this.fetchMoreAngels('notMatch')}
                hasMore={this.state.notMatch.hasMore}
                threshold={300}
              >
                {this.renderListOfNotMatched()}
              </InfiniteScroll>
            </React.Fragment>
          )}
        </Layout>
        <Confirmation sticky innerRef={this.confirmationRef}>
          <SelectedAngels
            maxAngels={
              location.state && location.state.maxAngels
                ? location.state.maxAngels
                : null
            }
            selectedAngels={selectedAngels}
          />
          <BasicButton
            onClick={this.onAngelConfirm}
            fluid
            primary
            disabled={selectedAngels.length === 0}
          >
            <FormattedMessage id="booking.search.btn" />
          </BasicButton>
        </Confirmation>
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
  likedAngels: getLikedAngels(state),
});

const mapDispatchToProps = dispatch => ({
  onClearDays: () => dispatch(onClearDays()),
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

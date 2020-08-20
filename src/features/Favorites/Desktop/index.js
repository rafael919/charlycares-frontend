import { connect } from 'react-redux';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';
import { Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import anime from 'animejs';
import React, { Component, Fragment } from 'react';

import Explanation from 'Components/Explanation/Custom/Favorites';

import { getFavorites, getActiveBabysitting, getUserId } from '../selectors';
import {
  getLoadingStatus,
  getErrors,
  getIndicators,
  getUserStatus,
} from '../../../ui/selectors';
import { onGetFavoritesAndActiveBabysitting } from '../actions';
import { onGetIndicatorsSuccess } from '../../../ui/actions';
import { clearBook } from '../../Chat/actions';
import Angel from '../../Angel/Desktop';
import AngelsList from '../components/AngelsList';
import Chat from '../../Chat/Desktop';
import Calendar from '../../Calendar/Availability/Desktop';
import Repeat from '../../Booking/Create/Repeat/Desktop';
import Booking from '../../Booking/Create/Desktop';
import Filter from '../components/FilterButton';
import EmptyList from 'Components/EmptyList';
import PhoneModal from 'Components/PhoneModal';
import API from '../api';
import socket from '../../../socket';
import SearchBar from '../../AngelFamilies/Families/components/SearchBar';

class Favorites extends Component {
  state = {
    filterType: 0,
    sorted: [],
    isDeletingId: null,
    isEditing: false,
    searchValue: '',
  };

  componentDidMount() {
    this.props.onGetFavoritesAndActiveBabysitting();
    this.socketCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    const { filterType } = this.state;
    if (
      this.props.favorites.length > 0 &&
      (this.props.favorites !== prevProps.favorites ||
        this.props.userStatus !== prevProps.userStatus)
    ) {
      const array =
        this.state.sorted.length > 0 ? this.state.sorted : this.props.favorites;
      const sorted = [...array].map(family => ({
        ...family,
        typing: false,
        readIcon:
          !family.unread_message_count || family.unread_message_count === 0
            ? 2
            : 1,
        status: this.props.userStatus.find(
          user => user.user_id === family.user_id
        )
          ? this.props.userStatus.find(user => user.user_id === family.user_id)
              .status
          : family.status,
      }));
      this.setState({ sorted }, () =>
        filterType === 0
          ? this.filterByLastMessage(sorted)
          : filterType === 1
          ? this.filterByLastBooking()
          : this.filterAlphabetical()
      );
    }
    if (socket.disconnected) {
      socket.connect();
    }
  }

  socketCheck = () => {
    if (socket.disconnected) {
      socket.connect();
    } else {
      socket.on('CHAT_SEND', (message, id, booking) => {
        this.updateMessages(message, id, booking);
      });
      socket.on('CHAT_TYPING', (user_id, id) => {
        this.typingState(user_id, id, true);
      });
      socket.on('CHAT_TYPING_CANCEL', (user_id, id) => {
        this.typingState(user_id, id, false);
      });
    }
  };

  updateMessages = (message, id, booking) => {
    const { location, userId } = this.props;
    if (this.state.sorted.length > 0 && booking) {
      let sorted = [...this.state.sorted].map(family => ({
        ...family,
        last_message:
          (family.user_id === message.user.id &&
            family.conversation_id === id) ||
          (family.conversation_id === id && userId === message.user.id)
            ? message
            : family.last_message
            ? family.last_message
            : null,
        unread_message_count:
          family.user_id === message.user.id && family.conversation_id === id
            ? location.pathname.includes(`/chat/${family.user_id}`)
              ? 0
              : family.unread_message_count
              ? family.unread_message_count + 1
              : 0
            : family.unread_message_count
            ? family.unread_message_count
            : 0,
        readIcon:
          family.user_id === message.user.id && family.conversation_id === id
            ? location.pathname.includes(`/chat/${family.user_id}`)
              ? 2
              : 1
            : family.readIcon,
      }));
      this.setState({ sorted });

      // setTimeout(() => {
      //   sorted = [...sorted].map(family => ({
      //     ...family,
      //     readIcon: family.readIcon === 0 ? 1 : family.readIcon,
      //   }));
      //   this.setState({ sorted });
      // }, 1000);

      const propsFavorites = sorted.map(family => ({
        ...family,
        last_message: family.last_message
          ? {
              ...family.last_message,
              createdAt:
                (family.user_id === message.user.id &&
                  family.conversation_id === id) ||
                (family.conversation_id === id && userId === message.user.id)
                  ? message.createdAt
                  : family.last_message
                  ? family.last_message.createdAt
                  : null,
            }
          : null,
      }));
      this.filterByLastMessage(propsFavorites);
    }
  };

  typingState = (user_id, id, typing) => {
    if (this.state.sorted.length > 0) {
      const sorted = [...this.state.sorted].map(family => ({
        ...family,
        typing:
          family.user_id === user_id && family.conversation_id === id
            ? typing
            : false,
      }));
      this.setState({ sorted });
    }
  };

  goToChatPress = select_family => {
    const { indicators, onGetIndicatorsSuccess } = this.props;
    if (select_family && this.state.sorted.length > 0) {
      const sorted = [...this.state.sorted].map(family => ({
        ...family,
        unread_message_count:
          !select_family.last_message ||
          family.user_id === select_family.last_message.user.id
            ? 0
            : family.unread_message_count
            ? family.unread_message_count
            : 0,
        readIcon:
          !select_family.last_message ||
          family.user_id === select_family.last_message.user.id
            ? 2
            : family.readIcon,
      }));
      this.setState({ sorted });

      const data = {
        new_messages:
          indicators.newMessages - select_family.unread_message_count,
        has_pending_bookings: indicators.pendingBookings,
        active_timer: indicators.activeTimer,
        has_pending_jobs: indicators.pendingJobs,
      };
      onGetIndicatorsSuccess(data);
    }

    this.props.clearBook();
  };

  onFilterChange = e => {
    switch (Number(e.target.value)) {
      case 0:
        this.filterByLastMessage(this.state.sorted);
        break;
      case 1:
        this.filterByLastBooking();
        break;
      case 2:
        this.filterAlphabetical();
        break;
      case 3:
        this.filterByResponseTime();
        break;
      case 4:
        this.filterByPrice('asc');
        break;
      case 5:
        this.filterByPrice('desc');
        break;

      default:
        break;
    }
  };

  filterByLastMessage = propsFavorites => {
    const sorted = propsFavorites.sort((current, next) => {
      if (!next.last_message) return -1;
      else if (!current.last_message) return 1;
      else {
        if (
          moment(next.last_message.createdAt) >
          moment(current.last_message.createdAt)
        )
          return 1;
        else return -1;
      }
    });
    this.setState({
      sorted,
      filterType: 0,
    });
  };

  filterByLastBooking = () => {
    const sorted = [...this.state.sorted].sort((current, next) => {
      if (!next.last_booking) {
        return -1;
      } else if (!current.last_booking) {
        return 1;
      } else {
        if (
          moment(next.last_booking.date) > moment(current.last_booking.date)
        ) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    this.setState({
      sorted,
      filterType: 1,
    });
  };

  filterAlphabetical = () => {
    const sorted = [...this.state.sorted].sort((current, next) => {
      const currentName = current.first_name.toUpperCase();
      const nextName = next.first_name.toUpperCase();
      if (currentName > nextName) {
        return 1;
      }
      if (nextName > currentName) {
        return -1;
      }

      return 0;
    });
    this.setState({
      sorted,
      filterType: 2,
    });
  };
  filterByResponseTime = () => {
    const sorted = [...this.props.favorites].sort((current, next) => {
      if (current.response_time > next.response_time) {
        return 1;
      }
      if (next.response_time > current.response_time) {
        return -1;
      }

      return 0;
    });
    this.setState({
      sorted,
      filterType: 3,
    });
  };
  filterByPrice = type => {
    const sortFunc = (current, next) => {
      const currentAngelRate = Number(current.normal_rate);
      const nextAngelRate = Number(next.normal_rate);
      if (type === 'asc') {
        if (currentAngelRate > nextAngelRate) {
          return 1;
        }
        if (nextAngelRate > currentAngelRate) {
          return -1;
        }
        return 0;
      } else {
        if (currentAngelRate > nextAngelRate) {
          return -1;
        }
        if (nextAngelRate > currentAngelRate) {
          return 1;
        }
        return 0;
      }
    };
    const sorted = [...this.props.favorites].sort(sortFunc);
    this.setState({
      sorted,
      filterType: 4,
    });
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  onAnimationPlay = () => {
    this.setState(
      state => {
        return {
          isEditing: !state.isEditing,
        };
      },
      () => {
        if (this.state.isEditing) {
          this.animation = anime({
            targets: '.angel',
            translateX: -70,
          });
        } else {
          this.animation = anime({
            targets: '.angel',
            translateX: 0,
          });
        }
      }
    );
  };

  onDelete = id => () => {
    this.setState({
      isDeletingId: id,
    });
  };

  onDeleteConfirmation = () => {
    API.removeFavoriteAngel({ angel_id: this.state.isDeletingId })
      .then(res => {
        anime({
          targets: `[data-id="${this.state.isDeletingId}"]`,
          height: 0,
          opacity: 0,
          padding: 0,
          easing: 'linear',
          duration: 300,
          complete: anim => {
            this.setState(state => {
              return {
                ...state,
                sorted: state.sorted.filter(
                  angel => angel.id !== state.isDeletingId
                ),
                isDeletingId: null,
              };
            });
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSearchChange = e => {
    const searchValue = e.target.value;
    const sorted = [...this.props.favorites].filter(
      family =>
        family.first_name.toLowerCase().includes(searchValue) ||
        family.first_name.includes(searchValue)
    );

    this.setState({ searchValue, sorted });
  };

  render() {
    const {
      sorted,
      searchValue,
      showPhoneModal,
      filterType,
      isDeletingId,
    } = this.state;
    const { isLoading, location, history } = this.props;

    return (
      <DesktopAppLayout>
        <PhoneModal open={showPhoneModal} toggle={this.togglePhoneModal} />
        <DesktopAppLayout.LeftColumn withScroll>
          <Fragment>
            {isLoading &&
            location.pathname === '/favorites' &&
            !sorted.length ? (
              <Segment basic vertical>
                <TimerLoader isLoading={true} />
                <ProgressiveFacebook isLoading={true} />
              </Segment>
            ) : (
              <React.Fragment>
                <CustomRow padding="0.5rem 1rem;">
                  <SearchBar
                    onSearchChange={this.onSearchChange}
                    searchValue={searchValue}
                    angel={false}
                  />
                </CustomRow>
                <Filter
                  value={filterType}
                  onFilterChange={this.onFilterChange}
                />
                <AngelsList
                  history={history}
                  favorites={sorted}
                  togglePhoneModal={this.togglePhoneModal}
                  className="angel"
                  isDeletingId={isDeletingId}
                  onDelete={this.onDelete}
                  onDeleteConfirmation={this.onDeleteConfirmation}
                  goToChatPress={this.goToChatPress}
                />
              </React.Fragment>
            )}
            {!isLoading && sorted.length === 0 && (
              <EmptyList id="favorites.noFavorites" />
            )}
          </Fragment>
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn
          withScroll
          overflow={location.pathname.includes('/chat/')}
        >
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="desktop"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 600 }}
              key={location.key || location.pathname}
            >
              <Switch>
                <Route path="/favorites/angel/:id" component={Angel} />
                <Route path="/favorites/chat/:userId" component={Chat} />
                <Route
                  path="/favorites/availability/:id"
                  component={Calendar}
                />
                <Route path="/favorites/repeat/:bookId" component={Repeat} />
                <Route path="/favorites/booking/:id" component={Booking} />
                <Route component={Explanation} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  favorites: getFavorites(state),
  activeBabysitting: getActiveBabysitting(state),
  userId: getUserId(state),
  indicators: getIndicators(state),
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onGetFavoritesAndActiveBabysitting: () =>
    dispatch(onGetFavoritesAndActiveBabysitting()),
  clearBook: () => dispatch(clearBook()),
  onGetIndicatorsSuccess: data => dispatch(onGetIndicatorsSuccess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);

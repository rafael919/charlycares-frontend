import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { ProgressiveConversations } from 'Components/Progressive';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import EmptyList from 'Components/EmptyList';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { Component } from 'react';

import { getFavorites, getActiveBabysitting, getUserId } from './selectors';
import {
  getLoadingStatus,
  getErrors,
  getIndicators,
  getUserStatus,
} from '../../ui/selectors';
import {
  onGetFavoritesAndActiveBabysitting,
  onRemoveFavoriteAngel,
} from './actions';
import { onGetIndicatorsSuccess } from '../../ui/actions';
import { clearBook } from '../Chat/actions';
import ActiveBabysitting from './components/ActiveBabysitting';
import AngelsList from './components/AngelsList';
import Filter from './components/FilterButton';
import anime from 'animejs';
import API from './api';
import socket from '../../socket';
import SearchBar from '../AngelFamilies/Families/components/SearchBar';

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
      // console.log(this.props.favorites);
      const array =
        this.state.sorted.length > 0 ? this.state.sorted : this.props.favorites;
      let sorted = [...array].map(family => ({
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

      if (this.props.location.state && this.props.location.state.last_message) {
        sorted = [...sorted].map(family => ({
          ...family,
          last_message:
            family.user_id === this.props.location.state.userId
              ? this.props.location.state.last_message
              : family.last_message
              ? family.last_message
              : null,
          unread_message_count:
            family.user_id === this.props.location.state.userId
              ? 0
              : family.unread_message_count
              ? family.unread_message_count
              : 0,
        }));
      }

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
    const { location } = this.props;

    if (this.state.sorted.length > 0 && booking) {
      let sorted = [...this.state.sorted].map(family => ({
        ...family,
        last_message:
          family.user_id === message.user.id && family.conversation_id === id
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
                family.user_id === message.user.id &&
                family.conversation_id === id
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
      filterType: 0,
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
      filterType: 1,
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
      filterType: 1,
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
      filterType: 1,
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
      errors,
      onGetFavoritesAndActiveBabysitting,
      isLoading,
      activeBabysitting,
      history,
    } = this.props;
    const { filterType, sorted, isDeletingId, searchValue } = this.state;

    return (
      <Layout
        // navLeftComponent={() => (
        //   <EditButton onClick={this.onAnimationPlay}>
        //     {this.state.isEditing ? (
        //       <FormattedMessage id="navigation.rdy" />
        //     ) : (
        //       <FormattedMessage id="navigation.edit" />
        //     )}
        //   </EditButton>
        // )}
        navTitle={<FormattedMessage id="favorites.family.navTitle" />}
        navBorder
      >
        <Error errors={errors} onRetry={onGetFavoritesAndActiveBabysitting} />
        <ContentWrapper>
          <CustomRow noPadding>
            <Divider noBottomBorder>
              <SearchBar
                onSearchChange={this.onSearchChange}
                searchValue={searchValue}
                angel={false}
              />
            </Divider>
            <Divider right noTopBorder padding="0px">
              <Filter value={filterType} onFilterChange={this.onFilterChange} />
            </Divider>
            {isLoading ? (
              <CustomColumn>
                <ProgressiveConversations isLoading={true} />
              </CustomColumn>
            ) : (
              sorted.length > 0 && (
                <CustomColumn noPadding>
                  {activeBabysitting !== null && activeBabysitting.end_time ? (
                    <ActiveBabysitting
                      history={history}
                      activeBabysitting={activeBabysitting}
                      angelContact={sorted}
                      goToChatPress={this.goToChatPress}
                    />
                  ) : null}
                  <AngelsList
                    history={history}
                    favorites={sorted}
                    className="angel"
                    isDeletingId={isDeletingId}
                    onDelete={this.onDelete}
                    onDeleteConfirmation={this.onDeleteConfirmation}
                    goToChatPress={this.goToChatPress}
                  />
                </CustomColumn>
              )
            )}
            {!isLoading && sorted.length === 0 && (
              <EmptyList id="favorites.noFavorites" />
            )}
          </CustomRow>
          <EmptyCell padding="4rem 0" />
        </ContentWrapper>
        <FamilyTabBar />
      </Layout>
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
  onRemoveFavoriteAngel: id => dispatch(onRemoveFavoriteAngel(id)),
  clearBook: () => dispatch(clearBook()),
  onGetIndicatorsSuccess: data => dispatch(onGetIndicatorsSuccess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);

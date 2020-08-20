import { connect } from 'react-redux';
import { ProgressiveConversations } from 'Components/Progressive';
import DesktopError from 'Components/DesktopError';
import InfiniteScroll from 'react-infinite-scroller';
import React from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getFamilies } from '../../data/selectors';
import {
  getLoadingStatus,
  getErrors,
  getIndicators,
  getUserStatus,
} from '../../../../ui/selectors';
import { getUserId } from '../selectors';
import { onGetIndicatorsSuccess } from '../../../../ui/actions';
import { onGetFamilies } from '../../data/actions';
import { clearBook } from '../../../Chat/actions';
import FamilyList from '../components/FamilyList';
import ListItem from '../components/ListItem';
import SortButton from '../components/SortButton';
import moment from 'moment';
import CustomRow from 'Components/CustomRow';
import PhoneModal from 'Components/PhoneModal';
import socket from '../../../../socket';
import SearchBar from '../components/SearchBar';

class Families extends React.Component {
  loader = 0;

  state = {
    hasMore: false,
    totalNumOfPages: 0,
    jumpBy: 5,
    families: [],
    currentIndex: 0,
    filterType: 0,
    searchValue: '',
  };

  componentDidMount() {
    this.props.onGetFamilies();
    this.socketCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    const { filterType } = this.state;
    if (
      this.props.families.length > 0 &&
      (this.props.families !== prevProps.families ||
        this.props.userStatus !== prevProps.userStatus)
    ) {
      const array =
        this.state.families.length > 0
          ? this.state.families
          : this.props.families;
      const families = [...array].map(family => ({
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
      this.setState(
        {
          // totalNumOfPages: Math.ceil(this.props.families.length / 5),
          families,
        },
        () =>
          filterType === 0
            ? this.sortByLastMessage(families)
            : filterType === 1
            ? this.sortByLastBooking()
            : this.sortAlphabetical()
      );
    }
    if (socket.disconnected) {
      socket.connect();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loader++;
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
    if (this.state.families.length > 0 && booking) {
      let families = [...this.state.families].map(family => ({
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
      this.setState({ families });

      // setTimeout(() => {
      //   families = [...families].map(family => ({
      //     ...family,
      //     readIcon: family.readIcon === 0 ? 1 : family.readIcon,
      //   }));
      //   this.setState({ families });
      // }, 1000);

      const propsFamilies = families.map(family => ({
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
      this.sortByLastMessage(propsFamilies);
    }
  };

  typingState = (user_id, id, typing) => {
    if (this.state.families.length > 0) {
      const families = [...this.state.families].map(family => ({
        ...family,
        typing:
          family.user_id === user_id && family.conversation_id === id
            ? typing
            : false,
      }));
      this.setState({ families });
    }
  };

  goToChatPress = select_family => {
    const { indicators, onGetIndicatorsSuccess } = this.props;
    if (select_family && this.state.families.length > 0) {
      const families = [...this.state.families].map(family => ({
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
      this.setState({ families });

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

  onRetry = () => {
    this.props.onGetFamilies();
  };

  togglePhoneModal = () => {
    this.setState({
      showPhoneModal: !this.state.showPhoneModal,
    });
  };

  sortByLastMessage = propsFamilies => {
    const families = propsFamilies.sort((current, next) => {
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
      families,
      filterType: 0,
    });
  };

  sortByLastBooking = () => {
    const families = [...this.state.families].sort((current, next) => {
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
      families,
      filterType: 1,
    });
  };

  sortAlphabetical = () => {
    const families = [...this.state.families].sort((current, next) => {
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
      families,
      filterType: 2,
    });
  };

  onSortChange = e => {
    switch (Number(e.target.value)) {
      case 0:
        this.sortByLastMessage(this.state.families);
        break;
      case 1:
        this.sortByLastBooking();
        break;
      case 2:
        this.sortAlphabetical();
        break;
      default:
        break;
    }
  };

  loadMore = page => {
    if (!this.state.totalNumOfPages) return;
    if (page >= this.state.totalNumOfPages) {
      this.setState(prevState => {
        return {
          hasMore: false,
          families: [
            ...prevState.families,
            ...this.props.families.slice(
              this.state.currentIndex,
              this.props.families.length
            ),
          ],
          currentIndex: this.props.families.length - 1,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          families: [
            ...prevState.families,
            ...this.props.families.slice(
              prevState.currentIndex,
              prevState.currentIndex + this.state.jumpBy
            ),
          ],
          currentIndex: prevState.families.length + this.state.jumpBy,
        };
      });
    }
  };

  onSearchChange = e => {
    const searchValue = e.target.value;
    const families = [...this.props.families].filter(
      family =>
        `Fam. ${family.first_name} ${family.last_name}`
          .toLowerCase()
          .includes(searchValue) ||
        `Fam. ${family.first_name} ${family.last_name}`.includes(searchValue)
    );

    this.setState({ searchValue, families });
  };

  render() {
    const {
      searchValue,
      showPhoneModal,
      filterType,
      families,
      hasMore,
    } = this.state;
    const { history, isLoading, errors } = this.props;

    return (
      <React.Fragment>
        <PhoneModal open={showPhoneModal} toggle={this.togglePhoneModal} />
        <DesktopError errors={errors} onRetry={this.onRetry} />
        <CustomRow padding="0.5rem 1rem;">
          <SearchBar
            onSearchChange={this.onSearchChange}
            searchValue={searchValue}
            angel={true}
          />
        </CustomRow>
        <SortButton value={filterType} onSortChange={this.onSortChange} />
        {this.loader < 3 && isLoading ? (
          <ProgressiveConversations isLoading={isLoading} />
        ) : (
          <React.Fragment>
            {families.length > 0 ? (
              <FamilyList>
                <InfiniteScroll
                  pageStart={1}
                  loadMore={this.loadMore}
                  hasMore={hasMore}
                  loader={<ScrollerLoader key={9999} />}
                >
                  {families.map(fam => {
                    return (
                      <ListItem
                        key={fam.id}
                        family={fam}
                        togglePhoneModal={this.togglePhoneModal}
                        goToChatPress={this.goToChatPress}
                        history={history}
                      />
                    );
                  })}
                </InfiniteScroll>
              </FamilyList>
            ) : null}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  static defaultProps = {
    families: [],
    errors: null,
    isLoading: false,
  };
}

export default connect(
  state => ({
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
    families: getFamilies(state),
    userId: getUserId(state),
    indicators: getIndicators(state),
    userStatus: getUserStatus(state),
  }),
  {
    onGetFamilies,
    clearBook,
    onGetIndicatorsSuccess,
  }
)(Families);

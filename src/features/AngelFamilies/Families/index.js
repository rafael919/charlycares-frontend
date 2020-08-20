import { AngelTabBar } from 'Components/NavigationTabs';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ProgressiveConversations } from 'Components/Progressive';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Error from 'Components/Error';
import InfiniteScroll from 'react-infinite-scroller';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getFamilies } from '../data/selectors';
import {
  getLoadingStatus,
  getErrors,
  getIndicators,
  getUserStatus,
} from '../../../ui/selectors';
import { getUserId, getActiveSitting } from './selectors';
import { onGetIndicatorsSuccess } from '../../../ui/actions';
import { onGetFamilies } from '../data/actions';
import { clearBook } from '../../Chat/actions';
import FamilyList from './components/FamilyList';
import FamilySection from './components/FamilySection';
import moment from 'moment';
import ListItem from './components/ListItem';
import SortButton from './components/SortButton';
import socket from '../../../socket';
import SearchBar from './components/SearchBar';

class Families extends Component {
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
      // console.log(this.props.families);
      const array =
        this.state.families.length > 0
          ? this.state.families
          : this.props.families;
      let families = [...array].map(family => ({
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
        families = [...families].map(family => ({
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

    if (this.state.families.length > 0 && booking) {
      let families = [...this.state.families].map(family => ({
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
      this.setState({ families });

      const propsFamilies = families.map(family => ({
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
    const { filterType, families, hasMore, searchValue } = this.state;
    const { history, activeSitting, errors, isLoading } = this.props;

    return (
      <Layout navBorder navTitle={<FormattedMessage id="families.navTitle" />}>
        <ContentWrapper>
          <Error errors={errors} onRetry={this.onRetry} />
          <CustomRow noPadding>
            <CustomColumn noPadding>
              {activeSitting && families.length > 0 && (
                <FamilySection
                  activeSitting={activeSitting}
                  history={history}
                  angelContact={families}
                  goToChatPress={this.goToChatPress}
                />
              )}
              <Divider noBottomBorder>
                <SearchBar
                  onSearchChange={this.onSearchChange}
                  searchValue={searchValue}
                  angel={true}
                />
              </Divider>
              <Divider right noTopBorder>
                <SortButton
                  value={filterType}
                  onSortChange={this.onSortChange}
                />
              </Divider>
              <ProgressiveConversations isLoading={isLoading} />
              {!isLoading && families.length > 0 ? (
                <CustomRow noPadding>
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
                            goToChatPress={this.goToChatPress}
                            history={history}
                          />
                        );
                      })}
                    </InfiniteScroll>
                  </FamilyList>
                </CustomRow>
              ) : null}
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="3rem 0" />
        </ContentWrapper>
        <AngelTabBar />
      </Layout>
    );
  }

  static defaultProps = {
    families: [],
    activeSitting: {},
  };
}

export default connect(
  state => ({
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
    families: getFamilies(state),
    userId: getUserId(state),
    activeSitting: getActiveSitting(state),
    indicators: getIndicators(state),
    userStatus: getUserStatus(state),
  }),
  {
    onGetFamilies,
    clearBook,
    onGetIndicatorsSuccess,
  }
)(Families);

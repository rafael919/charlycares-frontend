import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import uuid from 'uuid';
import { Loader } from 'semantic-ui-react';
import { GiftedChat } from 'react-web-gifted-chat';
import Layout from 'Components/Layout';
import Error from 'Components/Error';
import Alert from 'Components/Alert';

import { getMessages, getUserId, getSentMessage } from './selectors';
import { getUserRole } from '../../data/auth/selectors';
import { getUserStatus } from '../../ui/selectors';
import { onSendMessage } from './actions';
import API from './api';
import UiAPI from '../../ui/api';
import Message from './components/Message';
import Messages from './components/Messages';
import NavTitle from './components/NavTitle';
import pusher from '../../pusher';
import socket from '../../socket';
import SendMessageSection1 from './components/SendMessageSection1';
import RenderBubble from './components/RenderBubble';
import BottomBar from './components/BottomBar';
import RenderDay from './components/RenderDay';
import RenderTime from './components/RenderTime';
import { AppContext } from '../App';

const TYPING_TIMER_LENGTH = 1000;
let typingFlag = false;
let timer = null;

const startTime = nearestMinutes(
  15,
  moment()
    .clone()
    .add(0, 'hours')
).format('YYYY-MM-DD HH:mm');

const endTime = nearestMinutes(
  15,
  moment()
    .clone()
    .add(2, 'h')
).format('YYYY-MM-DD HH:mm');

const bookingDate = () => ({
  id: 1,
  initialDate: moment()
    .clone()
    .format('YYYY-MM-DD'),
  initialStartTime: startTime,
  initialEndTime: endTime,
  startDate: moment(startTime).format('YYYY-MM-DD'),
  startTime,
  endTime,
  repetitions: [],
});

const NewImage = styled.img`
  width: 100%;
  height: 95%;
  object-fit: contain;
  position: absolute;
  top: 0;
  margin-top: 1.55rem;
  background-color: #e6e6e6;
`;

const ChatDisconnect = styled.div`
  width: 108%;
  height: 4rem;
  padding: 1.2rem 0;
  margin: 0 -1rem;
  background-color: #f8d86f;
  z-index: 10;
  text-align: center;
  font-size: 15px;
  color: '#303036';
`;

class Chat extends React.Component {
  state = {
    newMessage: '',
    messages: [],
    page: 1,
    lastPage: 3,
    perPage: 5,
    hasMore: true,
    fetching: false,
    conversation_id: 0,
    typing: false,
    image: '',
    file: undefined,
    sent: false,
    errors: null,
    open: false,
  };

  // messagesDiv = React.createRef();

  componentWillReceiveProps(nextProps) {
    let { sent, conversation_id } = this.state;

    if (nextProps.sentMessage && sent && socket.connected) {
      let new_last = {
        id: nextProps.sentMessage.data.message.id,
        text: nextProps.sentMessage.data.message.message,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        user: {
          id: Number(nextProps.sentMessage.data.message.user_id),
        },
        image: nextProps.sentMessage.data.message.image
          ? nextProps.sentMessage.data.message.image
          : '',
        proposed_date: nextProps.sentMessage.data.proposed_date,
        read: 1,
        show_date: 1,
        booking_id: 0,
        receiver_id: Number(nextProps.sentMessage.data.message.receiver_id),
      };

      const messages = [...this.state.messages].map(message => {
        const status =
          typeof message.id === 'string' &&
          message.sentFlag &&
          message.text === nextProps.sentMessage.data.message.message &&
          message.user.id ===
            Number(nextProps.sentMessage.data.message.user_id) &&
          !message.proposed_date &&
          message.read === 0 &&
          message.receiver_id ===
            Number(nextProps.sentMessage.data.message.receiver_id);
        return {
          ...message,
          id: status ? nextProps.sentMessage.data.message.id : message.id,
          proposed_date: status
            ? nextProps.sentMessage.data.proposed_date
            : message.proposed_date,
          read: status ? 1 : message.read,
          show_date: status ? 1 : message.show_date,
          booking_id: status ? 0 : message.booking_id,
          sentFlag: status ? false : message.sentFlag,
        };
      });

      this.setState({ messages, sent: false });
      socket.emit('CHAT_SEND', new_last, conversation_id, true);
    }
  }

  componentWillMount() {
    this.getNextPage();
  }

  componentDidMount() {
    this.socketCheck();

    const { location } = this.props;
    this.setState({
      image:
        location.state && location.state.last_image
          ? location.state.last_image
          : '',
    });
  }

  componentWillUnmount() {
    this.disconnect();
    clearAllBodyScrollLocks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (pusher.connection.state === 'disconnected') {
      pusher.connect();
    }
    if (socket.disconnected) {
      socket.connect();
    }
    if (prevState.messages !== this.state.messages) {
      // this.scrollToBottom();
    }
  }

  disconnect = () => {
    pusher.disconnect();
    socket.disconnect();
  };

  scrollToBottom = () => {
    if (this.messagesDiv.current) {
      const scrollHeight = this.messagesDiv.current.scrollHeight;
      this.messagesDiv.current.scrollTo(0, scrollHeight);
    }
  };

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
      socket.on('CHAT_BOOK_SENT', (id, user_id, role) => {
        this.updateBooks(id, user_id, role);
      });
      socket.on('BOOK_CANCEL', id => {
        this.cancelBooks(id);
      });
      socket.on('INIT_CHAT_CONVERSATION', (message_id, user_id) => {
        this.updateRead(message_id, user_id);
      });
    }
  };

  updateMessages = (message, id, booking) => {
    const { userId } = this.props.match.params;
    this.setState(prevState => {
      if (
        id === prevState.conversation_id &&
        message.user.id === Number(userId)
      ) {
        if (booking) {
          prevState.messages.shift();
        }
        return {
          ...prevState,
          messages: [message, ...prevState.messages],
        };
      }
      return null;
    });
  };

  typingState = (user_id, id, typing) => {
    const { userId } = this.props.match.params;
    this.setState(prevState => {
      if (id === prevState.conversation_id && user_id === Number(userId)) {
        return {
          ...prevState,
          typing,
        };
      }
      return {
        ...prevState,
        typing: false,
      };
    });
  };

  updateBooks = (id, user_id, role) => {
    if (typeof id === 'object') {
      if (Number(this.props.match.params.userId) === Number(user_id)) {
        const new_last = {
          id: id.message.id,
          text: id.message.message,
          createdAt: id.message.created_at,
          user: {
            id: Number(id.message.user_id),
          },
          image: '',
          proposed_date: id.proposed_date,
          read: 1,
          show_date: 1,
          booking_id: 1,
          receiver_id: Number(id.message.receiver_id),
          booked_user: user_id,
          role,
        };
        const messages = [new_last, ...this.state.messages];
        this.setState({ messages });
      }
    } else {
      const messages = [...this.state.messages].map(message => ({
        ...message,
        id: id === message.id ? uuid.v4() : message.id,
        booking_id: id === message.id ? 1 : message.booking_id,
        booked_user: id === message.id ? user_id : message.booked_user,
        role: id === message.id ? role : message.role,
      }));
      this.setState({ messages });
    }
  };

  updateRead = (message_id, user_id) => {
    if (user_id === Number(this.props.match.params.userId)) {
      const messages = [...this.state.messages].map(message => ({
        ...message,
        id:
          message_id === message.id && !message.proposed_date
            ? uuid.v4()
            : message.id,
        viewed_at:
          message_id === message.id
            ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            : message.viewed_at,
        read: message_id === message.id ? 2 : message.read,
      }));
      this.setState({ messages });
    }
  };

  subscribeToChannel() {
    const channel = pusher.subscribe(`chat-${this.props.userId}`);
    channel.bind('App\\Events\\MessageCreated', this.updateMessages);
    channel.bind('App\\Events\\MessageRead', data => {});
    pusher.connection.bind('connected', () => {});
    pusher.connection.bind('disconnected', () => {});
    pusher.connection.bind('error', err => {});
  }

  onNewMessageChange = e => {
    this.setState({
      newMessage: e.target.value,
    });
  };

  onMessageSend = () => {
    if (!this.state.newMessage) return;
    const data = {
      message: this.state.newMessage,
      receiver_id: this.props.match.params.userId,
    };
    const newMessage = {
      id: new Date(),
      created_at: new Date(),
      receiver_id: this.props.user_id,
      user_id: this.props.match.params.userId,
      message: this.state.newMessage,
    };
    this.setState(
      prevState => {
        return {
          ...prevState,
          newMessage: '',
          messages: [newMessage, ...prevState.messages],
        };
      },
      () => {
        this.props.sendMessage(data);
      }
    );
  };

  renderMessages() {
    if (this.state.messages.length > 0) {
      const reversedMessages = [...this.state.messages].sort((a, b) => {
        if (new Date(a.created_at) > new Date(b.created_at)) {
          return 1;
        } else {
          return -1;
        }
      });
      return reversedMessages.map(m => {
        if (
          m.receiver_id === Number(this.props.match.params.userId) ||
          m.receiver_id === undefined
        ) {
          return (
            <Message
              key={m.id}
              createdAt={m.created_at}
              me
              message={m.message}
              status={m.viewed_at == null ? 1 : 3}
            />
          );
        }
        return (
          <Message
            key={m.id}
            createdAt={m.created_at}
            you
            message={m.message}
            status={m.viewed_at == null ? 1 : 3}
          />
        );
      });
    }
    return [];
  }

  getNextPage = () => {
    if (this.state.fetching) {
      return;
    }

    this.setState(
      {
        fetching: true,
      },
      () => {
        API.getMessagesPage(
          this.props.match.params.userId,
          this.state.perPage,
          this.state.page
        )
          .then(({ data }) => {
            if (data.data.messages.total > 0) {
              data.data.messages.data.map((item, index) => {
                if (
                  Number(this.props.userId) === item.receiver_id &&
                  !item.viewed_at
                ) {
                  const data = {
                    message_id: item.id,
                  };
                  UiAPI.setRead(data);
                }
                if (
                  Number(this.props.userId) === item.receiver_id &&
                  socket.connected &&
                  (index === 0 || index === 1 || !item.viewed_at)
                ) {
                  socket.emit(
                    'INIT_CHAT_CONVERSATION',
                    item.id,
                    item.receiver_id
                  );
                }
              });
            }

            this.setState(
              prevState => {
                if (
                  data.data.messages.last_page === this.state.page ||
                  data.data.messages.total === 0
                ) {
                  return {
                    ...prevState,
                    messages: [
                      ...prevState.messages,
                      ...data.data.messages.data,
                    ],
                    hasMore: false,
                    fetching: false,
                    conversation_id: data.data.conversation_id,
                  };
                }

                return {
                  ...prevState,
                  messages: [...prevState.messages, ...data.data.messages.data],
                  lastPage: data.data.messages.last_page,
                  page: prevState.page + 1,
                  fetching: false,
                  conversation_id: data.data.conversation_id,
                };
              },
              () => {
                // this.scrollToBottom();
              }
            );
          })
          .catch(errors => {
            this.setState({ errors });
          });
      }
    );
  };

  navigateToBooking = role => () => {
    let { location, history, userId, match } = this.props;
    let { conversation_id } = this.state;

    history.push(`/book/${location.state && location.state.book_id}`, {
      bookDay: bookingDate(),
      role,
      user_id: Number(userId),
      receiver_id: Number(match.params.userId),
      conversation_id,
    });
  };

  _imageUpload = e => {
    e.preventDefault();

    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ image: reader.result, file });
    };

    file && reader.readAsDataURL(file);
  };

  onSend = () => {
    const { conversation_id, newMessage, image, file } = this.state;
    const { sendMessage } = this.props;
    const { userId } = this.props.match.params;

    let data = new FormData();
    data.append('receiver_id', Number(userId));
    data.append('message', newMessage);
    file && data.append('image', file);

    const new_message = {
      id: uuid.v4(),
      text: newMessage,
      createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      user: {
        id: Number(this.props.userId),
      },
      image,
      read: 0,
      receiver_id: Number(userId),
      sentFlag: true,
    };

    if (socket.connected) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [new_message]),
        newMessage: '',
        image: '',
        file: undefined,
        sent: true,
      }));

      sendMessage(data);
      typingFlag = false;
      socket.emit('CHAT_SEND', new_message, conversation_id, false);
      socket.emit('CHAT_TYPING_CANCEL', this.props.userId, conversation_id);
    }
  };

  _onInputTextChanged = e => {
    const { userId } = this.props;
    const { conversation_id } = this.state;

    this.setState({ newMessage: e.target.value });

    if (socket.connected) {
      if (!typingFlag) {
        typingFlag = true;
        socket.emit('CHAT_TYPING', userId, conversation_id);
      }

      clearTimeout(timer);

      timer = setTimeout(() => {
        if (typingFlag) {
          socket.emit('CHAT_TYPING_CANCEL', userId, conversation_id);
          typingFlag = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  };

  cancelBooks = id => {
    const messages = [...this.state.messages].map(message => ({
      ...message,
      id: id === message.id ? uuid.v4() : message.id,
      show_date: id === message.id ? 0 : message.show_date,
      booking_id: id === message.id ? 0 : message.booking_id,
    }));
    this.setState({ messages });
  };

  onBookCancel = day => () => {
    if (socket.connected) {
      API.cancelBook(day.id, {
        show_date: false,
        booking_id: 0,
        booked_user: 0,
      });
      socket.emit('BOOK_CANCEL', day.id);
    }
  };

  onErrorConfirm = () => {
    this.setState({ errors: null });
  };

  alertOpen = () => {
    this.setState({ open: true });
  };

  toggle = () => {
    this.setState({ open: false });
  };

  _renderInputToolbar = () => {
    const { newMessage, image, file } = this.state;
    return (
      <SendMessageSection1
        newMessage={newMessage}
        onInputTextChanged={this._onInputTextChanged}
        onSend={this.onSend}
        image={image}
        messages={newMessage !== '' || file !== undefined}
      />
    );
  };

  _renderSend = props => {
    return <div />;
  };

  _renderBubble = props => {
    const { location, history } = this.props;
    return (
      <RenderBubble
        init_props={props}
        location={location}
        history={history}
        onBookCancel={this.onBookCancel}
        alertOpen={this.alertOpen}
      />
    );
  };

  _renderDay = props => {
    return <RenderDay props={props} />;
  };

  _renderTime = props => {
    return <RenderTime props={props} />;
  };

  _renderFooter = props => {
    return (
      <div style={{ color: '#e6e6e6', fontSize: 1, lineHeight: 1 }}>typing</div>
    );
  };

  goBack = () => {
    const { history, role, match } = this.props;
    const { messages } = this.state;
    const params = {
      userId: match.params.userId,
      last_message: messages.length > 0 ? messages[0] : null,
    };
    role === 'family'
      ? history.push('/favorites', params)
      : history.push('/families', params);
  };

  _imageClose = () => {
    this.setState({ newMessage: '', image: '', file: undefined });
  };

  render() {
    const { location, userId, match, userStatus } = this.props;
    const {
      messages,
      hasMore,
      fetching,
      typing,
      newMessage,
      image,
      file,
      open,
    } = this.state;

    const online = userStatus.find(
      user => user.user_id === Number(match.params.userId)
    );

    return (
      <Layout
        navBorder
        onNavBack={!image ? this.goBack : null}
        onNavClose={image ? this._imageClose : null}
        navTitle={
          <NavTitle
            name={location.state && location.state.name}
            img={location.state && location.state.img}
            typing={typing}
            online={online && online.status === 1}
          />
        }
        leftcenter
      >
        <Alert
          toggle={this.toggle}
          open={open}
          desc="Selected date is for more than 4 weeks ahead"
          onPress={this.toggle}
        />
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <Messages img={location.state && location.state.img}>
          {socket.disconnected && (
            <ChatDisconnect>
              <FormattedMessage id="chat.disconnectAlert" />
            </ChatDisconnect>
          )}
          <AppContext.Consumer>
            {({ locale }) => (
              <GiftedChat
                messages={messages}
                user={{ id: Number(userId) }}
                renderInputToolbar={() => {
                  return <div style={{ display: 'none' }} />;
                }}
                renderSend={this._renderSend}
                renderBubble={this._renderBubble}
                renderAvatar={null}
                loadEarlier={hasMore && !fetching}
                onLoadEarlier={this.getNextPage}
                tickStyle={{ color: '#68AEBF' }}
                renderFooter={this._renderFooter}
                renderDay={this._renderDay}
                renderTime={this._renderTime}
                minInputToolbarHeight={0}
                locale={locale}
              />
            )}
          </AppContext.Consumer>
          {image && <NewImage src={image} />}
          {fetching && (
            <div
              style={{
                position: 'absolute',
                top: 90,
                width: '100%',
                marginTop: '6vw',
                marginBottom: '5vw',
              }}
            >
              <Loader size="medium" active />
            </div>
          )}
        </Messages>
        <div style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          {this._renderInputToolbar()}
          {!image && (
            <BottomBar
              togglePhoneModal={this.togglePhoneModal}
              phone={location.state && location.state.phone}
              imageUpload={this._imageUpload}
              messages={newMessage !== '' || file !== undefined}
              navigateToBooking={this.navigateToBooking}
              onSend={this.onSend}
            />
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  messages: getMessages(state),
  sentMessage: getSentMessage(state),
  userId: getUserId(state),
  role: getUserRole(state),
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  sendMessage: data => dispatch(onSendMessage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import DefaultAngelImage from 'Components/DefaultAngelImage';
import Indicator from 'Components/Indicator';
import styled from 'styled-components';
import moment from 'moment';
import { nearestMinutes } from 'Utils';
import threeDots from 'Assets/icons/three-dots.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import readIcon from 'Assets/icons/chat-status-read.svg';
import receivedIcon from 'Assets/icons/chat-status-received.svg';
import sentIcon from 'Assets/icons/chat-status-sent.svg';
import cameraIcon from 'Assets/icons/icn-photo.svg';
import awayIcon from 'Assets/icons/status-away.svg';
import onlineIcon from 'Assets/icons/status-online.png';
import offlineIcon from 'Assets/icons/status-offline.png';
import placeholder from 'Assets/images/profile-placeholder.png';
import './SwipeableListItem.css';
import BackgroundItem from '../../../../AngelFamilies/Families/components/BackgroundItem';

const SectionWrapper = styled.li`
  display: flex;
  padding: 0.55625rem 1rem;
  width: 100%;
  position: relative;
  background-color: #fff;

  &:last-child::after {
    display: none;
  }

  ${props =>
    isMobile
      ? `
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.3125rem;
    background-color: ${props.theme.defaultGrey};
    background: #f9f8f9;
    border-top: 1px solid ${props.theme.defaultGrey};
    border-bottom: 1px solid ${props.theme.defaultGrey};
  }`
      : null};
`;

const Avatar = styled.div`
  margin-right: 0.5rem;
  position: relative;
  width: 68px;
  height: 68px;
`;

const CustomImage = DefaultAngelImage.extend`
  width: 68px;
  height: 68px;
`;

const StatusIcon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 4px;
  margin-bottom: 3px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  max-height: 3.125rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  position: relative;
  &:focus {
    outline: 0;
  }
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

const ButtonText = styled.div`
  color: ${props => (props.enabled ? props.theme.accentText : '#C7C7C9')};
  font-size: 0.75rem;
`;

const AngelName = styled.h5`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  height: 1.1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

const ArrowBtn = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  width: ${props => (props.image ? '50%' : '100%')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: ${props => (isMobile ? `1rem` : `1.3rem`)};

  &:focus {
    outline: 0;
  }
`;

const ThreeDot = styled.div`
  width: 1.3rem;
  height: calc(100% + 2.28rem);
  background-color: #efefef;
  position: absolute;
  right: 0;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  cursor: w-resize;
  margin-top: -1.15rem;

  &:focus {
    outline: 0;
  }
`;

const ThreeIcon = styled.img``;

const ContactInfo = styled.div`
  width: 100%;
`;

const NameRow = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 0.3rem;
`;

const DateDiv = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.75rem;
  color: ${props => (props.viewDate ? `#666666` : `#4286f4`)};
  font-weight: 400;
  white-space: nowrap;
  margin-left: 0.2rem;
`;

const MContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => (props.image ? `center` : `flex-start`)};
  justify-content: flex-start;
  margin-top: -0.5rem;
`;

const MessageDiv = styled.div`
  flex-direction: row;
  align-items: flex-start;
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8rem;
  color: #4d4d4d;
  font-weight: 400;
  line-height: 1.2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-left: 0.2rem;
  word-wrap: break-word;
`;

const Typing = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8rem;
  color: #4d4d4d;
  font-weight: 400;
  font-style: italic;
`;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PhotoText = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.8rem;
  color: #4d4d4d;
  font-weight: 400;
  margin-top: 0.45rem;
`;

const BadgeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

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

class AngelSection extends React.Component {
  // DOM Refs
  listElement;
  wrapper;
  background;

  // Drag & Drop
  dragStartX = 0;
  left = 0;
  dragged = false;

  // FPS Limit
  startTime;
  fpsInterval = 1000 / 60;

  constructor(props) {
    super(props);

    this.listElement = null;
    this.wrapper = null;
    this.background = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onClicked = this.onClicked.bind(this);

    this.onSwiped = this.onSwiped.bind(this);
  }

  componentDidMount() {
    this.background.style.opacity = '0';
    window.addEventListener('mouseup', this.onDragEndMouse);
    window.addEventListener('touchend', this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragEndMouse);
    window.removeEventListener('touchend', this.onDragEndTouch);
  }

  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onDragStartTouch(evt) {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch.clientX);
    window.addEventListener('touchmove', this.onTouchMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.listElement.className = 'ListItem';
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(evt) {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(evt) {
    window.removeEventListener('touchmove', this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      // const threshold = this.props.threshold || 0.4;
      // const right = this.listElement.offsetWidth * threshold * -1;

      if (this.left < -110) {
        this.left = -275;
        // this.wrapper.style.maxWidth = 80;
        // this.background.style.maxWidth = 40;
        this.onSwiped();
      } else {
        this.left = 0;
        this.background.style.opacity = '0';
      }

      this.listElement.className = 'BouncingListItem';
      this.listElement.style.transform = `translateX(${this.left}px)`;
    }
  }

  onMouseMove(evt) {
    const left = evt.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
  }

  onTouchMove(evt) {
    const touch = evt.targetTouches[0];
    const left = touch.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed > this.fpsInterval) {
      this.listElement.style.transform = `translateX(${this.left}px)`;

      const opacity = (Math.abs(this.left) / 100).toFixed(2);
      if (opacity < 1 && opacity.toString() !== this.background.style.opacity) {
        this.background.style.opacity = opacity.toString();
      }
      if (opacity >= 1) {
        this.background.style.opacity = '1';
      }

      this.startTime = Date.now();
    }
  }

  onClicked() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  onSwiped() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  threeDots = () => {
    this.left = -275;
    this.onSwiped();
    this.background.style.opacity = '1';
    this.listElement.className = 'BouncingListItem';
    this.listElement.style.transform = `translateX(${this.left}px)`;
  };

  closeSwipe = () => {
    this.left = 0;
    this.listElement.className = 'BouncingListItem';
    this.listElement.style.transform = `translateX(${this.left}px)`;
  };

  calendarClick = () => {
    const { angel, history } = this.props;
    isMobile && angel
      ? history.push(`/calendar/bookings/${angel.role_id}`)
      : angel
      ? history.push(`/favorites/availability/${angel.role_id}`)
      : null;
  };

  goToChat = last_image => {
    const {
      history,
      angel,
      goToChatPress,
      userId,
      wasBooked,
      img,
      name,
      phone,
    } = this.props;
    const angelData = {
      img: img ? img : placeholder,
      name,
      phone,
      wasBooked,
      book_id: angel && angel.user.angel ? angel.user.angel.id : 0,
    };

    goToChatPress && goToChatPress(angel ? angel : null);

    isMobile && userId //&& wasBooked
      ? history.push(`/chat/${userId}`, { ...angelData, last_image })
      : userId //&& wasBooked
      ? history.push(`/favorites/chat/${userId}`, {
          ...angelData,
          last_image,
        })
      : null;
  };

  navigateToBooking = () => {
    let { angel, history } = this.props;
    if (isMobile) {
      history.push(`/book/${angel.role_id}`, {
        bookDay: bookingDate(),
        role: 'family',
      });
    } else {
      history.push(`/favorites/booking/${angel.role_id}`, {
        bookDay: bookingDate(),
        role: 'family',
      });
    }
  };

  render() {
    const {
      phone,
      name,
      age,
      img,
      div,
      id,
      onAngelSelect,
      wasBooked,
      togglePhoneModal,
      className,
      status,
      angel,
      readed,
    } = this.props;

    const last_image =
      angel && angel.last_message && angel.last_message.image
        ? angel.last_message.image
        : null;

    return (
      <div className="Wrapper" ref={div => (this.wrapper = div)}>
        <div ref={div => (this.background = div)} className="Background">
          <BackgroundItem
            phone={phone}
            wasBooked={wasBooked}
            togglePhoneModal={togglePhoneModal}
            navigateToBooking={this.navigateToBooking}
            onAngelSelect={onAngelSelect}
            family={true}
            closeSwipe={this.closeSwipe}
            calendarClick={this.calendarClick}
          />
        </div>
        <div
          onClick={this.onClicked}
          ref={div => (this.listElement = div)}
          onMouseDown={this.onDragStartMouse}
          onTouchStart={this.onDragStartTouch}
          className="ListItem"
        >
          {div ? (
            <SectionWrapper className={className}>
              <Avatar>
                <CustomImage
                  src={img ? img : placeholder}
                  onClick={onAngelSelect}
                />
              </Avatar>
              <div>
                <AngelName>
                  {name} ({age})
                </AngelName>
                <Buttons>
                  <Button onClick={() => this.goToChat()}>
                    <img src={chatIcon} alt="chat" />
                    {/* <img src={wasBooked ? chatIcon : chatIconDisabled} /> */}
                    <ButtonText enabled={id}>
                      <FormattedMessage id="chat" />
                    </ButtonText>
                    {angel && angel.unread_message_count > 0 && !readed && (
                      <Indicator messageCount={angel.unread_message_count} />
                    )}
                  </Button>
                  <CallButton
                    href={isMobile && phone ? `tel:${phone}` : null}
                    // onClick={wasBooked ? togglePhoneModal : null}
                    onClick={togglePhoneModal}
                  >
                    <img
                      src={
                        phone /*&& wasBooked*/ ? phoneIcon : phoneIconDisabled
                      }
                      alt="phone"
                    />
                    <ButtonText enabled={phone ? true : false}>
                      <FormattedMessage id="call" />
                    </ButtonText>
                  </CallButton>
                  <Button onClick={() => this.calendarClick()}>
                    <img
                      src={id ? btnCalendar : btnCalendarDisabled}
                      alt="calendar"
                    />
                    <ButtonText enabled={id}>
                      <FormattedMessage id="calendar" />
                    </ButtonText>
                  </Button>
                </Buttons>
              </div>
              {/* <ArrowBtn onClick={onAngelSelect}>
                <Image src={arrowRight} />
              </ArrowBtn> */}
            </SectionWrapper>
          ) : (
            <SectionWrapper className={className}>
              <Avatar>
                <CustomImage
                  src={img ? img : placeholder}
                  onClick={onAngelSelect}
                />
                <StatusIcon
                  src={
                    status === 1
                      ? onlineIcon
                      : status === 0
                      ? awayIcon
                      : offlineIcon
                  }
                />
              </Avatar>
              <ContactInfo>
                <NameRow>
                  <AngelName>
                    {name} ({age})
                  </AngelName>
                  {angel && angel.last_message ? (
                    <BadgeDiv>
                      {angel.unread_message_count > 0 && (
                        <Indicator
                          messageCount={angel.unread_message_count}
                          position={true}
                        />
                      )}
                      <DateDiv viewDate={angel.unread_message_count === 0}>
                        {moment(angel.last_message.createdAt).format(
                          angel.unread_message_count === 0
                            ? 'DD-MM-YY'
                            : 'HH:mm'
                        )}
                      </DateDiv>
                    </BadgeDiv>
                  ) : angel ? (
                    <BadgeDiv>
                      <DateDiv viewDate={true}>
                        {moment(angel.createdAt).format('DD-MM-YY')}
                      </DateDiv>
                    </BadgeDiv>
                  ) : null}
                </NameRow>
                <Buttons>
                  {angel && angel.typing ? (
                    <MContainer>
                      <Typing>typing....</Typing>
                    </MContainer>
                  ) : angel && angel.last_message ? (
                    <MContainer image={angel.last_message.image}>
                      <Image
                        src={
                          angel.readIcon === 0
                            ? sentIcon
                            : angel.readIcon === 1
                            ? receivedIcon
                            : readIcon
                        }
                      />
                      {angel.last_message.image ? (
                        <PhotoDiv onClick={() => this.goToChat(last_image)}>
                          <Image src={cameraIcon} />
                          <PhotoText>Photo</PhotoText>
                        </PhotoDiv>
                      ) : (
                        <MessageDiv>{angel.last_message.text}</MessageDiv>
                      )}
                    </MContainer>
                  ) : (
                    <MessageDiv>
                      <FormattedMessage
                        id={'chat.emptyLastMessage'}
                        values={{ name: name }}
                      />
                    </MessageDiv>
                  )}
                </Buttons>
              </ContactInfo>
              {
                //wasBooked && (
                <ArrowBtn
                  image={
                    angel && angel.last_message && angel.last_message.image
                  }
                  onClick={() => this.goToChat()}
                >
                  <Image src={arrowRight} />
                </ArrowBtn>
                //)
              }
              <ThreeDot onClick={this.threeDots}>
                <ThreeIcon src={threeDots} draggable="false" />
              </ThreeDot>
            </SectionWrapper>
          )}
        </div>
      </div>
    );
  }
}

export default AngelSection;

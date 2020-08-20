import React from 'react';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import { nearestMinutes } from 'Utils';

import FamilyContact from '../FamilyContact';
import './SwipeableListItem.css';
import BackgroundItem from '../BackgroundItem';

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

class ListItem extends React.Component {
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

      if (this.left < -90) {
        this.left = -220;
        // this.wrapper.style.maxWidth = 80;
        // this.background.style.maxWidth = 40;
        this.onSwiped();
      } else {
        this.left = 0;
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
    this.left = -220;
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

  navigateToBooking = () => {
    let { family, history } = this.props;
    if (isMobile) {
      history.push(`/book/${family.role_id}`, {
        bookDay: bookingDate(),
        role: 'angel',
      });
    } else {
      history.push(`/families/booking/${family.role_id}`, {
        bookDay: bookingDate(),
        role: 'angel',
      });
    }
  };

  render() {
    const { family, togglePhoneModal, goToChatPress } = this.props;

    return (
      <div className="Wrapper" ref={div => (this.wrapper = div)}>
        <div ref={div => (this.background = div)} className="Background">
          <BackgroundItem
            phone={family.phone}
            familyId={family.role_id}
            togglePhoneModal={togglePhoneModal}
            family={false}
            closeSwipe={this.closeSwipe}
            navigateToBooking={this.navigateToBooking}
          />
        </div>
        <div
          onClick={this.onClicked}
          ref={div => (this.listElement = div)}
          onMouseDown={this.onDragStartMouse}
          onTouchStart={this.onDragStartTouch}
          className="ListItem"
        >
          <FamilyContact
            phone={family.phone}
            id={family.user_id}
            name={`${family.first_name} ${family.last_name}`}
            img={family.image}
            familyId={family.user_id}
            family={family}
            togglePhoneModal={togglePhoneModal}
            threeDots={this.threeDots}
            goToChatPress={goToChatPress}
            status={family.status}
          />
        </div>
      </div>
    );
  }
}

export default ListItem;

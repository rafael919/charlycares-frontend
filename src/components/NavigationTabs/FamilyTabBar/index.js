import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import addIcon from 'Assets/icons/btn-tabbar-large-add.svg';
import timerIcon from 'Assets/icons/Timer.svg';

import ActionIcon from '../components/ActionIcon';
import Btn from '../components/Btn';
import BtnText from '../components/BtnText';
import Container from '../components/Container';
import defaultTheme from '../../../themes/default';
import IconContainer from '../components/IconContainer';
import Indicator from '../components/Indicator';
import Menu from '../components/Menu';
import TimerIcon from '../components/TimerIcon';
import { getIndicators } from '../../../ui/selectors';

class ParentTabBar extends PureComponent {
  checkCurrentRoute = () => {
    const currentRoute = this.props.location.pathname;
    if (currentRoute.includes('booking')) {
      return 'booking';
    }
    if (currentRoute.includes('favorites')) {
      return 'favorites';
    }
    if (currentRoute.includes('payments')) {
      return 'payments';
    }
    if (currentRoute.includes('profile')) {
      return 'profile';
    }
  };

  state = {
    currentRoute: this.checkCurrentRoute(),
  };

  render() {
    return (
      <Menu borderless fixed="bottom">
        <Container horizontal>
          <Btn as={Link} to="/booking">
            <IconContainer>
              <svg
                preserveAspectRatio="none"
                width="31"
                height="27"
                viewBox="0 0 31 27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke={
                    this.state.currentRoute === 'booking'
                      ? defaultTheme.secondaryColor
                      : '#A9A9AC'
                  }
                  strokeWidth="1.3"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.5 13.655c-.087 0-4.833-3.1-4.833-6.11 0-1.677.965-2.678 2.578-2.678.944 0 2.255.741 2.255 2.26.141-1.519 1.31-2.26 2.254-2.26 1.613 0 2.544 1.001 2.579 2.677.062 2.984-4.747 6.11-4.833 6.11zM1 18.055h9.367v1.45a1.8 1.8 0 0 0 1.8 1.8h6.964a1.8 1.8 0 0 0 1.8-1.8v-1.45h8.793v8.078H1v-8.078zM1 18.055l4.032-8.079h2.251M29.724 18.055l-4.032-8.079H23.44" />
                  <path d="M7.283 15.017V1.483h16.153v13.534" />
                </g>
              </svg>
            </IconContainer>
            <BtnText isSelected={this.state.currentRoute === 'booking' && true}>
              <FormattedMessage id="navigation.tabs.bookings" />
            </BtnText>
            {this.props.indicators &&
            this.props.indicators.pendingBookings > 0 ? (
              <Indicator count={this.props.indicators.pendingBookings} />
            ) : null}
          </Btn>

          <Btn as={Link} to="/favorites">
            <IconContainer>
              <svg
                preserveAspectRatio="none"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(-1)"
                  stroke={
                    this.state.currentRoute === 'favorites'
                      ? defaultTheme.secondaryColor
                      : '#A9A9AC'
                  }
                  strokeWidth="1.3"
                  fill="none"
                  fillRule="evenodd"
                >
                  <path
                    d="M15.525 21.034c-.142 0-7.928-5.139-7.928-10.13 0-2.78 1.583-4.44 4.229-4.44 1.548 0 3.699 1.23 3.699 3.749.232-2.52 2.15-3.75 3.698-3.75 2.646 0 4.172 1.661 4.23 4.44.102 4.948-7.787 10.131-7.928 10.131z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="15.525" cy="2.821" rx="6.996" ry="1.821" />
                  <path
                    d="M5.34 11.017c-2.351 0-3.34 2.056-3.34 3.56v10.265c.297 1.104.925 1.656 1.881 1.656.957 0 1.584-.552 1.882-1.656v-6.73 1.194c-.114 2.396.5 3.595 1.843 3.595 1.342 0 1.957-1.199 1.843-3.595M25.71 11.017c2.351 0 3.34 2.056 3.34 3.56v10.265c-.297 1.104-.925 1.656-1.881 1.656-.957 0-1.584-.552-1.882-1.656v-6.73 1.194c.114 2.396-.5 3.595-1.843 3.595-1.342 0-1.957-1.199-1.843-3.595"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </IconContainer>
            <BtnText
              isSelected={this.state.currentRoute === 'favorites' && true}
            >
              <FormattedMessage id="navigation.tabs.favorites" />
            </BtnText>
            {this.props.indicators && this.props.indicators.activeTimer ? (
              <TimerIcon src={timerIcon} />
            ) : null}
            {this.props.indicators && this.props.indicators.newMessages > 0 ? (
              <Indicator count={this.props.indicators.newMessages} />
            ) : null}
          </Btn>
          <Btn as={Link} to="/booking/create">
            <IconContainer>
              <ActionIcon>
                <Image src={addIcon} />
              </ActionIcon>
            </IconContainer>
            <BtnText>
              <FormattedMessage id="navigation.tabs.book" />
            </BtnText>
          </Btn>
          <Btn as={Link} to="/payments">
            <IconContainer>
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(2 1)">
                    <rect
                      stroke={
                        this.state.currentRoute === 'payments'
                          ? defaultTheme.secondaryColor
                          : '#A9A9AC'
                      }
                      strokeWidth="1.3"
                      x=".5"
                      width="26"
                      height="26"
                      rx="13"
                    />
                    <path
                      d="M14.16 7.487c-1.935 0-3.142 1.222-3.621 3.666h4.64v1.174h-4.767l-.019.519v.582l.019.41h4.212v1.173h-4.067c.225 1.092.645 1.937 1.26 2.534.616.598 1.44.897 2.47.897.947 0 1.884-.2 2.812-.6v1.364a7.01 7.01 0 0 1-2.884.591c-1.438 0-2.595-.408-3.471-1.223-.877-.816-1.455-2.004-1.734-3.563H7.5v-1.173h1.383l-.018-.383v-.4l.018-.728H7.5v-1.174h1.492c.237-1.583.798-2.817 1.684-3.703.885-.886 2.047-1.328 3.484-1.328 1.22 0 2.33.294 3.33.882l-.645 1.265c-1.007-.522-1.902-.782-2.685-.782z"
                      fill={
                        this.state.currentRoute === 'payments'
                          ? defaultTheme.secondaryColor
                          : '#A9A9AC'
                      }
                    />
                  </g>
                </g>
              </svg>
            </IconContainer>
            <BtnText
              isSelected={this.state.currentRoute === 'payments' && true}
            >
              <FormattedMessage id="navigation.tabs.payments" />
            </BtnText>
          </Btn>
          <Btn as={Link} to="/profile">
            <IconContainer>
              <svg
                preserveAspectRatio="none"
                width="26"
                height="27"
                viewBox="0 0 26 27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(0 1)"
                  stroke={
                    this.state.currentRoute === 'profile'
                      ? defaultTheme.secondaryColor
                      : '#A9A9AC'
                  }
                  strokeWidth="1.3"
                  fill="none"
                  fillRule="evenodd"
                >
                  <ellipse
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cx="12.156"
                    cy="7.8"
                    rx="6.838"
                    ry="7.8"
                  />
                  <path d="M15.178 15.189H9.29l.078 2.97-6.491 2.308A3.35 3.35 0 0 0 .65 23.623v1.727h23.771v-1.671c0-1.44-.92-2.72-2.286-3.177l-6.957-2.33V15.19z" />
                  <path
                    d="M5.8 6.15c3.163 1.169 5.734.507 7.714-1.984.836 2.498 2.665 3.16 5.488 1.984"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </IconContainer>
            <BtnText isSelected={this.state.currentRoute === 'profile' && true}>
              <FormattedMessage id="navigation.tabs.profile" />
            </BtnText>
          </Btn>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  connect(state => ({
    indicators: getIndicators(state),
  }))(ParentTabBar)
);

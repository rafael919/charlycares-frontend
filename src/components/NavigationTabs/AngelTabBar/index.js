import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import calendarIcon from 'Assets/icons/btn-tabbar-large-calendar.svg';
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

class AngelTabBar extends PureComponent {
  checkCurrentRoute = () => {
    const currentRoute = this.props.location.pathname;
    if (currentRoute.includes('booking')) {
      return 'booking';
    }
    if (currentRoute.includes('families')) {
      return 'families';
    }
    if (currentRoute.includes('joblist')) {
      return 'joblist';
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

          <Btn as={Link} to="/families">
            <IconContainer>
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <g
                    strokeWidth="1.3"
                    stroke={
                      this.state.currentRoute === 'families'
                        ? defaultTheme.secondaryColor
                        : '#A9A9AC'
                    }
                  >
                    <path d="M8.5 10c1.754 0 3.5-1.701 3.5-4.5 0-2.485-.72-4.255-3.5-4.255C5.72 1.245 5 3.015 5 5.5 5 8.34 6.746 10 8.5 10z" />
                    <path
                      d="M22.191 12c1.574 0 2.85-1.477 2.85-4.323-1.538-.235-2.684-1.294-3.436-3.177-.507 1.513-1.261 2.572-2.264 3.177 0 2.82 1.276 4.323 2.85 4.323zM1.043 25v-9.65c0-1.654 1.023-2.398 2.52-2.89 1-.329 1.859-.487 2.579-.475l2.213 6.486M4.5 18v5.5M26.5 18v5.5M10 14.666l.625-2.626c1.68 0 2.864.13 3.55.392.685.261 1.39.82 2.117 1.677M19.635 13.401C19.97 15.134 20.805 16 22.137 16c1.333 0 2.167-.868 2.503-2.605 1.386-.024 2.518.288 3.395.937.877.649 1.426 1.552 1.647 2.71V25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.02 10.652c-.255-3.173-.045-5.446.63-6.82.58-1.184 1.756-2.002 3.527-2.457a4 4 0 0 1 1.847-.034c1.805.394 3.001 1.224 3.59 2.49.685 1.475.93 3.748.738 6.82"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M15 16.65a2.35 2.35 0 0 0-2.35 2.317c-.006.46.018.918.071 1.374l.006.048a2.8 2.8 0 0 0 2.78 2.461 2.815 2.815 0 0 0 2.792-2.463l.006-.046c.05-.422.058-.915.025-1.478a2.35 2.35 0 0 0-2.346-2.213H15z" />
                    <path
                      d="M10 27v-.224a2 2 0 0 1 1.516-1.94l1.17-.292a1 1 0 0 1 .808.145l2.006 1.376 2.066-1.382a1 1 0 0 1 .803-.138l1.124.286A2 2 0 0 1 21 26.769V27"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </IconContainer>
            <BtnText
              isSelected={this.state.currentRoute === 'families' && true}
            >
              <FormattedMessage id="navigation.tabs.families" />
            </BtnText>
            {this.props.indicators && this.props.indicators.activeTimer ? (
              <TimerIcon src={timerIcon} />
            ) : null}
            {this.props.indicators && this.props.indicators.newMessages > 0 ? (
              <Indicator count={this.props.indicators.newMessages} />
            ) : null}
          </Btn>
          <Btn as={Link} to="/calendar">
            <IconContainer>
              <ActionIcon>
                <Image src={calendarIcon} />
              </ActionIcon>
            </IconContainer>
            <BtnText>
              <FormattedMessage id="navigation.tabs.calendar" />
            </BtnText>
          </Btn>
          <Btn as={Link} to="/joblist">
            <IconContainer>
              <svg
                width="31px"
                height="28px"
                viewBox="0 0 31 28"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Assets"
                  stroke={
                    this.state.currentRoute === 'joblist'
                      ? defaultTheme.secondaryColor
                      : '#A9A9AC'
                  }
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="cc-assets"
                    transform="translate(-290.000000, -244.000000)"
                  >
                    <g
                      id="menu-tabbar"
                      transform="translate(34.000000, 41.000000)"
                    >
                      <g
                        id="icons"
                        transform="translate(10.000000, 203.000000)"
                      >
                        <g
                          id="Icons/tabbar/view-pressed"
                          transform="translate(246.000000, 0.000000)"
                        >
                          <g
                            id="Group"
                            transform="translate(3.000000, 6.000000)"
                          >
                            <path
                              d="M12.5,4.5 C13.6111167,4.5 14.5555517,4.89235719 15.3333333,5.67708333 C16.111115,6.46180948 16.5,7.40277229 16.5,8.5 C16.5,9.61111667 16.111115,10.5555517 15.3333333,11.3333333 C14.5555517,12.111115 13.6111167,12.5 12.5,12.5 C11.4027723,12.5 10.4618095,12.111115 9.67708333,11.3333333 C8.89235719,10.5555517 8.5,9.61111667 8.5,8.5 C8.5,7.40277229 8.89235719,6.46180948 9.67708333,5.67708333 C10.4618095,4.89235719 11.4027723,4.5 12.5,4.5 Z"
                              id="eye---simple-line-icons"
                              strokeWidth="1.3"
                            />
                            <path
                              d="M12.5,16.5 C13.767717,16.5 15.021433,16.3339117 16.2611857,16.0017301 C17.5009383,15.6695485 18.6661019,15.1712836 19.7567114,14.5069204 C20.8473209,13.8425572 21.8447009,13.0121157 22.7488814,12.0155709 C23.6530619,11.0190262 24.4034273,9.85640803 25,8.52768166 C24.4034273,7.19895529 23.6577226,6.03633716 22.7628635,5.03979239 C21.8680045,4.04324761 20.8752851,3.20819253 19.7846756,2.53460208 C18.6940661,1.86101163 17.5335632,1.35351958 16.303132,1.01211073 C15.0727008,0.670701869 13.8236454,0.5 12.5559284,0.5 C11.2882114,0.5 10.0344954,0.670701869 8.79474273,1.01211073 C7.55499007,1.35351958 6.38516583,1.86101163 5.2852349,2.53460208 C4.18530397,3.20819253 3.17860263,4.04324761 2.26510067,5.03979239 C1.35159871,6.03633716 0.596572707,7.19895529 0,8.52768166 C0.596572707,9.85640803 1.35159871,11.0190262 2.26510067,12.0155709 C3.17860263,13.0121157 4.18064332,13.8425572 5.2712528,14.5069204 C6.36186228,15.1712836 7.52236521,15.6695485 8.75279642,16.0017301 C9.98322763,16.3339117 11.232283,16.5 12.5,16.5 Z"
                              id="Path"
                              strokeWidth="1.3"
                            />
                          </g>
                        </g>
                      </g>
                      <g
                        id="slices"
                        transform="translate(10.000000, 203.000000)"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </IconContainer>
            <BtnText isSelected={this.state.currentRoute === 'joblist' && true}>
              <FormattedMessage id="navigation.tabs.jobFinder" />
            </BtnText>
            {this.props.indicators && this.props.indicators.pendingJobs > 0 ? (
              <Indicator count={this.props.indicators.pendingJobs} />
            ) : null}
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
            <BtnText isSelected={this.state.currentRoute === 'profile'}>
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
  }))(AngelTabBar)
);

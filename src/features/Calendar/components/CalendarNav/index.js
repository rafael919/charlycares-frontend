import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import anime from 'animejs';
import { FormattedMessage } from 'react-intl';

import calendar from 'Assets/icons/btn-calendar-small.svg';
import addIcon from 'Assets/icons/btn-tabbar-large-add.svg';
import notAvailable from 'Assets/icons/icon-tabbar-not-available.svg';
import weekView from 'Assets/icons/icon-tabbar-view.svg';

import ActionIcon from './components/ActionIcon';
import Btn from './components/Btn';
import BtnText from './components/BtnText';
import Container from './components/Container';
import IconContainer from './components/IconContainer';
import Menu from './components/Menu';

export default class CalendarNav extends PureComponent {
  state = {
    currentRoute: '',
  };

  scrollToToday = () => {
    if (window.location.pathname.includes('week')) {
      this.props.goToCurrentWeek();
    } else {
      const todayEl = document.querySelector('#today');
      let position;

      if (todayEl) {
        position = todayEl.getBoundingClientRect();
      } else {
        return;
      }
    }
  };

  render() {
    return (
      <Menu borderless fixed="bottom">
        <Container horizontal>
          <Btn onClick={this.scrollToToday}>
            <IconContainer>
              <Image src={calendar} />
            </IconContainer>
            <BtnText isSelected><FormattedMessage id="calendar.angel.nav.today" /></BtnText>
          </Btn>
          <Btn
            as={Link}
            to={
              window.location.pathname === '/calendar/week'
                ? '/calendar'
                : '/calendar/week'
            }
          >
            <IconContainer>
              <Image src={weekView} />
            </IconContainer>
            <BtnText isSelected>
              {window.location.pathname === '/calendar/week'
                ? <FormattedMessage id="calendar.angel.nav.monthView" />
                : <FormattedMessage id="calendar.angel.nav.weekView" />}
            </BtnText>
          </Btn>
          <Btn as={Link} to="/calendar/unavailable">
            <IconContainer>
              <Image src={notAvailable} />
            </IconContainer>
            <BtnText isSelected><FormattedMessage id="calendar.angel.nav.notAvailable" /></BtnText>
          </Btn>
          <Btn as={Link} to="/calendar/add">
            <IconContainer>
              <ActionIcon src={addIcon}>
              </ActionIcon>
            </IconContainer>
            <BtnText isSelected><FormattedMessage id="calendar.angel.nav.addCalendar" /></BtnText>
          </Btn>
        </Container>
      </Menu>
    );
  }
}

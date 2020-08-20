import { connect } from 'react-redux';
import { Grid, Container, Menu, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import curry from 'ramda/es/curry';
import FullHeight from 'Components/FullHeight';
import FullHeightWidth from 'Components/FullHeightWidth';
import injectIntl from 'Utils/injectIntl';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { Fragment, Component } from 'react';
import styled from 'styled-components';

import logo2 from 'Assets/images/logo2.png';

import { getDisturbModeStatus } from './selectors';
import { getUserRole } from '../../data/auth/selectors';
import { getIndicators } from '../../ui/selectors';
import AddBookingBtn from './components/AddBookingBtn';
import CalendarAdd from '../../features/Calendar/CalendarAdd/Desktop';
import CustomGrid from './components/CustomGrid';
import CustomMenuItem from './components/CustomMenuItem';
import DoNotDisturbBtn from './components/DoNotDisturbBtn';
import HeaderContainer from './components/HeaderContainer';
import Indicator from './components/Indicator';
import Logo from './components/Logo';
import RowContainer from './components/RowContainer';
import UpdateCalendarBtn from './components/UpdateCalendarBtn';
import WhiteColumn from './components/WhiteColumn';

const navigate = memoizeWith(
  (_, path) => path,
  curry((history, path, _ev) => {
    history.push(path);
  })
);

const CustomModal = styled(Modal)`
  top: 10% !important;
  &&& {
    & > .content {
      padding: 0 1.5rem 1.5rem;
    }
  }
`;

class DesktopAppLayout extends Component {
  renderMenuItems = (
    role,
    history,
    pathname,
    pendingBookings,
    newMessages,
    pendingJobs
  ) => {
    const intl = this.props.intl;
    const familyRoutes = [
      {
        active: pathname.startsWith('/booking'),
        name: intl.formatMessage({ id: 'menu.desktop.family.bookings' }),
        onClick: navigate(history, '/booking'),
        indicator: pendingBookings,
      },
      {
        active: pathname.includes('favorites'),
        name: intl.formatMessage({ id: 'menu.desktop.family.favorites' }),
        onClick: navigate(history, '/favorites'),
        indicator: newMessages,
      },
      {
        active: pathname.includes('payments'),
        name: intl.formatMessage({ id: 'menu.desktop.family.payments' }),
        onClick: navigate(history, '/payments'),
      },
      {
        active: pathname.startsWith('/calendar'),
        name: intl.formatMessage({ id: 'menu.desktop.family.calendar' }),
        onClick: navigate(history, '/calendar'),
      },
    ];
    const angelRoutes = [
      {
        active: pathname.startsWith('/booking'),
        name: intl.formatMessage({ id: 'menu.desktop.angel.bookings' }),
        onClick: navigate(history, '/booking'),
        indicator: pendingBookings,
      },
      {
        active: pathname.startsWith('/families'),
        name: intl.formatMessage({ id: 'menu.desktop.angel.families' }),
        onClick: navigate(history, '/families'),
        indicator: newMessages,
      },
      {
        active: pathname.startsWith('/joblist'),
        name: intl.formatMessage({ id: 'menu.desktop.angel.joblist' }),
        onClick: navigate(history, '/joblist'),
        indicator: pendingJobs,
      },
      {
        active: pathname.includes('payments'),
        name: intl.formatMessage({ id: 'menu.desktop.angel.payments' }),
        onClick: navigate(history, '/payments'),
      },
      {
        active: pathname.startsWith('/calendar'),
        name: intl.formatMessage({ id: 'menu.desktop.angel.calendar' }),
        onClick: navigate(history, '/calendar'),
      },
      // {
      //   active: pathname.startsWith('shop'),
      //   name: intl.formatMessage({ id: 'menu.desktop.family.shop' }),
      //   onClick: navigate(history, '/shop'),
      // },
    ];

    if (role === 'family') {
      return familyRoutes.map((route, i) => {
        return (
          <div key={i} style={{ position: 'relative', marginTop: '1rem' }}>
            <CustomMenuItem
              active={route.active}
              name={route.name}
              onClick={route.onClick}
            />
            {route.indicator > 0 && <Indicator count={route.indicator} />}
          </div>
        );
      });
    } else {
      return angelRoutes.map((route, i) => {
        return (
          <div key={i} style={{ position: 'relative', marginTop: '1rem' }}>
            <CustomMenuItem
              active={route.active}
              name={route.name}
              onClick={route.onClick}
            />
            {route.indicator > 0 && <Indicator count={route.indicator} />}
          </div>
        );
      });
    }
  };
  static LeftColumn = ({
    children,
    isWhite = false,
    noPadding,
    padding,
    withScroll,
    noPaddingBottom,
  }) => {
    return (
      <WhiteColumn
        noPaddingBottom={noPaddingBottom}
        withScroll={withScroll}
        tablet={16}
        mobile={16}
        widescreen={8}
        computer={8}
        isWhite={isWhite}
      >
        {children}
      </WhiteColumn>
    );
  };
  static RightColumn = ({
    children,
    isWhite = true,
    onBack,
    colRight,
    withScroll,
    id,
    overflow,
  }) => {
    return (
      <WhiteColumn
        isWhite={isWhite}
        widescreen={7}
        computer={7}
        tablet={16}
        mobile={16}
        withScroll={withScroll}
        id={id}
        overflow={overflow}
      >
        {children}
      </WhiteColumn>
    );
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    if (this.props.location.pathname === '/calendar/add') {
      this.onModalToggle();
    }
  }

  onCalendarUpdate = () => {
    this.props.history.push('/calendar/add');
    this.onModalToggle();
  };

  onModalToggle = () => {
    this.setState(state => ({ ...state, isModalOpen: !state.isModalOpen }));
  };

  render() {
    const {
      history,
      children,
      location: { pathname },
      disturb,
      intl,
      indicators,
    } = this.props;

    return (
      <Fragment>
        <HeaderContainer>
          <Grid container>
            <Grid.Row
              as={RowContainer}
              noPaddingBottom={true}
              textAlign="right"
            >
              <Grid.Column width={16}>
                <Menu secondary floated="right">
                  {this.props.role === 'angel' && (
                    <CustomMenuItem
                      name={'disturb'}
                      active={pathname.includes('unavailable')}
                      onClick={navigate(history, '/calendar/unavailable')}
                    >
                      <DoNotDisturbBtn isInDisturbMode={Boolean(disturb)} />
                    </CustomMenuItem>
                  )}
                  <CustomMenuItem
                    name={intl.formatMessage({
                      id: 'menu.desktop.angel.credit',
                    })}
                    // active={pathname.includes('credit')}
                    onClick={navigate(history, '/profile/credit')}
                  />
                  <CustomMenuItem
                    name={intl.formatMessage({
                      id: 'menu.desktop.angel.support',
                    })}
                    active={pathname.includes('support')}
                    onClick={
                      this.props.role === 'angel'
                        ? // ? navigate(history, '/calendar/support')
                          navigate(history, '/faq')
                        : navigate(
                            history,
                            // '/calendar/availability/support'
                            '/faq'
                          )
                    }
                  />
                  <CustomMenuItem
                    name={intl.formatMessage({
                      id: 'menu.desktop.angel.profile',
                    })}
                    active={pathname.includes('profile')}
                    onClick={navigate(history, '/profile')}
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row as={RowContainer} noPaddingTop={true}>
              <Menu secondary fluid>
                <Menu.Item>
                  <Logo src={logo2} />
                </Menu.Item>
                {this.renderMenuItems(
                  this.props.role,
                  history,
                  pathname,
                  indicators.pendingBookings,
                  indicators.newMessages,
                  indicators.pendingJobs
                )}
                {this.props.role === 'family' ? (
                  <CustomMenuItem
                    position="right"
                    onClick={navigate(history, '/booking/create')}
                  >
                    <AddBookingBtn />
                  </CustomMenuItem>
                ) : (
                  <CustomMenuItem
                    position="right"
                    onClick={this.onCalendarUpdate}
                  >
                    <UpdateCalendarBtn />
                  </CustomMenuItem>
                )}
              </Menu>
            </Grid.Row>
          </Grid>
        </HeaderContainer>
        <Container as={FullHeightWidth}>
          <CustomGrid centered columns={2} as={FullHeight}>
            {children}
          </CustomGrid>
        </Container>
        <CustomModal open={this.state.isModalOpen} size="mini">
          <Modal.Content>
            <CalendarAdd
              history={this.props.history}
              onClose={this.onModalToggle}
            />
          </Modal.Content>
        </CustomModal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  disturb: getDisturbModeStatus(state),
  role: getUserRole(state),
  indicators: getIndicators(state),
});

export default injectIntl(
  withRouter(connect(mapStateToProps)(DesktopAppLayout))
);

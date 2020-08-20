import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { Component } from 'react';

import { getDays } from '../Create/selectors';
import { getMessage } from './selectors';
import { getSelectedAngels } from '../data/selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onCreateBooking, onMessageChange } from './actions';
import { onErrorConfirm } from '../../../ui/actions';
import { onClearDays } from '../Create/actions';
import Days from './components/Days';
import Message from './components/Message';
import SelectedAngel from './components/SelectedAngel';
import SelectedAngelsList from './components/SelectedAngelsList';
import DirectAcceptance from './components/DirectAcceptance';
import API from '../../../data/user/api';
import placeholder from 'Assets/images/profile-placeholder.png';

class Send extends Component {
  state = {
    approval: [],
  };

  componentDidMount() {
    this.checkMembership();
  }

  onToggleAngelApproval = angelId => () => {
    if (this.state.approval.includes(angelId)) {
      const filtered = this.state.approval.filter(id => id !== angelId);

      return this.setState({
        approval: filtered,
      });
    }

    return this.setState(prevState => ({
      approval: [...prevState.approval, angelId],
    }));
  };

  onTextChange = e => {
    this.props.onMessageChange(e.target.value);
  };

  makeDatesArr = (days = []) => {
    return days.map(day => {
      const selectedDay = {
        start_date: moment(`${day.startTime}`, 'YYYY-MM-DD HH:mm').format('X'),
        end_date: moment(`${day.endTime}`, 'YYYY-MM-DD HH:mm').format('X'),
      };

      const mappedRepetitions = day.repetitions.map(rep => {
        return {
          start_date: moment(
            `${rep} ${moment(day.startTime, 'YYYY-MM-DD HH:mm').format(
              'HH:mm'
            )}`,
            'YYYY-MM-DD HH:mm'
          ).format('X'),
          end_date: moment(
            `${rep} ${moment(day.endTime, 'YYYY-MM-DD HH:mm').format('HH:mm')}`,
            'YYYY-MM-DD HH:mm'
          ).format('X'),
        };
      });
      return [selectedDay, ...mappedRepetitions];
    });
  };

  onSend = () => {
    const { history, onCreateBooking, days } = this.props;

    const dates = this.makeDatesArr(days);

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSendBookingRequest', {
        angelsSelected: this.props.selectedAngels.length,
        repeatQuantity: dates.length,
        startDate: `${days[0].startTime}`,
        endDate: `${days[0].endTime}`,
        plan: this.props.plan,
        minutes: moment(`${days[0].endTime}`, 'YYYY-MM-DD HH:mm').diff(
          moment(`${days[0].startTime}`, 'YYYY-MM-DD HH:mm'),
          'minutes'
        ),
      });
    }

    const data = {
      angel_ids: this.props.selectedAngels.map(angel => angel.id),
      approval_required: this.state.approval,
      dates,
      message: this.props.message,
      single_booking: false,
    };
    onCreateBooking(data, history, this.state.hasMembership, this.state.hasCanceledMembership);
  };

  checkMembership = () => {
    API.getProfile()
      .then(res => {
        this.setState({
          hasMembership: res.data.data.has_membership,
          hasCanceledMembership: res.data.data.has_canceled_membership
        });
      })
      .catch(err => {});
  };

  renderAngelList = () => {
    const dates = this.makeDatesArr(this.props.days);
    if (this.props.days && this.props.days.length) {
      if (dates.length === 1 && dates[0].length === 1) {
        return (
          <Grid container>
            <CustomRow padding="2.5rem 0 0 0">
              <Header as="h5">
                <FormattedMessage id="booking.send.selectedAngels" />
              </Header>
            </CustomRow>
            <CustomRow padding="1rem 0 1.875rem 0">
              <SelectedAngelsList>
                {this.props.selectedAngels.map(angel => (
                  <SelectedAngel
                    key={angel.id}
                    img={angel.image ? angel.image : placeholder}
                    name={angel.first_name}
                    liked={angel.is_liked}
                  />
                ))}
              </SelectedAngelsList>
            </CustomRow>
          </Grid>
        );
      }
      return (
        <Grid container>
          <CustomRow padding="2.5rem 0 0 0">
            <DirectAcceptance
              approval={this.state.approval}
              onToggleAngelApproval={this.onToggleAngelApproval}
              selectedAngels={this.props.selectedAngels}
            />
          </CustomRow>
        </Grid>
      );
    }
    return null;
  };

  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={
          <InlineText fontSize="1.125rem">
            <FormattedMessage id="booking.send.navTitle" />
          </InlineText>
        }
        navRightComponent={() => {
          return (
            <CustomLink primary to="/faq">
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          );
        }}
      >
        {this.props.isLoading && <Loader />}
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            {this.renderAngelList()}
            <Days days={this.props.days} />
            <Grid container>
              <CustomRow padding="2.125rem 0 1rem 0">
                <Header as="h5">
                  <FormattedMessage id="booking.send.personalMessage" />
                </Header>
              </CustomRow>
              <CustomRow padding="0 0 5rem 0">
                <Message
                  onChange={this.onTextChange}
                  value={this.props.message}
                  rows="10"
                  placeholder={this.props.intl.formatMessage({
                    id: 'booking.send.personalMessagePlaceholder',
                  })}
                />
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton onClick={this.onSend} primary fluid>
            <FormattedMessage id="booking.send.button" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }

  static defaultProps = {
    selectedAngels: [],
    days: [],
    message: '',
    isLoading: false,
    errors: null,
  };
}

const mapStateToProps = state => ({
  selectedAngels: getSelectedAngels(state),
  days: getDays(state),
  message: getMessage(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  // plan: getSubscriptionPlan(state),
});

const mapDispatchToProps = dispatch => ({
  onCreateBooking: (data, history, hasMembership, hasCanceledMembership) =>
    dispatch(onCreateBooking(data, history, hasMembership, hasCanceledMembership)),
  onMessageChange: text => dispatch(onMessageChange(text)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
  onClearDays: () => dispatch(onClearDays()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Send));

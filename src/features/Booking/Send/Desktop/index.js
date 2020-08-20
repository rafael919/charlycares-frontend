import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import Loader from 'Components/Loader';
import DesktopError from 'Components/DesktopError';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import Navigation from 'Components/Navigation';

import { getDays } from '../../Create/selectors';
import { getMessage } from '../selectors';
import { getSelectedAngels } from '../../data/selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onCreateBooking, onMessageChange } from '../actions';
import { onErrorConfirm } from '../../../../ui/actions';
import { onClearDays } from '../../Create/actions';
import Days from './components/Days';
import Message from '../components/Message';
import SelectedAngel from '../components/SelectedAngel';
import SelectedAngelsList from '../components/SelectedAngelsList';
import DirectAcceptance from '../components/DirectAcceptance';
import API from '../../../../data/user/api';
import placeholder from 'Assets/images/profile-placeholder.png';

class Send extends Component {
  state = {
    approval: [],
    hasMembership: null,
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
            `${rep} ${moment(`${day.startTime}`, 'YYYY-MM-DD HH:mm').format(
              'HH:mm'
            )}`,
            'YYYY-MM-DD HH:mm'
          ).format('X'),
          end_date: moment(
            `${rep} ${moment(`${day.endTime}`, 'YYYY-MM-DD HH:mm').format(
              'HH:mm'
            )}`,
            'YYYY-MM-DD HH:mm'
          ).format('X'),
        };
      });
      return [selectedDay, ...mappedRepetitions];
    });
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

  onSend = () => {
    const { history, onCreateBooking, days } = this.props;

    const dates = this.makeDatesArr(days);

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FSendBookingRequest', {
        angelsSelected: this.props.selectedAngels.length,
        repeatQuantity: dates.length,
        startDate: `${days && days[0] && days[0].startTime}`,
        endDate: `${days && days[0] && days[0].endTime}`,
        plan: this.props.plan,
        minutes: moment(
          `${days && days[0] && days[0].endTime}`,
          'YYYY-MM-DD HH:mm'
        ).diff(
          moment(`${days && days[0] && days[0].startTime}`, 'YYYY-MM-DD HH:mm'),
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

  renderAngelList = () => {
    const dates = this.makeDatesArr(this.props.days);
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
  };

  render() {
    return (
      <Fragment>
        <Navigation
          title={
            <InlineText fontSize="1.125rem">
              <FormattedMessage id="booking.send.navTitle" />
            </InlineText>
          }
          onBack={this.props.history.goBack}
        />
        {this.props.isLoading && <Loader />}

        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.renderAngelList()}
        <Days days={this.props.days} />
        <Segment basic vertical>
          <Header as="h5">
            <FormattedMessage id="booking.send.personalMessage" />
          </Header>
        </Segment>
        <Segment basic vertical style={{ paddingTop: '0px' }}>
          <Message
            onChange={this.onTextChange}
            value={this.props.message}
            rows="10"
            placeholder={this.props.intl.formatMessage({
              id: 'booking.send.personalMessagePlaceholder',
            })}
          />
        </Segment>
        <Confirmation>
          <BasicButton onClick={this.onSend} primary fluid>
            <FormattedMessage id="booking.send.button" />
          </BasicButton>
        </Confirmation>
      </Fragment>
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

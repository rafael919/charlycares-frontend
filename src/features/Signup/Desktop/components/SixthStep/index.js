//@flow
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import DesktopError from 'Components/DesktopError';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import moment from 'moment';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import { getTimeslots, getSelectedAgenda } from '../../../selectors';
import { getErrors, getLoadingStatus } from '../../../../../ui/selectors';
import { onErrorConfirm } from '../../../../../ui/actions';
import { onGetTimeslots, onTimeslotSelect } from '../../../actions';
import Agenda from './components/Agenda';

type Props = {
  previous: Function,
  next: Function,
  getTimeslots: Function,
  timeslots: Array<Object>,
  selectedAgenda: Object,
  errors: Object | string,
  onErrorConfirm: Function,
  onTimeslotSelect: Function,
  isLoading: boolean,
};

type State = {
  week: number,
};

class SixthStepAngel extends Component<Props, State> {
  state = {
    week: moment().week(),
  };

  componentDidMount() {
    this.props.getTimeslots(this.props.selectedAgenda.id, this.state.week);
  }

  getNextWeek = () => {
    this.setState(prevState => {
      const nextWeek = prevState.week + 1;
      this.props.getTimeslots(this.props.selectedAgenda.id, nextWeek);
      return {
        week: nextWeek,
      };
    });
  };

  getPrevWeek = () => {
    this.setState(prevState => {
      const prevWeek = prevState.week - 1;
      if (prevWeek < 1) {
        return {
          week: prevState.week,
        };
      }
      this.props.getTimeslots(this.props.selectedAgenda.id, prevWeek);
      return {
        week: prevWeek,
      };
    });
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <CustomRow padding="12rem 0 0 0" columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Agenda
                timeslots={this.props.timeslots}
                getNextWeek={this.getNextWeek}
                getPrevWeek={this.getPrevWeek}
                week={this.state.week}
                next={this.props.next}
                onTimeslotSelect={this.props.onTimeslotSelect}
              />
            </Grid.Column>
          </CustomRow>
        )}
      </DesktopWelcomeLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  selectedAgenda: getSelectedAgenda(state),
  timeslots: getTimeslots(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  getTimeslots: (id: number, week: number) =>
    dispatch(onGetTimeslots(id, week)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
  onTimeslotSelect: (id: number) => dispatch(onTimeslotSelect(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SixthStepAngel);

//@flow
import { connect } from 'react-redux';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import {
  getTimeslots,
  getErrors,
  getLoadingStatus,
  getSelectedAgenda,
} from '../selectors';
import { onGetTimeslots, onErrorReset, onTimeslotSelect } from '../actions';
import Agenda from './components/Agenda';

type Props = {
  previous: Function,
  next: Function,
  getTimeslots: Function,
  timeslots: Array<Object>,
  selectedAgenda: Object,
  errors: Object | string,
  onErrorReset: Function,
  onTimeslotSelect: Function,
  isLoading: boolean,
};

type State = {
  week: number,
};

class SixthStepAngel extends Component<Props, State> {
  state = {
    date: moment(),
    week: moment().isoWeek(),
    year: moment().year(),
  };

  componentDidMount() {
    if(!this.props.selectedAgenda) {
      this.props.history.push('/appointments'); 
    } else {
      this.props.getTimeslots(
        this.props.selectedAgenda.id,
        this.state.week,
        this.state.year
      );
    }
  }

  getNextWeek = () => {
    this.setState(prevState => {
      const nextDate = this.state.date.add(7, 'days');
      const nextWeek = nextDate.isoWeek();
      const nextYear = nextDate.year();
      this.props.getTimeslots(this.props.selectedAgenda.id, nextWeek, nextYear);
      return {
        date: nextDate,
        week: nextWeek,
        year: nextYear,
      };
    });
  };

  getPrevWeek = () => {
    this.setState(prevState => {
      const prevDate = this.state.date.subtract(7, 'days');
      const prevWeek = prevDate.isoWeek();
      const prevYear = prevDate.year();
      this.props.getTimeslots(this.props.selectedAgenda.id, prevWeek, prevYear);
      return {
        date: prevDate,
        week: prevWeek,
        year: prevYear,
      };
    });
  };

  onTimeSelect = () => {
    this.props.history.push('/appointment-confirmation');
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navTitle={this.props.selectedAgenda.city}
      >
        <CustomRow padding="1rem 0 0.5rem 0">
          <Error
            errors={this.props.errors}
            onErrorConfirm={this.props.onErrorReset}
          />
          {this.props.isLoading || !this.props.currentWeek ? (
            <Loader />
          ) : (
            <Agenda
              timeslots={this.props.currentWeek.timeslots}
              getNextWeek={this.getNextWeek}
              getPrevWeek={this.getPrevWeek}
              week={this.state.week}
              next={this.onTimeSelect}
              onTimeslotSelect={this.props.onTimeslotSelect}
              showNextWeek={this.props.currentWeek.showNextWeek}
              showPreviousWeek={this.props.currentWeek.showPreviousWeek}
            />
          )}
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  selectedAgenda: getSelectedAgenda(state),
  currentWeek: getTimeslots(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  getTimeslots: (id: number, week: number, year: number) =>
    dispatch(onGetTimeslots(id, week, year)),
  onErrorReset: () => dispatch(onErrorReset()),
  onTimeslotSelect: (id: number) => dispatch(onTimeslotSelect(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SixthStepAngel);

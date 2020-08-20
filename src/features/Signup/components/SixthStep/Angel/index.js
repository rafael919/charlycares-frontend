//@flow
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomLink from 'Components/CustomLink';
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
} from '../../../selectors';
import {
  onGetTimeslots,
  onErrorReset,
  onTimeslotSelect,
} from '../../../actions';
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
      <Layout
        onNavBack={this.props.previous}
        navTitle={this.props.selectedAgenda.city}
        navRightComponent={() => (
          <CustomLink to="/support">
            <FormattedMessage id="signup.angel.sixthStep.support" />
          </CustomLink>
        )}
      >
        <CustomRow padding="0 0 0.5rem 0">
          <Error
            errors={this.props.errors}
            onErrorConfirm={this.props.onErrorReset}
          />
          {this.props.isLoading && <Loader />}
          <Agenda
            timeslots={this.props.timeslots}
            getNextWeek={this.getNextWeek}
            getPrevWeek={this.getPrevWeek}
            week={this.state.week}
            next={this.props.next}
            onTimeslotSelect={this.props.onTimeslotSelect}
          />
        </CustomRow>
      </Layout>
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
  onErrorReset: () => dispatch(onErrorReset()),
  onTimeslotSelect: (id: number) => dispatch(onTimeslotSelect(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SixthStepAngel);

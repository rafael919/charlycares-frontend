//@flow
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import { ProgressiveList } from 'Components/Progressive';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import { getAgendas } from '../../../selectors';
import { onGetAgendas, onAgendaSelect } from '../../../actions';
import { getErrors, getLoadingStatus } from '../../../../../ui/selectors';
import { onErrorConfirm } from '../../../../../ui/actions';
import List from './components/List';
import Location from './components/Location';
import type { SelectAgendaPayload } from '../../../actions';

type Props = {
  next: Function,
  agendas: Array<Object>,
  onGetAgendas: Function,
  onErrorConfirm: Function,
  onAgendaSelect: Function,
  isLoading: boolean,
  errors?: string | Object,
};

class FifthStepAngel extends Component<Props> {
  onItemClick = agenda => () => {
    this.props.onAgendaSelect(agenda);
    this.props.next();
  };

  componentDidMount() {
    if (!this.props.agendas) {
      this.props.onGetAgendas();
    }
  }

  mapAgendasToList = () => {
    if (this.props.agendas && this.props.agendas.length > 0) {
      return this.props.agendas.map(agenda => {
        return {
          key: agenda.id,
          content: (
            <Location
              city={agenda.city}
              address={agenda.address}
              postalCode={agenda.postalcode}
              distance={agenda.distance}
            />
          ),
          onClick: this.onItemClick(agenda),
        };
      });
    } else {
      return [];
    }
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <CustomRow padding="12rem 0 0 0" columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.fifthStep.title" />
            </Header>
          </Grid.Column>
        </CustomRow>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.angel.fifthStep.description" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h5">
              <FormattedMessage id="signup.angel.fifthStep.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        {this.props.isLoading ? (
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <ProgressiveList repeat={4} isLoading={this.props.isLoading} />
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row columns={1}>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <List
                relaxed="very"
                verticalAlign="middle"
                items={this.mapAgendasToList()}
              />
            </Grid.Column>
          </Grid.Row>
        )}
      </DesktopWelcomeLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  agendas: getAgendas(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  onGetAgendas: () => dispatch(onGetAgendas()),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
  onAgendaSelect: (data: SelectAgendaPayload) => dispatch(onAgendaSelect(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FifthStepAngel);

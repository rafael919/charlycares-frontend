//@flow
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header, Container } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Error from 'Components/Error';
import { ProgressiveList } from 'Components/Progressive';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import { getAgendas, getErrors, getLoadingStatus } from '../../../selectors';
import { onGetAgendas, onErrorReset, onAgendaSelect } from '../../../actions';
import List from './components/List';
import Location from './components/Location';
import type { SelectAgendaPayload } from '../../actions';

type Props = {
  next: Function,
  agendas: Array<Object>,
  onGetAgendas: Function,
  onErrorReset: Function,
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
      <Layout
        flexcenteritem="5"
        navBorder
        navTitle={<FormattedMessage id="signup.angel.fifthStep.title" />}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorReset}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding width={16}>
            <Divider />
            <Container>
              <Grid>
                <Grid.Row>
                  <CustomColumn padding="1rem 1rem 0 1rem">
                    <Paragraph fontSize="0.9375rem">
                      <FormattedMessage id="signup.angel.fifthStep.description" />
                    </Paragraph>
                  </CustomColumn>
                </Grid.Row>
                <CustomRow>
                  <CustomColumn width={16}>
                    <Header as="h5">
                      <FormattedMessage id="signup.angel.fifthStep.header" />
                    </Header>
                  </CustomColumn>
                  <CustomColumn padding="1.1rem 1rem 1rem 1rem" width={16}>
                    <ProgressiveList
                      repeat={4}
                      isLoading={this.props.isLoading}
                    />
                    <List
                      relaxed="very"
                      verticalAlign="middle"
                      items={this.mapAgendasToList()}
                    />
                  </CustomColumn>
                </CustomRow>
              </Grid>
            </Container>
          </CustomColumn>
        </CustomRow>
      </Layout>
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
  onErrorReset: () => dispatch(onErrorReset()),
  onAgendaSelect: (data: SelectAgendaPayload) => dispatch(onAgendaSelect(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FifthStepAngel);

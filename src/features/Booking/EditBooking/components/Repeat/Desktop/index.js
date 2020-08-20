import { FormattedMessage } from 'react-intl';
import { Segment } from 'semantic-ui-react';
import moment from 'moment';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import anime from 'animejs';
import styled from 'styled-components';

import ListItem from '../components/ListItem';
import StyledList from '../components/List';

const RepetitionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.125rem;
`;

const RepetitionTitle = styled.div`
  font-family: ${({ theme }) => theme.primaryFont};
  font-size: 1rem;
`;

const RepetitionNum = styled.div`
  color: ${({ theme }) => theme.secondaryColor};
  font-family: ${({ theme }) => theme.primaryFont};
`;

class Repeat extends Component {
  ref = React.createRef();

  componentDidMount() {
    this.animation = anime({
      targets: this.ref.current,
      translateX: [-300, 0],
      duration: 200,
      easing: 'linear',
    });
  }

  getNumberOfSelected() {
    if (this.props.bookingDates.length) {
      return this.props.bookingDates.reduce((acc, curr) => {
        if (curr.selected) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }
  }

  render() {
    return (
      <div ref={this.ref}>
        <Navigation
          title={<FormattedMessage id="booking.edit.title" />}
          subTitle={
            <FormattedMessage
              id="booking.edit.subTitle"
              values={{
                id: this.props.id,
              }}
            />
          }
          onBack={this.props.onGoBack('quit')}
        />
        <RepetitionsContainer>
          <RepetitionTitle>
            <FormattedMessage id="booking.repeat.repetitions" />
          </RepetitionTitle>

          <RepetitionNum>
            {this.getNumberOfSelected()} <FormattedMessage id="of" />{' '}
            {this.props.bookingDates.length}
          </RepetitionNum>
        </RepetitionsContainer>

        <Segment basic vertical>
          <StyledList verticalAlign="middle">
            {this.props.bookingDates.map((rDay, i) => {
              return (
                <ListItem
                  onAdd={this.props.onToggleDay(i)}
                  key={i}
                  date={moment(rDay.start_date, 'YYYY-MM-DD HH:mm:ss').format(
                    'MMMM DD'
                  )}
                  checked={rDay.selected}
                />
              );
            })}
          </StyledList>
        </Segment>
        <Confirmation>
          <BasicButton primary fluid onClick={this.props.onGoBack()}>
            <FormattedMessage id="booking.repeat.btn" />
          </BasicButton>
        </Confirmation>
      </div>
    );
  }
}

export default Repeat;

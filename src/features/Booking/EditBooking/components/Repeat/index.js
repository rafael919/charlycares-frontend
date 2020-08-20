import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import anime from 'animejs';

import ListItem from './components/ListItem';
import StyledList from './components/List';

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
        <Layout
          onNavBack={this.props.onGoBack('quit')}
          navRightComponent={() => (
            <CustomLink primary to="/booking">
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          )}
          navTitle={<FormattedMessage id="booking.edit.title" />}
          navSubTitle={
            <FormattedMessage
              id="booking.edit.subTitle"
              values={{
                id: this.props.id,
              }}
            />
          }
          navBorder
        >
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow padding="2.5625em 0 0.9375em 0" borderBottom>
                  <CustomColumn noPadding verticalAlign="bottom" width={8}>
                    <Header as="h5">
                      <FormattedMessage id="booking.repeat.repetitions" />
                    </Header>
                  </CustomColumn>
                  <CustomColumn
                    noPadding
                    verticalAlign="bottom"
                    textAlign="right"
                    width={8}
                  >
                    <InlineText primaryFont accentText>
                      {this.getNumberOfSelected()} <FormattedMessage id="of" />{' '}
                      {this.props.bookingDates.length}
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 10rem 0">
                  <StyledList verticalAlign="middle">
                    {this.props.bookingDates.map((rDay, i) => {
                      return (
                        <ListItem
                          onAdd={this.props.onToggleDay(i)}
                          key={i}
                          date={moment(
                            rDay.start_date,
                            'YYYY-MM-DD HH:mm:ss'
                          ).format('MMMM DD')}
                          checked={rDay.selected}
                        />
                      );
                    })}
                  </StyledList>
                </CustomRow>
              </Grid>
            </CustomColumn>
          </CustomRow>
          <Confirmation>
            <BasicButton primary fluid onClick={this.props.onGoBack()}>
              <FormattedMessage id="booking.repeat.btn" />
            </BasicButton>
          </Confirmation>
        </Layout>
      </div>
    );
  }
}

export default Repeat;

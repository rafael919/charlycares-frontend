import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';
import styled from 'styled-components';

import API from '../api';

const Container = styled.div`
  margin-top: 12rem;
`
class Announcement extends Component {
  state = {
    announcement: {}
  }
  componentDidMount() {
    API.getAnnouncement().then((resp) => {
        this.setState({
          announcement: resp.data.data
        });
    }).catch(err => {
      this.props.history.push('/booking');
    })
  }

  onClose = () => {
    if(this.state.announcement.redirect) {
      this.props.history.push(this.state.announcement.redirect);
    } else {
      this.props.history.push('/booking');
    }
  }
  
  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Container>
              <div dangerouslySetInnerHTML={createMarkup(this.state.announcement.content)}></div>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton primary fluid onClick={this.onClose}>
              <FormattedMessage id="announcement.nextButton" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

function createMarkup(message) {
  return {__html: message};
}

export default Announcement;

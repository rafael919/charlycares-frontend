import React, { Component } from 'react';
import API from './api';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';

import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';

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
      <Layout 
        onNavClose={this.onClose}
        navTitle={<FormattedMessage id="announcement.header" />}
        navBorder>
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow padding="2rem 0 1rem 0">
                  <CustomColumn noPadding width={16}>
                    <div dangerouslySetInnerHTML={createMarkup(this.state.announcement.content)}></div>
                  </CustomColumn>
                </CustomRow>
              </Grid>
            </CustomColumn>
          </CustomRow>
        </ContentWrapper>
      </Layout>
    );
  }
}

function createMarkup(message) {
  return {__html: message};
}


export default Announcement;

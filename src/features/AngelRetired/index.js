import React, { Component } from 'react';

import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';

import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';

class AngelRetired extends Component {
  render() {
    return (
      <Layout 
        navTitle={<FormattedMessage id="retired.header" />}
        navBorder
        >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow padding="2rem 0 1rem 0">
                  <CustomColumn noPadding width={16}>
                    <FormattedMessage id="retired.body" />
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

export default AngelRetired;

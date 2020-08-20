import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';

import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';

import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';

import Layout from 'Components/Layout';
import React, { Component } from 'react';

class OutsideService extends Component {
  state = {
    errors: null,
    isLoading: false,
    postalCode: '',
    streetNumber: '',
  };

  onLookForCities = () => {
    window.open('http://www.charlycares.com/', '_blank');
  };

  onCheckCity = () => {};

  onInputChange = e => {
    const input = e.currentTarget.getAttribute('name');
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    return (
      <Layout navBorder>
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow padding="2rem 0 1rem 0">
                  <CustomColumn noPadding width={16}>
                    <InlineText
                      bold
                      primaryFont
                      fontSize="20px"
                      lineHeight="30px"
                    >
                      <FormattedMessage
                        id="errors.outservice.header"
                        values={{ city: this.props.city }}
                      />
                    </InlineText>
                  </CustomColumn>

                  <CustomColumn padding="1rem 0 1rem 0" width={16}>
                    <Paragraph light fontSize="15px">
                      <FormattedMessage
                        id="errors.outservice.descriptionFirst"
                        values={{ city: this.props.city }}
                      />
                    </Paragraph>
                  </CustomColumn>

                  <CustomColumn padding="1rem 0 0 0" width={16}>
                    <BasicButton primary fluid onClick={this.onLookForCities}>
                      <FormattedMessage id="errors.outservice.buttonTextFirst" />
                    </BasicButton>
                  </CustomColumn>

                  <CustomColumn
                    padding="0 0 1.25rem 0"
                    textAlign="center"
                    width={16}
                  >
                    <InlineText light fontSize="12px" lineHeight="17px">
                      <FormattedMessage id="errors.outservice.descriptionUnderButton" />
                    </InlineText>
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

export default OutsideService;

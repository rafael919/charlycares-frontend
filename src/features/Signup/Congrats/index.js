import { injectIntl } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import BasicButton from 'Components/Buttons/Basic';
import Layout from 'Components/Layout';
import { Paragraph } from 'Components/Text';
import Header from './components/Header';
import React, { Component } from 'react';

class Congrats extends Component {
  navigateToHowItWorks = () => {
    this.props.history.push('/how-it-works');
  };

  render() {
    return (
      <Layout>
        <CustomRow padding="2.5rem 0 0 0">
          <CustomColumn>
            <Header>
              {this.props.intl.formatMessage({
                id: 'signup.family.congrats.header',
              })}
            </Header>
            <CustomColumn padding="0 0 2rem">
              <Paragraph light>
                {this.props.intl.formatMessage({
                  id: 'signup.family.congrats.successful',
                })}
              </Paragraph>
            </CustomColumn>
            <CustomColumn padding="0 0 2rem">
              <Paragraph light>
                {this.props.intl.formatMessage({
                  id: 'signup.family.congrats.searching',
                })}
              </Paragraph>
            </CustomColumn>
            <BasicButton onClick={this.navigateToHowItWorks} primary fluid>
              {this.props.intl.formatMessage({
                id: 'signup.family.congrats.btn',
              })}
            </BasicButton>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(Congrats);

import { Paragraph } from 'Components/Text';
import { injectIntl } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import Header from './components/Header';
import ButtonWrapper from './components/ButtonWrapper';

class FifthStepFamily extends Component {
  onButtonClick = () => {
    this.props.history.push('/how-it-works');
  };

  render() {
    return (
      <Layout>
        <CustomRow padding="2.5rem 0 0 0">
          <CustomColumn>
            <Header>
              {this.props.intl.formatMessage({
                id: 'signup.family.fifthStep.title',
              })}
            </Header>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'signup.family.fifthStep.desc1',
              })}
            </Paragraph>
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'signup.family.fifthStep.desc2',
              })}
            </Paragraph>
            <ButtonWrapper>
              <BasicButton onClick={this.onButtonClick} primary fluid>
                {this.props.intl.formatMessage({
                  id: 'signup.family.fifthStep.button',
                })}
              </BasicButton>
            </ButtonWrapper>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(FifthStepFamily);
